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

type BackendType = "Compact" | "Comfort" | "ComfortPlus";
const classToType: Record<FormState["carClass"] | "", BackendType | undefined> =
  {
    "": undefined,
    Compact: "Compact",
    Comfort: "Comfort",
    "Comfort+": "ComfortPlus",
  };
const typeToClass: Record<BackendType | "", FormState["carClass"] | ""> = {
  "": "",
  Compact: "Compact",
  Comfort: "Comfort",
  ComfortPlus: "Comfort+",
};

// unified control styling
const control =
  "h-12 w-full min-w-0 rounded-md border border-black/10 bg-white/90 px-3 text-black text-base";

/** format a Date to local 'YYYY-MM-DDTHH:mm' */
function toLocalInputValue(d: Date) {
  const pad = (n: number) => String(n).padStart(2, "0");
  const y = d.getFullYear();
  const m = pad(d.getMonth() + 1);
  const day = pad(d.getDate());
  const h = pad(d.getHours());
  const min = pad(d.getMinutes());
  return `${y}-${m}-${day}T${h}:${min}`;
}

/** string compare works for these ISO-local values */
const isBefore = (a?: string, b?: string) => !!a && !!b && a < b;
const isAfter = (a?: string, b?: string) => !!a && !!b && a > b;

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

  // now (local) for min attributes
  const nowLocal = React.useMemo(() => {
    const d = new Date();
    d.setSeconds(0, 0);
    return toLocalInputValue(d);
  }, []);

  // hydrate from URL
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

  // Enforce forward-only range when either side changes
  const onChangePickup = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value;
    setForm((p) => {
      let nextReturn = p.returnTime;
      if (isBefore(nextReturn, v)) {
        nextReturn = v; // clamp return to pickup
      }
      return { ...p, pickupTime: v, returnTime: nextReturn };
    });
  };

  const onChangeReturn = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value;
    setForm((p) => {
      let nextPickup = p.pickupTime;
      if (isAfter(nextPickup, v)) {
        nextPickup = v; // clamp pickup to return
      }
      return { ...p, returnTime: v, pickupTime: nextPickup };
    });
  };

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
    requestAnimationFrame(() =>
      document
        .getElementById("results")
        ?.scrollIntoView({ behavior: "smooth", block: "start" })
    );
  };

  // dynamic constraints
  const pickupMin = nowLocal;
  const pickupMax = form.returnTime || undefined;
  const returnMin =
    form.pickupTime && form.pickupTime > nowLocal ? form.pickupTime : nowLocal;

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
          onChange={onChangePickup}
          className={`${control} [color-scheme:light]`}
          min={pickupMin}
          max={pickupMax}
          step={60}
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
          onChange={onChangeReturn}
          className={`${control} [color-scheme:light]`}
          min={returnMin}
          step={60}
        />
      </label>

      {/* Car Class */}
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

      {/* Search */}
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
