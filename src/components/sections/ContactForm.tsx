"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { ArrowRight } from "@/components/ui/icons";

type Status = "idle" | "submitting" | "success" | "error";

const fieldClass =
  "w-full rounded-xl border border-line bg-white/80 px-4 py-3 text-sm text-ink placeholder:text-ink-soft/60 outline-none transition-colors focus:border-gold focus:ring-2 focus:ring-gold/20";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [feedback, setFeedback] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    setStatus("submitting");
    setFeedback("");

    try {
      // Posts to the Route Handler at src/app/api/contact/route.ts.
      // The skeleton validates and returns success; wire up real
      // delivery there when credentials are available.
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
        setFeedback(
          json.message ??
            "ขอบคุณค่ะ — เราได้รับข้อมูลของคุณแล้ว ทีมงานจะติดต่อกลับโดยเร็วที่สุด",
        );
        form.reset();
      } else {
        setStatus("error");
        setFeedback(
          json.error ?? "เกิดข้อผิดพลาด กรุณาลองใหม่ หรือติดต่อเราผ่าน LINE/โทรศัพท์",
        );
      }
    } catch {
      setStatus("error");
      setFeedback(
        "ไม่สามารถส่งข้อมูลได้ในขณะนี้ กรุณาติดต่อเราผ่าน LINE หรือโทรศัพท์",
      );
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-ink">
            ชื่อ-นามสกุล
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            autoComplete="name"
            placeholder="ชื่อของคุณ"
            className={fieldClass}
          />
        </div>
        <div>
          <label htmlFor="phone" className="mb-1.5 block text-sm font-medium text-ink">
            เบอร์โทรศัพท์
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            required
            autoComplete="tel"
            placeholder="08X-XXX-XXXX"
            className={fieldClass}
          />
        </div>
      </div>

      <div>
        <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-ink">
          อีเมล
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          className={fieldClass}
        />
      </div>

      <div>
        <label htmlFor="interest" className="mb-1.5 block text-sm font-medium text-ink">
          บริการที่สนใจ
        </label>
        <select id="interest" name="interest" className={fieldClass} defaultValue="">
          <option value="" disabled>
            เลือกบริการ
          </option>
          <option>Personalized Preventive Checkup</option>
          <option>IV Drip Formulas</option>
          <option>Stem Cell &amp; NK Cell</option>
          <option>Hormone Balance &amp; HRT</option>
          <option>อื่น ๆ</option>
        </select>
      </div>

      <div>
        <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-ink">
          ข้อความ
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          placeholder="เล่าเป้าหมายสุขภาพของคุณให้เราทราบ"
          className={`${fieldClass} resize-none`}
        />
      </div>

      {/* Honeypot — hidden from users, catches bots. */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="company">Company</label>
        <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <Button type="submit" size="lg" className="w-full" disabled={status === "submitting"}>
        {status === "submitting" ? "กำลังส่ง..." : "ส่งข้อมูลเพื่อให้เราติดต่อกลับ"}
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

      <p className="text-center text-xs text-ink-soft/70">
        ข้อมูลของคุณจะถูกเก็บเป็นความลับและใช้เพื่อการติดต่อกลับเท่านั้น
      </p>
    </form>
  );
}
