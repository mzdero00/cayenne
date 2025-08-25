// File: app/not-found.tsx (App Router)
// This page renders automatically for any unmatched route.

import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <main
      className="min-h-screen flex flex-col items-center justify-center"
      style={{ backgroundColor: "#f2f3f4" }}
    >
      {/* Center content */}
      <section className="w-full max-w-4xl px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8">
          {/* Text */}
          <div className="text-left">
            <h1 className="text-2xl md:text-3xl text-black mb-6 font-light">
              Looks like we crashed!
            </h1>
            <p className="text-lg md:text-xl text-black/90">
              We’ll get you right{" "}
              <Link
                href="/"
                className="text-green-700 underline hover:text-green-800"
              >
                back up
              </Link>
              .
            </p>
          </div>

          {/* Car doodle (inline SVG so no extra asset needed) */}
          <div className="flex items-center justify-center md:justify-start">
            <svg
              viewBox="0 0 128 64"
              aria-hidden
              className="w-40 h-20 text-black/80"
            >
              <g
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M15 38h94" />
                <circle cx="36" cy="45" r="8" />
                <circle cx="92" cy="45" r="8" />
                <path d="M22 38c6-9 10-17 20-20h34c8 3 12 8 18 20" />
                <path d="M56 18h16" />
              </g>
            </svg>
          </div>
        </div>
      </section>

      {/* Brand mark and copyright */}
      <div className="mt-20 flex flex-col items-center gap-3">
        <Image
          src="/logo.png"
          alt="Cayenne"
          width={140}
          height={40}
          priority
          style={{ height: "auto" }}
        />
        <div className="text-black/80">© Cayenne 2025</div>
      </div>
    </main>
  );
}
