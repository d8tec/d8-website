import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(req: NextRequest) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  const { name, email, phone, message } = await req.json();

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
  }

  const to = process.env.CONTACT_EMAIL ?? "contacto@d8tec.com";

  const senderBlock = [
    `— ${name}`,
    email,
    phone || null,
  ].filter((l): l is string => l !== null).join("\n");

  const { error } = await resend.emails.send({
    from: "D8 Contact <contact@d8tec.com>",
    to,
    replyTo: email,
    subject: `New message — ${name}`,
    text: [message, ``, senderBlock].join("\n"),
  });

  if (error) {
    console.error("Resend error:", error);
    return NextResponse.json({ error: "Failed to send." }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
