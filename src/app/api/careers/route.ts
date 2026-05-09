import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const ALLOWED_TYPES = new Set([
  "application/pdf",
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/webp",
  "application/zip",
  "application/x-zip-compressed",
]);

const MAX_FILE_BYTES = 4 * 1024 * 1024; // 4 MB

export async function POST(req: NextRequest) {
  const resend = new Resend(process.env.RESEND_API_KEY);

  const fd = await req.formData();
  const name = fd.get("name") as string | null;
  const email = fd.get("email") as string | null;
  const area = fd.get("area") as string | null;
  const intro = fd.get("intro") as string | null;
  const link = fd.get("link") as string | null;
  const rawFile = fd.get("file");
  const file = rawFile instanceof File && rawFile.size > 0 ? rawFile : null;

  if (!name || !email || !area || !intro) {
    return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
  }

  if (file) {
    if (file.size > MAX_FILE_BYTES) {
      return NextResponse.json({ error: "File too large." }, { status: 400 });
    }
    if (!ALLOWED_TYPES.has(file.type)) {
      return NextResponse.json({ error: "Invalid file type." }, { status: 400 });
    }
  }

  const to = process.env.CAREERS_EMAIL ?? "contacto@d8tec.com";

  const attachments = file
    ? [{ filename: file.name, content: Buffer.from(await file.arrayBuffer()) }]
    : undefined;

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
      link ? `Work / Portfolio: ${link}` : null,
      file ? `Attachment: ${file.name}` : null,
    ]
      .filter((l): l is string => l !== null)
      .join("\n"),
    attachments,
  });

  if (error) {
    console.error("Resend error:", error);
    return NextResponse.json({ error: "Failed to send." }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
