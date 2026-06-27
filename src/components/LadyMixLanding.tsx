"use client";

import { FormEvent, useMemo, useState } from "react";
import { bookingChips, bookingDetails, floatingMedia, LADY_MIX_EMAIL } from "../data/site";

type FormState = {
  name: string;
  email: string;
  phone: string;
  eventType: string;
  eventDate: string;
  eventLocation: string;
  guestCount: string;
  message: string;
};

type SubmitState = {
  type: "idle" | "sending" | "success" | "fallback" | "error";
  message: string;
};

const navItems = [
  { label: "Home", href: "#top" },
  { label: "About", href: "#about" },
  { label: "Events", href: "#events" },
  { label: "Mixes", href: "#mixes" },
  { label: "Gallery", href: "#gallery" },
  { label: "Booking", href: "#booking" },
  { label: "Contact", href: "#contact" },
];

function buildMailto(payload: FormState) {
  const subject = `Booking inquiry for Lady Mix VI — ${payload.eventType || "General booking"}`;
  const body = `Hi Lady Mix VI,\n\nI would like to plan an event.\n\nName: ${payload.name || ""}\nEmail: ${payload.email || ""}\nPhone: ${payload.phone || ""}\nEvent type: ${payload.eventType || ""}\nEvent date: ${payload.eventDate || ""}\nLocation: ${payload.eventLocation || ""}\nEstimated guest count: ${payload.guestCount || ""}\nMessage/vibe request: ${payload.message || ""}\n\nPlease confirm your availability and next steps.\n`;

  return `mailto:${LADY_MIX_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export default function LadyMixLanding() {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    phone: "",
    eventType: "Private Parties",
    eventDate: "",
    eventLocation: "",
    guestCount: "",
    message: "",
  });
  const [status, setStatus] = useState<SubmitState>({ type: "idle", message: "" });

  const mailtoHref = useMemo(() => buildMailto(form), [form]);

  const summaryText = useMemo(
    () =>
      [
        `Name: ${form.name || "—"}`,
        `Email: ${form.email || "—"}`,
        `Phone: ${form.phone || "—"}`,
        `Event type: ${form.eventType || "—"}`,
        `Event date: ${form.eventDate || "—"}`,
        `Location: ${form.eventLocation || "—"}`,
        `Guest count: ${form.guestCount || "—"}`,
        `Vibe notes: ${form.message || "—"}`,
      ].join("\n"),
    [form],
  );

  const setChipIntent = (intent: string) => {
    setForm((prev) => ({
      ...prev,
      eventType: intent,
      message: prev.message || `${intent} inquiry` ,
    }));
  };

  const setField = (field: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const canSubmit = form.name.trim() && form.email.trim() && form.eventType.trim() && form.email.includes("@");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!canSubmit) {
      setStatus({
        type: "error",
        message: "Please enter your name, email, and event type before submitting.",
      });
      return;
    }

    setStatus({ type: "sending", message: "Preparing inquiry..." });
    try {
      const response = await fetch("/api/booking", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(form),
      });

      if (response.ok) {
        setStatus({
          type: "success",
          message: "Inquiry submitted. Your details were sent to the SCS booking pipeline.",
        });
        return;
      }

      window.location.href = mailtoHref;
      setStatus({
        type: "fallback",
        message:
          "Booking API is not configured. Opened a prefilled email to ladymixvi@gmail.com so you can send it directly.",
      });
    } catch {
      window.location.href = mailtoHref;
      setStatus({
        type: "fallback",
        message:
          "Sending through API failed. Opened a prefilled email to ladymixvi@gmail.com so your inquiry is safe to send.",
      });
    }
  }

  return (
    <main className="site-shell">
      <div className="ambient ambient-one" aria-hidden="true" />
      <div className="ambient ambient-two" aria-hidden="true" />
      <div className="ambient ambient-three" aria-hidden="true" />
      <div className="stage-haze" aria-hidden="true" />
      <div className="grain" aria-hidden="true" />

      <header className="top-nav" aria-label="Main navigation">
        <a className="brand" href="#top" aria-label="Lady Mix VI home">
          <span>LADY <strong>MIX VI</strong></span>
          <small>THE VI DJ EXPERIENCE</small>
        </a>
        <nav className="desktop-nav" aria-label="Primary">
          {navItems.map((item) => (
            <a key={item.label} className={item.label === "Home" ? "active" : ""} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
        <div className="nav-actions" aria-label="Social and booking links">
          <a href="https://www.instagram.com/ladymixvi/" target="_blank" rel="noreferrer" aria-label="Instagram">
            IG
          </a>
          <a href="https://www.facebook.com/ladymixvi/" target="_blank" rel="noreferrer" aria-label="Facebook">
            FB
          </a>
          <a className="nav-cta" href="#booking">
            Book Lady Mix VI
          </a>
        </div>
      </header>

      <section className="hero" id="top" aria-labelledby="hero-title">
        <div className="dj-hero-art" aria-hidden="true">
          <div className="dj-glow" />
          <div className="dj-figure">
            <div className="hair" />
            <div className="face" />
            <div className="necklace">Mix</div>
            <div className="sparkle-top" />
            <div className="arm arm-left" />
            <div className="arm arm-right" />
          </div>
          <div className="controller">
            <span>Pioneer DJ</span>
            <i />
            <i />
            <i />
            <i />
          </div>
        </div>

        <div className="floating-board" aria-hidden="true">
          {floatingMedia.map((card) => (
            <article key={card.className} className={`media-card ${card.className}`}>
              <span>{card.eyebrow}</span>
              <strong>{card.title}</strong>
              {card.mediaSrc ? <img src={card.mediaSrc} alt="" aria-hidden="true" /> : null}
            </article>
          ))}
        </div>

        <section className="concierge-card" aria-label="SCS floating concierge booking panel">
          <div className="portrait-orb" aria-hidden="true">
            <span />
          </div>
          <p className="kicker">SCS FLOATING CONCIERGE</p>
          <h1 id="hero-title">
            BOOK <em>Lady Mix VI</em>
          </h1>
          <p className="tagline">Your event. Your vibe. My soundtrack.</p>

          <p className="prompt-label">Pick your event type and send the full inquiry.</p>
          <div className="chip-grid" role="list" aria-label="Booking shortcuts">
            {bookingChips.map((chip) => (
              <button
                key={chip.label}
                className={form.eventType === chip.label ? "selected" : ""}
                type="button"
                onClick={() => setChipIntent(chip.label)}
              >
                <span>{chip.icon}</span>
                {chip.label}
              </button>
            ))}
          </div>

          <form className="booking-form" onSubmit={handleSubmit}>
            <label htmlFor="guest-name">
              Name
              <input
                id="guest-name"
                value={form.name}
                onChange={(event) => setField("name", event.target.value)}
                placeholder="Your full name"
                required
              />
            </label>
            <label htmlFor="guest-email">
              Email
              <input
                id="guest-email"
                type="email"
                value={form.email}
                onChange={(event) => setField("email", event.target.value)}
                placeholder="you@email.com"
                required
              />
            </label>
            <label htmlFor="guest-phone">
              Phone
              <input
                id="guest-phone"
                type="tel"
                value={form.phone}
                onChange={(event) => setField("phone", event.target.value)}
                placeholder="(###) ###-####"
              />
            </label>
            <label htmlFor="event-date">
              Event date
              <input
                id="event-date"
                type="date"
                value={form.eventDate}
                onChange={(event) => setField("eventDate", event.target.value)}
              />
            </label>
            <label htmlFor="event-location">
              Event location
              <input
                id="event-location"
                value={form.eventLocation}
                onChange={(event) => setField("eventLocation", event.target.value)}
                placeholder="Villa, hotel, club, destination"
              />
            </label>
            <label htmlFor="guest-count">
              Estimated guest count
              <input
                id="guest-count"
                type="number"
                min={1}
                value={form.guestCount}
                onChange={(event) => setField("guestCount", event.target.value)}
                placeholder="30"
              />
            </label>
            <label htmlFor="event-message">
              Message / vibe request
              <textarea
                id="event-message"
                value={form.message}
                onChange={(event) => setField("message", event.target.value)}
                rows={3}
                placeholder="Tell me your vibe, songs, and timeline..."
              />
            </label>
            <label htmlFor="event-type" className="hidden-label">
              Event type
              <input id="event-type" value={form.eventType} readOnly />
            </label>

            <div className="booking-summary" aria-live="polite">
              <p>Inquiry preview</p>
              <pre>{summaryText}</pre>
            </div>

            <button className="primary-cta" type="submit" disabled={!canSubmit || status.type === "sending"}>
              {status.type === "sending" ? "Submitting..." : "Submit Booking Inquiry"}
            </button>
            <a className="secondary-cta" href={mailtoHref}>
              Open prefilled email draft
            </a>
          </form>

          {status.message ? <p className={`submit-feedback ${status.type}`}>{status.message}</p> : null}
          <p className="secure-line">Powered by SCS • Secure • Personalized • Seamless</p>
        </section>
      </section>

      <section className="proof-strip" id="gallery" aria-label="Event trust strip">
        <p>Trusted by unforgettable events and private brands</p>
        {["Barbie Brunch", "Island Girls Love R&B", "Private Villas", "Resort Events", "Corporate Mixers", "VI Nightlife"].map(
          (logo) => (
            <span key={logo}>{logo}</span>
          )
        )}
      </section>

      <div id="about" />

      <section className="below-fold" aria-label="Booking preview sections">
        <article className="panel featured" id="events">
          <div className="panel-head">
            <h2>Featured Events</h2>
            <a href="#booking">View All →</a>
          </div>
          <div className="event-tiles">
            <div>
              <strong>Island Girls Love R&B</strong>
            </div>
            <div>
              <strong>Barbie Brunch</strong>
            </div>
            <div>
              <strong>VI To The World</strong>
            </div>
          </div>
        </article>
        <article className="panel mixes" id="mixes">
          <div className="panel-head">
            <h2>Recent Mixes</h2>
            <a href="#booking">View All →</a>
          </div>
          <div className="mix-card">
            <div className="cover">VOL. 6</div>
            <button aria-label="Play preview" type="button">
              ▶
            </button>
            <div className="wave" />
            <div>
              <strong>Island Girls Love R&B Vol. 6</strong>
              <a href="#booking">Listen Now →</a>
            </div>
          </div>
        </article>
        <article className="panel booking" id="booking">
          <div id="contact" />
          <h2>Booking Details</h2>
          <ul>
            {bookingDetails.map((detail) => (
              <li key={detail}>{detail}</li>
            ))}
          </ul>
          <a href={mailtoHref}>Contact Booking Concierge →</a>
        </article>
      </section>
    </main>
  );
}
