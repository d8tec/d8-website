import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(req: NextRequest) {
  const resend = new Resend(process.env.RESEND_API_KEY);

  const { name, email, company, type, message } = await req.json();

  if (!name || !email || !type || !message) {
    return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
  }

  const to = process.env.CONTACT_EMAIL ?? "nalfaro@d8tec.com";

  const { error } = await resend.emails.send({
    from: "D8 Contact <contact@d8tec.com>",
    to,
    replyTo: email,
    subject: `${type} — ${name}${company ? ` · ${company}` : ""}`,
    text: [
      `Name: ${name}`,
      `Email: ${email}`,
      company ? `Company: ${company}` : "",
      `Type: ${type}`,
      ``,
      `Message:`,
      message,
    ]
      .filter(Boolean)
      .join("\n"),
  });

  if (error) {
    console.error("Resend error:", error);
    return NextResponse.json({ error: "Failed to send." }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
