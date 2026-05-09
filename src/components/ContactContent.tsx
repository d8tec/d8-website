"use client";

import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "framer-motion";

const socials = [
  {
    name: "LinkedIn",
    handle: "@d8tec",
    href: "https://linkedin.com/company/d8tec",
  },
  {
    name: "Instagram",
    handle: "@d8tec",
    href: "https://instagram.com/d8tec",
  },
];

export function ContactContent() {
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
    <section className="px-6 pb-24 pt-32">
      <div className="mx-auto max-w-6xl">
        <motion.div
          variants={fade}
          initial="hidden"
          animate="show"
          className="flex flex-col gap-5 mb-20"
        >
          <motion.span
            variants={item}
            className="font-mono text-xs uppercase tracking-widest text-d8-purple-light"
          >
            Contact
          </motion.span>
          <motion.h1
            variants={item}
            className="font-heading text-4xl font-semibold leading-tight tracking-tight text-d8-text-primary sm:text-5xl"
          >
            Get in touch.
          </motion.h1>
        </motion.div>

        <motion.div
          variants={fade}
          initial="hidden"
          animate="show"
          className="divide-y divide-d8-border border-y border-d8-border"
        >
          {/* Email */}
          <motion.div variants={item} className="-mx-4 flex flex-col gap-1 px-4 py-8 md:-mx-6 md:px-6">
            <span className="font-mono text-[11px] uppercase tracking-wider text-d8-text-dim">
              Email
            </span>
            <a
              href="mailto:contacto@d8tec.com"
              className="font-heading text-2xl font-semibold tracking-tight text-d8-text-primary transition-colors hover:text-d8-purple-light sm:text-3xl"
            >
              contacto@d8tec.com
            </a>
            <span className="mt-1 font-body text-xs text-d8-text-dim">
              We respond within one business day.
            </span>
          </motion.div>

          {/* Phone */}
          <motion.div variants={item} className="-mx-4 flex flex-col gap-4 px-4 py-8 md:-mx-6 md:flex-row md:gap-16 md:px-6">
            {["+506 6048-1496", "+506 7275-3532"].map((number) => (
              <div key={number} className="flex flex-col gap-1">
                <span className="font-mono text-[11px] uppercase tracking-wider text-d8-text-dim">
                  Phone
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
          <motion.div variants={item} className="-mx-4 flex flex-col gap-4 px-4 py-8 md:-mx-6 md:flex-row md:gap-16 md:px-6">
            <div className="flex flex-col gap-1">
              <span className="font-mono text-[11px] uppercase tracking-wider text-d8-text-dim">
                Location
              </span>
              <span className="font-heading text-2xl font-semibold tracking-tight text-d8-text-primary sm:text-3xl">
                San José, Costa Rica
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="font-mono text-[11px] uppercase tracking-wider text-d8-text-dim">
                Hours
              </span>
              <span className="font-heading text-2xl font-semibold tracking-tight text-d8-text-primary sm:text-3xl">
                Mon–Fri, 8am–6pm CST
              </span>
            </div>
          </motion.div>

          {/* Socials */}
          <motion.div variants={item} className="-mx-4 flex flex-col gap-4 px-4 py-8 md:-mx-6 md:flex-row md:gap-16 md:px-6">
            {socials.map(({ name, handle, href }) => (
              <div key={name} className="flex flex-col gap-1">
                <span className="font-mono text-[11px] uppercase tracking-wider text-d8-text-dim">
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
  );
}
