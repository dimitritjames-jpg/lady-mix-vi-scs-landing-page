import { NextResponse } from "next/server";

type BookingPayload = {
  name: string;
  email: string;
  phone: string;
  eventType: string;
  eventDate: string;
  eventLocation: string;
  guestCount: string;
  message: string;
};

function asString(value: unknown) {
  return typeof value === "string" ? value : "";
}

export async function POST(request: Request) {
  let payload: BookingPayload;
  try {
    const body = await request.json();
    payload = {
      name: asString(body.name),
      email: asString(body.email),
      phone: asString(body.phone),
      eventType: asString(body.eventType),
      eventDate: asString(body.eventDate),
      eventLocation: asString(body.eventLocation),
      guestCount: asString(body.guestCount),
      message: asString(body.message),
    };
  } catch {
    return NextResponse.json({ ok: false, reason: "Invalid payload format." }, { status: 400 });
  }

  const required = [payload.name.trim(), payload.email.trim(), payload.eventType.trim()];
  if (required.some((value) => !value)) {
    return NextResponse.json(
      { ok: false, reason: "Name, email, and event type are required." },
      { status: 422 },
    );
  }

  const to = process.env.BOOKING_TO_EMAIL || "ladymixvi@gmail.com";
  const from = process.env.BOOKING_FROM_EMAIL || to;
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      {
        ok: false,
        reason: "Email API key is not configured. Use static mailto fallback.",
      },
      { status: 503 },
    );
  }

  const subject = `Booking inquiry for Lady Mix VI — ${payload.eventType}`;
  const text = [
    "Hi Lady Mix VI,",
    "",
    "I would like to plan an event.",
    "",
    `Name: ${payload.name}`,
    `Email: ${payload.email}`,
    `Phone: ${payload.phone || "N/A"}`,
    `Event type: ${payload.eventType}`,
    `Event date: ${payload.eventDate || "TBD"}`,
    `Location: ${payload.eventLocation || "TBD"}`,
    `Estimated guest count: ${payload.guestCount || "N/A"}`,
    `Message / vibe request: ${payload.message || "N/A"}`,
    "",
    "Please confirm availability and next steps.",
  ].join("\n");

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to,
      subject,
      text,
    }),
  });

  const responseBody = await response.text();
  if (!response.ok) {
    return NextResponse.json(
      {
        ok: false,
        reason: responseBody || "Email provider returned an error.",
      },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true, reason: "Booking inquiry queued." });
}
