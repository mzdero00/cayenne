// app/layout.tsx
import "./globals.css";
import OAuthCallback from "./components/OAuthCallback";
import { Josefin_Sans, Sansita_Swashed } from "next/font/google";
import localFont from "next/font/local";

// Google fonts (Next hosts/optimizes them)
const josefin = Josefin_Sans({
  subsets: ["latin"],
  variable: "--font-josefin",
  display: "swap",
});
const sansita = Sansita_Swashed({
  subsets: ["latin"],
  variable: "--font-sansita",
  display: "swap",
});

// Jomolhari is not in next/font/google → self-host
// Add the file to: public/fonts/jomolhari.woff2
const jomolhari = localFont({
  src: "../public/fonts/jomolhari.woff2",
  variable: "--font-jomolhari",
  weight: "400",
  style: "normal",
  display: "swap",
});

export const metadata = {
  title: "My App",
  description: "Using Google Fonts with Tailwind",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${josefin.variable} ${sansita.variable} ${jomolhari.variable}`}
      >
        <OAuthCallback />
        {children}
      </body>
    </html>
  );
}
