"use client";

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

export function ServicesContent() {
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
      <section className="px-6 pb-16 pt-32">
        <div className="mx-auto max-w-6xl">
          <motion.div
            variants={headerFade}
            initial="hidden"
            animate="show"
            className="flex flex-col gap-5"
          >
            <motion.span
              variants={headerItem}
              className="font-mono text-xs uppercase tracking-widest text-d8-purple-light"
            >
              Services
            </motion.span>
            <motion.h1
              variants={headerItem}
              className="font-heading text-4xl font-semibold leading-tight tracking-tight text-d8-text-primary text-balance sm:text-5xl"
            >
              Four domains. One team.
            </motion.h1>
            <motion.p
              variants={headerItem}
              className="max-w-2xl font-body text-base leading-relaxed text-d8-text-secondary"
            >
              We work across R&D, hardware, software, and AI in one team, without
              the handoffs or overhead of managing multiple vendors. Most projects
              touch more than one domain.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Service rows */}
      <section className="px-6 pb-24">
        <div className="mx-auto max-w-6xl">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            className="divide-y divide-d8-border border-y border-d8-border"
          >
            {services.map(({ tag, title, description, capabilities }) => (
              <motion.div
                key={tag}
                variants={itemVariants}
                className="group -mx-4 grid cursor-default grid-cols-[2.5rem_1fr] gap-x-6 gap-y-6 px-4 py-12 transition-colors duration-200 hover:bg-d8-surface md:-mx-6 md:grid-cols-[2.5rem_2fr_3fr] md:items-start md:gap-x-12 md:gap-y-0 md:px-6"
              >
                <span className="font-mono text-xs text-d8-purple-light mt-[0.4rem] md:mt-[0.75rem]">
                  {tag}
                </span>
                <h2 className="font-heading text-3xl font-semibold leading-none tracking-tight text-d8-text-primary transition-colors duration-200 group-hover:text-d8-purple-light md:text-4xl lg:text-5xl">
                  {title}
                </h2>
                <div className="col-span-2 pl-[4rem] md:col-auto md:pl-0">
                  <p className="font-body text-sm leading-relaxed text-d8-text-secondary">
                    {description}
                  </p>
                  <ul className="mt-6 flex flex-col gap-2.5">
                    {capabilities.map((cap) => (
                      <li key={cap} className="flex items-start gap-3">
                        <span className="mt-[7px] h-1 w-1 flex-shrink-0 rounded-full bg-d8-purple" aria-hidden="true" />
                        <span className="font-body text-sm text-d8-text-secondary">{cap}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  );
}
