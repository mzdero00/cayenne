"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

type Car = {
  id: string;
  name: string;
  src: string;
  category: "Compact" | "Comfort" | "Comfort+";
  width: number;
  height: number;
};

type Dir = 1 | -1;
type Slot = "left" | "center" | "right";

const CARS: Car[] = [
  {
    id: "clio",
    name: "Renault Clio",
    src: "/car/clio_side.png",
    category: "Compact",
    width: 200,
    height: 100,
  },
  {
    id: "megane",
    name: "Renault Megane",
    src: "/car/megane_side.png",
    category: "Comfort",
    width: 240,
    height: 100,
  },
  {
    id: "passat",
    name: "VW Passat",
    src: "/car/passat_side.png",
    category: "Comfort+",
    width: 220,
    height: 100,
  },
];

interface Props {
  viewAllHref?: string; // defaults to /cars
}

export default function CarCategorySection({ viewAllHref = "/cars" }: Props) {
  const prefersReducedMotion = useReducedMotion();

  const initialIndex = CARS.findIndex((c) => c.id === "megane") || 0;
  const [centerIndex, setCenterIndex] = useState(initialIndex);
  const [direction, setDirection] = useState<Dir>(1); // 1 => next (right), -1 => prev (left)

  const prev = useCallback(() => {
    setDirection(-1);
    setCenterIndex((i) => (i - 1 + CARS.length) % CARS.length);
  }, []);
  const next = useCallback(() => {
    setDirection(1);
    setCenterIndex((i) => (i + 1) % CARS.length);
  }, []);

  const indices = useMemo(() => {
    const left = (centerIndex - 1 + CARS.length) % CARS.length;
    const right = (centerIndex + 1) % CARS.length;
    return { left, center: centerIndex, right };
  }, [centerIndex]);

  const centerCar = CARS[centerIndex];

  // sizes: smaller sides, bigger center
  const CENTER_SCALE = 1.28;
  const SIDE_SCALE = 0.66;

  const scaleFor = (slot: Slot) =>
    slot === "center" ? CENTER_SCALE : SIDE_SCALE;

  // Only animate the pair involved in the move:
  // right click => animate { left, center }, left click => animate { right, center }
  const isAnimated = (slot: Slot, dir: Dir) =>
    dir === 1
      ? slot === "left" || slot === "center"
      : slot === "right" || slot === "center";

  const transitionFor = (slot: Slot) =>
    prefersReducedMotion
      ? { duration: 0.001 }
      : isAnimated(slot, direction)
      ? { type: "spring" as const, stiffness: 260, damping: 26, mass: 0.6 }
      : { duration: 0.001 }; // unaffected slot snaps instantly

  return (
    <section className="bg-custom_lightgray py-16 px-4">
      <div className="max-w-6xl mx-auto flex flex-col items-center text-center space-y-10">
        {/* Cars */}
        <div className="flex flex-col gap-6 md:gap-10 items-center">
          <div
            className="relative flex items-end justify-center w-full gap-6 md:gap-12 select-none"
            aria-live="polite"
            style={{ minHeight: 160 }}
          >
            {/* Left */}
            <Link
              href="/cars"
              aria-label={`Go to cars (left: ${CARS[indices.left].name})`}
              className="flex"
            >
              <motion.div
                key={CARS[indices.left].id + "-left"}
                style={{ zIndex: 1, cursor: "pointer" }}
                animate={{ scale: scaleFor("left") }}
                transition={transitionFor("left")}
                className="flex flex-col items-center"
              >
                <Image
                  src={CARS[indices.left].src}
                  alt={CARS[indices.left].name}
                  width={CARS[indices.left].width}
                  height={CARS[indices.left].height}
                  className="object-contain"
                  draggable={false}
                />
              </motion.div>
            </Link>

            {/* Center */}
            <Link
              href="/cars"
              aria-label={`Go to cars (selected: ${CARS[indices.center].name})`}
              className="flex"
            >
              <motion.div
                key={CARS[indices.center].id + "-center"}
                style={{ zIndex: 3, cursor: "pointer" }}
                animate={{ scale: scaleFor("center") }}
                transition={transitionFor("center")}
                className="flex flex-col items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-primary_green rounded-lg"
              >
                <Image
                  src={CARS[indices.center].src}
                  alt={CARS[indices.center].name}
                  width={CARS[indices.center].width}
                  height={CARS[indices.center].height}
                  className="object-contain"
                  priority
                  draggable={false}
                />
              </motion.div>
            </Link>

            {/* Right */}
            <Link
              href="/cars"
              aria-label={`Go to cars (right: ${CARS[indices.right].name})`}
              className="flex"
            >
              <motion.div
                key={CARS[indices.right].id + "-right"}
                style={{ zIndex: 2, cursor: "pointer" }}
                animate={{ scale: scaleFor("right") }}
                transition={transitionFor("right")}
                className="flex flex-col items-center"
              >
                <Image
                  src={CARS[indices.right].src}
                  alt={CARS[indices.right].name}
                  width={CARS[indices.right].width}
                  height={CARS[indices.right].height}
                  className="object-contain"
                  draggable={false}
                />
              </motion.div>
            </Link>
          </div>

          {/* Category selector */}
          <div className="flex items-center gap-3 text-lg text-custom_black">
            <button
              aria-label="Previous car"
              onClick={prev}
              className="p-2 rounded-md hover:bg-black/5 active:scale-95 transition"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Category text navigates to /cars */}
            <Link
              href="/cars"
              aria-label={`Go to cars (category: ${centerCar.category})`}
              className="font-jomolhari font-medium min-w-[7ch] underline-offset-4 hover:underline cursor-pointer"
            >
              {centerCar.category}
            </Link>

            <button
              aria-label="Next car"
              onClick={next}
              className="p-2 rounded-md hover:bg-black/5 active:scale-95 transition"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* View All Button — goes to /cars */}
          <Link
            href={viewAllHref}
            className="font-jomolhari bg-primary_green text-white font-medium px-6 py-2 rounded-md hover:opacity-90 active:scale-[0.98] transition"
            aria-label="View all vehicles"
          >
            View all vehicles
          </Link>

          {/* Footer note */}
          <p className="font-sansita text-custom_black italic text-3xl mt-12">
            Collaborations
          </p>
        </div>
      </div>
    </section>
  );
}
