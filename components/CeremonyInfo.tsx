import { invitation } from "@/lib/invitationData";

const dateFormatted = new Date(`2026-07-21T00:00:00+07:00`).toLocaleDateString(
  "vi-VN",
  { weekday: "long", day: "2-digit", month: "2-digit", year: "numeric" },
);

export default function CeremonyInfo() {
  return (
    <section className="py-12 sm:py-16">
      <h2 className="mb-8 text-center font-serif text-3xl text-ink sm:text-4xl">
        {invitation.labels.ceremonyHeading}
      </h2>
      <div className="mx-auto max-w-3xl rounded-3xl bg-wheat px-6 py-12 text-center shadow-[0_18px_45px_-24px_rgba(45,54,20,0.3)] ring-1 ring-olive/5 sm:px-12">
        <p className="font-serif text-lg font-medium tracking-[0.3em] text-olive uppercase">
          {invitation.labels.ceremonyInfoTitle}
        </p>
        <p className="mx-auto mt-4 max-w-sm font-serif text-lg italic text-ink/80">
          Lễ thành hôn được cử hành tại tư gia hai bên gia đình
        </p>
        <p className="mt-6 font-serif text-2xl text-ink sm:text-3xl">{dateFormatted}</p>
        <p className="mt-2 text-sm uppercase tracking-widest text-olive-deep">
          (Tức ngày 06/08 năm Bính Ngọ)
        </p>
      </div>
    </section>
  );
}
