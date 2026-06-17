// Rebranded for improveitmd.com (Capitol Improvements). Year hardcoded (not
// new Date().getFullYear()) to avoid timezone-dependent hydration mismatches —
// this site has a documented history of date-driven React #418/#423 freezes.

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-primary text-primary-foreground">
      <div className="mx-auto max-w-[1400px] px-6 py-14">
        <div className="grid gap-10 md:grid-cols-4">
          <div>
            <p className="font-display text-2xl font-extrabold leading-tight">
              Capitol<br />Improvements
            </p>
            <p className="mt-4 text-sm opacity-80">
              Family owned. Roofing, siding, windows, and more across MD, DC &amp; VA.
            </p>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-widest opacity-70">Services</p>
            <ul className="mt-4 space-y-2 text-sm">
              <li><a href="/roofing" className="hover:underline">Roofing</a></li>
              <li><a href="/roofing/slate-roofing" className="hover:underline">Slate Roofing</a></li>
              <li><a href="/siding" className="hover:underline">Siding</a></li>
              <li><a href="/windows" className="hover:underline">Windows</a></li>
            </ul>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-widest opacity-70">Company</p>
            <ul className="mt-4 space-y-2 text-sm">
              <li><a href="/about" className="hover:underline">About</a></li>
              <li><a href="/team" className="hover:underline">Our Team</a></li>
              <li><a href="/financing" className="hover:underline">Financing</a></li>
              <li><a href="/warranty" className="hover:underline">Warranty</a></li>
            </ul>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-widest opacity-70">Contact</p>
            <ul className="mt-4 space-y-2 text-sm">
              <li><a href="tel:3017696909" className="hover:underline">301.769.6909</a></li>
              <li><a href="/quote" className="hover:underline">Get a Free Quote</a></li>
            </ul>
          </div>
        </div>
        <p className="mt-12 text-xs opacity-60">
          © 2026 Capitol Improvements. Serving MD, DC &amp; VA.
        </p>
      </div>
    </footer>
  );
}
