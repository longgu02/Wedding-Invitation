import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";

export async function POST(request: Request) {
  const body = await request.json();
  const { name, attending, guestCount, message } = body ?? {};

  if (typeof name !== "string" || !name.trim() || typeof attending !== "boolean") {
    return NextResponse.json({ error: "Thiếu thông tin bắt buộc." }, { status: 400 });
  }

  const db = await getDb();
  await db.collection("rsvps").insertOne({
    name: name.trim(),
    attending,
    guestCount: attending ? Math.max(1, Number(guestCount) || 1) : 0,
    message: typeof message === "string" ? message.trim() : "",
    createdAt: new Date(),
  });

  // The message (if any) is surfaced in the guestbook by /api/wishes, which
  // merges RSVP messages with the wishes collection at read time.
  return NextResponse.json({ ok: true });
}
