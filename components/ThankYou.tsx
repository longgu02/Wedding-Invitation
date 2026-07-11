import Image from "next/image";
import { invitation } from "@/lib/invitationData";

export default function ThankYou() {
  if (!invitation.flags.showThankYou) return null;

  return (
    <section className="relative flex flex-col items-center px-6 py-16 text-center">
      <Image
        src={invitation.logo}
        alt={`${invitation.groom.shortName} & ${invitation.bride.shortName}`}
        width={666}
        height={375}
        className="pointer-events-none h-auto w-44 select-none sm:w-52"
      />
      <p className="mt-6 max-w-sm font-serif text-xl italic text-ink">
        {invitation.labels.thankYouNote}
      </p>
      <p className="mt-6 font-script text-5xl text-olive-deep">
        {invitation.groom.shortName} &amp; {invitation.bride.shortName}
      </p>
    </section>
  );
}
