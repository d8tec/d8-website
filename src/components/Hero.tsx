"use client";

import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "framer-motion";

const services = [
  {
    tag: "01",
    title: "R&D",
    description:
      "We go first. When a problem is undefined or the technology to solve it doesn't yet exist, we build the evidence that makes the next decision possible. D8 takes on ambiguous work and delivers something you can build on.",
    capabilities: [
      "Feasibility studies and technology selection",
      "Embedded and mechanical prototyping",
      "Field validation and test instrumentation",
      "Research-to-production handoff",
    ],
  },
  {
    tag: "02",
    title: "Hardware & Software",
    description:
      "Most vendors do one side. D8 does both, in one team, without the integration tax. From PCB to cloud dashboard, we own the full hardware-software stack and eliminate the gaps between layers.",
    capabilities: [
      "Firmware development for ESP32, STM32, and RTOS environments",
      "PCB design, board bringup, and manufacturing handoff",
      "Cloud connectivity, device management, and real-time data",
      "Full-stack dashboards and operational interfaces",
    ],
  },
  {
    tag: "03",
    title: "Web & App",
    description:
      "Platforms that operate, not just display. Scheduling, billing, multi-tenant data, the systems that run a business day to day. Built to scale and maintained by a team that understands the architecture.",
    capabilities: [
      "Web applications and multi-tenant SaaS platforms",
      "Role-based access, billing, and operational workflows",
      "API design, integrations, and service architecture",
      "Mobile applications and progressive web apps",
    ],
  },
  {
    tag: "04",
    title: "AI & Data",
    description:
      "Not a wrapper around an existing model. Real inference pipelines, edge deployment, and data systems built for the questions you actually need to answer. We train, deploy, and keep models useful over time.",
    capabilities: [
      "Model training, fine-tuning, and performance evaluation",
      "Edge inference on low-power hardware (Raspberry Pi, ESP32)",
      "Data pipelines, ETL processes, and warehouse design",
      "Decision dashboards and automated reporting",
    ],
  },
];

export function Hero() {
  const shouldReduceMotion = useReducedMotion();

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

  const panelContainer: Variants = {
    hidden: {},
    show: {
      transition: {
        delayChildren: shouldReduceMotion ? 0 : 0.55,
        staggerChildren: shouldReduceMotion ? 0 : 0.09,
      },
    },
  };

  const panelItem: Variants = {
    hidden: { opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 14 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: shouldReduceMotion ? 0 : 0.45, ease: "easeOut" as const },
    },
  };

  return (
    <section className="relative flex flex-col items-center overflow-hidden px-6 pt-28 pb-24">
      {/* Subtle glow behind heading */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[480px] bg-purple-glow" />

      <div className="relative z-10 mx-auto w-full max-w-4xl text-center">
        <motion.div
          custom={0}
          initial="hidden"
          animate="show"
          variants={fade}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-d8-purple bg-d8-surface px-5 py-2"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-d8-purple" />
          <span className="font-mono text-xs tracking-widest uppercase text-d8-purple-light">
            Engineering Solutions
          </span>
        </motion.div>

        <motion.h1
          custom={1}
          initial="hidden"
          animate="show"
          variants={fade}
          className="font-heading text-5xl font-semibold leading-tight tracking-tight text-d8-text-primary text-balance sm:text-6xl lg:text-7xl"
        >
          We build what others{" "}
          <span className="text-d8-purple">can&apos;t scope.</span>
        </motion.h1>

        <motion.p
          custom={2}
          initial="hidden"
          animate="show"
          variants={fade}
          className="mx-auto mt-6 max-w-2xl font-body text-lg leading-relaxed text-d8-text-secondary text-balance"
        >
          D8 works across R&D, embedded systems, web and app development, and AI
          — end to end, from concept to deployment. We take on hard problems and
          ship things that work.
        </motion.p>

        <motion.div
          custom={3}
          initial="hidden"
          animate="show"
          variants={fade}
          className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
        >
          <Link
            href="/contact"
            className="rounded-sm bg-d8-purple px-6 py-3 font-body text-sm font-medium text-white transition-opacity hover:opacity-90"
          >
            Start a project
          </Link>
          <Link
            href="/services"
            className="rounded-sm border border-d8-border px-6 py-3 font-body text-sm text-d8-text-secondary transition-colors hover:border-d8-text-dim hover:text-d8-text-primary"
          >
            About us
          </Link>
        </motion.div>
      </div>

      {/* Always-visible services panel */}
      <motion.div
        variants={panelContainer}
        initial="hidden"
        animate="show"
        className="relative z-10 mt-16 w-full max-w-6xl text-left"
      >
        <div className="divide-y divide-d8-border border-y border-d8-border">
          {services.map(({ tag, title, description, capabilities }) => (
            <motion.div
              key={tag}
              variants={panelItem}
              className="group -mx-4 grid cursor-default grid-cols-[2.5rem_1fr] gap-x-6 gap-y-6 px-4 py-10 transition-colors duration-200 hover:bg-d8-surface md:-mx-6 md:grid-cols-[2.5rem_2fr_3fr] md:items-start md:gap-x-12 md:gap-y-0 md:px-6"
            >
              <span className="mt-[0.4rem] font-mono text-xs text-d8-purple-light md:mt-[0.65rem]">
                {tag}
              </span>
              <h2 className="font-heading text-2xl font-semibold leading-none tracking-tight text-d8-text-primary transition-colors duration-200 group-hover:text-d8-purple-light md:text-3xl lg:text-4xl">
                {title}
              </h2>
              <div className="col-span-2 pl-[4rem] md:col-auto md:pl-0">
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

      {/* Bottom fade */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-d8-bg to-transparent" />
    </section>
  );
}
