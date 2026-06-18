// Source of truth for the /roofing/slate-roofing landing page (ported from the
// Lovable "Slate Roofing Page" project). Copied into
// app/routes/[roofing].[slate-roofing]._index.tsx after every `webstudio build`
// by scripts/inject-landing-pages.cjs.
//
// Framework wiring converted from TanStack Start -> React Router v7 (see the
// community route for the same pattern). Branding rebranded to Capitol
// Improvements in SiteHeader/SiteFooter.
import type { MetaFunction, LinksFunction } from "react-router";
import { Scripts, ScrollRestoration } from "react-router";
import css from "../landing/slate-roofing.css?url";
import indexCss from "../__generated__/index.css?url";
import { SiteHeader, SiteFooter } from "../landing/shared/SiteChrome";

// Re-hosted assets (served from public/landing/slate/).
const slateHero = "https://improveitmd.com/landing/slate/historic-dc-turret.jpg"; // og/twitter image (absolute)
const heroVerticalUrl = "/landing/slate/slate-hero-vertical.webp";
const slateTiles = "/landing/slate/dc-scallop-after.jpg";
const bravaGlamour = "/landing/slate/dc-historic-turret-roof.jpg";

const spotlight = [
  {
    tag: "Before",
    src: "/landing/slate/dc-scallop-before.jpg",
    title: "A century of weather",
    body: "The original turret had lost its scalloped slate to decades of DC weather - the underlying coating was failing and the historic profile was gone.",
  },
  {
    tag: "Color Match",
    src: "/landing/slate/dc-scallop-colormatch.jpg",
    title: "Matching the quarry",
    body: "We sourced and compared natural slate samples until the grain, thickness, and color line matched the surviving original tiles on the property.",
  },
  {
    tag: "Install",
    src: "/landing/slate/dc-scallop-install.jpg",
    title: "Hand-clipped, one at a time",
    body: "Every single tile was hand-clipped on both corners to recreate the scalloped profile. There is no shortcut - it is the only way to do this correctly.",
  },
  {
    tag: "After",
    src: "/landing/slate/dc-scallop-after.jpg",
    title: "Approved & permanent",
    body: "Installed under DOB permit and approved by the DC Historic Preservation Society - a roof the neighborhood will see for the next hundred years.",
  },
];

export const meta: MetaFunction = () => [
  { title: "Slate Roofing in MD, DC & VA | Capitol Improvements" },
  {
    name: "description",
    content:
      "Natural and synthetic slate roof installation across Maryland, DC, and Virginia. Century-long lifespan, family-owned craftsmanship, lifetime warranties.",
  },
  { property: "og:title", content: "Slate Roofing | Capitol Improvements" },
  {
    property: "og:description",
    content:
      "A slate roof for the next hundred years. Family-owned installation across MD, DC & VA.",
  },
  { property: "og:type", content: "website" },
  { property: "og:url", content: "https://improveitmd.com/roofing/slate-roofing" },
  { property: "og:image", content: slateHero },
  { name: "twitter:card", content: "summary_large_image" },
  { name: "twitter:image", content: slateHero },
];

export const links: LinksFunction = () => [
  { rel: "canonical", href: "https://improveitmd.com/roofing/slate-roofing" },
  // Site chrome (header/footer) is styled by the Webstudio stylesheet; load it first.
  { rel: "stylesheet", href: indexCss },
  // Barlow powers the .font-display headings; scoped to this route only.
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Barlow:wght@500;600;700;800;900&display=swap",
  },
  { rel: "stylesheet", href: css },
];

const stats = [
  { k: "100+", v: "Year lifespan", d: "Natural slate routinely outlives the homes it covers. A truly generational investment." },
  { k: "Class A", v: "Fire rating", d: "Stone won't burn. Period. The highest possible fire resistance for residential roofing." },
  { k: "Class 4", v: "Impact rating", d: "Holds up to hail and falling limbs. Modern synthetics offer unmatched durability." },
  { k: "1 of 1", v: "Curb appeal", d: "No other roof reads as historic, intentional, or permanent. Unrivaled neighborhood prestige." },
];

const steps: Array<[string, string]> = [
  ["In-home assessment", "We inspect framing, decking, ventilation, and historical detailing to confirm slate is the right call for your home."],
  ["Material selection", "Choose from natural quarried slate or premium synthetic. We bring samples to your kitchen table."],
  ["Crew & schedule", "Our W-2 slate crew handles your project end to end - no day-labor subs ever."],
  ["Lifetime backing", "Manufacturer-backed lifetime warranties plus our own workmanship guarantee."],
];

function SlateRoofingPage() {
  return (
    <main className="lp-content bg-muted">
      {/* HERO - editorial split with vertical photo */}
      <section className="border-b border-primary bg-muted px-6 pb-24 pt-12 lg:pb-32 lg:pt-20">
        <div className="mx-auto max-w-[1400px]">
          <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-20">
            {/* LEFT - typography */}
            <div className="lg:col-span-7 lg:pt-12">
              <span className="mb-8 block text-xs font-bold uppercase tracking-[0.3em] text-accent">
                Roofing - Slate Specialists
              </span>
              <h1 className="mb-12 font-display text-6xl font-black uppercase leading-[0.8] tracking-tighter text-primary md:text-8xl lg:text-[110px]">
                A roof for<br />
                <span
                  className="text-transparent"
                  style={{ WebkitTextStroke: "2px var(--primary)" }}
                >
                  the next
                </span>
                <br />
                hundred years.
              </h1>
              <div className="max-w-md border-l-4 border-primary pl-8">
                <p className="mb-10 text-xl leading-relaxed text-primary/80">
                  The first step is deciding between{" "}
                  <strong className="text-primary">natural stone</strong> or{" "}
                  <strong className="text-primary">modern synthetic</strong>.
                  We install both across MD, DC & VA - and we&rsquo;ll help you
                  figure out which one belongs on your home.
                </p>
                <nav className="flex flex-wrap gap-x-8 gap-y-4">
                  <a href="#natural" className="border-b-2 border-accent pb-1 text-[11px] font-black uppercase tracking-[0.2em] text-primary hover:text-accent">
                    Natural Slate
                  </a>
                  <a href="#synthetic" className="border-b-2 border-transparent pb-1 text-[11px] font-black uppercase tracking-[0.2em] text-primary/50 hover:border-accent hover:text-primary">
                    Synthetic
                  </a>
                  <a href="#compare" className="border-b-2 border-transparent pb-1 text-[11px] font-black uppercase tracking-[0.2em] text-primary/50 hover:border-accent hover:text-primary">
                    The Comparison
                  </a>
                  <a href="#faq" className="border-b-2 border-transparent pb-1 text-[11px] font-black uppercase tracking-[0.2em] text-primary/50 hover:border-accent hover:text-primary">
                    FAQ
                  </a>
                </nav>
              </div>
            </div>

            {/* RIGHT - 9:16 hero image */}
            <div className="relative lg:col-span-5">
              <div className="relative z-10">
                <div className="aspect-[9/16] w-full overflow-hidden border border-primary shadow-2xl">
                  <img
                    src={heroVerticalUrl}
                    alt="Historic slate turret roof on a Washington DC home - installed by Capitol Improvements"
                    width={900}
                    height={1600}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -left-6 hidden bg-accent p-8 text-accent-foreground md:block">
                  <p className="text-xs font-black uppercase leading-tight tracking-[0.3em]">
                    Certified Master<br />Craftsmen
                  </p>
                </div>
              </div>
              <div className="absolute -right-8 top-12 -z-0 hidden h-full w-full border-2 border-primary/10 lg:block" />
            </div>
          </div>
        </div>
      </section>

      {/* SLATE 101 - two-card choice */}
      <section className="border-b border-primary bg-background px-6 py-24 lg:py-32">
        <div className="mx-auto max-w-[1400px]">
          <div className="mb-16 grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <div>
              <h2 className="mb-4 text-xs font-bold uppercase tracking-[0.4em] text-accent">
                Slate 101
              </h2>
              <h3 className="font-display text-4xl font-black uppercase leading-[0.95] tracking-tighter text-primary md:text-5xl">
                Two roofs, both<br />called &ldquo;slate.&rdquo;
              </h3>
            </div>
            <p className="text-xl font-medium leading-relaxed text-primary/70">
              One is quarried from the earth. The other is engineered for
              performance. Both deliver the iconic look of the Capital&rsquo;s
              finest homes - and we install both.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-px border border-primary/15 bg-primary/15 md:grid-cols-2">
            {/* 01 - Natural */}
            <div id="natural" className="group flex flex-col bg-background p-10 transition-colors hover:bg-muted lg:p-16">
              <div className="mb-8 flex aspect-square w-16 items-center justify-center bg-primary font-display text-2xl font-black text-primary-foreground">
                01
              </div>
              <h4 className="mb-6 font-display text-3xl font-black uppercase tracking-tight text-primary">
                Natural Quarried
              </h4>
              <p className="mb-10 leading-relaxed text-primary/70">
                The gold standard for historic preservation. Authentic
                hand-split stone from the finest quarries. If your home has a
                100-year horizon, this is the only material that satisfies it.
              </p>
              <div className="mb-12">
                <div className="mb-6 aspect-video w-full overflow-hidden border border-primary/10">
                  <img
                    src={slateTiles}
                    alt="Hand-cut natural slate scallops on a historic DC turret"
                    width={400}
                    height={250}
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                </div>
                <ul className="space-y-4">
                  <li className="flex items-center text-[10px] font-bold uppercase tracking-[0.2em] text-primary">
                    <span className="mr-4 h-3 w-3 flex-shrink-0 bg-accent" /> Genuine metamorphic rock
                  </li>
                  <li className="flex items-center text-[10px] font-bold uppercase tracking-[0.2em] text-primary">
                    <span className="mr-4 h-3 w-3 flex-shrink-0 bg-accent" /> 100+ year lifespan
                  </li>
                  <li className="flex items-center text-[10px] font-bold uppercase tracking-[0.2em] text-primary">
                    <span className="mr-4 h-3 w-3 flex-shrink-0 bg-accent" /> Historic-district approved
                  </li>
                </ul>
              </div>
              <a href="/quote" className="mt-auto block bg-primary py-5 text-center text-[10px] font-bold uppercase tracking-[0.2em] text-primary-foreground transition-colors hover:bg-accent">
                Explore Natural Slate
              </a>
            </div>

            {/* 02 - Synthetic */}
            <div id="synthetic" className="group flex flex-col bg-background p-10 transition-colors hover:bg-muted lg:p-16">
              <div className="mb-8 flex aspect-square w-16 items-center justify-center border-2 border-primary font-display text-2xl font-black text-primary">
                02
              </div>
              <h4 className="mb-6 font-display text-3xl font-black uppercase tracking-tight text-primary">
                Synthetic Composite
              </h4>
              <p className="mb-10 leading-relaxed text-primary/70">
                Advanced polymers by Brava &amp; DaVinci. Molded from real
                slate to mimic every cleft and grain, but lightweight enough
                for any structure - usually with no framing upgrade.
              </p>
              <div className="mb-12">
                <div className="mb-6 aspect-video w-full overflow-hidden border border-primary/10">
                  <img
                    src={bravaGlamour}
                    alt="Brava composite slate turret - DCHP-approved synthetic alternative"
                    width={400}
                    height={250}
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                </div>
                <ul className="space-y-4">
                  <li className="flex items-center text-[10px] font-bold uppercase tracking-[0.2em] text-primary">
                    <span className="mr-4 h-3 w-3 flex-shrink-0 border border-primary/40 bg-muted" /> High-performance polymer
                  </li>
                  <li className="flex items-center text-[10px] font-bold uppercase tracking-[0.2em] text-primary">
                    <span className="mr-4 h-3 w-3 flex-shrink-0 border border-primary/40 bg-muted" /> 50-year limited warranty
                  </li>
                  <li className="flex items-center text-[10px] font-bold uppercase tracking-[0.2em] text-primary">
                    <span className="mr-4 h-3 w-3 flex-shrink-0 border border-primary/40 bg-muted" /> ~270 lbs/sq - no reinforcement
                  </li>
                </ul>
              </div>
              <a href="/quote" className="mt-auto block border-2 border-primary py-5 text-center text-[10px] font-bold uppercase tracking-[0.2em] text-primary transition-colors hover:bg-primary hover:text-primary-foreground">
                Explore Synthetic Slate
              </a>
            </div>
          </div>
        </div>
      </section>


      {/* SIDE-BY-SIDE COMPARISON */}
      <section id="compare" className="border-b border-primary bg-background px-6 py-24 lg:py-32">
        <div className="mx-auto max-w-[1400px]">
          <div className="mb-12 grid grid-cols-1 gap-10 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <span className="mb-6 block text-xs font-bold uppercase tracking-[0.2em] text-accent">
                Natural vs. Synthetic
              </span>
              <h2 className="font-display text-4xl font-black uppercase leading-[0.95] tracking-tighter text-primary md:text-5xl">
                Which slate is<br />right for you?
              </h2>
            </div>
            <p className="text-base leading-relaxed text-primary/70 lg:col-span-7 lg:text-lg">
              The honest answer: it depends on your house, your budget, and how
              long you plan to stay. Here's the short version - and then the
              details below.
            </p>
          </div>

          {/* TL;DR quick-pick cards */}
          <div className="mb-10 grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="border-l-4 border-accent bg-muted p-6 md:p-8">
              <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent">
                If your home already has slate
              </div>
              <p className="mt-3 font-display text-xl font-black uppercase tracking-tight text-primary md:text-2xl">
                Match it with natural slate.
              </p>
              <p className="mt-3 text-sm leading-relaxed text-primary/70">
                Authentic, historic-district safe, lasts another century. Best for long-term owners.
              </p>
            </div>
            <div className="border-l-4 border-primary bg-muted p-6 md:p-8">
              <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary/70">
                If it's a new roof or you want to save
              </div>
              <p className="mt-3 font-display text-xl font-black uppercase tracking-tight text-primary md:text-2xl">
                Go with Brava synthetic.
              </p>
              <p className="mt-3 text-sm leading-relaxed text-primary/70">
                30-50% less, no framing upgrade, 50-year warranty, indistinguishable from the street.
              </p>
            </div>
          </div>

          {/* Comparison table */}
          <div className="overflow-hidden border border-primary">
            {/* header row */}
            <div className="grid grid-cols-3 border-b border-primary bg-primary text-primary-foreground">
              <div className="p-4 text-[10px] font-bold uppercase tracking-[0.18em] opacity-70 md:p-6">
                What matters
              </div>
              <div className="border-l border-primary-foreground/20 p-4 md:p-6">
                <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-highlight">01 - Natural</div>
                <div className="mt-1 font-display text-lg font-black uppercase tracking-tight md:text-xl">Quarried Slate</div>
              </div>
              <div className="border-l border-primary-foreground/20 p-4 md:p-6">
                <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-highlight">02 - Synthetic</div>
                <div className="mt-1 font-display text-lg font-black uppercase tracking-tight md:text-xl">Brava Composite</div>
              </div>
            </div>

            {[
              { label: "Lifespan", a: "100+ years", b: "50-year warranty" },
              { label: "Weight per square", a: "800 - 1,500 lbs", b: "~270 lbs" },
              { label: "Installed cost", a: "$40k - $80k+", b: "30 - 50% less" },
              { label: "Framing reinforcement", a: "Often needed", b: "Almost never" },
              { label: "Fire & impact", a: "Class A · cracks on direct hits", b: "Class A · Class 4 impact" },
              { label: "Historic approval", a: "Always accepted", b: "Often approved, DCHP-friendly" },
              { label: "Best for", a: "Authentic restorations, 30+ year owners.", b: "Slate look, lighter, lower cost." },
            ].map((row, i) => (
              <div
                key={row.label}
                className={`grid grid-cols-3 ${i % 2 === 0 ? "bg-muted" : "bg-background"}`}
              >
                <div className="border-r border-primary/15 p-4 text-[11px] font-bold uppercase tracking-[0.14em] text-primary/60 md:p-6 md:text-xs">
                  {row.label}
                </div>
                <div className="border-r border-primary/15 p-4 text-sm leading-relaxed text-primary md:p-6">
                  {row.a}
                </div>
                <div className="p-4 text-sm leading-relaxed text-primary md:p-6">
                  {row.b}
                </div>
              </div>
            ))}
          </div>


          <div className="mt-10 flex flex-wrap items-center gap-6">
            <a href="/quote" className="cta-solid">Get a Free Side-by-Side Quote</a>
            <a href="tel:3017696909" className="font-display text-lg font-black tracking-tight text-primary hover:opacity-80">
              or call 301.769.6909
            </a>
          </div>
        </div>
      </section>

      {/* SPECS / WHY (navy) */}
      <section className="relative overflow-hidden bg-primary px-6 py-24 text-primary-foreground lg:py-40">
        <div className="pointer-events-none absolute right-0 top-0 select-none p-10">
          <div className="font-display text-[14vw] font-black leading-none text-primary-foreground/5">
            SPECS
          </div>
        </div>
        <div className="relative z-10 mx-auto max-w-[1400px]">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <h2 className="font-display text-4xl font-black uppercase leading-[0.95] tracking-tighter md:text-5xl lg:text-6xl">
                Why homeowners <br />
                <span className="text-highlight">choose</span> slate.
              </h2>
            </div>
            <div className="grid grid-cols-1 gap-px border border-primary-foreground/20 bg-primary-foreground/20 md:grid-cols-2 lg:col-span-7">
              {stats.map((s) => (
                <div key={s.v} className="bg-primary p-10">
                  <div className="font-display text-5xl font-black">{s.k}</div>
                  <div className="mb-3 mt-4 text-xs font-bold uppercase tracking-widest text-highlight">
                    {s.v}
                  </div>
                  <p className="text-sm text-primary-foreground/60">{s.d}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section id="process" className="border-b border-primary bg-muted px-6 py-24">
        <div className="mx-auto max-w-[1400px]">
          <div className="flex flex-col gap-20 lg:flex-row">
            <div className="lg:w-1/3">
              <span className="mb-6 inline-block bg-primary px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-primary-foreground">
                Our Process
              </span>
              <h2 className="font-display text-5xl font-black uppercase leading-none tracking-tighter text-primary">
                Measured.<br />Methodical.<br />Yours.
              </h2>
              <p className="mt-8 text-primary/70">
                A slate roof is a generational investment. We treat it that way -
                from the first walk-through to the day we hand you the warranty.
              </p>
            </div>
            <ol className="space-y-12 lg:w-2/3">
              {steps.map(([title, body], i) => (
                <li key={title} className="flex gap-8 border-t border-primary/10 pt-8">
                  <span className="font-display text-2xl font-black text-primary">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="mb-2 font-display text-xl font-black uppercase text-primary">
                      {title}
                    </h3>
                    <p className="text-primary/70">{body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* CUSTOMER SPOTLIGHT - DC scalloped slate */}
      <section className="border-t border-primary bg-background px-6 py-24 lg:py-32">
        <div className="mx-auto max-w-[1400px]">
          <div className="grid grid-cols-1 items-end gap-10 border-b border-primary pb-12 lg:grid-cols-12">
            <div className="lg:col-span-3">
              <span className="mb-4 block text-xs font-bold uppercase tracking-[0.2em] text-accent">
                Customer Spotlight
              </span>
              <p className="font-display text-xs font-bold uppercase tracking-widest text-primary/60">
                Washington, DC · Historic District
              </p>
            </div>
            <h2 className="font-display text-4xl font-black uppercase leading-[0.9] tracking-tighter text-primary md:text-6xl lg:col-span-9">
              Replicating a scalloped<br />slate turret, by hand.
            </h2>
          </div>

          <p className="mt-12 max-w-3xl text-lg leading-relaxed text-primary/80">
            A homeowner in a DC historic district needed the scalloped slate
            profile on their turret restored. The only way to faithfully
            replicate the original look is to{" "}
            <strong className="text-primary">hand-clip every corner of every tile</strong>{" "}
            before it goes on the roof - a tedious process that also required
            sign-off from <strong className="text-primary">DOB</strong> and the{" "}
            <strong className="text-primary">DC Historic Preservation Society</strong>.
          </p>

          <ol className="mt-16 grid grid-cols-1 gap-px border border-primary/15 bg-primary/15 md:grid-cols-2">
            {spotlight.map((step, i) => (
              <li key={step.tag} className="flex flex-col bg-background">
                <div className="relative aspect-[4/3] w-full overflow-hidden">
                  <img
                    src={step.src}
                    alt={`${step.tag} - ${step.title} - scalloped slate turret restoration in Washington DC by Capitol Improvements`}
                    width={1200}
                    height={900}
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute left-0 top-0 bg-primary px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-primary-foreground">
                    {String(i + 1).padStart(2, "0")} - {step.tag}
                  </div>
                </div>
                <div className="flex-1 p-8 lg:p-10">
                  <h3 className="font-display text-2xl font-black uppercase leading-tight tracking-tight text-primary">
                    {step.title}
                  </h3>
                  <p className="mt-4 text-base leading-relaxed text-primary/70">
                    {step.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>

          <div className="mt-12 flex flex-col items-start justify-between gap-6 border-t border-primary/10 pt-10 lg:flex-row lg:items-center">
            <p className="max-w-2xl text-xs uppercase tracking-widest text-primary/60">
              Permitted under DOB · Approved by DC Historic Preservation Society
            </p>
            <a href="/quote" className="cta-solid">Start Your Project</a>
          </div>
        </div>
      </section>



      {/* FAQ - ALTERNATIVES TO SLATE */}
      <section id="faq" className="border-t border-primary bg-muted px-6 py-24 lg:py-32">
        <div className="mx-auto max-w-[1400px]">
          {/* Brava glamour - field photo treatment */}
          <div className="mb-20 grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <figure className="-rotate-1 bg-[#f4f1ea] p-4 pb-14 shadow-2xl shadow-black/30 transition-transform hover:rotate-0">
                <div className="relative aspect-[4/5] w-full overflow-hidden bg-black lg:aspect-[3/4]">
                  <img
                    src={bravaGlamour}
                    alt="Brava composite slate turret roofs on a historic DC rowhouse - an approved synthetic alternative to natural slate"
                    width={1200}
                    height={1500}
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute right-3 top-3 border border-highlight/70 bg-black/40 px-2 py-1 font-mono text-[9px] font-bold uppercase tracking-[0.25em] text-highlight backdrop-blur">
                    Project File · Brava
                  </div>
                </div>
                <figcaption className="mt-4 flex items-baseline justify-between gap-4 px-1">
                  <span className="font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-[#1a1d24]/70">
                    Composite Slate Turret · Installed
                  </span>
                  <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#1a1d24]/40">
                    Washington DC
                  </span>
                </figcaption>
              </figure>
            </div>
            <div className="flex flex-col justify-end lg:col-span-5">
              <span className="mb-6 block text-xs font-bold uppercase tracking-[0.2em] text-accent">
                Brava composite slate
              </span>
              <h2 className="font-display text-3xl font-black uppercase leading-[0.95] tracking-tighter text-primary md:text-4xl lg:text-5xl">
                An approved alternative to true slate.
              </h2>
              <p className="mt-8 text-lg leading-relaxed text-primary/80">
                The turrets above are Brava composite - not quarried stone.
                From the street, the chisel marks, color variation, and shadow
                lines are indistinguishable from natural slate. Brava is
                accepted by DC Historic Preservation on the right projects,
                weighs a fraction of real slate, and carries a 50-year
                manufacturer warranty.
              </p>
              <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3 text-xs font-bold uppercase tracking-[0.18em] text-primary/70">
                <span>DCHP-friendly</span>
                <span>Class A fire</span>
                <span>Class 4 impact</span>
                <span>~270 lbs / square</span>
              </div>
            </div>
          </div>


          <div className="grid grid-cols-1 gap-16 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <span className="mb-6 block text-xs font-bold uppercase tracking-[0.2em] text-accent">
                FAQ
              </span>
              <h2 className="font-display text-4xl font-black uppercase leading-[0.95] tracking-tighter text-primary md:text-5xl">
                Slate, plainly<br />explained.
              </h2>
              <p className="mt-8 max-w-sm text-base leading-relaxed text-primary/60">
                The questions homeowners actually ask us - about natural slate, Brava, DaVinci, and everything in between.
              </p>
            </div>
            <div className="space-y-0 lg:col-span-8">
              {[
                {
                  q: "How do I know if I have natural slate or synthetic slate?",
                  a: "From the ground, they look nearly identical. Natural slate is heavier, has subtle stone variation, and on older DC/MD/VA homes (pre-1940s) it's almost always real stone. Synthetic slate is uniform in thickness, lighter, and shows up on newer builds or restorations. The fastest way to know: send us a clear photo of your roof and we'll identify it for free within 24 hours.",
                },
                {
                  q: "What is natural (quarried) slate?",
                  a: "Natural slate is real stone - split by hand from quarries in Vermont, Pennsylvania, Virginia, and overseas. Each tile is unique in color and texture. Properly installed, a natural slate roof routinely lasts 100 years or more, which is why so many historic DC rowhouses still have their original roofs.",
                },
                {
                  q: "What is Brava composite slate?",
                  a: "Brava is a premium synthetic roofing tile molded from real slate to capture the chisel marks, color variation, and irregular edges of natural stone. It's made from compressed recycled materials and advanced polymers, carries a Class A fire rating and Class 4 impact resistance, and weighs roughly a fifth of real slate.",
                },
                {
                  q: "What's the difference between Brava, DaVinci, and CertainTeed synthetic slate?",
                  a: "They're all composite/polymer slate brands that compete in the same premium category. Brava and DaVinci are the most slate-realistic in person; CertainTeed (Symphony) is more cost-driven. We install Brava as our default because we've found its color blends and shadow lines hold up best in DC light, but we'll spec whichever brand fits your home and budget.",
                },
                {
                  q: "How does Brava compare to real slate on lifespan?",
                  a: "Natural slate can last 100+ years. Brava carries a 50-year limited manufacturer warranty, which is on par with most premium asphalt and metal roofs. For homeowners planning to stay 20-40 years, that difference is often academic.",
                },
                {
                  q: "Is synthetic slate really lighter than natural stone?",
                  a: "Yes - dramatically. Natural slate weighs 800-1,500 lbs per square (a 10x10 ft area). Brava weighs about 270 lbs per square. That means most existing roof decks can handle synthetic slate without structural reinforcement, saving thousands in framing upgrades.",
                },
                {
                  q: "Will a Brava roof look fake from the street?",
                  a: "Not anymore. Modern composites use multi-tonal blending, varied tile thicknesses, and staggered profiles that mimic the irregular shadow lines of real slate. From the sidewalk, even slate professionals often can't tell the difference. We always bring physical samples to the consultation so you can judge for yourself.",
                },
                {
                  q: "Can I use synthetic slate in a historic district?",
                  a: "Often yes. DC Historic Preservation Society and most MD/VA boards now accept Brava and DaVinci on the right projects - especially when the original profile is faithfully matched. We've handled the approval paperwork on dozens of historic homes and we manage that process for you as part of the project.",
                },
                {
                  q: "Is synthetic slate cheaper than natural slate?",
                  a: "Yes, meaningfully. A full natural slate roof on a typical DC rowhouse runs $40,000-$80,000+ installed. The same profile in Brava composite typically lands 30-50% lower, mostly because of lighter weight (no framing upgrades), faster install, and no quarry sourcing.",
                },
                {
                  q: "Can you repair my existing natural slate roof instead of replacing it?",
                  a: "Almost always. A well-built slate roof rarely needs full replacement - most issues are flashing, ridge, or individual tile failures. We stock matching tiles from the major historic quarries and can do targeted repairs that extend a slate roof another 20-50 years.",
                },
                {
                  q: "Do you install both natural and synthetic slate?",
                  a: "Yes. We're certified installers for quarried slate, Brava, and DaVinci composite systems. We don't push one over the other - we assess your home's framing, your timeline, your budget, and your neighborhood's rules, then recommend the right material honestly.",
                },
              ].map((item, i) => (
                <details
                  key={item.q}
                  className="group border-b border-primary/10 open:border-primary/30"
                >
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-6 transition-colors hover:text-accent">
                    <span className="flex items-baseline gap-5">
                      <span className="font-display text-xs font-bold text-primary/30">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="font-sans text-base font-semibold leading-snug text-primary md:text-lg">
                        {item.q}
                      </span>
                    </span>
                    <span className="mt-1 text-base font-bold text-primary/40 transition-transform group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className="pb-6 pl-11 text-[15px] leading-relaxed text-primary/70 md:pl-12">
                    {item.a}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* WARRANTY / CTA */}
      <section id="warranty" className="bg-muted px-6 py-24">
        <div className="relative mx-auto max-w-[1400px] overflow-hidden border-2 border-primary p-10 md:p-16 lg:p-20">
          <div className="relative z-10 flex flex-col items-start justify-between gap-12 lg:flex-row lg:items-center">
            <div>
              <span className="mb-4 block text-xs font-bold uppercase tracking-widest text-accent">
                Warranty &amp; Financing
              </span>
              <h2 className="mb-6 font-display text-5xl font-black uppercase leading-[0.9] tracking-tighter text-primary md:text-7xl">
                Built right.<br />Backed for life.
              </h2>
              <p className="max-w-xl text-lg text-primary/70">
                Every slate roof we install is backed by lifetime manufacturer
                warranties and our own workmanship guarantee. Financing as low as
                $99/month - no payments until the project is complete.
              </p>
            </div>
            <div className="flex flex-col items-start gap-6 lg:items-end">
              <a href="/quote" className="cta-solid px-12 py-6 text-base">
                Get Free Quote
              </a>
              <a
                href="tel:3017696909"
                className="font-display text-3xl font-black tracking-tighter text-primary hover:opacity-80"
              >
                301.769.6909
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default function SlateRoofingRoute() {
  return (
    <body className="w-body">
      <SiteHeader />
      <SlateRoofingPage />
      <SiteFooter />
      <ScrollRestoration />
      <Scripts />
    </body>
  );
}
