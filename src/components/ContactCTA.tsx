"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/navigation";
import { motion, useReducedMotion } from "framer-motion";

export function ContactCTA() {
  const t = useTranslations("cta");
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="border-t border-d8-border px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.5, ease: "easeOut" as const }}
          className="mx-auto flex max-w-2xl flex-col items-center gap-6 text-center"
        >
          <span className="font-mono text-xs uppercase tracking-widest text-d8-purple-light">
            {t("overline")}
          </span>
          <h2 className="font-heading text-4xl font-semibold tracking-tight text-d8-text-primary sm:text-5xl">
            {t("heading")}
          </h2>
          <p className="font-body text-sm leading-relaxed text-d8-text-secondary">
            {t("body")}
          </p>
          <Link
            href="/contact?open=1"
            className="mt-2 rounded-sm bg-d8-purple px-8 py-3 font-body text-sm font-medium text-white transition-opacity hover:opacity-90"
          >
            {t("cta")}
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
