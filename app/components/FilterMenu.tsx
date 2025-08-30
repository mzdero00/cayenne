// app/components/FilterMenu.tsx
"use client";

import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";

type FormState = {
  pickupLocation: string;
  returnLocation: string;
  pickupTime: string; // "YYYY-MM-DDTHH:mm"
  returnTime: string; // "YYYY-MM-DDTHH:mm"
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

// Unified control styles (same width/height everywhere, shrink nicely on mobile)
const control =
  "h-12 w-full min-w-0 rounded-md border border-black/10 bg-white/90 px-3 text-black text-base";

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

  // Hydrate from URL (keeps selections when returning from /cars)
  React.useEffect(() => {
    const backendType = (search.get("type") ?? "") as BackendType | "";
    setForm((prev) => ({
      ...prev,
      pickupLocation: search.get("pickupLocation") ?? "",
      returnLocation: search.get("returnLocation") ?? "",
      pickupTime: search.get("pickupTime") ?? "",
      returnTime: search.get("returnTime") ?? "",
      carClass:
        (search.get("carClass") as FormState["carClass"]) ??
        typeToClass[backendType] ??
        "",
    }));
  }, [search]);

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
      <label className="block">
        <span className="block text-sm text-black/80 mb-1">
          Pickup location
        </span>
        <select
          value={form.pickupLocation}
          onChange={onChangeSelect("pickupLocation")}
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
          onChange={onChangeSelect("returnLocation")}
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
          onChange={onChangeDateTime("pickupTime")}
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
          onChange={onChangeDateTime("returnTime")}
          className={`${control} [color-scheme:light]`}
        />
      </label>

      {/* Car Class (full width on md+) */}
      <label className="block md:col-span-2">
        <span className="block text-sm text-black/80 mb-1">Class</span>
        <select
          value={form.carClass}
          onChange={onChangeSelect("carClass")}
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
          className="h-12 px-8 rounded-md bg-primary_orange text-white font-medium hover:opacity-90"
        >
          Search
        </button>
      </div>
    </form>
  );
}
