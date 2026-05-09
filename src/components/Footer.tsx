import Link from "next/link";

const nav = [
  { href: "/services", label: "Services" },
  { href: "/projects", label: "Projects" },
  { href: "/careers", label: "Careers" },
  { href: "/contact", label: "Contact" },
];

export function Footer() {
  return (
    <footer className="border-t border-d8-border bg-d8-bg">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <div>
            <p className="font-heading text-lg font-semibold text-d8-text-primary">D8</p>
            <p className="mt-1 font-body text-sm text-d8-text-secondary">
              Full-spectrum technology.
            </p>
          </div>

          <ul className="flex flex-wrap gap-6">
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

        <div className="mt-10 border-t border-d8-border pt-6 flex flex-col gap-1 md:flex-row md:items-center md:justify-between">
          <p className="font-body text-xs text-d8-text-secondary">
            © {new Date().getFullYear()} D8. All rights reserved.
          </p>
          <a
            href="mailto:nalfaro@d8tec.com"
            className="font-mono text-xs text-d8-text-secondary transition-colors hover:text-d8-text-primary"
          >
            nalfaro@d8tec.com
          </a>
        </div>
      </div>
    </footer>
  );
}
