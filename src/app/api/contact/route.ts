import { NextResponse } from "next/server";
import { Resend } from "resend";
import EmailTemplate from "@/components/EmailTemplate";
import { isRateLimited } from "@/lib/rateLimiter";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const ip = req.headers.get("x-forwarded-for") || "unknown";
    if (await isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many requests, please slow down." },
        { status: 429 }
      );
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
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    const safeName = String(name).trim().slice(0, 100);
    const safeEmail = String(email).trim().slice(0, 100);
    const safeMessage = String(message).trim().slice(0, 2000);

    const response = await resend.emails.send({
      from: "Baginda Contact Form <codewizard211@gmail.com>",
      to: ["codewizard211@gmail.com"],
      subject: `New Contact from ${safeName}`,
      react: EmailTemplate({
        name: safeName,
        email: safeEmail,
        message: safeMessage,
      }),
    });
    return NextResponse.json(response);
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      { error: "Failed to send message. Please try again later." },
      { status: 500 }
    );
  }
}
