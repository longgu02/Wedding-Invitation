import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";

export async function GET() {
  const db = await getDb();
  const projection = { projection: { _id: 0, name: 1, message: 1, createdAt: 1 } };

  // Merge the guestbook wishes with any messages left on RSVPs, so both show
  // together in the guestbook. Genuine wishes come from the `wishes` collection;
  // RSVP messages come straight from `rsvps` (no duplicate docs needed).
  const [wishes, rsvpMessages] = await Promise.all([
    db.collection("wishes").find({}, projection).sort({ createdAt: -1 }).limit(500).toArray(),
    db
      .collection("rsvps")
      .find({ message: { $type: "string", $ne: "" } }, projection)
      .sort({ createdAt: -1 })
      .limit(500)
      .toArray(),
  ]);

  const merged = [...wishes, ...rsvpMessages]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 300);

  return NextResponse.json({ wishes: merged });
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
