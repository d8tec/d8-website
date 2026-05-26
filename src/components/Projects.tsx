"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/navigation";
import { motion, useReducedMotion } from "framer-motion";
import { sweepReveal, floatingCardContainer, floatingCardEntrance } from "@/lib/animations";

type FeaturedProject = { title: string; description: string };

const tags = [
  ["ESP32", "React", "Cloud"],
  ["Next.js", "TypeScript", "PostgreSQL"],
  ["Next.js", "Multi-tenant", "PostgreSQL"],
  ["Python", "Automation", "FastAPI"],
  ["ESP32", "React", "IoT"],
];

export function Projects() {
  const t = useTranslations();
  const projects = t.raw("featuredProjects") as FeaturedProject[];
  const tAbout = useTranslations("about");
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="border-t border-d8-border py-28 px-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <motion.h2
            variants={sweepReveal}
            initial={shouldReduceMotion ? false : "hidden"}
            whileInView="visible"
            viewport={{ once: true }}
            className="font-heading text-3xl font-semibold text-d8-text-primary tracking-tight"
          >
            {tAbout("selectedWork")}
          </motion.h2>
          <Link
            href="/projects"
            className="py-2 -my-2 font-body text-sm text-d8-text-secondary underline-offset-4 hover:text-d8-purple hover:underline"
          >
            {tAbout("viewAll")}
          </Link>
        </div>

        <motion.div
          variants={floatingCardContainer}
          initial={shouldReduceMotion ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="flex flex-col divide-y divide-d8-border border-y border-d8-border"
        >
          {projects.map(({ title, description }, i) => (
            <motion.div
              key={title}
              variants={floatingCardEntrance}
              whileHover={{ scale: 1.016, transition: { duration: 0.3, ease: [0, 0, 0.5, 1] } }}
              className="group flex flex-col gap-3 py-8 transition-colors hover:bg-d8-bg md:flex-row md:items-start md:gap-12 md:px-4"
            >
              <div className="flex-1">
                <h3 className="font-heading text-lg font-semibold text-d8-text-primary transition-colors group-hover:text-d8-purple-light">
                  {title}
                </h3>
                <p className="mt-2 font-body text-sm leading-relaxed text-d8-text-secondary">
                  {description}
                </p>
              </div>
              <div className="flex flex-wrap gap-2 md:w-56 md:flex-col md:items-end md:gap-1.5">
                {tags[i]?.map((tag) => (
                  <span key={tag} className="font-mono text-xs text-d8-text-secondary">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
