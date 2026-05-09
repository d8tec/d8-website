"use client";

import { useTranslations } from "next-intl";
import { motion, useReducedMotion, type Variants } from "framer-motion";

type ProcessStage = { num: string; name: string; desc: string };
type Industry = {
  tag: string;
  name: string;
  stages: boolean[];
  description: string;
};

export function ProjectsContent() {
  const t = useTranslations("industries");
  const processStages = t.raw("process") as ProcessStage[];
  const industries = t.raw("industries") as Industry[];
  const shouldReduceMotion = useReducedMotion();

  const headerFade: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: shouldReduceMotion ? 0 : 0.1 } },
  };

  const headerItem: Variants = {
    hidden: { opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 12 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: shouldReduceMotion ? 0 : 0.45, ease: "easeOut" as const },
    },
  };

  const containerVariants: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: shouldReduceMotion ? 0 : 0.1 } },
  };

  const itemVariants: Variants = {
    hidden: { opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 16 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: shouldReduceMotion ? 0 : 0.5, ease: "easeOut" as const },
    },
  };

  return (
    <>
      {/* Page header */}
      <section className="px-6 pb-20 pt-40">
        <div className="mx-auto max-w-7xl">
          <motion.div
            variants={headerFade}
            initial="hidden"
            animate="show"
            className="flex flex-col gap-5 max-w-4xl"
          >
            <motion.span
              variants={headerItem}
              className="font-mono text-xs uppercase tracking-widest text-d8-purple-light"
            >
              {t("overline")}
            </motion.span>
            <motion.h1
              variants={headerItem}
              className="font-heading text-4xl font-semibold leading-tight tracking-tight text-d8-text-primary text-balance sm:text-5xl"
            >
              {t("heading")}
            </motion.h1>
            <motion.p
              variants={headerItem}
              className="max-w-2xl font-body text-base leading-relaxed text-d8-text-secondary"
            >
              {t("body")}
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Process key */}
      <section className="border-t border-d8-border bg-d8-surface px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-0 md:divide-x md:divide-d8-border">
            {processStages.map(({ num, name, desc }, i) => (
              <div
                key={num}
                className={`flex flex-col gap-2 ${i > 0 ? "md:pl-8" : ""} ${i < processStages.length - 1 ? "md:pr-8" : ""}`}
              >
                <span className="font-mono text-xs text-d8-purple-light">{num}</span>
                <p className="font-heading text-base font-semibold tracking-tight text-d8-text-primary">
                  {name}
                </p>
                <p className="font-body text-xs leading-relaxed text-d8-text-secondary">
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industry rows */}
      <section className="px-6 pb-32 pt-12">
        <div className="mx-auto max-w-7xl">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            className="divide-y divide-d8-border border-y border-d8-border"
          >
            {industries.map(({ tag, name, stages, description }) => (
              <motion.div
                key={tag}
                variants={itemVariants}
                className="group -mx-4 grid cursor-default grid-cols-[3rem_1fr] gap-x-6 gap-y-6 px-4 py-12 transition-colors duration-200 hover:bg-d8-surface md:-mx-6 md:grid-cols-[3rem_2fr_3fr] md:items-start md:gap-x-14 md:gap-y-0 md:px-6"
              >
                <span className="mt-[0.3rem] font-mono text-sm font-semibold text-d8-purple-light md:mt-[0.55rem]">
                  {tag}
                </span>
                <h2 className="font-heading text-2xl font-semibold leading-tight tracking-tight text-d8-text-primary transition-colors duration-200 group-hover:text-d8-purple-light md:text-3xl lg:text-4xl">
                  {name}
                </h2>
                <div className="col-span-2 pl-[4.5rem] md:col-auto md:pl-0">
                  <div className="mb-5 flex flex-wrap gap-x-5 gap-y-2">
                    {processStages.map(({ num, name: stageName }, i) => {
                      const active = stages[i];
                      return (
                        <span
                          key={num}
                          className={`inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider transition-colors ${
                            active ? "text-d8-purple-light" : "text-d8-text-dim"
                          }`}
                        >
                          <span
                            className={`h-1 w-1 flex-shrink-0 rounded-full ${
                              active ? "bg-d8-purple" : "bg-d8-text-dim opacity-40"
                            }`}
                            aria-hidden="true"
                          />
                          {num} {stageName}
                        </span>
                      );
                    })}
                  </div>
                  <p className="font-body text-sm leading-relaxed text-d8-text-secondary">
                    {description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  );
}
