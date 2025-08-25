"use client";

import Image from "next/image";
import { supabaseBrowser } from "@/lib/supabase-browser";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignUpPage() {
  const router = useRouter();
  const [pending, setPending] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setPending(true);

    const fd = new FormData(e.currentTarget);

    const firstName = String(fd.get("firstName") || "");
    const lastName = String(fd.get("lastName") || "");
    const full_name = `${firstName} ${lastName}`.trim();

    const email = String(fd.get("email") || "");
    const password = String(fd.get("password") || "");
    const confirmPassword = String(fd.get("confirmPassword") || "");
    const dob = String(fd.get("dob") || ""); // stored in user_metadata (optional)

    if (password !== confirmPassword) {
      setPending(false);
      return alert("Passwords do not match.");
    }

    const supabase = supabaseBrowser();
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name, first_name: firstName, last_name: lastName, dob },
        emailRedirectTo: `${window.location.origin}/login?checkEmail=1`,
      },
    });

    setPending(false);
    if (error) return alert(error.message);
    router.push("/login?checkEmail=1");
  }

  return (
    <main className="relative min-h-screen bg-[#2b3238] text-white">
      {/* Heading */}
      <div className="pt-12 text-center">
        <h1 className="font-jomolhari text-3xl md:text-4xl">Sign up</h1>
      </div>

      {/* Card */}
      <section className="mt-6 flex items-start justify-center px-4 pb-24">
        <div className="relative w-full max-w-3xl rounded-xl bg-white text-custom_black shadow-xl border border-black/10">
          <form
            onSubmit={onSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-5 p-6 md:p-8"
          >
            {/* First row */}
            <label className="block">
              <span className="block text-sm text-gray-700 mb-1">
                First Name
              </span>
              <input
                name="firstName"
                type="text"
                autoComplete="given-name"
                className="w-full rounded-md bg-gray-100 px-3 py-2 outline-none focus:ring-2 focus:ring-primary_orange"
                required
              />
            </label>

            <label className="block">
              <span className="block text-sm text-gray-700 mb-1">Email</span>
              <input
                name="email"
                type="email"
                autoComplete="email"
                className="w-full rounded-md bg-gray-100 px-3 py-2 outline-none focus:ring-2 focus:ring-primary_orange"
                required
              />
            </label>

            {/* Second row */}
            <label className="block">
              <span className="block text-sm text-gray-700 mb-1">
                Last Name
              </span>
              <input
                name="lastName"
                type="text"
                autoComplete="family-name"
                className="w-full rounded-md bg-gray-100 px-3 py-2 outline-none focus:ring-2 focus:ring-primary_orange"
                required
              />
            </label>

            <label className="block">
              <span className="block text-sm text-gray-700 mb-1">Password</span>
              <input
                name="password"
                type="password"
                autoComplete="new-password"
                minLength={8}
                className="w-full rounded-md bg-gray-100 px-3 py-2 outline-none focus:ring-2 focus:ring-primary_orange"
                required
              />
            </label>

            {/* Third row */}
            <label className="block">
              <span className="block text-sm text-gray-700 mb-1">
                Date of Birth
              </span>
              <input
                name="dob"
                type="date"
                className="w-full rounded-md bg-gray-100 px-3 py-2 outline-none focus:ring-2 focus:ring-primary_orange"
              />
            </label>

            <label className="block">
              <span className="block text-sm text-gray-700 mb-1">
                Confirm Password
              </span>
              <input
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                minLength={8}
                className="w-full rounded-md bg-gray-100 px-3 py-2 outline-none focus:ring-2 focus:ring-primary_orange"
                required
              />
            </label>

            {/* Submit row */}
            <div className="md:col-span-2 flex items-center justify-center pt-2">
              <button
                type="submit"
                disabled={pending}
                className="rounded-md bg-primary_orange px-8 py-2 text-white font-medium shadow hover:opacity-95 disabled:opacity-60"
              >
                {pending ? "Signing up…" : "Sign up"}
              </button>
            </div>
          </form>

          {/* Brand mark inside the card */}
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

      {/* Footer corners */}
      <div className="pointer-events-none select-none absolute bottom-4 left-6 text-sm text-white/90 tracking-wide">
        EN HR DE
      </div>
      <div className="pointer-events-none select-none absolute bottom-4 right-6 text-sm text-white/90">
        © Cayenne 2025
      </div>
    </main>
  );
}
