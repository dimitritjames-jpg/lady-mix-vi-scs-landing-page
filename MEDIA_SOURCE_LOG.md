# MEDIA_SOURCE_LOG

## Current slot status and source decisions

| File name | Source URL | Intended Site Slot | Approval Status | Notes |
| --- | --- | --- | --- | --- |
| `public/media/lady-mix/<hero-portrait>.jpg` | Not added | Hero portrait / featured DJ visual | Needs approval / manual export | No approved source asset downloaded yet; generated/CSS visual panel remains in place. |
| `public/media/lady-mix/<floating-nightlife-panel>.jpg` | Not added | Floating nightlife/event panel | Needs approval / manual export | No approved source asset downloaded yet; generated/CSS visual panel remains in place. |
| `public/media/lady-mix/<island-girls-panel>.jpg` | Not added | Island Girls Love R&B event panel | Needs approval / manual export | No approved source asset downloaded yet; generated/CSS visual panel remains in place. |
| `public/media/lady-mix/<mix-media-panel>.jpg` | Not added | Mix/media panel | Needs approval / manual export | No approved source asset downloaded yet; generated/CSS visual panel remains in place. |
| `public/media/lady-mix/<gallery-preview>.jpg` | Not added | Gallery / event preview area | Needs approval / manual export | No approved source asset downloaded yet; generated/CSS visual panel remains in place. |
| `public/media/lady-mix/lady-mix-ig-official-feed.jpg` | https://www.instagram.com/ladymixvi/ | Reference only (approved-source audit candidate) | Needs approval / manual export | If official post images are granted, export directly from artist account and replace one panel at a time. |
| `public/media/lady-mix/lady-mix-fb-official-feed.jpg` | https://www.facebook.com/ladymixvi/ | Reference only (approved-source audit candidate) | Needs approval / manual export | If official post images are granted, export directly from artist account and replace one panel at a time. |

## Production media placement rule
- Always use approved official assets only (official IG/Facebook posts from `@ladymixvi` / Lady Mix VI Facebook).
- If any source cannot be safely pulled, keep generated/CSS panel and keep this log entry as `needs approval/manual export`.
- Never add unrelated artists, repost accounts, or questionable media.

## Notes for future client-provided media
- If client provides exports, place them under `public/media/lady-mix/` and wire them in `src/data/site.ts` (`floatingMedia[].mediaSrc`) by slot.
- Keep `MEDIA_SOURCE_LOG.md` updated with exact source URL and replacement date.
