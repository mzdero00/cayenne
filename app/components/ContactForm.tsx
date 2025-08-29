"use client";

import { useState } from "react";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setError(null);

    const form = e.currentTarget;
    const data = new FormData(form);

    // optional client-side guard
    if (
      !String(data.get("name") || "").trim() ||
      !String(data.get("email") || "").trim() ||
      !String(data.get("message") || "").trim()
    ) {
      setStatus("idle");
      setError("Please fill in name, email and message.");
      return;
    }

    const resp = await fetch("/api/contact", { method: "POST", body: data });
    const json = await resp.json().catch(() => ({}));
    if (!resp.ok || json?.ok === false) {
      setStatus("error");
      setError(json?.error || "Failed to send your message.");
      return;
    }

    setStatus("sent");
    form.reset();
  }

  return (
    <form
      className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6"
      onSubmit={onSubmit}
    >
      <div className="space-y-4">
        <label className="block">
          <span className="block text-sm mb-1 text-white/90">Name</span>
          <input
            name="name"
            type="text"
            placeholder="Your name"
            className="w-full rounded-md border border-white/40 bg-white/80 px-3 py-2 outline-none placeholder:text-gray-500 focus:ring-2 focus:ring-primary_orange"
            required
          />
        </label>
        <label className="block">
          <span className="block text-sm mb-1 text-white/90">Email</span>
          <input
            name="email"
            type="email"
            placeholder="you@example.com"
            className="w-full rounded-md border border-white/40 bg-white/80 px-3 py-2 outline-none placeholder:text-gray-500 focus:ring-2 focus:ring-primary_orange"
            required
          />
        </label>
        <label className="block">
          <span className="block text-sm mb-1 text-white/90">Phone</span>
          <input
            name="phone"
            type="tel"
            placeholder="+385..."
            className="w-full rounded-md border border-white/40 bg-white/80 px-3 py-2 outline-none placeholder:text-gray-500 focus:ring-2 focus:ring-primary_orange"
          />
        </label>
      </div>

      <label className="block md:row-span-3">
        <span className="block text-sm mb-1 text-white/90">Message</span>
        <textarea
          name="message"
          rows={8}
          placeholder="How can we help?"
          className="h-full w-full rounded-md border border-white/40 bg-white/80 px-3 py-2 outline-none placeholder:text-gray-500 focus:ring-2 focus:ring-primary_orange"
          required
        />
      </label>

      {error && (
        <div className="md:col-span-2 text-sm text-red-100 bg-red-600/70 rounded-md px-3 py-2">
          {error}
        </div>
      )}

      <div className="md:col-span-2 flex justify-end mt-2">
        <button
          type="submit"
          disabled={status === "sending" || status === "sent"}
          className="px-5 py-2 rounded-md bg-primary_orange text-white font-medium hover:opacity-95 transition disabled:opacity-60"
        >
          {status === "sent"
            ? "Sent ✓"
            : status === "sending"
            ? "Sending…"
            : "Send message"}
        </button>
      </div>
    </form>
  );
}
