"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { invitation } from "@/lib/invitationData";

const MAX_TILES = 4;

export default function Gallery() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const photos = invitation.gallery;
  const tiles = photos.slice(0, MAX_TILES);
  const remaining = photos.length - MAX_TILES;

  function show(i: number) {
    setOpenIndex(((i % photos.length) + photos.length) % photos.length);
  }

  return (
    <section className="py-14 sm:py-20">
      <p className="text-center font-serif text-lg font-medium tracking-[0.35em] text-olive uppercase sm:text-xl">
        {invitation.labels.weddingAlbum}
      </p>

      <div className="mx-auto mt-8 grid max-w-4xl grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
        {tiles.map((photo, i) => {
          const isLast = i === MAX_TILES - 1 && remaining > 0;
          return (
            <button
              key={photo.url}
              type="button"
              onClick={() => show(i)}
              className="relative aspect-square overflow-hidden rounded-2xl shadow-[0_12px_30px_-20px_rgba(45,54,20,0.4)]"
            >
              <Image
                src={photo.url}
                alt={`Ảnh cưới ${i + 1}`}
                fill
                sizes="(max-width: 768px) 50vw, 220px"
                className="object-cover transition-transform duration-500 hover:scale-105"
              />
              {isLast && (
                <span className="absolute inset-0 flex flex-col items-center justify-center bg-olive-deep/50 font-serif text-cream">
                  <span className="text-3xl font-medium">+{remaining}</span>
                  <span className="mt-1 text-[0.6rem] tracking-[0.2em] uppercase">Xem thêm</span>
                </span>
              )}
            </button>
          );
        })}
      </div>

      <AnimatePresence>
        {openIndex !== null && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-olive-deep/90 p-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpenIndex(null)}
          >
            <button
              type="button"
              aria-label="Ảnh trước"
              onClick={(e) => {
                e.stopPropagation();
                show(openIndex - 1);
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 px-3 text-3xl text-cream/80"
            >
              ‹
            </button>

            <motion.div
              key={openIndex}
              className="relative aspect-[3/4] w-full max-w-md"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <Image
                src={photos[openIndex].url}
                alt={`Ảnh cưới ${openIndex + 1}`}
                fill
                sizes="100vw"
                className="rounded-lg object-contain"
              />
            </motion.div>

            <button
              type="button"
              aria-label="Ảnh sau"
              onClick={(e) => {
                e.stopPropagation();
                show(openIndex + 1);
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 px-3 text-3xl text-cream/80"
            >
              ›
            </button>

            <p className="absolute bottom-6 left-1/2 -translate-x-1/2 text-sm text-cream/70">
              {openIndex + 1} / {photos.length}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
