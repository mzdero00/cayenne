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

// ⬇️ slightly shorter input height
const control =
  "h-11 w-full min-w-0 rounded-md border border-black/10 bg-white/90 px-3 text-black text-base";

/** format Date -> 'YYYY-MM-DDTHH:mm' (local) */
function toLocalInputValue(d: Date) {
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(
    d.getHours()
  )}:${pad(d.getMinutes())}`;
}

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

  const nowLocal = React.useMemo(() => {
    const d = new Date();
    d.setSeconds(0, 0);
    return toLocalInputValue(d);
  }, []);

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

  const onChangePickup = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value;
    setForm((p) => ({
      ...p,
      pickupTime: v,
      returnTime: isBefore(p.returnTime, v) ? v : p.returnTime,
    }));
  };
  const onChangeReturn = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value;
    setForm((p) => ({
      ...p,
      returnTime: v,
      pickupTime: isAfter(p.pickupTime, v) ? v : p.pickupTime,
    }));
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

  const pickupMin = nowLocal;
  const pickupMax = form.returnTime || undefined;
  const returnMin =
    form.pickupTime && form.pickupTime > nowLocal ? form.pickupTime : nowLocal;

  return (
    <form
      onSubmit={onSubmit}
      className="grid grid-cols-1 md:grid-cols-2 gap-3 text-black"
    >
      {/* Pickup Location */}
      <label className="block">
        <span className="block text-sm text-black/80 mb-0.5">
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
        <span className="block text-sm text-black/80 mb-0.5">
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
        <span className="block text-sm text-black/80 mb-0.5">
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
        <span className="block text-sm text-black/80 mb-0.5">
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
        <span className="block text-sm text-black/80 mb-0.5">Class</span>
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
          className="h-11 px-7 rounded-md bg-primary_orange text-white font-medium hover:opacity-90"
        >
          Search
        </button>
      </div>
    </form>
  );
}
