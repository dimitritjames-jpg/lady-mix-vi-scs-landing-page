# Template Duplication Notes — Lady Mix VI SCS Landing

Use this section as the checklist when creating the next DJ landing page from this project.

## 1) Duplicate the artist identity
- Update brand labels in:
  - `src/components/LadyMixLanding.tsx`
    - `.brand` heading (`LADY MIX VI`)
    - `h1` text (`BOOK Lady Mix VI`)
    - concierge card label if needed
- Update tagline/event language in:
  - `src/components/LadyMixLanding.tsx`
- Update references in metadata:
  - `src/app/layout.tsx` (metadata title/description)

## 2) Change booking email
- In one place, update:
  - `src/data/site.ts` → `LADY_MIX_EMAIL`
- This automatically updates:
  - Top nav CTA
  - Primary concierge CTA
  - Any “Learn More” or booking links using the shared `mailto` helper
- Keep format as: `name@domain.com`.

## 3) Adjust event chips
- Update the chips in:
  - `src/data/site.ts` → `bookingChips`
- Keep array shape `{ label: string, icon: string }`.
- Recommended options:
  - Weddings
  - Private Parties
  - Corporate Events
  - Festivals
  - View Mixes
  - Check Availability

## 4) Re-skin the color palette
- Core palette tokens live in:
  - `src/app/globals.css` under `:root`
  - Variables to update first: `--hot`, `--pink`, `--plum`, `--violet`, `--bg`, `--ink`, `--muted`, `--line`, `--surface`, `--glass`
- For a full rebrand, do a targeted token update only and avoid changing structural styles.

## 5) Replace generated art panels with approved real media
- Media card content data:
  - `src/data/site.ts` → `floatingMedia`
  - Card labels, classes, and ordering can be retained or replaced.
- Visual styling for each panel:
  - `src/app/globals.css`
  - Classes currently used: `.sunset`, `.friends`, `.rb`, `.crowd`, `.mixer`, `.portrait`, `.brunch`
- To swap in real approved media:
  1. Add images under `public/` (e.g., `public/assets/artist-media/...`).
  2. Replace each card’s `--art` gradient style with `background-image` pointing to real files.
  3. Keep sizing, radii, transforms, and z-order to preserve the floating glass panel feel.

## 6) Preserve the SCS floating concierge system
- Keep this structure intact in `src/components/LadyMixLanding.tsx`:
  - `.site-shell` background with layered ambient effects
  - `.concierge-card` center placement
  - Email inquiry workflow using `mailto` helper
  - `.chip-grid` event quick selectors
  - `.primary-cta` still opening booking inquiry
- If introducing a backend form later, keep this flow behavior:
  - intent selection → notes input → CTA action

## 7) Safe duplication checklist
- Copy project folder.
- Update:
  - `src/data/site.ts`
  - `src/components/LadyMixLanding.tsx`
  - `src/app/layout.tsx`
  - `src/app/globals.css` tokens only (unless structure changes are required)
- Run:
  - `npm install`
  - `npm run build`
- Final verify on desktop and mobile with fresh screenshots.
