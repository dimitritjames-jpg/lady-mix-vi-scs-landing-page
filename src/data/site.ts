export const LADY_MIX_EMAIL = "ladymixvi@gmail.com";

export type FloatingMediaCard = {
  className: string;
  title: string;
  eyebrow: string;
  source: string;
  mediaSrc: string | null;
  sourceType: "official-lady-mix" | "safe-atmosphere" | "placeholder";
  notes: string;
};

export const bookingChips = [
  { label: "Weddings", icon: "✦" },
  { label: "Private Parties", icon: "🎧" },
  { label: "Corporate Events", icon: "🏢" },
  { label: "R&B Night Sessions", icon: "♀" },
  { label: "View Mixes", icon: "▶" },
  { label: "Check Availability", icon: "✓" },
];

export const floatingMedia: FloatingMediaCard[] = [
  {
    className: "sunset",
    title: "Nightside Energy",
    eyebrow: "VI nightlife",
    source:
      "https://images.unsplash.com/photo-1764510378335-865951ed4539?auto=format&fit=crop&fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-4.1.0&q=60&w=2400",
    mediaSrc: "/media/atmosphere/nightlife-aura.jpg",
    sourceType: "safe-atmosphere",
    notes: "Atmospheric nightlife image used for one floating cinematic panel.",
  },
  {
    className: "friends",
    title: "Private Event Energy",
    eyebrow: "Elegant receptions",
    source:
      "https://images.unsplash.com/photo-1761426202777-520917882f0a?auto=format&fit=crop&fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-4.1.0&q=60&w=2400",
    mediaSrc: "/media/atmosphere/dj-gear-nightlife.jpg",
    sourceType: "safe-atmosphere",
    notes: "Atmospheric DJ booth panel used as private-party visual backdrop.",
  },
  {
    className: "rb",
    title: "R&B Night Sessions",
    eyebrow: "Curated momentum",
    source: "https://www.instagram.com/ladymixvi/",
    mediaSrc: null,
    sourceType: "official-lady-mix",
    notes: "Needs approval/manual export: official media not yet available for direct download.",
  },
  {
    className: "crowd",
    title: "Crowd Energy",
    eyebrow: "Event atmosphere",
    source:
      "https://images.unsplash.com/photo-1764510378335-865951ed4539?auto=format&fit=crop&fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-4.1.0&q=60&w=2400",
    mediaSrc: "/media/atmosphere/nightlife-aura.jpg",
    sourceType: "safe-atmosphere",
    notes: "Atmospheric event-card visual. Replace if official image becomes approved.",
  },
  {
    className: "mixer",
    title: "Premium Mix Works",
    eyebrow: "Sound design in motion",
    source:
      "https://images.unsplash.com/photo-1761426202777-520917882f0a?auto=format&fit=crop&fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-4.1.0&q=60&w=2400",
    mediaSrc: "/media/atmosphere/dj-gear-nightlife.jpg",
    sourceType: "safe-atmosphere",
    notes: "Atmospheric mix-room visual for the media panel.",
  },
  {
    className: "portrait",
    title: "Lady Mix VI",
    eyebrow: "Featured artist visual",
    source: "https://www.instagram.com/ladymixvi/",
    mediaSrc: null,
    sourceType: "official-lady-mix",
    notes: "Keep as designed placeholder until official portrait export is approved and provided.",
  },
  {
    className: "brunch",
    title: "Gallery Highlights",
    eyebrow: "Showcase moments",
    source:
      "https://images.unsplash.com/photo-1764510378335-865951ed4539?auto=format&fit=crop&fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-4.1.0&q=60&w=2400",
    mediaSrc: "/media/atmosphere/nightlife-aura.jpg",
    sourceType: "safe-atmosphere",
    notes: "Fallback gallery visual. Replace with Lady Mix VI event shots once approved.",
  },
];

export const bookingDetails = [
  "Open format: R&B, Hip Hop, Dancehall, Soca, Afrobeat, Top 40 & more",
  "Custom set progression for first dance, party peak, and late-night closeout",
  "Travel-ready for the USVI and destination events",
  "Fast-response concierge workflow with polished prefilled inquiry handoff",
];
