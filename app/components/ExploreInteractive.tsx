"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { supabaseBrowser } from "@/lib/supabase-browser";

type City = {
  id: string;
  name: string;
  img: string;
  blurb: string;
  alt: string;
};

// Row shape from Supabase
type CityRow = {
  id: string;
  name: string;
  blurb: string;
  image_path: string;
  alt: string;
  sort_order?: number | null;
};

function CurvedArrow() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 90 30"
      className="h-6 w-20 text-gray-400 flex-shrink-0"
    >
      <defs>
        <marker
          id="arrowhead"
          markerWidth="6"
          markerHeight="6"
          refX="5"
          refY="3"
          orient="auto"
        >
          <path d="M0,0 L6,3 L0,6 Z" fill="currentColor" />
        </marker>
      </defs>
      <path
        d="M2,24 C25,4 65,4 88,24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        markerEnd="url(#arrowhead)"
      />
    </svg>
  );
}

function CityChip({
  active,
  label,
  onClick,
  buttonRef,
}: {
  active: boolean;
  label: string;
  onClick: () => void;
  buttonRef?: (el: HTMLButtonElement | null) => void;
}) {
  return (
    <button
      ref={buttonRef}
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={[
        "px-4 py-2 rounded-full border shadow-sm transition-all duration-150 whitespace-nowrap",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-sky-500",
        active
          ? "bg-primary_orange text-white border-primary_orange"
          : "bg-white text-custom_black border-gray-200 hover:border-gray-300 hover:shadow",
      ].join(" ")}
    >
      {label}
    </button>
  );
}

/** Mobile horizontal chip rail (no arrows), auto-centers active chip */
function MobileChipRail({
  cities,
  selectedId,
  onSelect,
}: {
  cities: City[];
  selectedId: string;
  onSelect: (id: string) => void;
}) {
  const btnRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  useEffect(() => {
    const el = btnRefs.current[selectedId];
    if (el)
      el.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
  }, [selectedId]);

  return (
    <div className="md:hidden bg-custom_lightgray py-4">
      <div className="max-w-6xl mx-auto px-4 overflow-x-auto">
        <div className="flex items-center gap-2 pr-2">
          {cities.map((c) => (
            <CityChip
              key={c.id}
              active={selectedId === c.id}
              label={c.name}
              onClick={() => onSelect(c.id)}
              buttonRef={(el) => {
                btnRefs.current[c.id] = el;
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function ExploreInteractive() {
  const [cities, setCities] = useState<City[]>([]);
  const [selectedId, setSelectedId] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const detailsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const load = async () => {
      const supabase = supabaseBrowser();
      const { data, error } = await supabase
        .from("cities")
        .select("id,name,blurb,image_path,alt,sort_order")
        .order("sort_order", { ascending: true });

      if (error) {
        console.error("Failed to load cities:", error);
        setLoading(false);
        return;
      }

      const rows = (data ?? []) as CityRow[];

      const mapped: City[] = rows.map((r) => ({
        id: r.id,
        name: r.name,
        blurb: r.blurb,
        img: r.image_path,
        alt: r.alt,
      }));

      setCities(mapped);
      const defaultId =
        mapped.find((c) => c.id === "imotski")?.id || mapped[0]?.id || "";
      setSelectedId(defaultId);
      setLoading(false);
    };
    load();
  }, []);

  const city = useMemo(
    () => cities.find((c) => c.id === selectedId),
    [cities, selectedId]
  );

  const select = (id: string) => {
    setSelectedId(id);
    if (detailsRef.current)
      detailsRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      {/* Mobile: clean chip rail */}
      {!loading && (
        <MobileChipRail
          cities={cities}
          selectedId={selectedId}
          onSelect={select}
        />
      )}

      {/* Tablet/Desktop: original pills + curved arrows */}
      <section className="hidden md:block bg-custom_lightgray py-10 text-center font-jomolhari">
        <div className="max-w-6xl mx-auto px-4 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          {loading && (
            <div className="text-gray-500 text-sm">Loading places…</div>
          )}
          {!loading &&
            cities.map((c, i) => (
              <div key={c.id} className="flex items-center gap-2 sm:gap-3">
                <CityChip
                  active={selectedId === c.id}
                  label={c.name}
                  onClick={() => select(c.id)}
                />
                {i !== cities.length - 1 && <CurvedArrow />}
              </div>
            ))}
        </div>
      </section>

      {/* Details */}
      <section
        id="city-details"
        ref={detailsRef}
        className="bg-[#f7f7f7] py-16 px-6 font-jomolhari"
      >
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-10 items-center">
          {city ? (
            <>
              <div className="max-w-xl">
                <h3 className="text-2xl md:text-3xl font-serif mb-4 border-b-2 border-primary_orange inline-block text-custom_black">
                  {city.name}
                </h3>
                <p className="text-gray-700 text-base md:text-lg leading-relaxed">
                  {city.blurb}
                </p>
              </div>

              <div className="relative w-full max-w-2xl lg:ml-auto">
                <div className="relative aspect-[4/3]">
                  <div
                    className="absolute -bottom-4 -right-4 w-full h-full rounded-2xl bg-gray-300"
                    aria-hidden
                  />
                  <div
                    className="absolute -top-4 -left-4 w-full h-full rounded-2xl bg-white shadow"
                    aria-hidden
                  />
                  <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-xl">
                    <Image
                      src={city.img}
                      alt={city.alt}
                      fill
                      className="object-cover"
                      sizes="(min-width:1024px) 40vw, (min-width:640px) 60vw, 100vw"
                      priority
                    />
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="col-span-2 text-center text-gray-500">
              No city selected.
            </div>
          )}
        </div>
      </section>
    </>
  );
}
