"use client";

import { useTranslations } from "next-intl";
import { motion, useReducedMotion, type Variants } from "framer-motion";

export function AboutHeader() {
  const t = useTranslations("about");
  const shouldReduceMotion = useReducedMotion();

  const fade: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: shouldReduceMotion ? 0 : 0.1 } },
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
    <section className="px-6 pt-40 pb-28 border-b border-d8-border">
      <div className="mx-auto max-w-7xl">
        <motion.div
          variants={fade}
          initial="hidden"
          animate="show"
          className="max-w-4xl"
        >
          <motion.span
            variants={item}
            className="font-mono text-xs uppercase tracking-widest text-d8-purple-light"
          >
            {t("overline")}
          </motion.span>
          <motion.h1
            variants={item}
            className="mt-6 font-heading text-3xl font-semibold leading-snug tracking-tight text-d8-text-primary text-balance md:text-4xl lg:text-5xl"
          >
            {t("heading")}
          </motion.h1>
          <motion.div
            variants={item}
            className="mt-10 flex flex-col gap-4 max-w-2xl"
          >
            <p className="font-body text-base leading-relaxed text-d8-text-secondary">
              {t("body1")}
            </p>
            <p className="font-body text-base leading-relaxed text-d8-text-secondary">
              {t("body2")}
            </p>
            <p className="font-body text-base leading-relaxed text-d8-text-secondary">
              {t("body3")}
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
