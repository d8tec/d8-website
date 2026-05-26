"use client";

import { useState, useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence, useReducedMotion, type Variants } from "framer-motion";
import { sweepReveal, dropInStagger, dropIn, gradientBorderReveal } from "@/lib/animations";

type ContactFormValues = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

const socials = [
  { name: "LinkedIn", handle: "@d8tec", href: "https://linkedin.com/company/d8tec" },
  { name: "Instagram", handle: "@d8tec", href: "https://instagram.com/d8tec" },
];

export function ContactContent() {
  const t = useTranslations("contact");
  const tForm = useTranslations("contact.form");
  const shouldReduceMotion = useReducedMotion();

  const [modalOpen, setModalOpen] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const nameInputRef = useRef<HTMLInputElement | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormValues>();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("open") === "1") {
      openModal();
      const url = new URL(window.location.href);
      url.searchParams.delete("open");
      window.history.replaceState({}, "", url.toString());
    }
    const handler = () => openModal();
    window.addEventListener("d8:open-contact", handler);
    return () => window.removeEventListener("d8:open-contact", handler);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!modalOpen) return;
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") closeModal(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [modalOpen]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    document.body.style.overflow = modalOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [modalOpen]);

  useEffect(() => {
    if (modalOpen) setTimeout(() => nameInputRef.current?.focus(), 50);
  }, [modalOpen]);

  function openModal() {
    setStatus("idle");
    reset();
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
    setStatus("idle");
    reset();
  }

  async function onSubmit(data: ContactFormValues) {
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, phone: data.phone || undefined }),
      });
      if (!res.ok) throw new Error();
      setStatus("sent");
      reset();
    } catch {
      setStatus("error");
    }
  }

  const item: Variants = {
    hidden: { opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 12 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: shouldReduceMotion ? 0 : 0.45, ease: "easeOut" as const },
    },
  };

  const { ref: nameRHFRef, ...nameProps } = register("name", { required: true });

  return (
    <>
      {/* Page header */}
      <section className="px-6 pt-40 pb-16">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-5">
            <motion.span
              variants={sweepReveal}
              initial={shouldReduceMotion ? false : "hidden"}
              animate="visible"
              className="inline-block font-mono text-xs uppercase tracking-widest text-d8-purple-light"
            >
              {t("overline")}
            </motion.span>
            <motion.h1
              variants={item}
              initial="hidden"
              animate="show"
              className="font-heading text-4xl font-semibold leading-tight tracking-tight text-d8-text-primary sm:text-5xl"
            >
              {t("heading")}
            </motion.h1>
            <motion.div variants={item} initial="hidden" animate="show" className="flex flex-col gap-2 pt-2">
              <p className="max-w-xl font-body text-sm leading-relaxed text-d8-text-secondary">
                {t("foundationBody")}
              </p>
              <p className="max-w-xl font-body text-sm leading-relaxed text-d8-text-dim italic">
                {t("foundationVerse")}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact bento */}
      <section className="border-t border-d8-border px-6 pb-24 pt-16">
        <div className="mx-auto max-w-7xl">
          <motion.div
            variants={dropInStagger}
            initial={shouldReduceMotion ? false : "hidden"}
            animate="visible"
            transition={shouldReduceMotion ? undefined : { delayChildren: 0.1, staggerChildren: 0.08 }}
            className="grid grid-cols-1 gap-3 md:grid-cols-3"
          >
            {/* Email — span 2, primary action */}
            <motion.button
              variants={dropIn}
              type="button"
              onClick={openModal}
              whileHover="hover"
              className="relative md:col-span-2 flex flex-col gap-3 border border-d8-border bg-d8-surface p-8 text-left group transition-colors hover:border-d8-purple/40 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-d8-purple"
            >
              <motion.div
                variants={gradientBorderReveal}
                initial="rest"
                className="absolute inset-0 pointer-events-none bg-d8-purple/[0.04]"
              />
              <span className="font-mono text-xs uppercase tracking-wider text-d8-purple-light">
                {t("rows.emailLabel")}
              </span>
              <span className="font-heading text-2xl font-semibold tracking-tight text-d8-text-primary transition-colors group-hover:text-d8-purple-light sm:text-3xl">
                contacto@d8tec.com
              </span>
              <span className="mt-auto font-body text-xs text-d8-text-dim pt-2">
                {t("rows.responseTime")}
              </span>
            </motion.button>

            {/* Phone */}
            <motion.div variants={dropIn} className="flex flex-col gap-6 border border-d8-border bg-d8-surface p-8">
              {["+506 6048-1496", "+506 7275-3532"].map((number) => (
                <div key={number} className="flex flex-col gap-1">
                  <span className="font-mono text-xs uppercase tracking-wider text-d8-purple-light">
                    {t("rows.phoneLabel")}
                  </span>
                  <a
                    href={`tel:${number.replace(/\s|-/g, "")}`}
                    className="font-heading text-xl font-semibold tracking-tight text-d8-text-primary transition-colors hover:text-d8-purple-light sm:text-2xl"
                  >
                    {number}
                  </a>
                </div>
              ))}
            </motion.div>

            {/* Location */}
            <motion.div variants={dropIn} className="flex flex-col gap-2 border border-d8-border bg-d8-surface p-8">
              <span className="font-mono text-xs uppercase tracking-wider text-d8-purple-light">
                {t("rows.locationLabel")}
              </span>
              <span className="font-heading text-xl font-semibold tracking-tight text-d8-text-primary sm:text-2xl">
                {t("rows.locationValue")}
              </span>
            </motion.div>

            {/* Hours */}
            <motion.div variants={dropIn} className="flex flex-col gap-2 border border-d8-border bg-d8-surface p-8">
              <span className="font-mono text-xs uppercase tracking-wider text-d8-purple-light">
                {t("rows.hoursLabel")}
              </span>
              <span className="font-heading text-xl font-semibold tracking-tight text-d8-text-primary sm:text-2xl">
                {t("rows.hoursValue")}
              </span>
            </motion.div>

            {/* Socials */}
            <motion.div variants={dropIn} className="flex flex-col gap-6 border border-d8-border bg-d8-surface p-8">
              {socials.map(({ name, handle, href }) => (
                <div key={name} className="flex flex-col gap-1">
                  <span className="font-mono text-xs uppercase tracking-wider text-d8-purple-light">
                    {name}
                  </span>
                  <Link
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-heading text-xl font-semibold tracking-tight text-d8-text-primary transition-colors hover:text-d8-purple-light sm:text-2xl"
                  >
                    {handle}
                  </Link>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Contact modal */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div
            key="contact-modal-overlay"
            className="fixed inset-0 z-50 flex items-center justify-center px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.2 }}
            onClick={closeModal}
          >
            <div className="absolute inset-0 bg-d8-bg/80" aria-hidden="true" />

            <motion.div
              className="relative w-full max-w-lg"
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.25, ease: "easeOut" as const }}
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-labelledby="contact-modal-title"
            >
              <div className="rounded-sm border border-d8-border bg-d8-surface p-8 shadow-2xl">
                {/* Modal header */}
                <div className="mb-6 flex items-start justify-between gap-4">
                  <h2
                    id="contact-modal-title"
                    className="font-heading text-xl font-semibold tracking-tight text-d8-text-primary"
                  >
                    {tForm("heading")}
                  </h2>
                  <button
                    type="button"
                    onClick={closeModal}
                    aria-label="Close"
                    className="mt-0.5 shrink-0 text-d8-text-dim transition-colors hover:text-d8-text-primary"
                  >
                    <svg className="h-5 w-5" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                      <path d="M15 5L5 15M5 5l10 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-4">
                  {/* Name + Email */}
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="contact-name" className="font-mono text-[11px] uppercase tracking-wider text-d8-text-dim">
                        {tForm("fields.name")}
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        autoComplete="name"
                        aria-required="true"
                        placeholder={tForm("fields.namePlaceholder")}
                        {...nameProps}
                        ref={(el) => {
                          nameRHFRef(el);
                          nameInputRef.current = el;
                        }}
                        className={`rounded-sm border bg-d8-bg px-4 py-3 font-body text-sm text-d8-text-primary placeholder:text-d8-text-dim focus:outline-none focus:ring-1 focus:ring-d8-purple transition-colors ${
                          errors.name ? "border-red-500/60" : "border-d8-border focus:border-d8-purple"
                        }`}
                      />
                      {errors.name && (
                        <p role="alert" className="font-mono text-[11px] text-red-400">Required</p>
                      )}
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="contact-email" className="font-mono text-[11px] uppercase tracking-wider text-d8-text-dim">
                        {tForm("fields.email")}
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        autoComplete="email"
                        aria-required="true"
                        placeholder="you@example.com"
                        {...register("email", { required: true, pattern: /^\S+@\S+\.\S+$/ })}
                        className={`rounded-sm border bg-d8-bg px-4 py-3 font-body text-sm text-d8-text-primary placeholder:text-d8-text-dim focus:outline-none focus:ring-1 focus:ring-d8-purple transition-colors ${
                          errors.email ? "border-red-500/60" : "border-d8-border focus:border-d8-purple"
                        }`}
                      />
                      {errors.email && (
                        <p role="alert" className="font-mono text-[11px] text-red-400">
                          {errors.email.type === "pattern" ? "Valid email required" : "Required"}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="contact-phone" className="font-mono text-[11px] uppercase tracking-wider text-d8-text-dim">
                      {tForm("fields.phone")}{" "}
                      <span className="normal-case tracking-normal opacity-60">{tForm("fields.phoneOptional")}</span>
                    </label>
                    <input
                      id="contact-phone"
                      type="tel"
                      autoComplete="tel"
                      placeholder={tForm("fields.phonePlaceholder")}
                      {...register("phone")}
                      className="rounded-sm border border-d8-border bg-d8-bg px-4 py-3 font-body text-sm text-d8-text-primary placeholder:text-d8-text-dim focus:border-d8-purple focus:outline-none focus:ring-1 focus:ring-d8-purple transition-colors"
                    />
                  </div>

                  {/* Message */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="contact-message" className="font-mono text-[11px] uppercase tracking-wider text-d8-text-dim">
                      {tForm("fields.message")}
                    </label>
                    <textarea
                      id="contact-message"
                      rows={4}
                      aria-required="true"
                      placeholder={tForm("fields.messagePlaceholder")}
                      {...register("message", { required: true, minLength: 10 })}
                      className={`resize-none rounded-sm border bg-d8-bg px-4 py-3 font-body text-sm leading-relaxed text-d8-text-primary placeholder:text-d8-text-dim focus:outline-none focus:ring-1 focus:ring-d8-purple transition-colors ${
                        errors.message ? "border-red-500/60" : "border-d8-border focus:border-d8-purple"
                      }`}
                    />
                    {errors.message && (
                      <p role="alert" className="font-mono text-[11px] text-red-400">
                        {errors.message.type === "minLength" ? "At least 10 characters" : "Required"}
                      </p>
                    )}
                  </div>

                  {/* Submit */}
                  <div className="flex items-center gap-4 pt-1">
                    <button
                      type="submit"
                      disabled={status === "sending" || status === "sent"}
                      className="rounded-sm bg-d8-purple px-6 py-3 font-body text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {status === "sending"
                        ? tForm("sending")
                        : status === "sent"
                        ? tForm("sent")
                        : tForm("submit")}
                    </button>
                    {status === "sent" && (
                      <p role="status" className="font-body text-sm text-d8-purple-light">
                        {tForm("successMsg")}
                      </p>
                    )}
                    {status === "error" && (
                      <p role="alert" className="font-body text-sm text-red-400">
                        {tForm("errorMsg")}
                      </p>
                    )}
                  </div>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
