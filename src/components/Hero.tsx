"use client";

import { useRef, type RefObject } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/navigation";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { useScrollLinkedBg, arrowNudge, useMagneticButton } from "@/lib/animations";
import { useHeartbeatDot, useAnimeScramble } from "@/lib/animePatterns";

type Service = {
  tag: string;
  title: string;
  description: string;
  capabilities: string[];
};

export function Hero() {
  const t = useTranslations("hero");
  const shouldReduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const { y: glowY, opacity: glowOpacity } = useScrollLinkedBg(sectionRef);
  const mag = useMagneticButton(0.3);
  const heartbeat = useHeartbeatDot();
  const scramble = useAnimeScramble();
  const fade: Variants = {
    hidden: { opacity: 0, y: 16 },
    show: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.5,
        delay: shouldReduceMotion ? 0 : i * 0.1,
        ease: "easeOut" as const,
      },
    }),
  };

  return (
    <section ref={sectionRef} className="relative flex flex-col items-center overflow-hidden px-6 pt-40 pb-32">
      <motion.div
        className="pointer-events-none absolute inset-x-0 top-0 h-[640px] bg-purple-glow animate-glow-pulse"
        style={{ y: glowY, opacity: glowOpacity }}
      />

      <div className="relative z-10 mx-auto w-full max-w-4xl text-center">
        <motion.div
          custom={0}
          initial="hidden"
          animate="show"
          variants={fade}
          onAnimationComplete={shouldReduceMotion ? undefined : () => scramble.trigger()}
          className="relative mb-6 inline-flex items-center gap-3 overflow-hidden rounded-full border border-d8-purple bg-d8-surface px-8 py-3.5"
        >
          {!shouldReduceMotion && (
            <motion.span
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-full bg-d8-purple"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.15, 0] }}
              transition={{ duration: 1.5, ease: "easeInOut", repeat: Infinity, delay: 0.6 }}
            />
          )}
          <span ref={shouldReduceMotion ? undefined : heartbeat} className="relative z-10 h-2.5 w-2.5 rounded-full bg-d8-purple" />
          <span ref={shouldReduceMotion ? undefined : scramble.ref} className="relative z-10 font-mono text-base tracking-widest uppercase text-d8-purple-light">
            {t("badge")}
          </span>
        </motion.div>

        <motion.h1
          custom={1}
          initial="hidden"
          animate="show"
          variants={fade}
          className="font-heading text-5xl font-semibold leading-tight tracking-tight text-d8-text-primary text-balance sm:text-6xl lg:text-7xl"
        >
          {t("heading1")}{" "}
          <span className="text-d8-purple">{t("heading2")}</span>
        </motion.h1>

        <motion.p
          custom={2}
          initial="hidden"
          animate="show"
          variants={fade}
          className="mx-auto mt-6 max-w-2xl font-body text-lg leading-relaxed text-d8-text-secondary text-balance"
        >
          {t("body")}
        </motion.p>

        <motion.div
          custom={3}
          initial="hidden"
          animate="show"
          variants={fade}
          className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
        >
          <motion.div
            ref={mag.ref as RefObject<HTMLDivElement>}
            style={shouldReduceMotion ? {} : { x: mag.x, y: mag.y }}
            onMouseMove={shouldReduceMotion ? undefined : mag.handleMouseMove}
            onMouseLeave={shouldReduceMotion ? undefined : mag.handleMouseLeave}
          >
            <Link
              href="/contact"
              className="block rounded-sm bg-d8-purple px-6 py-3 font-body text-sm font-medium text-white transition-opacity hover:opacity-90"
            >
              {t("cta1")}
            </Link>
          </motion.div>
          <motion.div className="inline-block" initial="rest" whileHover="hover">
            <Link
              href="/about_us"
              className="inline-flex items-center gap-2 rounded-sm border border-d8-border px-6 py-3 font-body text-sm text-d8-text-secondary transition-colors hover:border-d8-text-dim hover:text-d8-text-primary"
            >
              {t("cta2")}
              <motion.span variants={arrowNudge} className="inline-block">→</motion.span>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export function ServicePanels() {
  const t = useTranslations("hero");
  const services = t.raw("services") as Service[];
  const shouldReduceMotion = useReducedMotion();

  const panelContainer: Variants = {
    hidden: {
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.05,
        staggerDirection: -1,
      },
    },
    show: {
      transition: {
        delayChildren: shouldReduceMotion ? 0 : 0.2,
        staggerChildren: shouldReduceMotion ? 0 : 0.09,
      },
    },
  };

  const panelItem: Variants = {
    hidden: {
      opacity: shouldReduceMotion ? 1 : 0,
      y: shouldReduceMotion ? 0 : 14,
      transition: { duration: shouldReduceMotion ? 0 : 0.28, ease: "easeIn" as const },
    },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: shouldReduceMotion ? 0 : 0.45, ease: "easeOut" as const },
    },
  };

  return (
    <section className="px-6">
      <div className="mx-auto w-full max-w-7xl">
        <motion.div
          variants={panelContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, margin: "-80px" }}
          className="w-full text-left"
        >
          <div className="divide-y divide-d8-border">
            {services.map(({ tag, title, description, capabilities }) => (
              <motion.div
                key={tag}
                variants={panelItem}
                whileHover={{ scale: 1.016, transition: { duration: 0.3, ease: [0, 0, 0.5, 1] } }}
                className="group -mx-4 grid cursor-default grid-cols-[3rem_1fr] gap-x-6 gap-y-6 px-4 py-12 transition-colors duration-200 hover:bg-d8-surface md:-mx-6 md:grid-cols-[3rem_2fr_3fr] md:items-start md:gap-x-14 md:gap-y-0 md:px-6"
              >
                <span className="mt-[0.3rem] font-mono text-sm font-semibold text-d8-purple-light md:mt-[0.55rem]">
                  {tag}
                </span>
                <h2 className="font-heading text-2xl font-semibold leading-none tracking-tight text-d8-text-primary transition-colors duration-200 group-hover:text-d8-purple-light md:text-3xl lg:text-5xl">
                  {title}
                </h2>
                <div className="col-span-2 pl-[4.5rem] md:col-auto md:pl-0">
                  <p className="font-body text-sm leading-relaxed text-d8-text-secondary">
                    {description}
                  </p>
                  <ul className="mt-5 flex flex-col gap-2">
                    {capabilities.map((cap) => (
                      <li key={cap} className="flex items-start gap-3">
                        <span
                          className="mt-[7px] h-1 w-1 flex-shrink-0 rounded-full bg-d8-purple"
                          aria-hidden="true"
                        />
                        <span className="font-body text-sm text-d8-text-secondary">
                          {cap}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
