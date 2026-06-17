// Rebranded for improveitmd.com (Capitol Improvements). Originally shipped as
// "Capitol Family Exteriors" in the Lovable project. Self-contained header for
// the /roofing/slate-roofing landing page. Plain <a> links (full-page nav) to
// real improveitmd.com routes.

const navItems: { label: string; to: string }[] = [
  { label: "Roofing", to: "/roofing" },
  { label: "Siding", to: "/siding" },
  { label: "Windows", to: "/windows" },
  { label: "Gutters", to: "/gutters" },
  { label: "Trim", to: "/exterior-trim" },
  { label: "Deck & Patios", to: "/decks-and-patios" },
  { label: "Doors", to: "/doors" },
];

export function SiteHeader() {
  return (
    <header className="w-full bg-background">
      {/* utility bar */}
      <div className="border-b border-border">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-2 text-sm">
          <a href="/financing" className="text-primary hover:underline">
            <span aria-hidden className="mr-2">★</span>
            <span className="underline underline-offset-2">Offering financing as low as $99/mo</span>
          </a>
          <nav className="hidden items-center gap-7 text-primary md:flex">
            <a href="/about" className="hover:opacity-70">About</a>
            <a href="/testimonials" className="hover:opacity-70">Testimonials</a>
            <a href="/gallery" className="hover:opacity-70">Gallery</a>
            <a href="tel:3017696909" className="font-semibold">301.769.6909</a>
          </nav>
        </div>
      </div>

      {/* main nav */}
      <div className="border-b border-border">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-8 px-6 py-5">
          <a href="/" className="flex items-center gap-3">
            <div
              aria-hidden
              className="flex h-8 w-10 items-center justify-center rounded-sm bg-primary text-primary-foreground"
              style={{ clipPath: "polygon(0 50%, 18% 0, 100% 0, 100% 100%, 18% 100%)" }}
            >
              <span className="font-display text-base font-black leading-none">C</span>
            </div>
            <span className="font-display text-lg font-extrabold leading-tight text-primary">
              Capitol<br />Improvements
            </span>
          </a>

          <nav className="hidden flex-1 items-center justify-end gap-7 text-[15px] font-medium text-primary lg:flex">
            {navItems.map((item) => (
              <a key={item.to} href={item.to} className="hover:opacity-70">
                {item.label}
              </a>
            ))}
          </nav>

          <a href="/quote" className="cta-outline whitespace-nowrap">
            Get Free Quote
          </a>
        </div>
      </div>
    </header>
  );
}
