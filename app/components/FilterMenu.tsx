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

// UI class -> backend type for /cars
type BackendType = "Compact" | "Comfort" | "ComfortPlus";
const classToType: Record<FormState["carClass"] | "", BackendType | undefined> =
  {
    "": undefined,
    Compact: "Compact",
    Comfort: "Comfort",
    "Comfort+": "ComfortPlus",
  };

// backend type -> UI class (for hydration)
const typeToClass: Record<BackendType | "", FormState["carClass"] | ""> = {
  "": "",
  Compact: "Compact",
  Comfort: "Comfort",
  ComfortPlus: "Comfort+",
};

// Unified control styles (same size for all fields, and shrink properly on mobile)
const control =
  "h-12 w-full block min-w-0 rounded-md border border-black/10 bg-white/90 px-3 text-black text-base tracking-normal tabular-nums";

/** Local component (not exported) to avoid Next serializable-props warning.
 *  Shows a pseudo-placeholder ONLY on mobile (md:hidden) when empty+blurred. */
function DateTimeField({
  value,
  setValue,
  placeholder,
  ariaLabel,
}: {
  value: string;
  setValue: (v: string) => void;
  placeholder: string; // e.g. "Pickup • dd/mm/yy hh:mm"
  ariaLabel: string;
}) {
  const [focused, setFocused] = React.useState(false);

  return (
    <div className="relative w-full">
      <input
        type="datetime-local"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        aria-label={ariaLabel}
        className={`
          ${control}
          [color-scheme:light]
          [&::-webkit-datetime-edit]:text-black
          [&::-webkit-calendar-picker-indicator]:opacity-80
        `}
      />
      {/* Pseudo placeholder: mobile only (md:hidden) to prevent desktop overlap */}
      {!value && !focused && (
        <span
          aria-hidden="true"
          className="
            pointer-events-none absolute left-3 top-1/2 -translate-y-1/2
            text-gray-500 text-sm select-none md:hidden
          "
        >
          {placeholder}
        </span>
      )}
    </div>
  );
}

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
        className={control}
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
        className={control}
      >
        <option value="">Return Location</option>
        {cities.map((city) => (
          <option key={city} value={city}>
            {city}
          </option>
        ))}
      </select>

      {/* Pickup Time (mobile placeholder only) */}
      <DateTimeField
        value={form.pickupTime}
        setValue={(v) => setForm((p) => ({ ...p, pickupTime: v }))}
        placeholder="Pickup • dd/mm/yy hh:mm"
        ariaLabel="Pickup date and time"
      />

      {/* Return Time */}
      <DateTimeField
        value={form.returnTime}
        setValue={(v) => setForm((p) => ({ ...p, returnTime: v }))}
        placeholder="Return • dd/mm/yy hh:mm"
        ariaLabel="Return date and time"
      />

      {/* Car Class (full width) */}
      <select
        value={form.carClass}
        onChange={onChangeSelect("carClass")}
        className={`${control} md:col-span-2`}
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
          className="bg-primary_orange text-white font-medium px-8 py-2 rounded-md hover:opacity-90"
        >
          Search
        </button>
      </div>
    </form>
  );
}
