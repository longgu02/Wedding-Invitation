"use client";

import { useEffect, useState, type FormEvent } from "react";
import { invitation } from "@/lib/invitationData";

type Wish = { name: string; message: string; createdAt: string };
type Status = "idle" | "sending" | "error";

export default function Guestbook() {
  const [wishes, setWishes] = useState<Wish[] | null>(null);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  useEffect(() => {
    fetch("/api/wishes")
      .then((res) => res.json())
      .then((data) => setWishes(data.wishes ?? []))
      .catch(() => setWishes([]));
  }, []);

  if (!invitation.flags.showGuestbook) return null;

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    setStatus("sending");
    try {
      const res = await fetch("/api/wishes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, message }),
      });
      if (!res.ok) throw new Error("failed");
      const data = await res.json();
      setWishes((prev) => [data.wish, ...(prev ?? [])]);
      setName("");
      setMessage("");
      setStatus("idle");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section className="py-12 sm:py-16">
      <div className="mx-auto max-w-4xl rounded-3xl bg-wheat px-6 py-12 shadow-[0_18px_45px_-24px_rgba(45,54,20,0.3)] ring-1 ring-olive/5 sm:px-12">
      <p className="text-center font-serif text-lg font-medium tracking-[0.3em] text-olive uppercase sm:text-xl">
        {invitation.labels.guestbook}
      </p>

      <form onSubmit={handleSubmit} className="mx-auto mt-8 max-w-md space-y-3">
        <input
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={invitation.labels.guestNamePlaceholder}
          className="w-full rounded-lg border border-gold-soft/50 bg-ivory px-4 py-2 outline-none focus:border-gold"
        />
        <textarea
          required
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={invitation.labels.guestWishPlaceholder}
          rows={3}
          className="w-full rounded-lg border border-gold-soft/50 bg-ivory px-4 py-2 outline-none focus:border-gold"
        />
        {status === "error" && (
          <p className="text-center text-sm text-red-600">{invitation.labels.rsvpErrorText}</p>
        )}
        <button
          type="submit"
          disabled={!name.trim() || !message.trim() || status === "sending"}
          className="w-full rounded-full bg-sage-deep py-3 font-serif text-lg text-ivory transition-opacity disabled:opacity-40"
        >
          {status === "sending"
            ? invitation.labels.submittingText
            : invitation.labels.submitWishText}
        </button>
      </form>

      <div className="mt-10 grid gap-4 md:grid-cols-2">
        {wishes === null && (
          <p className="text-center text-sm text-ink/50 md:col-span-2">Đang tải lời chúc...</p>
        )}
        {wishes?.length === 0 && (
          <p className="text-center text-sm italic text-ink/50 md:col-span-2">
            {invitation.labels.noWishesYet}
          </p>
        )}
        {wishes?.map((wish, i) => (
          <div
            key={i}
            className="rounded-2xl border border-olive/10 bg-cream-deep/40 px-5 py-4 text-left"
          >
            <p className="font-serif text-ink">{wish.message}</p>
            <p className="mt-2 text-xs uppercase tracking-widest text-olive">
              — {wish.name}
            </p>
          </div>
        ))}
      </div>
      </div>
    </section>
  );
}
