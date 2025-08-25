"use client";

import Image from "next/image";
import { useMemo, useRef, useState } from "react";

type City = {
  id: string;
  name: string;
  img: string;
  blurb: string;
  alt: string;
};

const CITIES: City[] = [
  {
    id: "dubrovnik",
    name: "Dubrovnik",
    img: "/places/dubrovnik.jpg",
    alt: "Old town walls of Dubrovnik over the Adriatic",
    blurb:
      "Dubrovnik dazzles with limestone streets, terracotta rooftops, and fortress walls above an electric-blue sea. Stroll the Stradun, ride the cable car to Mount Srđ, and wander hidden coves where history meets modern café culture.",
  },
  {
    id: "imotski",
    name: "Imotski",
    img: "/places/imotski.jpg",
    alt: "Blue Lake in Imotski",
    blurb:
      "Imotski’s Blue and Red Lakes carve dramatic circles into karst stone. Swim in summer, climb to Topana Fortress, and pair inland vineyards with a quick dash to Makarska beaches just over the mountains.",
  },
  {
    id: "split",
    name: "Split",
    img: "/places/split.jpg",
    alt: "Split waterfront and Diocletian’s Palace",
    blurb:
      "Life flows through Diocletian’s Palace like a living museum. Morning markets, marble peristyles, and a sunset Riva promenade set the mood—plus ferries to islands that redefine the word ‘getaway’.",
  },
  {
    id: "makarska",
    name: "Makarska",
    img: "/places/makarska.jpg",
    alt: "Makarska beach beneath Biokovo mountain",
    blurb:
      "Between pine-shaded beaches and the Biokovo massif, Makarska blends beach-day ease with alpine drama. Cruise the Riviera, chase viewpoints, and slow down with a gelato by the harbor.",
  },
  {
    id: "sibenik",
    name: "Šibenik",
    img: "/places/sibenik.jpg",
    alt: "Šibenik cathedral and stone lanes",
    blurb:
      "Stone alleys climb to fortresses above a glittering bay. Visit the UNESCO-listed Cathedral of St. James, sip by the marina, and hop to the waterfalls of Krka National Park.",
  },
  {
    id: "zadar",
    name: "Zadar",
    img: "/places/zadar.jpg",
    alt: "Zadar sea organ and waterfront",
    blurb:
      "Hear the Sea Organ sing while the Sun Salutation lights dance at dusk. Roman forums, island-speckled horizons, and an atmosphere that’s equal parts inventive and timeless.",
  },
];

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
}: {
  active: boolean;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={[
        "px-4 py-2 rounded-full border shadow-sm transition-all duration-150",
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

export default function ExploreInteractive() {
  const [selectedId, setSelectedId] = useState<City["id"]>("imotski");
  const detailsRef = useRef<HTMLDivElement>(null);

  const city = useMemo(
    () => CITIES.find((c) => c.id === selectedId)!,
    [selectedId]
  );

  const select = (id: City["id"]) => {
    setSelectedId(id);
    // Smoothly scroll to details on smaller screens
    if (detailsRef.current) {
      detailsRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <>
      {/* Journey Map (modern pills + curved arrows) */}
      <section className="bg-custom_lightgray py-10 text-center font-jomolhari">
        <div className="max-w-6xl mx-auto px-4 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          {CITIES.map((c, i) => (
            <div key={c.id} className="flex items-center gap-2 sm:gap-3">
              <CityChip
                active={selectedId === c.id}
                label={c.name}
                onClick={() => select(c.id)}
              />
              {i !== CITIES.length - 1 && <CurvedArrow />}
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
          <div className="max-w-xl">
            <h3 className="text-2xl md:text-3xl font-serif mb-4 border-b-2 border-primary_orange inline-block text-custom_black">
              {city.name}
            </h3>
            <p className="text-gray-700 text-sm leading-relaxed">
              {city.blurb}
            </p>
          </div>

          <div className="relative w-full max-w-2xl lg:ml-auto">
            <div
              className="absolute -bottom-4 -right-4 w-full h-full rounded-2xl bg-gray-300"
              aria-hidden
            />
            <div
              className="absolute -top-4 -left-4 w-full h-full rounded-2xl bg-white shadow"
              aria-hidden
            />
            <div className="relative rounded-2xl overflow-hidden shadow-xl">
              <Image
                src={city.img}
                alt={city.alt}
                width={1000}
                height={667}
                className="w-full h-auto object-cover"
                style={{ height: "auto" }} // keep aspect when CSS affects width
                priority
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
