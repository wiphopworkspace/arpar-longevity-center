"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { ArrowRight } from "@/components/ui/icons";
import { type Dictionary } from "@/data/content";

type Status = "idle" | "submitting" | "success" | "error";

const fieldClass =
  "w-full rounded-xl border border-line bg-white/80 px-4 py-3 text-sm text-ink placeholder:text-ink-soft/60 outline-none transition-colors focus:border-gold focus:ring-2 focus:ring-gold/20";

export function ContactForm({ dict }: { dict: Dictionary }) {
  const f = dict.form;
  const [status, setStatus] = useState<Status>("idle");
  const [feedback, setFeedback] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    setStatus("submitting");
    setFeedback("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        message?: string;
        error?: string;
      };

      if (res.ok && json.ok) {
        setStatus("success");
        setFeedback(json.message ?? f.successFallback);
        form.reset();
      } else {
        setStatus("error");
        setFeedback(json.error ?? f.errorFallback);
      }
    } catch {
      setStatus("error");
      setFeedback(f.networkError);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-ink">
            {f.name}
          </label>
          <input id="name" name="name" type="text" required autoComplete="name" placeholder={f.namePh} className={fieldClass} />
        </div>
        <div>
          <label htmlFor="phone" className="mb-1.5 block text-sm font-medium text-ink">
            {f.phone}
          </label>
          <input id="phone" name="phone" type="tel" required autoComplete="tel" placeholder={f.phonePh} className={fieldClass} />
        </div>
      </div>

      <div>
        <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-ink">
          {f.email}
        </label>
        <input id="email" name="email" type="email" autoComplete="email" placeholder={f.emailPh} className={fieldClass} />
      </div>

      <div>
        <label htmlFor="interest" className="mb-1.5 block text-sm font-medium text-ink">
          {f.interest}
        </label>
        <select id="interest" name="interest" className={fieldClass} defaultValue="">
          <option value="" disabled>
            {f.interestPh}
          </option>
          {dict.services.map((s) => (
            <option key={s.slug}>{s.title}</option>
          ))}
          <option>{f.interestOther}</option>
        </select>
      </div>

      <div>
        <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-ink">
          {f.message}
        </label>
        <textarea id="message" name="message" rows={4} placeholder={f.messagePh} className={`${fieldClass} resize-none`} />
      </div>

      {/* Honeypot */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="company">Company</label>
        <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <Button type="submit" size="lg" className="w-full" disabled={status === "submitting"}>
        {status === "submitting" ? f.submitting : f.submit}
        {status !== "submitting" && <ArrowRight width={18} height={18} />}
      </Button>

      {(status === "success" || status === "error") && feedback && (
        <p
          role="status"
          className={`rounded-xl border px-4 py-3 text-center text-sm font-medium ${
            status === "success"
              ? "border-gold/40 bg-gold-soft/30 text-ink"
              : "border-red-300 bg-red-50 text-red-700"
          }`}
        >
          {feedback}
        </p>
      )}

      <p className="text-center text-xs text-ink-soft/70">{f.privacy}</p>
    </form>
  );
}
