# Cursor Handoff — Build Lady Mix VI SCS Landing Page

You are building the Lady Mix VI DJ booking landing page from the included SCS design reference.

## Goal

Create a production-quality landing page that matches the provided visual reference as closely as possible:

`public/design-reference/book-lady-mix-vi-render.png`

This is part of the Smart Concierge Site system. The hero must be centered around a floating SCS concierge booking box, surrounded by cinematic media panels and a nightlife/female-DJ visual identity.

## Files already provided

- `src/app/page.tsx`
- `src/components/LadyMixLanding.tsx`
- `src/app/globals.css`
- `src/data/site.ts`
- `public/design-reference/book-lady-mix-vi-render.png`

Use these as the starting build. Improve fidelity, responsiveness, and polish without changing the core concept.

## Non-negotiable visual requirements

1. Dark cinematic hero with deep black, plum, violet, magenta, hot pink, and subtle aqua highlights.
2. Centered glassmorphism concierge box with:
   - “SCS FLOATING CONCIERGE™”
   - “BOOK Lady Mix VI”
   - prompt field: “Tell me about your event...”
   - booking chips: Weddings, Private Parties, Corporate Events, Island Girls Love R&B, View Mixes, Check Availability
   - CTA: “Let’s Plan Your Event ✦”
3. Floating media collage around the card:
   - island/city sunset
   - girls-night/private party energy
   - Island Girls Love R&B card
   - DJ mixer/controller close-up
   - glamorous portrait card
   - Barbie Brunch style card
4. Top navigation with brand, nav links, social icons, and “Book Lady Mix VI” CTA.
5. Below hero: proof strip, featured events, recent mixes, booking details.
6. Mobile must keep the concierge box dominant and hide/reduce floating media as needed.

## Functional requirements

- Booking email: `ladymixvi@gmail.com`
- Main CTA must generate a prefilled email inquiry using selected chip + typed event note.
- Keep the landing page static-friendly and deployable to Vercel.
- Avoid backend requirements for MVP.
- Use real client media only when supplied/approved. Until then, keep generated/CSS placeholders or replace with licensed assets.

## QA checklist

Run:

```bash
npm install
npm run build
```

Then verify:

- No TypeScript errors.
- Homepage renders at `/`.
- CTA opens an email draft to `ladymixvi@gmail.com`.
- Desktop hero visually matches the reference render.
- Mobile hero keeps CTA and prompt usable.
- No unverified brand claims are published without confirmation.

## Suggested Cursor task order

1. Install and run the project.
2. Compare browser screenshot against `public/design-reference/book-lady-mix-vi-render.png`.
3. Tighten layout spacing and sizes to match reference.
4. Improve CSS-generated portrait/media placeholders or swap in approved client assets.
5. Run build.
6. Return screenshots and a short QA report.
