"use client";

import { useState } from "react";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");

    const data = new FormData(e.currentTarget);
    // TODO: send to API / action / service
    // await fetch("/api/contact", { method: "POST", body: data });

    setStatus("sent");
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
          />
        </label>
        <label className="block">
          <span className="block text-sm mb-1 text-white/90">Email</span>
          <input
            name="email"
            type="email"
            placeholder="you@example.com"
            className="w-full rounded-md border border-white/40 bg-white/80 px-3 py-2 outline-none placeholder:text-gray-500 focus:ring-2 focus:ring-primary_orange"
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
        />
      </label>

      <div className="md:col-span-2 flex justify-end">
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
