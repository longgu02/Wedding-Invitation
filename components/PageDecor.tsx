import Image from "next/image";
import { invitation } from "@/lib/invitationData";

// Faded magnolia sprigs scattered down the whole page, alternating sides.
const SPRIGS: Array<{
  top: string;
  side: "left" | "right";
  off: string;
  w: string;
  flip?: boolean;
  rot?: string;
  op: number;
}> = [
  { top: "1%", side: "left", off: "-7%", w: "w-60 sm:w-80 lg:w-[26rem]", op: 0.22 },
  { top: "9%", side: "right", off: "-8%", w: "w-60 sm:w-80 lg:w-[26rem]", flip: true, rot: "rotate-180", op: 0.16 },
  { top: "20%", side: "left", off: "-8%", w: "w-52 sm:w-72 lg:w-96", rot: "rotate-180", op: 0.18 },
  { top: "31%", side: "right", off: "-7%", w: "w-60 sm:w-80 lg:w-[26rem]", flip: true, op: 0.2 },
  { top: "43%", side: "left", off: "-8%", w: "w-52 sm:w-72 lg:w-96", op: 0.18 },
  { top: "55%", side: "right", off: "-8%", w: "w-60 sm:w-80 lg:w-[26rem]", flip: true, rot: "rotate-180", op: 0.16 },
  { top: "67%", side: "left", off: "-7%", w: "w-60 sm:w-80 lg:w-[26rem]", rot: "rotate-180", op: 0.2 },
  { top: "79%", side: "right", off: "-8%", w: "w-52 sm:w-72 lg:w-96", flip: true, op: 0.18 },
  { top: "90%", side: "left", off: "-7%", w: "w-60 sm:w-80 lg:w-[26rem]", op: 0.2 },
];

export default function PageDecor() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden>
      {SPRIGS.map((s, i) => (
        <div
          key={i}
          className="absolute"
          style={{ top: s.top, [s.side]: s.off, opacity: s.op }}
        >
          <Image
            src={invitation.decorFlower}
            alt=""
            width={340}
            height={330}
            className={`${s.w} ${s.flip ? "-scale-x-100" : ""} ${s.rot ?? ""} h-auto select-none`}
          />
        </div>
      ))}
    </div>
  );
}
