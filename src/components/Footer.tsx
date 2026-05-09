import Link from "next/link";

const nav = [
  { href: "/services", label: "About Us" },
  { href: "/projects", label: "Projects" },
  { href: "/careers", label: "Careers" },
  { href: "/contact", label: "Contact" },
];

export function Footer() {
  return (
    <footer className="border-t border-d8-border bg-d8-bg">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="flex flex-col gap-12 md:flex-row md:items-start md:justify-between">
          {/* Brand block */}
          <div className="flex flex-col gap-3">
            <p className="font-heading text-2xl font-semibold tracking-tight text-d8-text-primary">D8</p>
            <p className="max-w-xs font-body text-sm leading-relaxed text-d8-text-secondary">
              R&D, hardware, software, and AI.
            </p>
          </div>

          {/* Nav links */}
          <ul className="flex flex-wrap gap-x-10 gap-y-3">
            {nav.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="font-body text-sm text-d8-text-secondary transition-colors hover:text-d8-text-primary"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-12 border-t border-d8-border pt-6 flex flex-col gap-1 md:flex-row md:items-center md:justify-between">
          <p className="font-body text-xs text-d8-text-secondary">
            © {new Date().getFullYear()} D8. All rights reserved.
          </p>
          <a
            href="mailto:contacto@d8tec.com"
            className="font-mono text-xs text-d8-text-secondary transition-colors hover:text-d8-text-primary"
          >
            contacto@d8tec.com
          </a>
        </div>
      </div>
    </footer>
  );
}
