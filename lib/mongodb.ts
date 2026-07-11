import { MongoClient, type Db } from "mongodb";
import { Resolver } from "node:dns/promises";

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB || "wedding";

let clientPromise: Promise<MongoClient> | null = null;

// Some ISP/router DNS servers refuse SRV lookups, which breaks `mongodb+srv://`
// with "querySrv ECONNREFUSED" — even though MongoDB Compass connects fine.
// We resolve the SRV/TXT records ourselves through a public DNS resolver and hand
// the driver a plain `mongodb://` connection string, so it never needs an SRV
// lookup of its own. Override the resolver via MONGODB_DNS (comma-separated).
async function resolveConnectionString(srvUri: string): Promise<string> {
  if (!srvUri.startsWith("mongodb+srv://")) return srvUri;

  const u = new URL(srvUri);
  const host = u.hostname;

  const resolver = new Resolver();
  const servers = (process.env.MONGODB_DNS || "8.8.8.8,1.1.1.1")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  try {
    resolver.setServers(servers);
  } catch {
    // ignore — fall back to system DNS
  }

  const srv = await resolver.resolveSrv(`_mongodb._tcp.${host}`);
  let txtOpts = "";
  try {
    const txt = await resolver.resolveTxt(host);
    txtOpts = txt.map((chunks) => chunks.join("")).join("&");
  } catch {
    // TXT is optional
  }

  const hosts = srv.map((s) => `${s.name}:${s.port}`).join(",");
  const params = new URLSearchParams(txtOpts);
  params.set("ssl", "true");
  for (const [k, v] of u.searchParams) params.set(k, v);
  const auth = u.username ? `${u.username}:${u.password}@` : "";
  return `mongodb://${auth}${hosts}/?${params.toString()}`;
}

async function connect(): Promise<MongoClient> {
  const connStr = await resolveConnectionString(uri as string);
  return new MongoClient(connStr).connect();
}

function getClientPromise(): Promise<MongoClient> {
  if (!uri) {
    throw new Error(
      "MONGODB_URI is not set. Copy .env.local.example to .env.local and fill in your connection string.",
    );
  }

  // Reuse the connection across hot-reloads in dev and across invocations in serverless.
  const globalWithMongo = global as typeof global & {
    _mongoClientPromise?: Promise<MongoClient>;
  };

  const isDev = process.env.NODE_ENV === "development";
  if (isDev ? !globalWithMongo._mongoClientPromise : !clientPromise) {
    // If the connection fails, drop the cached (rejected) promise so the next
    // request can retry instead of returning the same failure forever.
    const p = connect().catch((err) => {
      if (isDev) globalWithMongo._mongoClientPromise = undefined;
      else clientPromise = null;
      throw err;
    });
    if (isDev) globalWithMongo._mongoClientPromise = p;
    else clientPromise = p;
  }

  return (isDev ? globalWithMongo._mongoClientPromise : clientPromise) as Promise<MongoClient>;
}

export async function getDb(): Promise<Db> {
  const client = await getClientPromise();
  return client.db(dbName);
}
