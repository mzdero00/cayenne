"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";

export default function HomeFilterMenu() {
  const router = useRouter();

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
  const classes = ["Compact", "Comfort", "Comfort+"];

  const handleChange = (field: keyof typeof form, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();

    const params = new URLSearchParams();

    // Always include what user picked (so you can show/search on /cars)
    if (form.pickupLocation) params.set("pickupLocation", form.pickupLocation);
    if (form.returnLocation) params.set("returnLocation", form.returnLocation);
    if (form.pickupTime) params.set("pickupTime", form.pickupTime);
    if (form.returnTime) params.set("returnTime", form.returnTime);
    if (form.carClass) params.set("carClass", form.carClass);

    // Map class -> /cars "type" (your backend expects Compact | Comfort | ComfortPlus)
    const typeMap: Record<string, string> = {
      Compact: "Compact",
      Comfort: "Comfort",
      "Comfort+": "ComfortPlus",
    };
    const mappedType = typeMap[form.carClass];
    if (mappedType) params.set("type", mappedType);

    router.push(`/cars?${params.toString()}#results`);
  };

  return (
    <form
      onSubmit={onSubmit}
      className="bg-white/30 backdrop-blur-md p-6 md:p-10 rounded-3xl shadow-lg w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-4 text-black"
    >
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
          <option key={cls} value={cls}>
            {cls}
          </option>
        ))}
      </select>

      {/* Search Button */}
      <div className="md:col-span-2 flex justify-center">
        <button
          type="submit"
          className="bg-primary_orange text-white font-medium px-6 py-3 rounded-md hover:opacity-90"
        >
          Search
        </button>
      </div>
    </form>
  );
}
