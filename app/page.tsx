"use client";

import { useEffect, useState } from "react";
import Envelope from "@/components/Envelope";
import Hero from "@/components/Hero";
import Countdown from "@/components/Countdown";
import FamilyInfo from "@/components/FamilyInfo";
import CeremonyInfo from "@/components/CeremonyInfo";
import ReceptionInfo from "@/components/ReceptionInfo";
import Gallery from "@/components/Gallery";
import GiftBox from "@/components/GiftBox";
import RsvpForm from "@/components/RsvpForm";
import Guestbook from "@/components/Guestbook";
import MusicToggle from "@/components/MusicToggle";
import ThankYou from "@/components/ThankYou";
import PageDecor from "@/components/PageDecor";
import Reveal from "@/components/Reveal";

export default function Home() {
  const [opened, setOpened] = useState(false);

  // Allow a direct link that skips the envelope cover, e.g. .../#open
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (window.location.hash === "#open") setOpened(true);
  }, []);

  return (
    <main className="relative flex-1 overflow-hidden">
      <Envelope open={opened} onOpen={() => setOpened(true)} />

      {opened && (
        <>
          {/* Landing hero spans the full screen on desktop */}
          <Hero />

          {/* Content area with the floral background running through it */}
          <div className="relative">
            <PageDecor />

            <div className="relative z-10 mx-auto w-full max-w-6xl px-4 pb-12 sm:px-6">
              <Reveal>
                <Countdown />
              </Reveal>
              <Reveal>
                <FamilyInfo />
              </Reveal>
              <Reveal>
                <CeremonyInfo />
              </Reveal>
              <Reveal>
                <ReceptionInfo />
              </Reveal>
              <Reveal>
                <Gallery />
              </Reveal>
              <Reveal>
                <GiftBox />
              </Reveal>
              <Reveal>
                <RsvpForm />
              </Reveal>
              <Reveal>
                <Guestbook />
              </Reveal>
              <Reveal>
                <ThankYou />
              </Reveal>
            </div>
          </div>
        </>
      )}

      <MusicToggle autoplay={opened} />
    </main>
  );
}
