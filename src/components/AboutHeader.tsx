"use client";

import { useTranslations } from "next-intl";
import { motion, useReducedMotion } from "framer-motion";
import { sweepReveal, splitLineLine, slideUpStagger, slideUp } from "@/lib/animations";

export function AboutHeader() {
  const t = useTranslations("about");
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="px-6 pt-40 pb-28 border-b border-d8-border">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-4xl">
          <motion.span
            variants={sweepReveal}
            initial={shouldReduceMotion ? false : "hidden"}
            animate="visible"
            className="inline-block font-mono text-xs uppercase tracking-widest text-d8-purple-light"
          >
            {t("overline")}
          </motion.span>
          <motion.h1
            variants={splitLineLine}
            initial={shouldReduceMotion ? false : "hidden"}
            animate="visible"
            transition={shouldReduceMotion ? undefined : { duration: 0.7, delay: 0.15, ease: [0.85, 0.09, 0.15, 0.91] }}
            className="mt-6 font-heading text-3xl font-semibold leading-snug tracking-tight text-d8-text-primary text-balance md:text-4xl lg:text-5xl"
          >
            {t("heading")}
          </motion.h1>
          <motion.div
            variants={slideUpStagger}
            initial={shouldReduceMotion ? false : "hidden"}
            animate="visible"
            transition={shouldReduceMotion ? undefined : { delayChildren: 0.45, staggerChildren: 0.08 }}
            className="mt-10 flex flex-col gap-4 max-w-2xl"
          >
            <motion.p variants={slideUp} className="font-body text-base leading-relaxed text-d8-text-secondary">
              {t("body1")}
            </motion.p>
            <motion.p variants={slideUp} className="font-body text-base leading-relaxed text-d8-text-secondary">
              {t("body2")}
            </motion.p>
            <motion.p variants={slideUp} className="font-body text-base leading-relaxed text-d8-text-secondary">
              {t("body3")}
            </motion.p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
