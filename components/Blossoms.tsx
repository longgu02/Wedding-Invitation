"use client";

import { useEffect, useState } from "react";

function Blossom({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      {[0, 72, 144, 216, 288].map((angle) => (
        <ellipse
          key={angle}
          cx="20"
          cy="9"
          rx="6"
          ry="9"
          fill="var(--blossom)"
          opacity="0.9"
          transform={`rotate(${angle} 20 20)`}
        />
      ))}
      <circle cx="20" cy="20" r="3.4" fill="#f6d98a" />
    </svg>
  );
}

type Petal = {
  left: number;
  size: number;
  dur: number;
  delay: number;
  sway: number;
};

export default function Blossoms() {
  // Generate on the client only, so random values never cause a hydration mismatch.
  const [petals, setPetals] = useState<Petal[]>([]);

  useEffect(() => {
    const arr: Petal[] = Array.from({ length: 18 }, () => ({
      left: Math.random() * 100,
      size: 11 + Math.random() * 15,
      dur: 6 + Math.random() * 7, // 6–13s fall
      delay: -Math.random() * 13, // negative = already mid-fall, so no empty sky
      sway: 3.5 + Math.random() * 5,
    }));
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPetals(arr);
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {petals.map((p, i) => (
        <div
          key={i}
          className="petal-fall absolute top-0"
          style={{
            left: `${p.left}%`,
            animationDuration: `${p.dur}s`,
            animationDelay: `${p.delay}s`,
          }}
        >
          <div
            className="petal-sway"
            style={{ animationDuration: `${p.sway}s`, animationDelay: `${p.delay}s` }}
          >
            <Blossom size={p.size} />
          </div>
        </div>
      ))}
    </div>
  );
}
