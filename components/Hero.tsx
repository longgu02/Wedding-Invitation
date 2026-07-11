import Image from "next/image";
import { invitation } from "@/lib/invitationData";

function OvalFrame() {
  // A fully closed portrait oval (capsule), not an open arch.
  return (
    <svg
      viewBox="0 0 300 500"
      fill="none"
      preserveAspectRatio="xMidYMid meet"
      className="pointer-events-none absolute inset-0 h-full w-full"
    >
      <rect
        x="20"
        y="14"
        width="260"
        height="472"
        rx="130"
        stroke="var(--olive)"
        strokeWidth="1.4"
        opacity="0.85"
      />
      <rect
        x="27"
        y="21"
        width="246"
        height="458"
        rx="123"
        stroke="var(--olive)"
        strokeWidth="0.9"
        opacity="0.5"
      />
    </svg>
  );
}

export default function Hero() {
  const flower = invitation.decorFlower;

  return (
    <section className="relative flex min-h-[92vh] items-center justify-center overflow-hidden px-6 py-16">
      {/* Faded background magnolia — top-left corner */}
      <Image
        src={flower}
        alt=""
        width={340}
        height={330}
        priority
        className="pointer-events-none absolute -top-6 -left-8 z-0 w-40 opacity-40 select-none sm:w-64 lg:w-80"
      />
      {/* Faded background magnolia — bottom-right corner */}
      <Image
        src={flower}
        alt=""
        width={340}
        height={330}
        className="pointer-events-none absolute -bottom-8 -right-10 z-0 w-40 -scale-x-100 rotate-180 opacity-40 select-none sm:w-64 lg:w-80"
      />

      {/* Portrait composition: closed oval + text + prominent bottom bouquet */}
      <div className="relative z-10 aspect-[3/5] w-full max-w-[360px]">
        <OvalFrame />

        {/* Text, biased slightly above centre to leave room for the bouquet */}
        <div className="absolute inset-0 z-20 flex -translate-y-[7%] flex-col items-center justify-center text-center">
          <p className="font-serif text-sm font-medium leading-relaxed tracking-[0.45em] text-olive uppercase">
            The
            <br />
            Wedding
            <br />
            Of
          </p>

          <h1 className="mt-6 font-script text-5xl leading-none text-olive-deep sm:text-6xl">
            {invitation.groom.shortName}
          </h1>
          <p className="my-3 font-script text-4xl text-olive/80 sm:text-5xl">&amp;</p>
          <h1 className="font-script text-5xl leading-none text-olive-deep sm:text-6xl">
            {invitation.bride.shortName}
          </h1>
        </div>

        {/* A single magnolia flower on the bottom curve of the oval, rotated 45° to the right */}
        <div className="pointer-events-none absolute inset-x-0 bottom-[-2%] z-30 flex justify-center">
          <Image
            src={flower}
            alt=""
            width={340}
            height={330}
            priority
            className="w-[64%] rotate-45 select-none"
          />
        </div>
      </div>
    </section>
  );
}
