// app/components/FilterMenu.tsx
"use client";

import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";

type FormState = {
  pickupLocation: string;
  returnLocation: string;
  pickupTime: string; // ISO "YYYY-MM-DDTHH:mm"
  returnTime: string; // ISO "YYYY-MM-DDTHH:mm"
  carClass: "Compact" | "Comfort" | "Comfort+" | "";
};

const cities = ["Split", "Imotski", "Makarska", "Zadar", "Dubrovnik", "Zagreb"];
const classes: FormState["carClass"][] = ["Compact", "Comfort", "Comfort+"];

// UI class -> backend `type` for /cars
type BackendType = "Compact" | "Comfort" | "ComfortPlus";
const classToType: Record<FormState["carClass"] | "", BackendType | undefined> =
  {
    "": undefined,
    Compact: "Compact",
    Comfort: "Comfort",
    "Comfort+": "ComfortPlus",
  };

// backend `type` -> UI class (for hydration)
const typeToClass: Record<BackendType | "", FormState["carClass"] | ""> = {
  "": "",
  Compact: "Compact",
  Comfort: "Comfort",
  ComfortPlus: "Comfort+",
};

export default function FilterMenu() {
  const router = useRouter();
  const search = useSearchParams();

  const [form, setForm] = React.useState<FormState>({
    pickupLocation: "",
    returnLocation: "",
    pickupTime: "",
    returnTime: "",
    carClass: "",
  });

  // Hydrate from URL
  React.useEffect(() => {
    const backendType = (search.get("type") ?? "") as BackendType | "";
    const next: Partial<FormState> = {
      pickupLocation: search.get("pickupLocation") ?? "",
      returnLocation: search.get("returnLocation") ?? "",
      pickupTime: search.get("pickupTime") ?? "",
      returnTime: search.get("returnTime") ?? "",
      carClass:
        (search.get("carClass") as FormState["carClass"]) ??
        typeToClass[backendType] ??
        "",
    };
    setForm((prev) => ({ ...prev, ...next }));
  }, [search]);

  // Typed change handlers (no any)
  const onChangeSelect =
    (field: keyof FormState) => (e: React.ChangeEvent<HTMLSelectElement>) =>
      setForm((p) => ({ ...p, [field]: e.target.value }));

  const onChangeDateTime =
    (field: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement>) =>
      setForm((p) => ({ ...p, [field]: e.target.value }));

  const onSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    const params = new URLSearchParams();
    if (form.pickupLocation) params.set("pickupLocation", form.pickupLocation);
    if (form.returnLocation) params.set("returnLocation", form.returnLocation);
    if (form.pickupTime) params.set("pickupTime", form.pickupTime);
    if (form.returnTime) params.set("returnTime", form.returnTime);
    if (form.carClass) params.set("carClass", form.carClass);

    const mapped = classToType[form.carClass];
    if (mapped) params.set("type", mapped);

    router.replace(`/cars?${params.toString()}`, { scroll: false });
    requestAnimationFrame(() => {
      document
        .getElementById("results")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  return (
    <form
      onSubmit={onSubmit}
      className="grid grid-cols-1 md:grid-cols-2 gap-4 text-black"
    >
      {/* Pickup Location */}
      <select
        value={form.pickupLocation}
        onChange={onChangeSelect("pickupLocation")}
        className="p-3 rounded-md bg-white/90 border border-black/10"
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
        onChange={onChangeSelect("returnLocation")}
        className="p-3 rounded-md bg-white/90 border border-black/10"
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
        onChange={onChangeDateTime("pickupTime")}
        className="
    p-3 rounded-md bg-white/90 border border-black/10
    text-black [color-scheme:light]
    [&::-webkit-datetime-edit]:text-black
    [&::-webkit-calendar-picker-indicator]:opacity-80
  "
      />

      <input
        type="datetime-local"
        value={form.returnTime}
        onChange={onChangeDateTime("returnTime")}
        className="
    p-3 rounded-md bg-white/90 border border-black/10
    text-black [color-scheme:light]
    [&::-webkit-datetime-edit]:text-black
    [&::-webkit-calendar-picker-indicator]:opacity-80
  "
      />

      {/* Car Class (full width) */}
      <select
        value={form.carClass}
        onChange={onChangeSelect("carClass")}
        className="p-3 rounded-md bg-white/90 border border-black/10 md:col-span-2"
      >
        <option value="">Class (any)</option>
        {classes.map((cls) => (
          <option key={cls} value={cls}>
            {cls}
          </option>
        ))}
      </select>

      {/* Search Button centered */}
      <div className="md:col-span-2 flex justify-center">
        <button
          type="submit"
          className="bg-primary_orange text-white font-medium px-8 py-2 rounded-md hover:opacity-90"
        >
          Search
        </button>
      </div>
    </form>
  );
}
