"use client";

import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";
import { Link, usePathname } from "@/navigation";
import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ribbonDrop, dropInStagger, dropIn, underlineExpand } from "@/lib/animations";

export function Nav() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const otherLocale = locale === "en" ? "es" : "en";
  const otherFlag = locale === "en" ? "🇨🇷" : "🇺🇸";
  const otherCode = otherLocale.toUpperCase();

  const links = [
    { href: "/about_us", label: t("aboutUs") },
    { href: "/projects", label: t("projects") },
    { href: "/careers", label: t("careers") },
    { href: "/contact", label: t("contact") },
  ];

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 border-b border-d8-border bg-d8-bg/90 backdrop-blur-sm"
      variants={ribbonDrop}
      initial={shouldReduceMotion ? false : "hidden"}
      animate="visible"
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="font-heading text-2xl font-semibold tracking-tight text-d8-text-primary"
          aria-current={pathname === "/" ? "page" : undefined}
        >
          D8
        </Link>

        {/* Desktop */}
        <motion.ul
          className="hidden items-center gap-8 md:flex"
          variants={dropInStagger}
          initial={shouldReduceMotion ? false : "hidden"}
          animate="visible"
          transition={shouldReduceMotion ? undefined : { delayChildren: 0.65, staggerChildren: 0.08 }}
        >
          {links.map(({ href, label }) => (
            <motion.li key={href} variants={dropIn}>
              <motion.span
                className="relative block"
                initial="rest"
                whileHover="hover"
              >
                <Link
                  href={href}
                  aria-current={pathname === href ? "page" : undefined}
                  className="font-body text-base text-d8-text-secondary transition-colors hover:text-d8-text-primary aria-[current=page]:text-d8-text-primary aria-[current=page]:underline aria-[current=page]:underline-offset-4 aria-[current=page]:decoration-d8-purple-light"
                >
                  {label}
                </Link>
                <motion.span
                  className="absolute -bottom-0.5 left-0 right-0 h-px bg-d8-purple-light pointer-events-none"
                  style={{ originX: 0 }}
                  variants={underlineExpand}
                />
              </motion.span>
            </motion.li>
          ))}
        </motion.ul>

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
            href="/contact?open=1"
            onClick={(e) => {
              if (pathname === "/contact") {
                e.preventDefault();
                window.dispatchEvent(new CustomEvent("d8:open-contact"));
              }
            }}
            className="rounded-sm bg-d8-purple px-4 py-2 font-body text-base font-medium text-white transition-opacity hover:opacity-90"
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
      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            id="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="border-t border-d8-border px-6 py-4 md:hidden"
          >
            <ul className="flex flex-col gap-4">
              {links.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    onClick={() => setOpen(false)}
                    aria-current={pathname === href ? "page" : undefined}
                    className="font-body text-base text-d8-text-secondary hover:text-d8-text-primary aria-[current=page]:text-d8-text-primary aria-[current=page]:underline aria-[current=page]:underline-offset-4 aria-[current=page]:decoration-d8-purple-light"
                  >
                    {label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href={pathname}
                  locale={otherLocale}
                  aria-label={`Switch to ${otherCode}`}
                  className="flex items-center gap-1.5 font-mono text-xs text-d8-text-secondary transition-colors hover:text-d8-text-primary"
                >
                  <span aria-hidden="true">{otherFlag}</span>
                  <span>{otherCode}</span>
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
