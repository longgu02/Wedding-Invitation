"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { invitation } from "@/lib/invitationData";
import Blossoms from "@/components/Blossoms";

const dateShort = new Date(`${invitation.date}T00:00:00+07:00`).toLocaleDateString("vi-VN", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

export default function Envelope({
  open,
  onOpen,
}: {
  open: boolean;
  onOpen: () => void;
}) {
  return (
    <AnimatePresence>
      {!open && (
        <motion.div
          className="envelope-bg fixed inset-0 z-50 flex items-center justify-center overflow-hidden px-5"
          exit={{ opacity: 0, scale: 1.06 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          <Blossoms />

          <motion.div
            className="relative w-full max-w-lg rounded-2xl bg-card px-8 py-14 text-center shadow-[0_25px_60px_-15px_rgba(30,36,14,0.55)]"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            {/* Magnolia sprays overflowing the card corners */}
            <Image
              src={invitation.decorFlower}
              alt=""
              width={230}
              height={224}
              className="pointer-events-none absolute -top-6 -left-6 w-40 select-none sm:w-52"
              priority
            />
            <Image
              src={invitation.decorFlower}
              alt=""
              width={230}
              height={224}
              className="pointer-events-none absolute -bottom-6 -right-6 w-40 rotate-180 select-none sm:w-52"
            />

            <div className="relative">
              {/* Couple's monogram logo */}
              <Image
                src={invitation.logo}
                alt={`${invitation.groom.shortName} & ${invitation.bride.shortName}`}
                width={666}
                height={375}
                priority
                className="mx-auto mb-5 h-auto w-36 select-none sm:w-44"
              />

              <h1 className="font-serif text-4xl leading-tight text-ink sm:text-5xl">
                {invitation.groom.shortName}
              </h1>
              <p className="my-1 font-serif text-2xl text-olive">&amp;</p>
              <h1 className="font-serif text-4xl leading-tight text-ink sm:text-5xl">
                {invitation.bride.shortName}
              </h1>

              <div className="mx-auto my-5 flex items-center justify-center gap-2 text-olive/70">
                <span className="h-px w-10 bg-olive/40" />
                <span className="text-xs">❦</span>
                <span className="h-px w-10 bg-olive/40" />
              </div>

              <p className="font-serif text-lg tracking-wide text-ink-soft">{dateShort}</p>

              <p className="mt-6 font-serif text-xl italic text-ink">
                {invitation.labels.envelopeGreeting}
              </p>

              <motion.button
                type="button"
                onClick={onOpen}
                className="btn-olive mt-6 rounded-full px-10 py-3 font-sans text-base font-medium tracking-wide text-cream"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                animate={{ scale: [1, 1.03, 1] }}
                transition={{
                  scale: { duration: 2.2, repeat: Infinity, ease: "easeInOut" },
                }}
              >
                {invitation.labels.envelopeOpenButton}
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
