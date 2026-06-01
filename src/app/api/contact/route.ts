import { NextResponse } from "next/server";

/* ============================================================
   Contact form Route Handler — SAFE SKELETON
   ------------------------------------------------------------
   This validates the submission and returns a clear JSON
   response. It does NOT yet forward the message anywhere.

   To go live, implement ONE delivery channel inside the marked
   TODO block below (email, CRM, Google Sheets, or LINE OA).
   Read any credentials from environment variables — never hard-
   code secrets. Document required vars in README.md, e.g.:

     CONTACT_TO_EMAIL=...        # inbox to receive leads
     RESEND_API_KEY=...          # if using Resend for email
     LINE_NOTIFY_TOKEN=...       # if using LINE Notify
     # (only add the vars for the channel you actually use)
   ============================================================ */

export type ContactPayload = {
  name?: string;
  phone?: string;
  email?: string;
  interest?: string;
  message?: string;
  /** Honeypot field — should always be empty for real users. */
  company?: string;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  let body: ContactPayload;
  try {
    body = (await request.json()) as ContactPayload;
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid request body." },
      { status: 400 },
    );
  }

  // Honeypot: silently accept bots without processing.
  if (body.company && body.company.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  // Validate required fields.
  const errors: Record<string, string> = {};
  if (!body.name || body.name.trim().length < 2) {
    errors.name = "กรุณากรอกชื่อ-นามสกุล";
  }
  if (!body.phone || body.phone.trim().length < 6) {
    errors.phone = "กรุณากรอกเบอร์โทรศัพท์ที่ติดต่อได้";
  }
  if (body.email && !EMAIL_RE.test(body.email.trim())) {
    errors.email = "รูปแบบอีเมลไม่ถูกต้อง";
  }

  if (Object.keys(errors).length > 0) {
    return NextResponse.json(
      { ok: false, error: "Validation failed.", fields: errors },
      { status: 422 },
    );
  }

  // TODO(integration): forward the validated lead to your channel of
  // choice using credentials from process.env. Until then we log on the
  // server only (no PII is persisted) and return success.
  //
  //   await sendEmail({ to: process.env.CONTACT_TO_EMAIL, ... })
  //   await postToLineNotify(process.env.LINE_NOTIFY_TOKEN, ...)
  //
  if (process.env.NODE_ENV !== "production") {
    console.info("[contact] received submission:", {
      name: body.name,
      phone: body.phone,
      interest: body.interest,
    });
  }

  return NextResponse.json({
    ok: true,
    message: "ได้รับข้อมูลของคุณแล้ว ทีมงานจะติดต่อกลับโดยเร็วที่สุด",
  });
}

/** Reject non-POST methods cleanly. */
export function GET() {
  return NextResponse.json(
    { ok: false, error: "Method not allowed." },
    { status: 405 },
  );
}
