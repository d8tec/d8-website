"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence, useReducedMotion, type Variants } from "framer-motion";
import { sweepReveal, floatingCardEntrance, floatingCardContainer, slideUp } from "@/lib/animations";

type ProcessStage = { num: string; name: string; desc: string };
type Industry = {
  tag: string;
  name: string;
  stages: boolean[];
  description: string;
};

const PROJECT_IMAGES: Record<string, string> = {
  "01": "https://picsum.photos/seed/transit-fare/1200/500",
  "02": "https://picsum.photos/seed/booking-platform/1200/500",
  "03": "https://picsum.photos/seed/residential-community/1200/500",
  "04": "https://picsum.photos/seed/tax-filing-automation/1200/500",
  "05": "https://picsum.photos/seed/padel-court-scoring/1200/500",
};

function JumpFlipHeading({ shouldReduceMotion }: { shouldReduceMotion: boolean | null }) {
  const chars = "HOW WE BUILD".split("");

  const container: Variants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.065,
        delayChildren: shouldReduceMotion ? 0 : 0.05,
      },
    },
  };

  const letter: Variants = {
    hidden: { y: 0, rotateX: 0 },
    show: shouldReduceMotion
      ? { y: 0, rotateX: 0 }
      : {
          y: [0, -90, 0],
          rotateX: [0, 360],
          transition: {
            duration: 0.65,
            y: {
              times: [0, 0.42, 1],
              ease: ["easeOut", "backOut"],
            },
            rotateX: { ease: "easeInOut" },
          },
        },
  };

  return (
    <motion.h1
      className="font-heading font-black leading-none tracking-tight text-d8-text-primary whitespace-nowrap"
      style={{ fontSize: "clamp(2.5rem, 12vw, 14rem)", perspective: "800px" }}
      aria-label="How we build"
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, margin: "-80px" }}
    >
      {chars.map((char, i) =>
        char === " " ? (
          <span key={i} style={{ display: "inline-block", width: "0.28em" }} aria-hidden />
        ) : (
          <motion.span
            key={i}
            variants={letter}
            style={{ display: "inline-block", transformOrigin: "center center" }}
          >
            {char}
          </motion.span>
        )
      )}
    </motion.h1>
  );
}

export function ProjectsContent() {
  const t = useTranslations("industries");
  const processStages = t.raw("process") as ProcessStage[];
  const industries = t.raw("industries") as Industry[];
  const shouldReduceMotion = useReducedMotion();

  const [expandedTag, setExpandedTag] = useState<string | null>(null);

  return (
    <>
      {/* Page header */}
      <section className="px-6 pb-28 pt-40">
        <div className="mx-auto max-w-7xl">
          <JumpFlipHeading shouldReduceMotion={shouldReduceMotion} />

          <div className="mt-16 flex flex-col gap-5 max-w-2xl">
            <motion.span
              variants={sweepReveal}
              initial={shouldReduceMotion ? false : "hidden"}
              whileInView="visible"
              viewport={{ once: false }}
              className="inline-block font-mono text-xs uppercase tracking-widest text-d8-purple-light"
            >
              {t("overline")}
            </motion.span>
            <motion.p
              variants={slideUp}
              initial={shouldReduceMotion ? false : "hidden"}
              animate="visible"
              transition={shouldReduceMotion ? undefined : { duration: 0.5, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-2xl font-body text-base leading-relaxed text-d8-text-secondary"
            >
              {t("body")}
            </motion.p>
          </div>
        </div>
      </section>

      {/* Sticky bar is contained here — unsticks when this div ends (= ContactCTA starts) */}
      <div>
        {/* Process key grid */}
        <section className="sticky top-16 z-10 border-t border-d8-border bg-d8-surface px-6 py-6">
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
              variants={floatingCardContainer}
              initial={shouldReduceMotion ? false : "hidden"}
              whileInView="visible"
              viewport={{ once: false, margin: "-60px" }}
              className="border-t border-d8-border"
            >
              {industries.map(({ tag, name, description }) => {
                const isExpanded = expandedTag === tag;
                return (
                  <motion.div key={tag} variants={floatingCardEntrance} className="border-b border-d8-border">
                    {/* Row */}
                    <motion.div
                      whileHover={{ scale: 1.016, transition: { duration: 0.3, ease: [0, 0, 0.5, 1] } }}
                      onClick={() => setExpandedTag(isExpanded ? null : tag)}
                      className="group -mx-4 grid cursor-pointer grid-cols-[3rem_1fr] gap-x-6 gap-y-6 px-4 py-12 transition-colors duration-200 hover:bg-d8-surface md:-mx-6 md:grid-cols-[3rem_2fr_3fr] md:items-start md:gap-x-14 md:gap-y-0 md:px-6"
                    >
                      <span className="mt-[0.3rem] font-mono text-sm font-semibold text-d8-purple-light md:mt-[0.55rem]">
                        {tag}
                      </span>
                      <h2 className="font-heading text-2xl font-semibold leading-tight tracking-tight text-d8-text-primary transition-colors duration-200 group-hover:text-d8-purple-light md:text-3xl lg:text-4xl">
                        {name}
                      </h2>
                      <div className="col-span-2 pl-[4.5rem] md:col-auto md:pl-0">
                        <p className="font-body text-sm leading-relaxed text-d8-text-secondary">
                          {description}
                        </p>
                        {/* Expand indicator */}
                        <div className="mt-6 flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-d8-text-dim transition-colors duration-200 group-hover:text-d8-purple-light">
                          <motion.svg
                            animate={{ rotate: isExpanded ? 180 : 0 }}
                            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                            className="h-3 w-3 flex-shrink-0"
                            viewBox="0 0 12 12"
                            fill="none"
                            aria-hidden="true"
                          >
                            <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </motion.svg>
                          <span>{isExpanded ? "Close" : "View project"}</span>
                        </div>
                      </div>
                    </motion.div>

                    {/* Expand panel */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          key="panel"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                          className="overflow-hidden"
                        >
                          <div className="-mx-4 px-4 pb-12 pt-2 md:-mx-6 md:px-6">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={PROJECT_IMAGES[tag] ?? `https://picsum.photos/seed/${tag}/1200/500`}
                              alt={`${name} — project visual`}
                              className="w-full rounded-sm object-cover"
                              style={{ aspectRatio: "16 / 7" }}
                            />
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
}
