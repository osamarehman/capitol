// Source of truth for the /community landing page (ported from the Lovable
// "CFE Community Connect" project). Copied into app/routes/[community]._index.tsx
// after every `webstudio build` by scripts/inject-landing-pages.cjs.
//
// Framework wiring converted from TanStack Start -> React Router v7:
//   - createFileRoute().head() -> `meta` + `links` exports
//   - asset .asset.json imports -> local /landing/* URLs (re-hosted from public/)
//   - renders its own <body> + <ScrollRestoration/> + <Scripts/> because the
//     Webstudio root.tsx only renders <html><head/><Outlet/></html>.
//   - header/footer are the REAL improveitmd.com site chrome (SiteHeader/SiteFooter
//     from ../landing/shared/SiteChrome, auto-extracted from the generated site),
//     styled by the Webstudio stylesheet (../__generated__/index.css).
import type { MetaFunction, LinksFunction } from "react-router";
import { Scripts, ScrollRestoration } from "react-router";
import { Plus, ArrowRight, Users, Home, Star } from "lucide-react";
import css from "../landing/community.css?url";
import indexCss from "../__generated__/index.css?url";
import { SiteHeader, SiteFooter } from "../landing/shared/SiteChrome";

const arundelPhoto = { url: "/landing/community/arundel-wildcats.jpg" };
const bowieVideo = { url: "/landing/community/bowie-bulldogs.mp4" };
const teamPhoto = { url: "/landing/community/capitol-family-team.jpg" };

export const meta: MetaFunction = () => [
  { title: "Community Partners & School Sponsorships | Capitol Improvements" },
  {
    name: "description",
    content:
      "Capitol Improvements is a proud sponsor of local high school athletics and community organizations across Maryland, DC, and Northern Virginia.",
  },
  { property: "og:title", content: "Community Partners & School Sponsorships | Capitol Improvements" },
  {
    property: "og:description",
    content:
      "Capitol Improvements is a proud sponsor of local high school athletics and community organizations across Maryland, DC, and Northern Virginia.",
  },
  { property: "og:type", content: "website" },
  { property: "og:url", content: "https://improveitmd.com/community" },
  {
    "script:ld+json": {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "Capitol Improvements LLC",
      alternateName: "Capitol Improvements LLC",
      url: "https://improveitmd.com",
      telephone: "+1-301-769-6909",
      address: {
        "@type": "PostalAddress",
        streetAddress: "12606 Hillmeade Station Dr",
        addressLocality: "Bowie",
        addressRegion: "MD",
        postalCode: "20720",
        addressCountry: "US",
      },
      areaServed: ["MD", "DC", "VA"],
      identifier: [
        { "@type": "PropertyValue", name: "MHIC", value: "130628" },
        { "@type": "PropertyValue", name: "DC License", value: "410519000037" },
        { "@type": "PropertyValue", name: "VA License", value: "2705191231" },
      ],
    },
  },
];

export const links: LinksFunction = () => [
  { rel: "canonical", href: "https://improveitmd.com/community" },
  // Site chrome (header/footer) is styled by the Webstudio stylesheet; load it
  // first, then the scoped Tailwind for the page body.
  { rel: "stylesheet", href: indexCss },
  { rel: "stylesheet", href: css },
];

const NAVY = "#00192E"; // --midnight-blue: the site primary accent
const RED = "#D20000"; // --firebrick: used sparingly as a highlight
const GRAY50 = "#f7f8f9";
const GRAY100 = "#e8ebed";
const GRAY600 = "#5b6770";

const fontFamily = '"Futura LT", Avenir, "Century Gothic", system-ui, sans-serif';

function Eyebrow({ children, tone = "red" }: { children: React.ReactNode; tone?: "red" | "coral" }) {
  return (
    <div
      className="text-[12px] font-bold uppercase tracking-[0.22em]"
      style={{ color: tone === "red" ? RED : "#FFB1A8" }}
    >
      {children}
    </div>
  );
}

function LiveSchoolCard() {
  return (
    <article
      className="overflow-hidden rounded-sm bg-white border flex flex-col"
      style={{ borderColor: GRAY100 }}
    >
      {/* Photo */}
      <div
        className="relative aspect-[4/3] w-full overflow-hidden bg-[#00192E]"
        title="capitol-family-exteriors-arundel-wildcats-sponsor-gambrills-md.jpg"
      >
        <img
          src={arundelPhoto.url}
          alt="Capitol Improvements team beside sponsor sign at Arundel High School, Gambrills MD"
          className="h-full w-full object-cover"
          loading="lazy"
        />
      </div>

      <div className="p-7 flex flex-col gap-3 flex-1">
        <Eyebrow>Sponsored 2026</Eyebrow>
        <h3 className="text-[22px] font-black leading-tight" style={{ color: NAVY }}>
          Arundel High School Wildcats
        </h3>
        <div className="text-sm" style={{ color: GRAY600 }}>
          📍 Gambrills, MD · Anne Arundel County
        </div>
        <p className="text-[15px] leading-relaxed" style={{ color: GRAY600 }}>
          Proud sponsor of the Arundel Athletic Boosters and the entire Wildcats program.
          Family-owned exterior remodeler serving Gambrills, Crofton, and Anne Arundel County.
        </p>

        <div className="mt-auto pt-5 border-t flex flex-col gap-2.5" style={{ borderColor: GRAY100 }}>
          {[
            { href: "https://improveitmd.com/services/gambrills-maryland-roofing-company-near-you", text: "Gambrills Roofing Company" },
            { href: "https://improveitmd.com/services/gambrills-maryland-siding-contractors-near-you", text: "Gambrills Siding Contractors" },
            { href: "https://www.arundelathletics.com/news/7a369582-23c6-471b-afe8-2dc27ad91f41", text: "Read the Sponsor Announcement" },
          ].map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="group inline-flex items-center justify-between gap-3 text-[14px] font-semibold hover:opacity-70"
              style={{ color: NAVY }}
            >
              <span>{l.text}</span>
              <ArrowRight size={16} style={{ color: RED }} className="transition-transform group-hover:translate-x-0.5" />
            </a>
          ))}
        </div>
      </div>
    </article>
  );
}

function BowieSchoolCard() {
  return (
    <article
      className="overflow-hidden rounded-sm bg-white border flex flex-col"
      style={{ borderColor: GRAY100 }}
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#00192E]">
        <video
          src={bowieVideo.url}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          className="h-full w-full object-cover"
          aria-label="Capitol Improvements sponsor sign at Bowie High School tennis courts"
        />
      </div>

      <div className="p-7 flex flex-col gap-3 flex-1">
        <Eyebrow>Sponsored 2026 · Our Hometown</Eyebrow>
        <h3 className="text-[22px] font-black leading-tight" style={{ color: NAVY }}>
          Bowie High School Bulldogs 🐾
        </h3>
        <div className="text-sm" style={{ color: GRAY600 }}>
          📍 Bowie, MD · Prince George's County
        </div>
        <p className="text-[15px] leading-relaxed" style={{ color: GRAY600 }}>
          Pat Jewell started roofing on these streets in the 1980s. Today Pat, Austin, and Lance
          still answer the phones from our headquarters on Hillmeade Station Drive - right here in
          Bowie. This isn't just another sponsorship. This is the school in our own neighborhood.
        </p>

        <div className="mt-auto pt-5 border-t flex flex-col gap-2.5" style={{ borderColor: GRAY100 }}>
          {[
            { href: "https://improveitmd.com/services/bowie-maryland-roofing-company-near-you", text: "Bowie Roofing Company" },
            { href: "https://improveitmd.com/services/bowie-maryland-siding-contractors-near-you", text: "Bowie Siding Contractors" },
            { href: "tel:3017696909", text: "Call the Home Team - 301.769.6909" },
          ].map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="group inline-flex items-center justify-between gap-3 text-[14px] font-semibold hover:opacity-70"
              style={{ color: NAVY }}
            >
              <span>{l.text}</span>
              <ArrowRight size={16} style={{ color: RED }} className="transition-transform group-hover:translate-x-0.5" />
            </a>
          ))}
        </div>
      </div>
    </article>
  );
}

function PlaceholderCard() {
  return (
    <article
      className="overflow-hidden rounded-sm border-2 border-dashed flex flex-col items-center justify-center text-center p-10 min-h-[520px]"
      style={{ borderColor: "#d1d5db", background: GRAY50 }}
      aria-hidden
    >
      <div
        className="grid h-16 w-16 place-items-center rounded-full bg-white border-2 border-dashed"
        style={{ borderColor: "#d1d5db" }}
      >
        <Plus size={28} style={{ color: GRAY600 }} strokeWidth={2.5} />
      </div>
      <h3 className="mt-6 text-[20px] font-black" style={{ color: GRAY600 }}>
        Next School Coming Soon
      </h3>
      <p className="mt-2 text-sm" style={{ color: GRAY600 }}>
        Reserved for an upcoming sponsorship.
      </p>
    </article>
  );
}

function CommunityPage() {
  const stats = [
    { value: "30+", label: "Years in the Community" },
    { value: "7,240+", label: "Homes Served" },
    { value: "100%", label: "Family Owned - Never Private Equity" },
  ];

  const whyCols = [
    {
      icon: <Users size={22} style={{ color: NAVY }} />,
      title: "Local for 30+ Years",
      body:
        "Three generations of the Jewell family have served homeowners across the DMV. We answer the phones ourselves.",
    },
    {
      icon: <Home size={22} style={{ color: NAVY }} />,
      title: "Real Community Ties",
      body:
        "Our team has kids in these schools. We're at the games, at the fundraisers, and in the same parent group chats.",
    },
    {
      icon: <Star size={22} style={{ color: NAVY }} />,
      title: "5.0 Stars · Zero BBB Complaints",
      body:
        "7,240+ homes served and 445+ five-star reviews. The relationship doesn't end at the closing handshake.",
    },
  ];

  return (
    <main className="lp-content min-h-screen bg-white" style={{ fontFamily, color: NAVY }}>
      {/* HERO */}
      <section className="relative overflow-hidden" style={{ background: NAVY }}>
        <div className="absolute inset-0">
          <img
            src={teamPhoto.url}
            alt="The Capitol Improvements family-owned team standing with company trucks at Bowie, MD headquarters"
            className="h-full w-full object-cover"
            loading="eager"
          />
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(180deg, rgba(0,25,46,0.55) 0%, rgba(0,25,46,0.70) 55%, rgba(0,25,46,0.95) 100%)`,
            }}
          />
        </div>

        <div className="relative mx-auto max-w-[1240px] px-6 pt-28 pb-20 md:pt-40 md:pb-28">
          <div className="max-w-3xl">
            <span
              className="inline-block rounded-full border px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.22em]"
              style={{ borderColor: "#ffffff", color: "#ffffff" }}
            >
              Family Owned. Family Operated.
            </span>
            <h1 className="mt-8 font-black tracking-tight leading-[0.95] text-white text-[48px] sm:text-[68px] md:text-[88px] lg:text-[104px]">
              The neighborhoods
              <br />
              that built us.
            </h1>
            <p className="mt-8 max-w-2xl text-[18px] leading-relaxed text-white/85">
              For 30+ years, the Jewell family has answered the phones, climbed the
              ladders, and lived in the same neighborhoods we serve. We're not private equity -
              we're your neighbors. Reinvesting in the schools, teams, and community
              organizations that built us is our commitment, not a marketing line.
            </p>
          </div>

          <div className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl">
            {stats.map((s) => (
              <div key={s.label} className="border-l-2 pl-5" style={{ borderColor: RED }}>
                <div className="text-[44px] md:text-[56px] font-black leading-none text-white">
                  {s.value}
                </div>
                <div className="mt-3 text-[11px] font-bold uppercase tracking-[0.2em] text-white/70">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SCHOOLS GRID */}
      <section className="px-6 py-24 md:py-32 bg-white">
        <div className="mx-auto max-w-[1240px]">
          <div className="max-w-3xl">
            <Eyebrow>Our Community Commitment</Eyebrow>
            <h2
              className="mt-5 font-black tracking-tight leading-[1.02] text-[36px] md:text-[56px]"
              style={{ color: NAVY }}
            >
              Reinvesting in the Community That Built Us.
            </h2>
            <p className="mt-6 text-[17px] leading-relaxed" style={{ color: GRAY600 }}>
              For 30+ years we've been part of these neighborhoods - sponsoring schools, sporting
              events, and local organizations across Maryland, DC, and Northern Virginia. We're
              family owned, not private equity. Giving back isn't a marketing line for us; it's
              the reason we're still here.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <LiveSchoolCard />
            <BowieSchoolCard />
            <PlaceholderCard />
            <PlaceholderCard />
            <PlaceholderCard />
            <PlaceholderCard />
          </div>
        </div>
      </section>

      {/* WHY WE GIVE BACK */}
      <section className="px-6 py-24 md:py-32" style={{ background: NAVY }}>
        <div className="mx-auto max-w-[1240px]">
          <div className="max-w-3xl">
            <Eyebrow tone="coral">Why We Sponsor</Eyebrow>
            <h2 className="mt-5 font-black tracking-tight leading-[1.02] text-white text-[36px] md:text-[56px]">
              Because These Neighborhoods Built Us.
            </h2>
            <p className="mt-6 text-[17px] leading-relaxed text-white/75">
              Pat Jewell started this company in Bowie in the 1980s. Today his sons Austin and
              Lance run it alongside him. We've never been a faceless chain - and we never will be.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            {whyCols.map((c) => (
              <div key={c.title} className="rounded-sm bg-white/[0.04] border border-white/10 p-8">
                <div className="grid h-12 w-12 place-items-center rounded-full bg-white">
                  {c.icon}
                </div>
                <h3 className="mt-6 text-[20px] font-black text-white">{c.title}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-white/75">{c.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-24 md:py-32" style={{ background: GRAY50 }}>
        <div className="mx-auto max-w-[820px] text-center">
          <Eyebrow>Sponsor Inquiry</Eyebrow>
          <h2
            className="mt-5 font-black tracking-tight leading-[1.02] text-[34px] md:text-[52px]"
            style={{ color: NAVY }}
          >
            Want Capitol Improvements to Sponsor Your School?
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-[17px] leading-relaxed" style={{ color: GRAY600 }}>
            We support local high schools, youth sports leagues, and community organizations
            throughout MD, DC, and Northern Virginia. Reach out and let's talk.
          </p>
          <div className="mt-10 flex flex-col items-center gap-5">
            <a
              href="https://improveitmd.com/contact"
              className="inline-flex items-center rounded-sm px-8 py-4 text-[14px] font-bold uppercase tracking-[0.15em] text-white transition-opacity hover:opacity-90"
              style={{ background: NAVY }}
            >
              Contact Us About Sponsorship
            </a>
            <div className="text-[15px] font-bold" style={{ color: NAVY }}>
              Or call <a href="tel:3017696909" className="underline-offset-4 hover:underline">301.769.6909</a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default function CommunityRoute() {
  return (
    <body className="w-body">
      <SiteHeader />
      <CommunityPage />
      <SiteFooter />
      <ScrollRestoration />
      <Scripts />
    </body>
  );
}
