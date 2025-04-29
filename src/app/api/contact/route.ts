import { NextResponse } from "next/server";
import { transporter } from "@/lib/smtpTransporter"; 
import EmailTemplate from "@/emails/EmailTemplate";
import { isRateLimited } from "@/lib/rateLimiter";
import { render } from "@react-email/components";

export async function POST(req: Request) {
  try {
    function getClientIp(req: Request) {
      const forwarded = req.headers.get("x-forwarded-for");
      if (forwarded) {
        return forwarded.split(",")[0].trim();
      }
      return req.headers.get("x-real-ip") || "unknown";
    }
    const ip = getClientIp(req);
    if (await isRateLimited(ip)) {
      return NextResponse.json({ error: "Too many requests, please slow down." }, { status: 429 });
    }

    const { name, email, message, website } = await req.json();
    if (website) {
      return NextResponse.json({ error: "Bot detected" }, { status: 400 });
    }
    if (!name || !email || !message) {
      return NextResponse.json({ error: "Invalid form data" }, { status: 400 });
    }

    const emailRegex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 });
    }

    const safeName = String(name).trim().slice(0, 100);
    const safeEmail = String(email).trim().slice(0, 100);
    const safeMessage = String(message).trim().slice(0, 2000);

    const htmlBody = await render(EmailTemplate({name, email, message,ip}), {
        pretty: true
    });

    await transporter.sendMail({
      from: `"Portfolio Contact" <${safeEmail}>`,
      to: process.env.SMTP_USER,
      subject: `New Contact from ${safeName}`,
      text: `${safeMessage}\n\nFrom: ${safeName} <${safeEmail}>`,
      html: htmlBody,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      { error: "Failed to send message. Please try again later." },
      { status: 500 }
    );
  }
}
