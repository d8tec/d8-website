"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

type Founder = {
  name: string;
  role: string;
  bio: string;
  image?: string;
  invite?: boolean;
};

export function Founders() {
  const t = useTranslations("founders");
  const list = t.raw("list") as Founder[];

  return (
    <section className="px-6 py-24 bg-d8-surface border-b border-d8-border">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, ease: "easeOut" }}
        >
          <span className="font-mono text-xs uppercase tracking-widest text-d8-purple-light">
            {t("overline")}
          </span>
          <h2 className="mt-6 font-heading text-3xl font-semibold tracking-tight text-d8-text-primary">
            {t("heading")}
          </h2>
        </motion.div>

        <div className="mt-16 flex flex-col divide-y divide-d8-border">
          {list.map((founder, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, ease: "easeOut", delay: i * 0.1 }}
              className={`flex flex-col sm:flex-row gap-10 items-start ${
                i === 0 ? "pb-20" : "py-20"
              }`}
            >
              <div className="relative w-full sm:w-52 aspect-[3/4] flex-shrink-0 overflow-hidden border border-d8-border bg-d8-bg">
                {founder.image ? (
                  <Image
                    src={founder.image}
                    alt={founder.name}
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 640px) 100vw, 208px"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center">
                    {founder.invite ? (
                      <span className="font-mono text-5xl font-light text-d8-purple-light opacity-30 select-none">
                        +
                      </span>
                    ) : (
                      <span className="font-mono text-xs uppercase tracking-widest text-d8-text-dim">
                        Photo soon
                      </span>
                    )}
                  </div>
                )}
              </div>

              <div className="flex flex-col pt-1">
                <span className="font-mono text-xs uppercase tracking-widest text-d8-purple-light">
                  {founder.role}
                </span>
                <h3 className="mt-2 font-heading text-xl font-semibold text-d8-text-primary">
                  {founder.name}
                </h3>
                <p className="mt-5 font-body text-sm leading-relaxed text-d8-text-secondary max-w-lg">
                  {founder.bio}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
