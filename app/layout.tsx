import "./globals.css";
import OAuthCallback from "./components/OAuthCallback";
import { Josefin_Sans, Sansita_Swashed } from "next/font/google";
import localFont from "next/font/local";

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

const jomolhari = localFont({
  src: "../public/fonts/jomolhari.woff2",
  variable: "--font-jomolhari",
  weight: "400",
  style: "normal",
  display: "swap",
});

export const metadata = {
  title: "cayenne",
  description: "A spicy code snippet manager",
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
