import type { Metadata } from "next";
import { Montserrat, Playfair_Display, Dancing_Script } from "next/font/google";
import "./globals.css";
import { invitation } from "@/lib/invitationData";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin", "vietnamese"],
  weight: ["300", "400", "500", "600"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const dancing = Dancing_Script({
  variable: "--font-dancing",
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700"],
});

const dateVi = new Date(`${invitation.date}T00:00:00+07:00`).toLocaleDateString("vi-VN", {
  weekday: "long",
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
});
const description = `Trân trọng kính mời quý khách đến dự lễ cưới của ${invitation.groom.shortName} & ${invitation.bride.shortName} · ${dateVi} · ${invitation.venueName}, ${invitation.address.replace(/\n/g, " ")}`;

// Facebook/Zalo need an absolute, reachable URL for the preview image. On Vercel we
// auto-detect the deployment domain; set NEXT_PUBLIC_SITE_URL to override (e.g. a
// custom domain like https://thiepcuoi.example.com).
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3000");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: invitation.siteTitle,
  description,
  openGraph: {
    type: "website",
    locale: "vi_VN",
    url: "/",
    siteName: invitation.siteTitle,
    title: invitation.siteTitle,
    description,
    images: [
      {
        url: invitation.ogImage,
        width: 1200,
        height: 630,
        alt: `${invitation.groom.shortName} & ${invitation.bride.shortName}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: invitation.siteTitle,
    description,
    images: [invitation.ogImage],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="vi"
      className={`${montserrat.variable} ${playfair.variable} ${dancing.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-cream text-ink">{children}</body>
    </html>
  );
}
