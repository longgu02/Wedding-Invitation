"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { invitation } from "@/lib/invitationData";

export default function MusicToggle({ autoplay }: { autoplay: boolean }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [available, setAvailable] = useState(true);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (autoplay && available) {
      audioRef.current?.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
    }
  }, [autoplay, available]);

  if (!available) return null;

  function toggle() {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      audio.play().then(() => setPlaying(true)).catch(() => {});
    }
  }

  return (
    <>
      {/* Background music — swap the file at invitation.music (public/music/…). */}
      <audio ref={audioRef} src={invitation.music} loop onError={() => setAvailable(false)} />
      <button
        type="button"
        onClick={toggle}
        aria-label={playing ? "Tắt nhạc" : "Bật nhạc"}
        className="fixed bottom-6 right-6 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-olive-deep shadow-lg"
      >
        <span className="flex h-5 items-end gap-[3px]">
          {[0, 1, 2, 3].map((i) => (
            <motion.span
              key={i}
              className="w-[3px] rounded-full bg-cream"
              animate={playing ? { height: ["30%", "100%", "45%", "80%", "30%"] } : { height: "45%" }}
              transition={
                playing
                  ? { duration: 0.9, repeat: Infinity, ease: "easeInOut", delay: i * 0.12 }
                  : { duration: 0.2 }
              }
              style={{ height: "45%" }}
            />
          ))}
        </span>
      </button>
    </>
  );
}
