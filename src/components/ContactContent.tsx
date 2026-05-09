"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "framer-motion";

const socials = [
  { name: "LinkedIn", handle: "@d8tec", href: "https://linkedin.com/company/d8tec" },
  { name: "Instagram", handle: "@d8tec", href: "https://instagram.com/d8tec" },
];

export function ContactContent() {
  const t = useTranslations("contact");
  const shouldReduceMotion = useReducedMotion();

  const fade: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: shouldReduceMotion ? 0 : 0.09 } },
  };

  const item: Variants = {
    hidden: { opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 12 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: shouldReduceMotion ? 0 : 0.45, ease: "easeOut" as const },
    },
  };

  return (
    <>
      {/* Page header */}
      <section className="px-6 pt-40 pb-16">
        <div className="mx-auto max-w-7xl">
          <motion.div
            variants={fade}
            initial="hidden"
            animate="show"
            className="flex flex-col gap-5"
          >
            <motion.span
              variants={item}
              className="font-mono text-xs uppercase tracking-widest text-d8-purple-light"
            >
              {t("overline")}
            </motion.span>
            <motion.h1
              variants={item}
              className="font-heading text-4xl font-semibold leading-tight tracking-tight text-d8-text-primary sm:text-5xl"
            >
              {t("heading")}
            </motion.h1>
            <motion.div variants={item} className="flex flex-col gap-2 pt-2">
              <p className="max-w-xl font-body text-sm leading-relaxed text-d8-text-secondary">
                {t("foundationBody")}
              </p>
              <p className="max-w-xl font-body text-sm leading-relaxed text-d8-text-dim italic">
                {t("foundationVerse")}
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Contact rows */}
      <section className="border-t border-d8-border bg-d8-surface px-6 pb-32">
        <div className="mx-auto max-w-7xl">
          <motion.div
            variants={fade}
            initial="hidden"
            animate="show"
            className="divide-y divide-d8-border border-b border-d8-border"
          >
            {/* Email */}
            <motion.div
              variants={item}
              className="-mx-4 flex flex-col gap-1 px-4 py-10 transition-colors hover:bg-d8-bg md:-mx-6 md:px-6"
            >
              <span className="font-mono text-xs uppercase tracking-wider text-d8-text-dim">
                {t("rows.emailLabel")}
              </span>
              <a
                href="mailto:contacto@d8tec.com"
                className="font-heading text-2xl font-semibold tracking-tight text-d8-text-primary transition-colors hover:text-d8-purple-light sm:text-3xl"
              >
                contacto@d8tec.com
              </a>
              <span className="mt-1 font-body text-xs text-d8-text-dim">
                {t("rows.responseTime")}
              </span>
            </motion.div>

            {/* Phone */}
            <motion.div
              variants={item}
              className="-mx-4 flex flex-col gap-4 px-4 py-10 transition-colors hover:bg-d8-bg md:-mx-6 md:flex-row md:gap-16 md:px-6"
            >
              {["+506 6048-1496", "+506 7275-3532"].map((number) => (
                <div key={number} className="flex flex-col gap-1">
                  <span className="font-mono text-xs uppercase tracking-wider text-d8-text-dim">
                    {t("rows.phoneLabel")}
                  </span>
                  <a
                    href={`tel:${number.replace(/\s|-/g, "")}`}
                    className="font-heading text-2xl font-semibold tracking-tight text-d8-text-primary transition-colors hover:text-d8-purple-light sm:text-3xl"
                  >
                    {number}
                  </a>
                </div>
              ))}
            </motion.div>

            {/* Location + Hours */}
            <motion.div
              variants={item}
              className="-mx-4 flex flex-col gap-4 px-4 py-10 transition-colors hover:bg-d8-bg md:-mx-6 md:flex-row md:gap-16 md:px-6"
            >
              <div className="flex flex-col gap-1">
                <span className="font-mono text-xs uppercase tracking-wider text-d8-text-dim">
                  {t("rows.locationLabel")}
                </span>
                <span className="font-heading text-2xl font-semibold tracking-tight text-d8-text-primary sm:text-3xl">
                  {t("rows.locationValue")}
                </span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="font-mono text-xs uppercase tracking-wider text-d8-text-dim">
                  {t("rows.hoursLabel")}
                </span>
                <span className="font-heading text-2xl font-semibold tracking-tight text-d8-text-primary sm:text-3xl">
                  {t("rows.hoursValue")}
                </span>
              </div>
            </motion.div>

            {/* Socials */}
            <motion.div
              variants={item}
              className="-mx-4 flex flex-col gap-4 px-4 py-10 transition-colors hover:bg-d8-bg md:-mx-6 md:flex-row md:gap-16 md:px-6"
            >
              {socials.map(({ name, handle, href }) => (
                <div key={name} className="flex flex-col gap-1">
                  <span className="font-mono text-xs uppercase tracking-wider text-d8-text-dim">
                    {name}
                  </span>
                  <Link
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-heading text-2xl font-semibold tracking-tight text-d8-text-primary transition-colors hover:text-d8-purple-light sm:text-3xl"
                  >
                    {handle}
                  </Link>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
