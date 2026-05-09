"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";

const processStages = [
  {
    num: "01",
    name: "Model",
    desc: "Feasibility, architecture, and system planning before anything is built.",
  },
  {
    num: "02",
    name: "Design",
    desc: "Schematics, UX, hardware layouts, and detailed technical specification.",
  },
  {
    num: "03",
    name: "Create",
    desc: "Firmware, software, PCBs — the production-quality artifact.",
  },
  {
    num: "04",
    name: "Prototype",
    desc: "Field validation, iteration, and the handoff to deployment.",
  },
];

const industries = [
  {
    tag: "01",
    name: "Industrial IoT",
    stages: [true, true, true, true],
    description:
      "Sensor networks, edge firmware, real-time data pipelines, and the operational dashboards that make them useful. D8 takes industrial IoT from first datasheet to deployed, field-proven system.",
  },
  {
    tag: "02",
    name: "Manufacturing & QC",
    stages: [true, true, true, true],
    description:
      "On-device vision systems and quality inspection pipelines that run at manufacturing speed. Sub-100ms inference, no cloud dependency — designed for the line, not the server room.",
  },
  {
    tag: "03",
    name: "Property Technology",
    stages: [false, true, true, false],
    description:
      "Resident platforms, condo administration tools, and building management software. Designed for the person who runs the building, not just the person who commissioned the software.",
  },
  {
    tag: "04",
    name: "Personal Services",
    stages: [false, true, true, false],
    description:
      "Booking, scheduling, and service management platforms for independent operators. Designed to replace spreadsheets and group chats with tools people actually use.",
  },
  {
    tag: "05",
    name: "Field Operations",
    stages: [false, true, true, false],
    description:
      "Operations platforms for companies that coordinate people and assets in the field: scheduling, dispatch, billing, and the reporting that keeps management informed.",
  },
  {
    tag: "06",
    name: "R&D & Deep Tech",
    stages: [true, true, true, true],
    description:
      "Feasibility work, novel systems, and first-of-kind builds. When the problem is undefined or the technology doesn't yet exist, D8 builds the evidence that makes the next decision possible.",
  },
];

export function ProjectsContent() {
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
              Industries
            </motion.span>
            <motion.h1
              variants={headerItem}
              className="font-heading text-4xl font-semibold leading-tight tracking-tight text-d8-text-primary text-balance sm:text-5xl"
            >
              The full engineering cycle.
            </motion.h1>
            <motion.p
              variants={headerItem}
              className="max-w-2xl font-body text-base leading-relaxed text-d8-text-secondary"
            >
              From modeling to prototyping — across six industries where existing
              solutions are fragmented, overpriced, or simply missing.
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
                  {/* Process stage tags */}
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
