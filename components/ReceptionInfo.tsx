import Image from "next/image";
import { invitation } from "@/lib/invitationData";

const dt = new Date(`${invitation.date}T00:00:00+07:00`);
const weekday = dt.toLocaleDateString("vi-VN", { weekday: "long" }); // "Chủ Nhật"
const day = dt.toLocaleDateString("vi-VN", { day: "2-digit" });
const monthNum = dt.toLocaleDateString("vi-VN", { month: "2-digit" });

export default function ReceptionInfo() {
  return (
    <section className="py-12 sm:py-16">
      <h2 className="mb-8 text-center font-serif text-3xl text-ink sm:text-4xl">
        {invitation.labels.receptionHeading}
      </h2>
      <div className="mx-auto max-w-4xl">
        {/* Reception details over a softly blurred venue photo */}
        <div className="relative overflow-hidden rounded-3xl shadow-[0_18px_45px_-24px_rgba(45,54,20,0.3)] ring-1 ring-olive/5">
          {/* Faded, blurred venue photo as background */}
          <div className="absolute inset-0">
            <Image
              src={invitation.venueImage}
              alt=""
              fill
              sizes="(max-width: 768px) 100vw, 768px"
              className="scale-110 object-cover blur-[3px]"
            />
            <div className="absolute inset-0 bg-wheat/85" />
          </div>

          {/* Content */}
          <div className="relative px-6 py-14 text-center sm:px-12">
            <span className="inline-block rounded-full bg-blossom/25 px-4 py-1.5 font-sans text-xs font-medium tracking-[0.25em] text-olive uppercase">
              {invitation.labels.venueBadge}
            </span>

            <p className="mt-6 font-serif text-lg font-medium tracking-[0.35em] text-olive uppercase">
              {invitation.labels.receptionInfoTitle}
            </p>
            <p className="mt-3 font-serif text-xl italic text-ink-soft">
              {invitation.labels.receptionAt}
            </p>

            <p className="mt-3 font-serif text-6xl text-olive-deep sm:text-7xl">
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

            <p className="mt-8 font-serif text-3xl text-olive sm:text-4xl">
              {invitation.venueName}
            </p>
            <p className="mt-1 whitespace-pre-line text-sm text-ink-soft">{invitation.address}</p>
          </div>
        </div>

        {invitation.flags.showMap && (
          <div className="mt-6 overflow-hidden rounded-3xl border border-olive/15 shadow-[0_18px_45px_-24px_rgba(45,54,20,0.3)]">
            {/* <p className="bg-cream-deep py-2 text-center font-serif text-xs tracking-[0.3em] text-olive uppercase">
              {invitation.labels.mapTitle}
            </p> */}
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
