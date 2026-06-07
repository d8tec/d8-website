"use client";

import { useState, useRef, type RefObject } from "react";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { sweepReveal, splitLineLine, arrowNudge, useMagneticButton, floatingCardEntrance, floatingCardContainer, slideUp } from "@/lib/animations";

type FormValues = {
  name: string;
  email: string;
  area: string;
  intro: string;
  link: string;
};

type Principle = { tag: string; name: string; desc: string };

const ALLOWED_TYPES = new Set([
  "application/pdf",
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/webp",
  "application/zip",
  "application/x-zip-compressed",
]);
const MAX_FILE_BYTES = 4 * 1024 * 1024;

const CRUMB_DELAYS = [0, 0.15, 0.3] as const;

export function CareersContent() {
  const t = useTranslations("careers");
  const tForm = useTranslations("careers.form");
  const principles = t.raw("principles") as Principle[];
  const areas = tForm.raw("areas") as string[];

  const shouldReduceMotion = useReducedMotion();
  const mag = useMagneticButton(0.3);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [file, setFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dragCounter = useRef(0);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>();

  const crumb: Variants = {
    rest: { opacity: 0, scale: 0 },
    hover: (d: number) => shouldReduceMotion ? { opacity: 0 } : ({
      opacity: [0, 1, 0],
      scale: [0, 1, 0],
      transition: { delay: d, duration: 0.5, ease: "easeOut" as const, repeat: Infinity, repeatDelay: 0.4 },
    }),
  };

  function formatBytes(bytes: number): string {
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  }

  function validateAndSetFile(f: File) {
    setFileError(null);
    if (f.size > MAX_FILE_BYTES) {
      setFileError(tForm("fields.fileTooBig"));
      setFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }
    if (!ALLOWED_TYPES.has(f.type)) {
      setFileError(tForm("fields.fileWrongType"));
      setFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }
    setFile(f);
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0] ?? null;
    if (f) validateAndSetFile(f);
    else setFile(null);
  }

  function clearFile() {
    setFile(null);
    setFileError(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  function handleDragEnter(e: React.DragEvent) {
    e.preventDefault();
    dragCounter.current++;
    setIsDragging(true);
  }

  function handleDragLeave(e: React.DragEvent) {
    e.preventDefault();
    dragCounter.current--;
    if (dragCounter.current === 0) setIsDragging(false);
  }

  function handleDragOver(e: React.DragEvent) {
    e.preventDefault();
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    dragCounter.current = 0;
    setIsDragging(false);
    const f = e.dataTransfer.files[0];
    if (f) validateAndSetFile(f);
  }

  async function onSubmit(data: FormValues) {
    setStatus("sending");
    try {
      const fd = new FormData();
      fd.append("name", data.name);
      fd.append("email", data.email);
      fd.append("area", data.area);
      fd.append("intro", data.intro);
      if (data.link) fd.append("link", data.link);
      if (file) fd.append("file", file);

      const res = await fetch("/api/careers", { method: "POST", body: fd });
      if (!res.ok) throw new Error();
      setStatus("sent");
      reset();
      clearFile();
    } catch {
      setStatus("error");
    }
  }

  return (
    <>
      {/* Page header */}
      <section className="px-6 pb-20 pt-40">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-5">
            <motion.span
              variants={sweepReveal}
              initial={shouldReduceMotion ? false : "hidden"}
              whileInView="visible"
              viewport={{ once: false }}
              className="inline-block font-mono text-xs uppercase tracking-widest text-d8-purple-light"
            >
              {t("overline")}
            </motion.span>
            <motion.h1
              variants={splitLineLine}
              initial={shouldReduceMotion ? false : "hidden"}
              animate="visible"
              transition={shouldReduceMotion ? undefined : { duration: 0.7, delay: 0.15, ease: [0.85, 0.09, 0.15, 0.91] }}
              className="font-heading text-4xl font-semibold leading-tight tracking-tight text-d8-text-primary text-balance sm:text-5xl"
            >
              {t("heading1")}
              <br />
              {t("heading2")}
            </motion.h1>
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

      {/* Principles */}
      <section className="border-t border-d8-border px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <motion.p
            variants={sweepReveal}
            initial={shouldReduceMotion ? false : "hidden"}
            whileInView="visible"
            viewport={{ once: false }}
            className="mb-8 inline-block font-mono text-xs uppercase tracking-widest text-d8-purple-light"
          >
            {t("howWeWork")}
          </motion.p>
          <motion.div
            variants={floatingCardContainer}
            initial={shouldReduceMotion ? false : "hidden"}
            whileInView="visible"
            viewport={{ once: false, margin: "-60px" }}
            className="divide-y divide-d8-border border-y border-d8-border"
          >
            {principles.map(({ tag, name, desc }) => (
              <motion.div
                key={tag}
                variants={floatingCardEntrance}
                whileHover={{ scale: 1.016, transition: { duration: 0.3, ease: [0, 0, 0.5, 1] } }}
                className="group -mx-4 grid cursor-default grid-cols-[3rem_1fr] gap-x-6 gap-y-3 px-4 py-8 transition-colors duration-200 hover:bg-d8-bg md:-mx-6 md:grid-cols-[3rem_2fr_3fr] md:items-start md:gap-x-14 md:gap-y-0 md:px-6"
              >
                <span className="mt-[0.25rem] font-mono text-sm font-semibold text-d8-purple-light md:mt-[0.45rem]">
                  {tag}
                </span>
                <h2 className="font-heading text-lg font-semibold leading-tight tracking-tight text-d8-text-primary transition-colors duration-200 group-hover:text-d8-purple-light md:text-xl">
                  {name}
                </h2>
                <p className="col-span-2 pl-[4.5rem] font-body text-sm leading-relaxed text-d8-text-secondary md:col-auto md:pl-0">
                  {desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Application form */}
      <section className="border-t border-d8-border px-6 pb-32 pt-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 md:grid-cols-[2fr_3fr] md:gap-16">
            {/* Left: context */}
            <div className="flex flex-col gap-4">
              <motion.p
                variants={sweepReveal}
                initial={shouldReduceMotion ? false : "hidden"}
                whileInView="visible"
                viewport={{ once: false }}
                transition={shouldReduceMotion ? undefined : { duration: 1.0, ease: [0.0, 0.0, 0.4, 1.0] }}
                className="inline-block font-mono text-xs uppercase tracking-widest text-d8-purple-light"
              >
                {tForm("overline")}
              </motion.p>
              <motion.div
                variants={floatingCardContainer}
                initial={shouldReduceMotion ? false : "hidden"}
                whileInView="visible"
                viewport={{ once: false, margin: "-60px" }}
                className="flex flex-col gap-4"
              >
                <motion.h2
                  variants={floatingCardEntrance}
                  className="font-heading text-2xl font-semibold leading-tight tracking-tight text-d8-text-primary"
                >
                  {tForm("heading")}
                </motion.h2>
                <motion.p variants={floatingCardEntrance} className="font-body text-sm leading-relaxed text-d8-text-secondary">
                  {tForm("body1")}
                </motion.p>
                <motion.p variants={floatingCardEntrance} className="font-body text-sm leading-relaxed text-d8-text-secondary">
                  {tForm("body2")}
                </motion.p>
              </motion.div>
            </div>

            {/* Right: form */}
            <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-5">
              {/* Name + Email */}
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="name" className="font-mono text-[11px] uppercase tracking-wider text-d8-text-secondary">
                    {tForm("fields.name")}
                  </label>
                  <input
                    id="name"
                    type="text"
                    autoComplete="name"
                    aria-required="true"
                    placeholder={tForm("fields.namePlaceholder")}
                    {...register("name", { required: true })}
                    className={`rounded-sm border bg-d8-surface px-4 py-3 font-body text-sm text-d8-text-primary placeholder:text-d8-text-dim focus:outline-none focus:ring-1 focus:ring-d8-purple transition-colors ${
                      errors.name ? "border-red-500/60" : "border-d8-border focus:border-d8-purple"
                    }`}
                  />
                  {errors.name && <p role="alert" className="font-mono text-[11px] text-red-400">Required</p>}
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="email" className="font-mono text-[11px] uppercase tracking-wider text-d8-text-secondary">
                    {tForm("fields.email")}
                  </label>
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    aria-required="true"
                    placeholder="you@example.com"
                    {...register("email", { required: true, pattern: /^\S+@\S+\.\S+$/ })}
                    className={`rounded-sm border bg-d8-surface px-4 py-3 font-body text-sm text-d8-text-primary placeholder:text-d8-text-dim focus:outline-none focus:ring-1 focus:ring-d8-purple transition-colors ${
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

              {/* Area */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="area" className="font-mono text-[11px] uppercase tracking-wider text-d8-text-secondary">
                  {tForm("fields.area")}
                </label>
                <div className="relative">
                  <select
                    id="area"
                    aria-required="true"
                    {...register("area", { required: true })}
                    className={`w-full appearance-none rounded-sm border bg-d8-surface px-4 py-3 pr-10 font-body text-sm text-d8-text-primary focus:outline-none focus:ring-1 focus:ring-d8-purple transition-colors ${
                      errors.area ? "border-red-500/60" : "border-d8-border focus:border-d8-purple"
                    }`}
                  >
                    <option value="" className="text-d8-text-dim">
                      {tForm("fields.areaPlaceholder")}
                    </option>
                    {areas.map((a) => (
                      <option key={a} value={a}>{a}</option>
                    ))}
                  </select>
                  <svg
                    className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-d8-text-dim"
                    viewBox="0 0 16 16"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                {errors.area && (
                  <p role="alert" className="font-mono text-[11px] text-red-400">Required</p>
                )}
              </div>

              {/* Intro */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="intro" className="font-mono text-[11px] uppercase tracking-wider text-d8-text-secondary">
                  {tForm("fields.intro")}
                </label>
                <textarea
                  id="intro"
                  rows={4}
                  aria-required="true"
                  placeholder={tForm("fields.introPlaceholder")}
                  {...register("intro", { required: true, minLength: 20 })}
                  className={`resize-none rounded-sm border bg-d8-surface px-4 py-3 font-body text-sm leading-relaxed text-d8-text-primary placeholder:text-d8-text-dim focus:outline-none focus:ring-1 focus:ring-d8-purple transition-colors ${
                    errors.intro ? "border-red-500/60" : "border-d8-border focus:border-d8-purple"
                  }`}
                />
                {errors.intro && (
                  <p role="alert" className="font-mono text-[11px] text-red-400">
                    {errors.intro.type === "minLength" ? "At least 20 characters" : "Required"}
                  </p>
                )}
              </div>

              {/* Link */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="link" className="font-mono text-[11px] uppercase tracking-wider text-d8-text-secondary">
                  {tForm("fields.link")}{" "}
                  <span className="normal-case tracking-normal text-d8-text-dim opacity-60">
                    {tForm("fields.linkOptional")}
                  </span>
                </label>
                <input
                  id="link"
                  type="url"
                  placeholder={tForm("fields.linkPlaceholder")}
                  {...register("link")}
                  className="rounded-sm border border-d8-border bg-d8-surface px-4 py-3 font-body text-sm text-d8-text-primary placeholder:text-d8-text-dim focus:border-d8-purple focus:outline-none focus:ring-1 focus:ring-d8-purple transition-colors"
                />
              </div>

              {/* File attachment — drag & drop zone */}
              <div className="flex flex-col gap-1.5">
                <span className="font-mono text-[11px] uppercase tracking-wider text-d8-text-secondary">
                  {tForm("fields.file")}{" "}
                  <span className="normal-case tracking-normal opacity-60">
                    {tForm("fields.fileOptional")}
                  </span>
                </span>
                <input
                  ref={fileInputRef}
                  id="file-upload"
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png,.gif,.webp,.zip"
                  onChange={handleFileChange}
                  className="sr-only"
                />
                <label
                  htmlFor="file-upload"
                  onDragEnter={handleDragEnter}
                  onDragLeave={handleDragLeave}
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                  className={`flex min-h-[5.5rem] cursor-pointer flex-col items-center justify-center gap-2 rounded-sm border-2 border-dashed px-4 py-5 text-center transition-colors duration-150 ${
                    isDragging
                      ? "border-d8-purple bg-d8-purple/[0.06]"
                      : fileError
                      ? "border-red-500/60"
                      : file
                      ? "border-d8-purple/40"
                      : "border-d8-border hover:border-d8-purple/60"
                  }`}
                >
                  {isDragging ? (
                    <>
                      <svg className="h-5 w-5 text-d8-purple-light" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                        <path d="M10 3v10M6 9l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M3 15h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                      </svg>
                      <span className="font-body text-sm text-d8-purple-light">{tForm("fields.fileDrop")}</span>
                    </>
                  ) : file ? (
                    <div className="flex w-full items-center gap-3 text-left">
                      <svg className="h-4 w-4 shrink-0 text-green-400" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                        <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.2" />
                        <path d="M5 8l2.5 2.5L11 5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                        <span className="truncate font-body text-sm text-d8-text-primary">{file.name}</span>
                        <span className="font-mono text-[10px] text-d8-text-dim">{formatBytes(file.size)}</span>
                      </div>
                      <button
                        type="button"
                        onClick={(e) => { e.preventDefault(); clearFile(); }}
                        aria-label="Remove file"
                        className="shrink-0 text-d8-text-dim transition-colors hover:text-d8-text-primary"
                      >
                        <svg className="h-4 w-4" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                          <path d="M12 4L4 12M4 4l8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                        </svg>
                      </button>
                    </div>
                  ) : (
                    <>
                      <svg className="h-5 w-5 text-d8-text-dim" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                        <path d="M10 13V4M7 7l3-3 3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M3 15h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                      </svg>
                      <div>
                        <span className="font-body text-sm text-d8-text-secondary">{tForm("fields.fileBrowse")}</span>
                        <span className="mt-0.5 block font-mono text-[10px] text-d8-text-dim">{tForm("fields.fileHint")}</span>
                      </div>
                    </>
                  )}
                </label>
                {fileError && (
                  <p role="alert" className="font-mono text-[11px] text-red-400">{fileError}</p>
                )}
              </div>

              {/* Submit */}
              <div className="flex items-center gap-4 pt-1">
                <motion.div
                  ref={mag.ref as RefObject<HTMLDivElement>}
                  className="inline-block"
                  initial="rest"
                  whileHover="hover"
                  style={shouldReduceMotion ? {} : { x: mag.x, y: mag.y }}
                  onMouseMove={shouldReduceMotion ? undefined : mag.handleMouseMove}
                  onMouseLeave={shouldReduceMotion ? undefined : mag.handleMouseLeave}
                >
                  <button
                    type="submit"
                    disabled={status === "sending" || status === "sent"}
                    className="inline-flex items-center gap-2 rounded-sm bg-d8-purple px-6 py-3 font-body text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {status === "sending" ? (
                      <span className="flex items-center gap-2">
                        <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        {tForm("sending")}
                      </span>
                    ) : status === "sent" ? (
                      tForm("sent")
                    ) : (
                      <>
                        {tForm("submit")}
                        <motion.span variants={arrowNudge} className="relative inline-block">
                          <span className="absolute right-full top-1/2 flex -translate-y-1/2 items-center gap-[2px] pr-px">
                            {CRUMB_DELAYS.map((d, i) => (
                              <motion.span
                                key={i}
                                custom={d}
                                variants={crumb}
                                className="h-0.5 w-0.5 bg-white"
                              />
                            ))}
                          </span>
                          <svg className="h-4 w-4" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                            <path d="M13.5 2.5l-12 5 5 1.5 1.5 5 5.5-11.5z" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M6.5 9l2.5-2.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
                          </svg>
                        </motion.span>
                      </>
                    )}
                  </button>
                </motion.div>

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
        </div>
      </section>
    </>
  );
}
