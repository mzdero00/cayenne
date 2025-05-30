"use client";

import { useState } from "react";

export default function RentalForm() {
  const [form, setForm] = useState({
    pickupLocation: "",
    returnLocation: "",
    pickupTime: "",
    returnTime: "",
    carClass: "",
  });

  const cities = [
    "Split",
    "Imotski",
    "Makarska",
    "Zadar",
    "Dubrovnik",
    "Zagreb",
  ];
  const classes = ["Compact", "Comfort", "Comfort+", "Grand Tourer"];

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <form className="bg-white/30 backdrop-blur-md p-6 md:p-10 rounded-3xl shadow-lg w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-4 text-black">
      {/* Pickup Location */}
      <select
        value={form.pickupLocation}
        onChange={(e) => handleChange("pickupLocation", e.target.value)}
        className="p-3 rounded-md bg-white/70"
      >
        <option value="">Pick up Location</option>
        {cities.map((city) => (
          <option key={city} value={city}>
            {city}
          </option>
        ))}
      </select>

      {/* Return Location */}
      <select
        value={form.returnLocation}
        onChange={(e) => handleChange("returnLocation", e.target.value)}
        className="p-3 rounded-md bg-white/70"
      >
        <option value="">Return Location</option>
        {cities.map((city) => (
          <option key={city} value={city}>
            {city}
          </option>
        ))}
      </select>

      {/* Pickup Time */}
      <input
        type="datetime-local"
        value={form.pickupTime}
        onChange={(e) => handleChange("pickupTime", e.target.value)}
        className="p-3 rounded-md bg-white/70"
      />

      {/* Return Time */}
      <input
        type="datetime-local"
        value={form.returnTime}
        onChange={(e) => handleChange("returnTime", e.target.value)}
        className="p-3 rounded-md bg-white/70"
      />

      {/* Car Class */}
      <select
        value={form.carClass}
        onChange={(e) => handleChange("carClass", e.target.value)}
        className="p-3 rounded-md bg-white/70 text-black w-full col-span-1 md:col-span-2"
      >
        <option value="">Class (any)</option>
        {classes.map((cls) => (
          <option key={cls} value={cls.toLowerCase()}>
            {cls}
          </option>
        ))}
      </select>

      {/* Search Button */}
      <button
        type="submit"
        className="bg-primary_orange text-white font-medium px-6 py-3 rounded-md mt-2 md:mt-0 md:col-span-2 hover:opacity-90"
      >
        Search
      </button>
    </form>
  );
}
