// app/cars/page.tsx
import Image from "next/image";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import FilterMenu from "../components/FilterMenu";
import { supabaseServer } from "@/lib/supabase-server";

export const metadata = {
  title: "Car Selection | Cayenne",
  description: "Browse compact rentals and search by type and price.",
};

function IconFuel() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className="w-5 h-5">
      <path
        d="M16 3h-8a2 2 0 00-2 2v14h10V5a2 2 0 00-2-2zm-1 12H9v-2h6v2zm0-4H9V9h6v2z"
        fill="currentColor"
        opacity=".7"
      />
      <path d="M18 7v10a2 2 0 104 0V9a2 2 0 00-2-2h-2z" fill="currentColor" />
    </svg>
  );
}
function IconGear() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className="w-5 h-5">
      <path
        d="M12 8a4 4 0 100 8 4 4 0 000-8zm9.4 4a7.38 7.38 0 00-.1-1l2-1.5-2-3.5-2.4 1a7.68 7.68 0 00-1.7-1l-.3-2.6H9.1l-.3 2.6c-.6.2-1.1.5-1.7 1l-2.4-1-2 3.5 2 1.5a8.82 8.82 0 000 2l-2 1.5 2 3.5 2.4-1c.5.4 1.1.7 1.7 1l.3 2.6h6.8l.3-2.6c.6-.2 1.1-.5 1.7-1l2.4 1 2-3.5-2-1.5c.1-.3.1-.7.1-1z"
        fill="currentColor"
        opacity=".7"
      />
    </svg>
  );
}
function IconPax() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className="w-5 h-5">
      <path d="M16 11a4 4 0 10-8 0 4 4 0 008 0z" fill="currentColor" />
      <path d="M4 20a8 8 0 0116 0v1H4v-1z" fill="currentColor" opacity=".7" />
    </svg>
  );
}

type ParamsRecord = Record<string, string | string[] | undefined>;

// Row type for Supabase result
type DbCar = {
  id: string;
  name: string;
  brand: string;
  type: "Compact" | "Comfort" | "ComfortPlus";
  price_per_day: number;
  pax: number;
  fuel: string;
  transmission: string;
  image_path: string;
};

async function fetchCars(searchParams: ParamsRecord) {
  const type =
    typeof searchParams.type === "string" ? searchParams.type : undefined;
  const priceMin =
    typeof searchParams.priceMin === "string"
      ? parseInt(searchParams.priceMin, 10)
      : undefined;
  const priceMax =
    typeof searchParams.priceMax === "string"
      ? parseInt(searchParams.priceMax, 10)
      : undefined;

  const supabase = await supabaseServer();

  // ⬇️ no generic here
  let q = supabase.from("cars").select("*");

  if (type === "Compact" || type === "Comfort" || type === "ComfortPlus") {
    q = q.eq("type", type);
  }
  if (typeof priceMin === "number") q = q.gte("price_per_day", priceMin);
  if (typeof priceMax === "number") q = q.lte("price_per_day", priceMax);

  const { data, error } = await q
    .order("price_per_day", { ascending: true })
    .order("name", { ascending: true });

  if (error) throw error;

  // ⬇️ Cast the payload to your row type
  const rows = (data ?? []) as DbCar[];

  return rows.map((c) => ({
    id: c.id,
    name: c.name,
    brand: c.brand,
    type: c.type,
    price: c.price_per_day,
    pax: c.pax,
    fuel: c.fuel,
    transmission: c.transmission,
    image: c.image_path,
  }));
}

export default async function CarsPage({
  // ⬇️ Next.js passes this as an async value now
  searchParams,
}: {
  searchParams: Promise<ParamsRecord>;
}) {
  // ⬇️ await before using
  const params = await searchParams;
  const cars = await fetchCars(params);

  return (
    <>
      <Navbar />

      {/* HERO with glass search */}
      <section className="relative h-[70vh] w-full font-jomolhari">
        <Image
          src="/heroimage/heroimage_cars.png"
          alt="Car by the sea"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-transparent" />

        {/* Glass search panel */}
        <div className="absolute inset-0 flex items-start justify-center pt-32 md:pt-40 lg:pt-48 px-4">
          <div className="w-full max-w-3xl md:max-w-4xl rounded-2xl border border-white/40 bg-white/60 backdrop-blur-md shadow-xl p-4 md:p-6">
            <FilterMenu />
          </div>
        </div>
      </section>

      {/* RESULTS */}
      <section id="results" className="bg-white py-14 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-jomolhari text-2xl md:text-3xl text-custom_black">
            Results
          </h2>
          <div className="h-[2px] bg-primary_orange/60 w-24 mt-1 mb-8" />

          {cars.length === 0 ? (
            <p className="text-gray-600">No cars match your filters.</p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {cars.map((car) => (
                <Link
                  key={car.id}
                  href={`/cars/${car.id}`}
                  className="group block"
                >
                  <article className="rounded-xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow p-5 cursor-pointer">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-lg font-semibold text-custom_black">
                        {car.name}
                      </h3>
                      <span className="text-sm text-gray-500">{car.brand}</span>
                    </div>

                    <div className="relative w-full aspect-[4/3] rounded-md overflow-hidden bg-gray-50">
                      <Image
                        src={car.image}
                        alt={car.name}
                        fill
                        className="object-contain"
                      />
                    </div>

                    <ul className="mt-4 space-y-2 text-gray-700 text-sm">
                      <li className="flex items-center gap-2">
                        <IconFuel /> {car.fuel}
                      </li>
                      <li className="flex items-center gap-2">
                        <IconGear /> {car.transmission}
                      </li>
                      <li className="flex items-center gap-2">
                        <IconPax /> Up to {car.pax}
                      </li>
                    </ul>

                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-gray-900 font-medium">
                        {car.price}€ per day
                      </span>
                      <span className="text-sky-700 group-hover:text-sky-800 text-sm underline">
                        See details &gt;
                      </span>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </>
  );
}
