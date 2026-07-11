"use client";

import { useEffect, useState } from "react";
import { invitation } from "@/lib/invitationData";
import Calendar from "@/components/Calendar";

const target = new Date(`${invitation.date}T${invitation.time}:00+07:00`).getTime();

function getTimeLeft() {
  const diff = Math.max(0, target - Date.now());
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft);

  useEffect(() => {
    const id = setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  const units: Array<[string, number]> = [
    ["Ngày", timeLeft.days],
    ["Giờ", timeLeft.hours],
    ["Phút", timeLeft.minutes],
    ["Giây", timeLeft.seconds],
  ];

  return (
    <section className="py-12 text-center sm:py-16">
      <p className="font-serif text-2xl italic text-ink sm:text-3xl">
        {invitation.labels.countdown}
      </p>
      <div className="mx-auto mt-8 flex max-w-2xl justify-center gap-3 sm:gap-6">
        {units.map(([label, value]) => (
          <div
            key={label}
            className="flex w-20 flex-col items-center rounded-2xl bg-wheat py-5 shadow-[0_14px_35px_-22px_rgba(45,54,20,0.4)] ring-1 ring-olive/5 sm:w-28 sm:py-7"
          >
            <span className="font-serif text-3xl text-olive sm:text-5xl">
              {String(value).padStart(2, "0")}
            </span>
            <span className="mt-1 text-xs uppercase tracking-widest text-ink-soft sm:text-sm">
              {label}
            </span>
          </div>
        ))}
      </div>

      <Calendar />
    </section>
  );
}
