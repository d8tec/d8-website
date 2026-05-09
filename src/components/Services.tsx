"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";

const services = [
  {
    tag: "01",
    title: "R&D",
    description:
      "Prototype-to-proof work. We dig into the unknown, run experiments, and produce results you can build on.",
  },
  {
    tag: "02",
    title: "Hardware & Software",
    description:
      "Firmware, embedded systems, and the full stack that connects them. ESP32 to cloud, PCB to dashboard.",
  },
  {
    tag: "03",
    title: "Web & App",
    description:
      "Interfaces that do real work. Fast, maintainable, and built to scale — not just to ship.",
  },
  {
    tag: "04",
    title: "AI & Data",
    description:
      "Model training, inference pipelines, and edge deployment. We build systems that learn and systems that deliver.",
  },
];

export function Services() {
  const shouldReduceMotion = useReducedMotion();

  const containerVariants: Variants = {
    hidden: {},
    show: {
      transition: { staggerChildren: shouldReduceMotion ? 0 : 0.09 },
    },
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
    <section className="border-t border-d8-border py-24 px-6">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <h2 className="font-heading text-3xl font-semibold text-d8-text-primary tracking-tight">
            What we do
          </h2>
          <p className="font-body text-sm text-d8-text-secondary max-w-sm">
            Four domains, one team. Projects routinely cross all of them.
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="divide-y divide-d8-border border-t border-d8-border"
        >
          {services.map(({ tag, title, description }) => (
            <motion.div
              key={tag}
              variants={itemVariants}
              className="group -mx-4 grid cursor-default grid-cols-[2rem_1fr] gap-x-6 gap-y-4 px-4 py-10 transition-colors duration-200 hover:bg-d8-surface md:-mx-6 md:grid-cols-[2rem_1fr_30ch] md:items-baseline md:gap-x-12 md:gap-y-0 md:px-6"
            >
              <span className="font-mono text-xs text-d8-purple-light mt-[0.4rem] md:mt-[0.6rem]">
                {tag}
              </span>
              <h3 className="font-heading text-3xl font-semibold leading-none tracking-tight text-d8-text-primary transition-colors duration-200 group-hover:text-d8-purple-light md:text-4xl lg:text-5xl">
                {title}
              </h3>
              <p className="col-span-2 pl-[3.5rem] font-body text-sm leading-relaxed text-d8-text-secondary md:col-auto md:pl-0">
                {description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
