# Lady Mix VI — SCS DJ Booking Landing Page

This package contains a coded Next.js landing page based on the approved SCS concierge-box render for Lady Mix VI.

## What is included

- `src/app/page.tsx` — page entry
- `src/components/LadyMixLanding.tsx` — full interactive landing page component
- `src/app/globals.css` — full visual system and responsive styling
- `src/data/site.ts` — booking email, chips, media labels, booking details
- `public/design-reference/book-lady-mix-vi-render.png` — approved visual reference render
- `CURSOR_HANDOFF.md` — exact Cursor build prompt

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Booking behavior

The primary CTA builds a prefilled `mailto:` inquiry to:

`ladymixvi@gmail.com`

The event intent chips update the email subject/body. The text field adds the user's note to the prefilled email.

## Important build notes

- This is a coded approximation of the render using CSS-generated artistic media blocks, gradients, glassmorphism, and UI layout.
- The image render is included as the target reference for Cursor to match.
- Replace CSS-generated portrait/media panels with approved real assets only after the client approves usage.
- Do not publish false brand/social proof claims. Verify event/brand names before going live.
