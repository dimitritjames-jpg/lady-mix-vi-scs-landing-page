"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import Image from "next/image";
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

type ConciergeStepKey = "eventType" | "eventDate" | "eventLocation" | "guestCount" | "name" | "email" | "phone" | "message";

type ConciergeStep = {
  key: ConciergeStepKey;
  label: string;
  prompt: string;
  placeholder: string;
  inputType: "text" | "email" | "tel" | "date" | "number" | "textarea";
  required: boolean;
};

type SubmitState = {
  type: "idle" | "sending" | "success" | "fallback" | "error";
  message: string;
};

const steps: ConciergeStep[] = [
  {
    key: "eventType",
    label: "Event type",
    prompt: "Tell me what kind of event you’re planning…",
    placeholder: "I need Lady Mix VI for a wedding, private party, corporate event, or a full request",
    inputType: "textarea",
    required: true,
  },
  {
    key: "eventDate",
    label: "Event date",
    prompt: "What date is the event? (ISO date works perfectly)",
    placeholder: "2026-08-10",
    inputType: "date",
    required: true,
  },
  {
    key: "eventLocation",
    label: "Event location",
    prompt: "Where should Lady Mix VI perform?",
    placeholder: "Magens Bay, St. Thomas",
    inputType: "text",
    required: true,
  },
  {
    key: "guestCount",
    label: "Guest count",
    prompt: "How many guests are you planning for?",
    placeholder: "120",
    inputType: "number",
    required: true,
  },
  {
    key: "name",
    label: "Name",
    prompt: "Who is booking this event?",
    placeholder: "Your full name",
    inputType: "text",
    required: true,
  },
  {
    key: "email",
    label: "Email",
    prompt: "Where should I send the booking note?",
    placeholder: "you@email.com",
    inputType: "email",
    required: true,
  },
  {
    key: "phone",
    label: "Phone",
    prompt: "Best number for quick confirmations",
    placeholder: "(340) 555-0147",
    inputType: "tel",
    required: true,
  },
  {
    key: "message",
    label: "Message / vibe request",
    prompt: "Any tempo, artist callouts, or pacing notes?",
    placeholder: "Tell me your preferred tone, vibe, and timing",
    inputType: "textarea",
    required: false,
  },
];

const navItems = [
  { label: "Home", href: "#top" },
  { label: "Events", href: "#events" },
  { label: "Mixes", href: "#mixes" },
  { label: "Gallery", href: "#gallery" },
  { label: "Booking", href: "#booking" },
];

function detectEventType(raw: string) {
  const normalized = raw.toLowerCase();
  if (normalized.includes("wedding")) return "Weddings";
  if (normalized.includes("private")) return "Private Parties";
  if (normalized.includes("corporate")) return "Corporate Events";
  if (normalized.includes("love r&b") || normalized.includes("island girls")) return "R&B Night Sessions";
  if (normalized.includes("mix")) return "View Mixes";
  if (normalized.includes("availability") || normalized.includes("check")) return "Check Availability";
  return "";
}

function detectDate(raw: string) {
  const monthDate = raw.match(/\b((?:jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)[a-z]*\s+\d{1,2}(?:,\s*\d{4})?)/i);
  if (monthDate) return monthDate[1];
  const isoDate = raw.match(/\b\d{4}-\d{2}-\d{2}\b/);
  if (isoDate) return isoDate[0];
  const slashDate = raw.match(/\b\d{1,2}[\/-]\d{1,2}[\/-]\d{2,4}\b/);
  return slashDate ? slashDate[0] : "";
}

function detectLocation(raw: string) {
  const match = raw.match(/\b(?:at|in)\s+([A-Za-z0-9'`\-.#&\s]{3,90})/i);
  if (!match) return "";

  return match[1]
    .replace(/\s+for\s+.*$/i, "")
    .replace(/\s+for\s+\d{1,4}\s+.*$/i, "")
    .replace(/\s+(people|person|guests?|heads?)\b.*$/i, "")
    .trim();
}

function detectGuestCount(raw: string) {
  const match = raw.match(/(\d{1,4})\s*(?:people|person|guests?|guesta|ppl|heads?)/i);
  return match ? match[1] : "";
}

function buildMailto(payload: FormState) {
  const subject = `Booking inquiry for Lady Mix VI — ${payload.eventType || "General booking"}`;
  const body = `Hi Lady Mix VI,\n\nI would like to plan an event.\n\nName: ${payload.name || ""}\nEmail: ${payload.email || ""}\nPhone: ${payload.phone || ""}\nEvent type: ${payload.eventType || ""}\nEvent date: ${payload.eventDate || ""}\nLocation: ${payload.eventLocation || ""}\nEstimated guest count: ${payload.guestCount || ""}\nMessage/vibe request: ${payload.message || ""}\n\nPlease confirm your availability and next steps.`;

  return `mailto:${LADY_MIX_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export default function LadyMixLanding() {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    phone: "",
    eventType: "",
    eventDate: "",
    eventLocation: "",
    guestCount: "",
    message: "",
  });

  const [activeStep, setActiveStep] = useState(0);
  const [assistantInput, setAssistantInput] = useState("");
  const [summaryOpen, setSummaryOpen] = useState(true);
  const [status, setStatus] = useState<SubmitState>({ type: "idle", message: "" });

  const currentStep = steps[activeStep];
  const currentStepKey = currentStep.key;
  const currentValue = form[currentStepKey] || "";
  const capturedCount = steps.filter((step) => step.required && form[step.key].trim()).length;
  const progress = Math.round((capturedCount / steps.filter((step) => step.required).length) * 100);

  useEffect(() => {
    setAssistantInput(currentValue);
    setStatus({ type: "idle", message: "" });
  }, [activeStep, currentStepKey, currentValue]);

  const mailtoHref = useMemo(() => buildMailto(form), [form]);

  const capturedSummary = useMemo(
    () => [
      `Event type: ${form.eventType || "--"}`,
      `Event date: ${form.eventDate || "--"}`,
      `Location: ${form.eventLocation || "--"}`,
      `Guest count: ${form.guestCount || "--"}`,
      `Name: ${form.name || "--"}`,
      `Email: ${form.email || "--"}`,
      `Phone: ${form.phone || "--"}`,
      `Vibe request: ${form.message || "--"}`,
    ],
    [form],
  );

  function nextUnfinishedStep(seed: FormState, fromIndex: number) {
    for (let i = fromIndex; i < steps.length; i += 1) {
      const step = steps[i];
      if (step.required && !seed[step.key]) {
        return i;
      }
    }
    return steps.length;
  }

  function applyNaturalLanguage(payload: string, seed: FormState) {
    const next = { ...seed };

    const parsedType = detectEventType(payload);
    const parsedDate = detectDate(payload);
    const parsedLocation = detectLocation(payload);
    const parsedGuests = detectGuestCount(payload);

    if (!next.eventType && parsedType) next.eventType = parsedType;
    if (!next.eventDate && parsedDate) next.eventDate = parsedDate;
    if (!next.eventLocation && parsedLocation) next.eventLocation = parsedLocation;
    if (!next.guestCount && parsedGuests) next.guestCount = parsedGuests;
    if (!next.message) next.message = payload.trim();

    return next;
  }

  function isCurrentStepComplete() {
    if (!currentStep.required) {
      return true;
    }
    return assistantInput.trim().length > 0;
  }

  function jumpToFirstMissing() {
    const index = nextUnfinishedStep(form, 0);
    setActiveStep(index >= steps.length ? steps.length - 1 : index);
  }

  function setByStepKey(key: ConciergeStepKey, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function setIntentChip(intent: string) {
    setForm((prev) => ({ ...prev, eventType: intent }));
    setActiveStep(1);
    setAssistantInput("");
    setStatus({ type: "idle", message: "" });
  }

  async function submitInquiry(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const requiredMissing = steps.find((step) => step.required && !form[step.key].trim());
    if (requiredMissing) {
      const missingIndex = steps.findIndex((step) => step.key === requiredMissing.key);
      setStatus({ type: "error", message: `Please complete the Concierge step: ${requiredMissing.label}.` });
      setActiveStep(missingIndex);
      return;
    }

    setStatus({ type: "sending", message: "Preparing your booking request..." });
    try {
      const response = await fetch("/api/booking", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(form),
      });

      if (response.ok) {
        setStatus({ type: "success", message: "Booking inquiry sent through SCS assistant pipeline." });
        return;
      }

      window.location.href = mailtoHref;
      setStatus({
        type: "fallback",
        message: "Booking API is not configured. Opened prefilled email to ladymixvi@gmail.com.",
      });
    } catch {
      window.location.href = mailtoHref;
      setStatus({
        type: "fallback",
        message: "Sending through API failed. Opened prefilled email to ladymixvi@gmail.com.",
      });
    }
  }

  function advanceStep(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!isCurrentStepComplete()) {
      setStatus({ type: "error", message: `Please provide ${currentStep.label.toLowerCase()} to continue.` });
      return;
    }

    if (currentStep.key === "eventType") {
      const payload = assistantInput.trim();
      let nextForm = { ...form };
      if (payload) {
        nextForm.eventType = payload;
        const detectedType = detectEventType(payload);
        if (!form.eventType && detectedType) nextForm.eventType = detectedType;
        nextForm = applyNaturalLanguage(payload, nextForm);
      }

      setForm(nextForm);
      const next = nextUnfinishedStep(nextForm, 1);
      if (next < steps.length) {
        setActiveStep(next);
        return;
      }
      setActiveStep(steps.length - 1);
      return;
    }

    setByStepKey(currentStep.key, assistantInput.trim());

    const next = nextUnfinishedStep({ ...form, [currentStep.key]: assistantInput.trim() }, activeStep + 1);
    if (next < steps.length) {
      setActiveStep(next);
      return;
    }

    setActiveStep(steps.length - 1);
    setSummaryOpen(true);
  }

  function goBack() {
    if (activeStep > 0) {
      setActiveStep(activeStep - 1);
    }
  }

  const allRequiredDone = steps.filter((step) => step.required).every((step) => form[step.key].trim().length > 0);

  return (
    <main className="site-shell">
      <div className="ambient ambient-one" aria-hidden="true" />
      <div className="ambient ambient-two" aria-hidden="true" />
      <div className="ambient ambient-three" aria-hidden="true" />
      <div className="stage-haze" aria-hidden="true" />
      <div className="grain" aria-hidden="true" />

      <header className="top-nav" aria-label="Main navigation">
        <a className="brand" href="#top" aria-label="Lady Mix VI home">
          <span>
            LADY <strong>MIX VI</strong>
          </span>
          <small>THE VI DJ EXPERIENCE</small>
        </a>
        <nav className="desktop-nav" aria-label="Primary">
          {navItems.map((item) => (
            <a key={item.label} href={item.href} className={item.label === "Home" ? "active" : ""}>
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
        <div className="hero-copy">
          <p className="kicker">SCS FLOATING CONCIERGE</p>
          <p className="hero-statement">Where VI nightlife, R&B energy, and private events meet.</p>
        </div>

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
              {card.mediaSrc ? (
                <Image
                  src={card.mediaSrc}
                  alt=""
                  fill
                  aria-hidden="true"
                  className="media-card-image"
                  sizes="(min-width: 1200px) 220px, 160px"
                />
              ) : null}
            </article>
          ))}
        </div>

        <section className="concierge-card" aria-label="SCS floating concierge booking panel">
          <div className="portrait-orb" aria-hidden="true">
            <span />
          </div>
          <p className="hero-role">Premium booking assistant</p>
          <h1 id="hero-title">
            BOOK <em>Lady Mix VI</em>
          </h1>
          <p className="tagline">The soundtrack for unforgettable nights.</p>

          <div className="assistant-stage">
            <span>
              Step {Math.min(activeStep + 1, steps.length)} of {steps.length}
            </span>
            <span>• Concierge mode: guided intake</span>
          </div>

          <div className="assistant-progress" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={progress}>
            <span style={{ width: `${progress}%` }} />
          </div>

          <p className="prompt-label">{currentStep.prompt}</p>

          {currentStep.key === "eventType" ? (
            <div className="chip-grid" role="list" aria-label="Booking shortcuts">
              {bookingChips.map((chip) => (
                <button
                  key={chip.label}
                  className={form.eventType === chip.label ? "selected" : ""}
                  type="button"
                  onClick={() => setIntentChip(chip.label)}
                >
                  <span>{chip.icon}</span>
                  {chip.label}
                </button>
              ))}
            </div>
          ) : null}

          <form className="concierge-form" onSubmit={currentStep.key === "message" ? submitInquiry : advanceStep}>
            <label className="assistant-field-label" htmlFor="assistant-input">
              {currentStep.label}
            </label>

            {currentStep.inputType === "textarea" ? (
              <textarea
                id="assistant-input"
                value={assistantInput}
                onChange={(event) => setAssistantInput(event.target.value)}
                rows={currentStep.key === "message" ? 3 : 2}
                placeholder={currentStep.placeholder}
                className="assistant-input"
              />
            ) : (
              <input
                id="assistant-input"
                type={currentStep.inputType}
                value={assistantInput}
                onChange={(event) => setAssistantInput(event.target.value)}
                placeholder={currentStep.placeholder}
                className="assistant-input"
              />
            )}

            <div className="concierge-actions">
              {activeStep > 0 ? (
                <button type="button" onClick={goBack} className="ghost-cta">
                  Back
                </button>
              ) : null}

              <button
                type="submit"
                className="primary-cta concierge-advance"
                disabled={status.type === "sending"}
              >
                {currentStep.key === "message" ? "Send Booking Request" : "Next"}
              </button>
            </div>
          </form>

          <div className="booking-summary concise" aria-live="polite">
            <div className="summary-head">
              <strong>Booking details captured</strong>
              <button type="button" onClick={() => setSummaryOpen((open) => !open)} className="summary-toggle">
                {summaryOpen ? "Hide" : "Show"}
              </button>
            </div>
            {summaryOpen ? (
              <ul>
                {capturedSummary.map((detail) => (
                  <li key={detail}>{detail}</li>
                ))}
              </ul>
            ) : null}
            <div className="summary-mini">
              <span>{form.eventType || "No event type yet"}</span>
              <span>{form.eventDate || "Date pending"}</span>
              <span>{form.guestCount || "TBD"}</span>
            </div>
          </div>

          {status.message ? <p className={`submit-feedback ${status.type}`}>{status.message}</p> : null}

          {allRequiredDone ? (
            <button type="button" className="secondary-cta" onClick={() => setActiveStep(steps.length - 1)}>
              Prepare Booking Inquiry
            </button>
          ) : null}

          <a href={mailtoHref} className="quick-mail" onClick={() => jumpToFirstMissing()}>
            Open prefilled inquiry email
          </a>

          <p className="secure-line">SCS • Concierge-first • Polished booking for private and corporate nights</p>

          {!allRequiredDone ? <p className="assistant-hint">Tip: type a full request in one message and we’ll pre-fill each step.</p> : null}
        </section>
      </section>

      <section className="proof-strip" id="gallery" aria-label="Feature strip">
        <p>Built for private events, brand nights, and unforgettable VI parties</p>
        {[
          "R&B nights",
          "Wedding receptions",
          "Private villas and retreats",
          "Destination events",
          "Brand nights",
          "Nightlife moments",
        ].map((label) => (
          <span key={label}>{label}</span>
        ))}
      </section>

      <section className="below-fold" aria-label="Booking preview sections">
        <article className="panel featured" id="events">
          <div className="panel-head">
            <h2>Featured nights</h2>
            <a href="#booking">Start booking →</a>
          </div>
          <div className="event-tiles">
            <div>
              <strong>Weddings in motion</strong>
            </div>
            <div>
              <strong>R&B Night Sessions</strong>
            </div>
            <div>
              <strong>Corporate and destination receptions</strong>
            </div>
          </div>
        </article>

        <article className="panel mixes" id="mixes">
          <div className="panel-head">
            <h2>Mix room pulse</h2>
            <a href="#booking">Listen on request →</a>
          </div>
          <div className="mix-card">
            <div className="cover">VI VOL. 6</div>
            <button aria-label="Play preview" type="button">
              ▶
            </button>
            <div className="wave" />
            <div>
              <strong>R&B Night Sessions</strong>
              <p>Dark, warm, and dance-floor ready.</p>
            </div>
          </div>
        </article>

        <article className="panel booking" id="booking">
          <h2>Booking details</h2>
          <ul id="contact">
            {bookingDetails.map((detail) => (
              <li key={detail}>{detail}</li>
            ))}
          </ul>
          <a href={mailtoHref}>Open booking draft →</a>
        </article>
      </section>
    </main>
  );
}



