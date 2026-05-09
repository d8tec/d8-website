"use client";

import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";
import { Link, usePathname } from "@/navigation";
import { useState } from "react";

export function Nav() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const otherLocale = locale === "en" ? "es" : "en";
  const otherFlag = locale === "en" ? "🇨🇷" : "🇺🇸";
  const otherCode = otherLocale.toUpperCase();

  const links = [
    { href: "/services", label: t("aboutUs") },
    { href: "/projects", label: t("projects") },
    { href: "/careers", label: t("careers") },
    { href: "/contact", label: t("contact") },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-d8-border bg-d8-bg/90 backdrop-blur-sm">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="font-heading text-xl font-semibold tracking-tight text-d8-text-primary"
          aria-current={pathname === "/" ? "page" : undefined}
        >
          D8
        </Link>

        {/* Desktop */}
        <ul className="hidden items-center gap-8 md:flex">
          {links.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                aria-current={pathname === href ? "page" : undefined}
                className="font-body text-sm text-d8-text-secondary transition-colors hover:text-d8-text-primary aria-[current=page]:text-d8-text-primary"
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-4 md:flex">
          {/* Locale switcher */}
          <Link
            href={pathname}
            locale={otherLocale}
            className="flex items-center gap-1 font-mono text-xs text-d8-text-secondary transition-colors hover:text-d8-text-primary"
            aria-label={`Switch to ${otherCode}`}
          >
            <span aria-hidden="true">{otherFlag}</span>
            <span>{otherCode}</span>
          </Link>

          {/* CTA */}
          <Link
            href="/contact"
            className="rounded-sm bg-d8-purple px-4 py-2 font-body text-sm font-medium text-white transition-opacity hover:opacity-90"
          >
            {t("cta")}
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={open}
          aria-controls="mobile-menu"
          className="flex min-h-[44px] min-w-[44px] flex-col items-center justify-center gap-1.5 md:hidden"
        >
          <span
            className={`block h-px w-5 bg-d8-text-primary transition-transform ${open ? "translate-y-2.5 rotate-45" : ""}`}
          />
          <span
            className={`block h-px w-5 bg-d8-text-primary transition-opacity ${open ? "opacity-0" : ""}`}
          />
          <span
            className={`block h-px w-5 bg-d8-text-primary transition-transform ${open ? "-translate-y-2.5 -rotate-45" : ""}`}
          />
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div
          id="mobile-menu"
          className="border-t border-d8-border px-6 py-4 md:hidden"
        >
          <ul className="flex flex-col gap-4">
            {links.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  onClick={() => setOpen(false)}
                  aria-current={pathname === href ? "page" : undefined}
                  className="font-body text-sm text-d8-text-secondary hover:text-d8-text-primary aria-[current=page]:text-d8-text-primary"
                >
                  {label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href={pathname}
                locale={otherLocale}
                className="flex items-center gap-1.5 font-mono text-xs text-d8-text-secondary transition-colors hover:text-d8-text-primary"
              >
                <span aria-hidden="true">{otherFlag}</span>
                <span>{otherCode}</span>
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
