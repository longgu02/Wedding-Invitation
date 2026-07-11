"use client";

import { useState, type FormEvent } from "react";
import { invitation } from "@/lib/invitationData";

type Status = "idle" | "sending" | "done" | "error";

export default function RsvpForm() {
  const [attending, setAttending] = useState<boolean | null>(null);
  const [name, setName] = useState("");
  const [guestCount, setGuestCount] = useState(1);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  if (!invitation.flags.showRsvp) return null;

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (attending === null || !name.trim()) return;

    setStatus("sending");
    try {
      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, attending, guestCount, message }),
      });
      if (!res.ok) throw new Error("failed");
      setStatus("done");
    } catch {
      setStatus("error");
    }
  }

  const salutation = invitation.labels.guestSalutation;

  if (status === "done") {
    return (
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-3xl rounded-3xl bg-wheat px-6 py-12 text-center shadow-[0_18px_45px_-24px_rgba(45,54,20,0.3)] ring-1 ring-olive/5 sm:px-12">
          <p className="font-serif text-2xl italic text-ink sm:text-3xl">
            {invitation.labels.rsvpThankYouTitle.replace("{{salutation}}", salutation)}
          </p>
          <p className="mt-3 text-ink/70">
            {(attending
              ? invitation.labels.rsvpConfirmationReceivedText
              : invitation.labels.rsvpDeclineMessageText
            )
              .replaceAll("{{salutation}}", salutation)}
          </p>
        </div>
      </section>
    );
  }

  return (
    <section id="rsvp" className="scroll-mt-8 py-12 sm:py-16">
      <div className="mx-auto max-w-3xl rounded-3xl bg-wheat px-6 py-12 shadow-[0_18px_45px_-24px_rgba(45,54,20,0.3)] ring-1 ring-olive/5 sm:px-12">
        <p className="text-center font-serif text-lg font-medium tracking-[0.3em] text-olive uppercase sm:text-xl">
          {invitation.labels.rsvpTitle}
        </p>
        <p className="mx-auto mt-4 max-w-md text-center text-sm text-ink/70">
          {invitation.labels.rsvpSubtitle.replaceAll("{{salutation}}", salutation)}
        </p>

        <form onSubmit={handleSubmit} className="mx-auto mt-8 max-w-md space-y-5">
        <div className="flex justify-center gap-3">
          <button
            type="button"
            onClick={() => setAttending(true)}
            className={`flex-1 rounded-full border px-4 py-2 text-sm transition-colors ${
              attending === true
                ? "border-gold bg-gold text-ivory"
                : "border-gold-soft/60 text-ink/70"
            }`}
          >
            {invitation.labels.rsvpAttendYes}
          </button>
          <button
            type="button"
            onClick={() => setAttending(false)}
            className={`flex-1 rounded-full border px-4 py-2 text-sm transition-colors ${
              attending === false
                ? "border-sage-deep bg-sage-deep text-ivory"
                : "border-gold-soft/60 text-ink/70"
            }`}
          >
            {invitation.labels.rsvpAttendNo}
          </button>
        </div>

        <div>
          <label className="mb-1 block text-xs uppercase tracking-widest text-ink/60">
            {invitation.labels.rsvpNameLabel.replace("{{salutation}}", salutation)}
          </label>
          <input
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={invitation.labels.rsvpNamePlaceholder.replace(
              "{{salutation}}",
              salutation,
            )}
            className="w-full rounded-lg border border-gold-soft/50 bg-ivory px-4 py-2 outline-none focus:border-gold"
          />
        </div>

        {attending === true && (
          <div>
            <label className="mb-1 block text-xs uppercase tracking-widest text-ink/60">
              {invitation.labels.rsvpGuestCountLabel.replace("{{salutation}}", salutation)}
            </label>
            <input
              type="number"
              min={1}
              value={guestCount}
              onChange={(e) => setGuestCount(Number(e.target.value))}
              className="w-full rounded-lg border border-gold-soft/50 bg-ivory px-4 py-2 outline-none focus:border-gold"
            />
          </div>
        )}

        <div>
          <label className="mb-1 block text-xs uppercase tracking-widest text-ink/60">
            {invitation.labels.rsvpMessageLabel}
          </label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={invitation.labels.rsvpMessagePlaceholder}
            rows={3}
            className="w-full rounded-lg border border-gold-soft/50 bg-ivory px-4 py-2 outline-none focus:border-gold"
          />
        </div>

        {status === "error" && (
          <p className="text-center text-sm text-red-600">{invitation.labels.rsvpErrorText}</p>
        )}

        <button
          type="submit"
          disabled={attending === null || !name.trim() || status === "sending"}
          className="w-full rounded-full bg-gold py-3 font-serif text-lg text-ivory transition-opacity disabled:opacity-40"
        >
          {status === "sending"
            ? invitation.labels.rsvpSendingText
            : invitation.labels.rsvpSubmitText}
        </button>
        </form>
      </div>
    </section>
  );
}
