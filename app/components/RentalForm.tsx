// app/components/RentalForm.tsx  (your homepage/hero version)
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

  const control =
    "h-12 w-full min-w-0 rounded-md border border-black/10 bg-white/70 px-3 text-black";

  const handleChange = (field: keyof typeof form, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();

    if (form.pickupLocation) params.set("pickupLocation", form.pickupLocation);
    if (form.returnLocation) params.set("returnLocation", form.returnLocation);
    if (form.pickupTime) params.set("pickupTime", form.pickupTime);
    if (form.returnTime) params.set("returnTime", form.returnTime);
    if (form.carClass) params.set("carClass", form.carClass);

    // Map class -> backend type for /cars
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
      <label className="block">
        <span className="block text-sm text-black/80 mb-1">
          Pickup location
        </span>
        <select
          value={form.pickupLocation}
          onChange={(e) => handleChange("pickupLocation", e.target.value)}
          className={control}
        >
          <option value="">Select city</option>
          {cities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
      </label>

      {/* Return Location */}
      <label className="block">
        <span className="block text-sm text-black/80 mb-1">
          Return location
        </span>
        <select
          value={form.returnLocation}
          onChange={(e) => handleChange("returnLocation", e.target.value)}
          className={control}
        >
          <option value="">Select city</option>
          {cities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
      </label>

      {/* Pickup Time */}
      <label className="block">
        <span className="block text-sm text-black/80 mb-1">
          Pickup date & time
        </span>
        <input
          type="datetime-local"
          value={form.pickupTime}
          onChange={(e) => handleChange("pickupTime", e.target.value)}
          className={`${control} [color-scheme:light]`}
        />
      </label>

      {/* Return Time */}
      <label className="block">
        <span className="block text-sm text-black/80 mb-1">
          Return date & time
        </span>
        <input
          type="datetime-local"
          value={form.returnTime}
          onChange={(e) => handleChange("returnTime", e.target.value)}
          className={`${control} [color-scheme:light]`}
        />
      </label>

      {/* Car Class */}
      <label className="block md:col-span-2">
        <span className="block text-sm text-black/80 mb-1">Class</span>
        <select
          value={form.carClass}
          onChange={(e) => handleChange("carClass", e.target.value)}
          className={control}
        >
          <option value="">Any</option>
          {classes.map((cls) => (
            <option key={cls} value={cls}>
              {cls}
            </option>
          ))}
        </select>
      </label>

      {/* Search Button */}
      <div className="md:col-span-2 flex justify-center">
        <button
          type="submit"
          className="h-12 px-6 rounded-md bg-primary_orange text-white font-medium hover:opacity-90"
        >
          Search
        </button>
      </div>
    </form>
  );
}
