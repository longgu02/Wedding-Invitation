import Image from "next/image";
import { invitation } from "@/lib/invitationData";

const dt = new Date(`${invitation.date}T00:00:00+07:00`);
const tz = { timeZone: invitation.timezone } as const;
const weekday = dt.toLocaleDateString("vi-VN", { weekday: "long", ...tz }); // "Chủ Nhật"
const day = dt.toLocaleDateString("vi-VN", { day: "2-digit", ...tz });
const monthNum = dt.toLocaleDateString("vi-VN", { month: "2-digit", ...tz });

export default function ReceptionInfo() {
  return (
    <section className="py-12 sm:py-16">
      <h2 className="mb-8 text-center font-serif text-3xl text-ink sm:text-4xl">
        {invitation.labels.receptionHeading}
      </h2>

      <div className="mx-auto max-w-4xl">
        <div className="grid gap-6 md:grid-cols-2 md:items-stretch">
          {/* Venue photo card — clear photo with the label overlaid at the bottom */}
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-[0_18px_45px_-24px_rgba(45,54,20,0.35)] ring-1 ring-olive/5 md:aspect-auto md:min-h-[360px]">
            <Image
              src={invitation.venueImage}
              alt={invitation.venueName}
              fill
              sizes="(max-width: 768px) 100vw, 460px"
              className="object-cover"
            />
            {/* Solid light base at the bottom, fading up into the photo, so the text is clearly readable */}
            <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-wheat from-45% via-wheat/85 via-75% to-transparent" />

            <div className="absolute inset-x-0 bottom-0 p-6 text-left sm:p-7">
              <span className="inline-block rounded-full bg-blossom/35 px-4 py-1.5 font-sans text-xs font-semibold tracking-[0.2em] text-[#824852] uppercase">
                {invitation.labels.venueBadge}
              </span>
              <h3 className="mt-3 font-serif text-3xl leading-tight text-ink sm:text-4xl">
                {invitation.venueName}
              </h3>
              <div className="mt-2 flex items-start gap-2 text-ink/80">
                <svg
                  className="mt-1 shrink-0 text-olive"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <p className="whitespace-pre-line text-sm font-medium leading-snug">
                  {invitation.address}
                </p>
              </div>
            </div>
          </div>

          {/* Reception time / date */}
          <div className="flex flex-col justify-center rounded-3xl bg-wheat px-6 py-12 text-center shadow-[0_18px_45px_-24px_rgba(45,54,20,0.3)] ring-1 ring-olive/5 sm:px-10">
            <p className="font-serif text-lg font-medium tracking-[0.35em] text-olive uppercase">
              {invitation.labels.receptionInfoTitle}
            </p>
            <p className="mt-4 font-serif text-xl italic text-ink-soft">
              {invitation.labels.receptionAt}
            </p>

            <p className="mt-4 font-serif text-6xl text-olive-deep sm:text-7xl">
              {invitation.time}
            </p>

            <div className="mx-auto mt-6 flex max-w-xs items-stretch justify-center gap-4 text-olive-deep">
              <div className="flex flex-1 flex-col items-center justify-center">
                <span className="font-serif text-sm tracking-[0.25em] uppercase">{weekday}</span>
              </div>
              <span className="w-px self-stretch bg-olive/30" />
              <div className="flex flex-col items-center">
                <span className="font-serif text-5xl leading-none">{day}</span>
              </div>
              <span className="w-px self-stretch bg-olive/30" />
              <div className="flex flex-1 flex-col items-center justify-center">
                <span className="font-serif text-sm tracking-[0.25em] uppercase">
                  Tháng {monthNum}
                </span>
              </div>
            </div>
          </div>
        </div>

        {invitation.flags.showMap && (
          <div className="mt-6 overflow-hidden rounded-3xl border border-olive/15 shadow-[0_18px_45px_-24px_rgba(45,54,20,0.3)]">
            <iframe
              src={invitation.mapEmbedUrl}
              className="h-72 w-full border-0 sm:h-96"
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              title="Bản đồ địa điểm tổ chức"
            />
          </div>
        )}
      </div>
    </section>
  );
}
