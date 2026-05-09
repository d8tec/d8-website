"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/navigation";
import { motion, useReducedMotion } from "framer-motion";

export function ContactCTA() {
  const t = useTranslations("cta");
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="border-t border-d8-border py-24 px-6">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.5, ease: "easeOut" as const }}
          className="flex flex-col items-center gap-6 rounded-sm border border-d8-border bg-d8-surface px-8 py-16 text-center"
        >
          <span className="font-mono text-xs text-d8-purple-light tracking-widest uppercase">
            {t("overline")}
          </span>
          <h2 className="font-heading text-3xl font-semibold text-d8-text-primary tracking-tight text-balance max-w-xl">
            {t("heading")}
          </h2>
          <p className="font-body text-sm leading-relaxed text-d8-text-secondary max-w-md text-balance">
            {t("body")}
          </p>
          <Link
            href="/contact"
            className="mt-2 rounded-sm bg-d8-purple px-8 py-3 font-body text-sm font-medium text-white transition-opacity hover:opacity-90"
          >
            {t("cta")}
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
