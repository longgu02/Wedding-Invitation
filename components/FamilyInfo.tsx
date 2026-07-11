import { invitation } from "@/lib/invitationData";

function FamilyCard({
  sideLabel,
  sideLabelEn,
  father,
  mother,
}: {
  sideLabel: string;
  sideLabelEn: string;
  father: string;
  mother: string;
}) {
  const L = invitation.labels;
  return (
    <div className="rounded-3xl bg-wheat px-6 py-10 text-center shadow-[0_18px_45px_-24px_rgba(45,54,20,0.3)] ring-1 ring-olive/5 sm:px-8 sm:py-12">
      <h3 className="font-serif text-3xl text-ink">{sideLabel}</h3>
      <p className="mt-1 font-sans text-[0.65rem] tracking-[0.3em] text-olive uppercase">
        {sideLabelEn}
      </p>

      <div className="mt-6">
        <p className="font-sans text-[0.65rem] tracking-[0.25em] text-ink-soft uppercase">
          {L.fatherLabel}
        </p>
        <p className="mt-1 font-serif text-2xl text-ink">Ông {father}</p>
      </div>

      <div className="mt-5">
        <p className="font-sans text-[0.65rem] tracking-[0.25em] text-ink-soft uppercase">
          {L.motherLabel}
        </p>
        <p className="mt-1 font-serif text-2xl text-ink">Bà {mother}</p>
      </div>
    </div>
  );
}

export default function FamilyInfo() {
  if (!invitation.flags.showFamilyInfo) return null;

  const cards = [
    <FamilyCard
      key="groom"
      sideLabel={invitation.groom.sideLabel}
      sideLabelEn={invitation.groom.sideLabelEn}
      father={invitation.groom.father}
      mother={invitation.groom.mother}
    />,
    <FamilyCard
      key="bride"
      sideLabel={invitation.bride.sideLabel}
      sideLabelEn={invitation.bride.sideLabelEn}
      father={invitation.bride.father}
      mother={invitation.bride.mother}
    />,
  ];

  return (
    <section className="py-14 sm:py-20">
      <h2 className="text-center font-serif text-3xl text-ink sm:text-4xl">
        {invitation.labels.familyTitle}
      </h2>
      <p className="mx-auto mt-3 max-w-md text-center text-sm leading-relaxed text-ink-soft">
        {invitation.labels.familySubtitle}
      </p>

      <div className="mx-auto mt-10 grid max-w-5xl gap-6 md:grid-cols-2 md:gap-8">
        {invitation.groomFirst ? cards : [...cards].reverse()}
      </div>
    </section>
  );
}
