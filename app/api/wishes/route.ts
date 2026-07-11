import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";

export async function GET() {
  const db = await getDb();
  const wishes = await db
    .collection("wishes")
    .find({}, { projection: { _id: 0, name: 1, message: 1, createdAt: 1 } })
    .sort({ createdAt: -1 })
    .limit(200)
    .toArray();

  return NextResponse.json({ wishes });
}

export async function POST(request: Request) {
  const body = await request.json();
  const { name, message } = body ?? {};

  if (typeof name !== "string" || !name.trim() || typeof message !== "string" || !message.trim()) {
    return NextResponse.json({ error: "Thiếu tên hoặc lời chúc." }, { status: 400 });
  }

  const db = await getDb();
  const doc = {
    name: name.trim(),
    message: message.trim(),
    createdAt: new Date(),
  };
  await db.collection("wishes").insertOne(doc);

  return NextResponse.json({ ok: true, wish: doc });
}
