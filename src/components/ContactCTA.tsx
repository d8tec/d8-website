"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

export function ContactCTA() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="border-t border-d8-border py-24 px-6">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.5, ease: "easeOut" as const }}
          className="flex flex-col items-center gap-6 rounded-sm border border-d8-border bg-d8-surface px-8 py-16 text-center"
        >
          <span className="font-mono text-xs text-d8-purple-light tracking-widest uppercase">
            Work with us
          </span>
          <h2 className="font-heading text-3xl font-semibold text-d8-text-primary tracking-tight text-balance max-w-xl">
            Have something to build?
          </h2>
          <p className="font-body text-sm leading-relaxed text-d8-text-secondary max-w-md text-balance">
            We work with companies who need a technical partner — not just a
            vendor. If you have a hard problem, we&apos;re interested.
          </p>
          <Link
            href="/contact"
            className="mt-2 rounded-sm bg-d8-purple px-8 py-3 font-body text-sm font-medium text-white transition-opacity hover:opacity-90"
          >
            Get in touch
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
