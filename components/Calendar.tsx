import { invitation } from "@/lib/invitationData";

const [year, month, day] = invitation.date.split("-").map(Number);

const daysInMonth = new Date(year, month, 0).getDate();
const firstDowSun = new Date(year, month - 1, 1).getDay(); // 0 = Sunday
const firstMonIndex = (firstDowSun + 6) % 7; // 0 = Monday
const weekdays = ["T2", "T3", "T4", "T5", "T6", "T7", "CN"];

const cells: Array<number | null> = [
  ...Array.from({ length: firstMonIndex }, () => null),
  ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
];

const pad = (n: number) => String(n).padStart(2, "0");
const [hh, mm] = invitation.time.split(":").map(Number);
const start = `${year}${pad(month)}${pad(day)}T${pad(hh)}${pad(mm)}00`;
const end = `${year}${pad(month)}${pad(day)}T${pad((hh + 2) % 24)}${pad(mm)}00`;
const calendarUrl =
  "https://calendar.google.com/calendar/render?action=TEMPLATE" +
  `&text=${encodeURIComponent(`Lễ cưới ${invitation.groom.shortName} & ${invitation.bride.shortName}`)}` +
  `&dates=${start}/${end}` +
  `&ctz=${encodeURIComponent(invitation.timezone)}` +
  `&location=${encodeURIComponent(`${invitation.venueName}, ${invitation.address.replace(/\n/g, " ")}`)}`;

export default function Calendar() {
  return (
    <div className="mx-auto mt-10 max-w-sm rounded-3xl bg-wheat px-6 py-8 shadow-[0_18px_45px_-24px_rgba(45,54,20,0.3)] ring-1 ring-olive/5">
      <p className="border-b border-olive/15 pb-3 text-center font-serif text-xl text-olive">
        Tháng {month} / {year}
      </p>

      <div className="mt-4 grid grid-cols-7 gap-y-2 text-center">
        {weekdays.map((w) => (
          <span
            key={w}
            className="text-[0.62rem] font-medium tracking-wide text-ink-soft uppercase"
          >
            {w}
          </span>
        ))}
        {cells.map((c, i) => (
          <div key={i} className="flex h-9 items-center justify-center">
            {c === null ? null : c === day ? (
              <span className="relative flex h-9 w-9 items-center justify-center">
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="absolute inset-0 h-full w-full text-olive-deep"
                >
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
                <span className="relative -translate-y-px text-xs font-semibold text-cream">
                  {c}
                </span>
              </span>
            ) : (
              <span className="font-serif text-ink/85">{c}</span>
            )}
          </div>
        ))}
      </div>

      <div className="mt-7 flex flex-col items-center gap-4">
        <a
          href={calendarUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 border-b border-olive/40 pb-0.5 font-serif text-lg text-olive transition-colors hover:text-olive-deep"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="4" width="18" height="18" rx="2" />
            <path d="M16 2v4M8 2v4M3 10h18" />
          </svg>
          {invitation.labels.addToCalendar}
        </a>

        <a
          href="#rsvp"
          className="btn-olive rounded-full px-10 py-3 font-sans text-base font-medium tracking-wide text-cream"
        >
          {invitation.labels.rsvpButton}
        </a>
      </div>
    </div>
  );
}
