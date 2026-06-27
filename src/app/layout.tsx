import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Book Lady Mix VI | SCS DJ Booking Landing Page",
  description: "A Smart Concierge Site landing page for booking Lady Mix VI for weddings, private parties, corporate events, and island nightlife experiences.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
