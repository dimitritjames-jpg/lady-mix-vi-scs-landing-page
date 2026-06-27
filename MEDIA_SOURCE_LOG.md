# MEDIA_SOURCE_LOG

## Status date
- **Finalized:** 2026-06-27
- **Booking email:** `ladymixvi@gmail.com`

## Slot map and placement status

| Slot | File name | Source URL | Source type | Asset used | Approval status | Notes |
| --- | --- | --- | --- | --- | --- | --- |
| Hero portrait / featured DJ visual | `public/media/lady-mix/<hero-portrait>` | https://www.instagram.com/ladymixvi/ | official Lady Mix VI | Not yet placed (placeholder) | Needs approval/manual export | Keep the current premium abstract/fallback visual until artist-approved portrait export is provided. |
| Floating nightlife/event panel | `public/media/atmosphere/nightlife-aura.jpg` | https://images.unsplash.com/photo-1764510378335-865951ed4539?auto=format&fit=crop&fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-4.1.0&q=60&w=2400 | safe web/stock atmosphere | `public/media/atmosphere/nightlife-aura.jpg` (used for slot) | Approved to use as atmosphere | Do not claim identity in copy or labels. |
| Island Girls Love R&B (verification pending) | `public/media/lady-mix/<island-girls-panel>` | https://www.instagram.com/ladymixvi/ | official Lady Mix VI (required identity slot) | Not yet placed publicly | Needs approval/manual export | Public labels now use a safer non-identity copy: “R&B Night Sessions”. Keep this row for future verified placement. |
| Mix/media panel | `public/media/atmosphere/dj-gear-nightlife.jpg` | https://images.unsplash.com/photo-1761426202777-520917882f0a?auto=format&fit=crop&fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-4.1.0&q=60&w=2400 | safe web/stock atmosphere | `public/media/atmosphere/dj-gear-nightlife.jpg` | Approved to use as atmosphere | Fine as non-identity audio/booth environment visual. |
| Gallery/event preview | `public/media/atmosphere/nightlife-aura.jpg` | https://images.unsplash.com/photo-1764510378335-865951ed4539?auto=format&fit=crop&fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-4.1.0&q=60&w=2400 | safe web/stock atmosphere | `public/media/atmosphere/nightlife-aura.jpg` (fallback) | Approved to use as atmosphere | Replace with Lady Mix VI event preview media when provided. |
| Floating party/energy panel (`friends`, `crowd`, `mixer` classes) | `public/media/atmosphere/nightlife-aura.jpg`, `/dj-gear-nightlife.jpg` | Mix of unsplash sources above | safe web/stock atmosphere | Atmospheric files | Approved to use as atmosphere | Keep identity neutral until official media is exported.

## Additional names requiring verification before public use
- **Barbie Brunch**: not confidently verified from official channels yet; not used in public copy.
- **Island Girls Love R&B**: no verified event archive added yet; currently represented publicly as **R&B Night Sessions** pending official confirmation.

## Approved rule
- **Hero portrait and Island Girls identity slot** stay as placeholders pending official verification and exports.
- All other visuals are intentionally atmospheric and are not presented as Lady Mix VI face-of-brand proof.
- No unrelated repost artists or random brand/client logos are used.

## Next media actions
1. Export final hero portrait and Island Girls identity from official sources and place them at:
   - `public/media/lady-mix/lady-mix-hero-portrait.jpg`
   - `public/media/lady-mix/island-girls-love-rnb-panel.jpg`
2. Update `src/data/site.ts` `floatingMedia[].mediaSrc`, `source`, and `sourceType` for corresponding slots.
3. Keep this log current after every replacement.
