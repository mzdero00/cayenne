// app/components/FilterMenu.tsx
"use client";

import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";

/* ---------- Types & constants ---------- */

type FormState = {
  pickupLocation: string;
  returnLocation: string;
  pickupTime: string; // ISO "YYYY-MM-DDTHH:mm"
  returnTime: string; // ISO "YYYY-MM-DDTHH:mm"
  carClass: "Compact" | "Comfort" | "Comfort+" | "";
};

const cities = ["Split", "Imotski", "Makarska", "Zadar", "Dubrovnik", "Zagreb"];
const classes: FormState["carClass"][] = ["Compact", "Comfort", "Comfort+"];

type BackendType = "Compact" | "Comfort" | "ComfortPlus";

// UI class -> backend `type` for /cars
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

/* ---------- Helpers for the faux datetime field ---------- */

function formatDateTimeHint(iso: string) {
  if (!iso) return "dd / mm / yyyy,  -- : --";
  const d = new Date(iso);
  if (isNaN(d.getTime())) return "dd / mm / yyyy,  -- : --";
  const dd = String(d.getDate()).padStart(2, "0");
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const yyyy = d.getFullYear();
  const hh = String(d.getHours()).padStart(2, "0");
  const min = String(d.getMinutes()).padStart(2, "0");
  return `${dd}/${mm}/${yyyy},  ${hh}:${min}`;
}

/**
 * A reliable datetime picker for mobile:
 * - Shows a consistent placeholder/value on all devices
 * - Still opens the native picker for great UX
 */
function DateTimeField({
  label,
  value,
  onChange,
  ariaLabel,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  ariaLabel: string;
}) {
  const ref = React.useRef<HTMLInputElement>(null);

  const open = () => {
    const el = ref.current;
    if (!el) return;
    // iOS 16.4+ & modern Chrome support showPicker
    // @ts-expect-error - not in all TS lib dom typings
    if (typeof el.showPicker === "function") el.showPicker();
    else {
      el.focus();
      el.click();
    }
  };

  return (
    <label className="block">
      <span className="block text-sm text-black mb-1">{label}</span>

      {/* Visually-hidden native input that provides the picker */}
      <input
        ref={ref}
        type="datetime-local"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label={ariaLabel}
        className="sr-only"
      />

      {/* Visible “faux input” that always shows text */}
      <button
        type="button"
        onClick={open}
        className="w-full p-3 rounded-md bg-white/90 border border-black/10 flex items-center justify-between text-black hover:bg-white"
      >
        <span className={value ? "text-black" : "text-gray-500"}>
          {formatDateTimeHint(value)}
        </span>
        <svg viewBox="0 0 24 24" aria-hidden className="w-5 h-5 text-black/70">
          <path
            d="M7 2v3M17 2v3M3 9h18M5 5h14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
      </button>
    </label>
  );
}

/* ---------- Main component ---------- */

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

  // Typed change handlers
  const onChangeSelect =
    (field: keyof FormState) => (e: React.ChangeEvent<HTMLSelectElement>) =>
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
        <span className="block text-sm text-black mb-1">Pick up Location</span>
        <select
          value={form.pickupLocation}
          onChange={onChangeSelect("pickupLocation")}
          className="p-3 rounded-md bg-white/90 border border-black/10 w-full"
        >
          <option value="">Pick up Location</option>
          {cities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
      </label>

      {/* Return Location */}
      <label className="block">
        <span className="block text-sm text-black mb-1">Return Location</span>
        <select
          value={form.returnLocation}
          onChange={onChangeSelect("returnLocation")}
          className="p-3 rounded-md bg-white/90 border border-black/10 w-full"
        >
          <option value="">Return Location</option>
          {cities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
      </label>

      {/* Pickup Time (faux input + native picker) */}
      <DateTimeField
        label="Pickup"
        value={form.pickupTime}
        onChange={(v) => setForm((p) => ({ ...p, pickupTime: v }))}
        ariaLabel="Pickup date and time"
      />

      {/* Return Time (faux input + native picker) */}
      <DateTimeField
        label="Return"
        value={form.returnTime}
        onChange={(v) => setForm((p) => ({ ...p, returnTime: v }))}
        ariaLabel="Return date and time"
      />

      {/* Car Class (full width) */}
      <label className="block md:col-span-2">
        <span className="block text-sm text-black mb-1">Class</span>
        <select
          value={form.carClass}
          onChange={onChangeSelect("carClass")}
          className="p-3 rounded-md bg-white/90 border border-black/10 w-full"
        >
          <option value="">Class (any)</option>
          {classes.map((cls) => (
            <option key={cls} value={cls}>
              {cls}
            </option>
          ))}
        </select>
      </label>

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
