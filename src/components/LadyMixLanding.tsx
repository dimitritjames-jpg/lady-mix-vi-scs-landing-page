"use client";

import { useMemo, useState } from "react";
import { bookingChips, bookingDetails, floatingMedia, LADY_MIX_EMAIL } from "../data/site";

function mailtoLink(intent: string, note: string) {
  const subject = encodeURIComponent(`Booking inquiry for Lady Mix VI${intent ? ` — ${intent}` : ""}`);
  const body = encodeURIComponent(
    `Hi Lady Mix VI,\n\nI would like to plan an event.\n\nEvent type: ${intent || ""}\nEvent date:\nLocation:\nGuest count:\nNotes: ${note || ""}\n\nPlease send availability and next steps.\n`
  );
  return `mailto:${LADY_MIX_EMAIL}?subject=${subject}&body=${body}`;
}

export default function LadyMixLanding() {
  const [intent, setIntent] = useState("Private Parties");
  const [note, setNote] = useState("");
  const href = useMemo(() => mailtoLink(intent, note), [intent, note]);

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
        <nav className="desktop-nav">
          {["Home", "About", "Events", "Mixes", "Gallery", "Booking", "Contact"].map((item) => (
            <a key={item} className={item === "Home" ? "active" : ""} href={`#${item.toLowerCase()}`}>
              {item}
            </a>
          ))}
        </nav>
        <div className="nav-actions" aria-label="Social and booking links">
          <a href="https://www.instagram.com/ladymixvi/" target="_blank" rel="noreferrer" aria-label="Instagram">
            IG
          </a>
          <a href="#mixes" aria-label="TikTok">
            TT
          </a>
          <a href="#mixes" aria-label="YouTube">
            YT
          </a>
          <a className="nav-cta" href={href}>
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
            </article>
          ))}
        </div>

        <section className="concierge-card" aria-label="SCS floating concierge booking panel">
          <div className="portrait-orb" aria-hidden="true">
            <span />
          </div>
          <p className="kicker">SCS FLOATING CONCIERGE™</p>
          <h1 id="hero-title">
            BOOK <em>Lady Mix VI</em>
          </h1>
          <p className="tagline">Your event. Your vibe. My soundtrack.</p>
          <label htmlFor="event-note" className="prompt-label">
            How can I help you plan your perfect event?
          </label>
          <div className="event-input">
            <input
              id="event-note"
              value={note}
              onChange={(event) => setNote(event.target.value)}
              placeholder="Tell me about your event..."
            />
            <span>✦</span>
          </div>
          <div className="chip-grid" role="list" aria-label="Booking shortcuts">
            {bookingChips.map((chip) => (
              <button
                key={chip.label}
                className={intent === chip.label ? "selected" : ""}
                type="button"
                onClick={() => setIntent(chip.label)}
              >
                <span>{chip.icon}</span>
                {chip.label}
              </button>
            ))}
          </div>
          <a className="primary-cta" href={href}>
            Let&apos;s Plan Your Event ✦
          </a>
          <p className="secure-line">Powered by SCS • Secure • Personalized • Seamless</p>
        </section>
      </section>

      <section className="proof-strip" aria-label="Event trust strip">
        <p>Trusted by unforgettable events and private brands</p>
        {["Barbie Brunch", "Island Girls Love R&B", "Private Villas", "Resort Events", "Corporate Mixers", "VI Nightlife"].map(
          (logo) => (
            <span key={logo}>{logo}</span>
          )
        )}
      </section>

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
            <button aria-label="Play preview">▶</button>
            <div className="wave" />
            <div>
              <strong>Island Girls Love R&B Vol. 6</strong>
              <a href="#booking">Listen Now →</a>
            </div>
          </div>
        </article>
        <article className="panel booking" id="booking">
          <h2>Booking Details</h2>
          <ul>
            {bookingDetails.map((detail) => (
              <li key={detail}>{detail}</li>
            ))}
          </ul>
          <a href={href}>Learn More →</a>
        </article>
      </section>
    </main>
  );
}
