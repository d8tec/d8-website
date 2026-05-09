import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(req: NextRequest) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  const { name, email, area, intro, link } = await req.json();

  if (!name || !email || !area || !intro) {
    return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
  }

  const to = process.env.CAREERS_EMAIL ?? "nalfaro@d8tec.com";

  const { error } = await resend.emails.send({
    from: "D8 Careers <careers@d8tec.com>",
    to,
    replyTo: email,
    subject: `New application — ${area} — ${name}`,
    text: [
      `Name: ${name}`,
      `Email: ${email}`,
      `Area: ${area}`,
      ``,
      `Intro:`,
      intro,
      ``,
      link ? `Work / Portfolio: ${link}` : "",
    ]
      .filter((l) => l !== undefined)
      .join("\n"),
  });

  if (error) {
    console.error("Resend error:", error);
    return NextResponse.json({ error: "Failed to send." }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
