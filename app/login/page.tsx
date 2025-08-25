"use client";

import Image from "next/image";
import { supabaseBrowser } from "@/lib/supabase-browser";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const search = useSearchParams();
  const [pending, setPending] = useState(false);

  async function loginEmailPassword(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setPending(true);
    const fd = new FormData(e.currentTarget);
    const email = String(fd.get("email") || "");
    const password = String(fd.get("password") || "");

    const supabase = supabaseBrowser();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    setPending(false);

    if (error) return alert(error.message);
    router.replace("/"); // back home after login
  }

  async function loginWithGithub() {
    const supabase = supabaseBrowser();
    await supabase.auth.signInWithOAuth({
      provider: "github",
      options: { redirectTo: `${window.location.origin}/` }, // go home after OAuth
    });
  }

  const showCheckEmail = search?.get("checkEmail") === "1";

  return (
    <main className="relative min-h-screen bg-[#2b3238] text-white">
      {/* Heading */}
      <div className="pt-12 text-center">
        <h1 className="font-jomolhari text-3xl md:text-4xl">Login</h1>
      </div>

      {/* Card */}
      <section className="mt-6 flex items-start justify-center px-4 pb-24">
        <div className="relative w-full max-w-lg rounded-xl bg-white text-custom_black shadow-xl border border-black/10">
          <div className="p-6 md:p-8">
            {showCheckEmail && (
              <p className="mb-4 text-sm text-gray-600">
                Please confirm your email, then log in.
              </p>
            )}

            <form onSubmit={loginEmailPassword} className="space-y-6">
              <div>
                <label className="block text-sm text-gray-700 mb-1">
                  Email
                </label>
                <input
                  name="email"
                  type="email"
                  autoComplete="email"
                  className="w-full rounded-md bg-gray-100 px-3 py-2 outline-none focus:ring-2 focus:ring-primary_orange"
                  required
                />
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-1">
                  Password
                </label>
                <input
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  className="w-full rounded-md bg-gray-100 px-3 py-2 outline-none focus:ring-2 focus:ring-primary_orange"
                  required
                />
              </div>

              <div className="flex items-center justify-center pt-2">
                <button
                  type="submit"
                  disabled={pending}
                  className="rounded-md bg-primary_orange px-8 py-2 text-white font-medium shadow hover:opacity-95 disabled:opacity-60"
                >
                  {pending ? "Logging in…" : "Login"}
                </button>
              </div>
            </form>

            {/* Optional: GitHub sign-in button (remove if you want to match the image exactly) */}
            <div className="mt-6 flex items-center justify-center">
              <button
                type="button"
                onClick={loginWithGithub}
                className="inline-flex items-center gap-2 rounded-md border border-gray-300 px-4 py-2 text-gray-800 hover:bg-gray-50"
              >
                <svg viewBox="0 0 24 24" aria-hidden className="h-5 w-5">
                  <path
                    fill="currentColor"
                    d="M12 .5A11.5 11.5 0 0 0 .5 12.27c0 5.2 3.38 9.61 8.08 11.17.59.1.8-.26.8-.57l-.02-2.01c-3.29.73-3.99-1.42-3.99-1.42-.54-1.4-1.33-1.77-1.33-1.77-1.09-.77.08-.76.08-.76 1.2.09 1.84 1.27 1.84 1.27 1.07 1.89 2.81 1.34 3.49 1.03.11-.8.42-1.34.77-1.65-2.63-.31-5.4-1.35-5.4-6.02 0-1.33.47-2.41 1.25-3.26-.13-.31-.54-1.58.12-3.29 0 0 1.01-.33 3.3 1.24a11.2 11.2 0 0 1 3-.42c1.02 0 2.04.14 3 .42 2.28-1.57 3.29-1.24 3.29-1.24.67 1.71.26 2.98.13 3.29.78.85 1.24 1.93 1.24 3.26 0 4.69-2.78 5.7-5.42 6 .43.38.82 1.12.82 2.26l-.01 3.35c0 .31.2.68.81.57 4.7-1.56 8.07-5.97 8.07-11.17A11.5 11.5 0 0 0 12 .5z"
                  />
                </svg>
                Sign in with GitHub
              </button>
            </div>
          </div>

          {/* Brand mark inside card */}
          <div className="pointer-events-none absolute bottom-4 right-4">
            <Image
              src="/logo.png"
              alt="Cayenne"
              width={120}
              height={40}
              style={{ height: "auto" }}
              priority
            />
          </div>
        </div>
      </section>

      {/* Footer corners (like your mock) */}
      <div className="pointer-events-none select-none absolute bottom-4 left-6 text-sm text-white/90 tracking-wide">
        EN HR DE
      </div>
      <div className="pointer-events-none select-none absolute bottom-4 right-6 text-sm text-white/90">
        © Cayenne 2025
      </div>
    </main>
  );
}
