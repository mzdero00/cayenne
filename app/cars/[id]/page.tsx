import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { supabaseServer } from "@/lib/supabase-server";

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

type RouteParams = { id: string };
type SearchParams = Record<string, string | string[] | undefined>;

function displayName(brand: string, name: string) {
  return name.trim().toLowerCase().startsWith(brand.toLowerCase())
    ? name
    : `${brand} ${name}`;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<RouteParams>;
}) {
  const { id } = await params;

  const supabase = await supabaseServer();
  const { data } = await supabase
    .from("cars")
    .select("name,brand")
    .eq("id", id)
    .single();

  const title = data
    ? `${displayName(data.brand as string, data.name as string)} | Cayenne`
    : "Car | Cayenne";

  return { title, description: "Car details and daily price." };
}

export default async function CarPage({
  params,
  searchParams,
}: {
  params: Promise<RouteParams>;
  searchParams: Promise<SearchParams>;
}) {
  const { id } = await params;
  const sp = await searchParams;

  const pickupTime =
    typeof sp.pickupTime === "string" ? sp.pickupTime : undefined;
  const returnTime =
    typeof sp.returnTime === "string" ? sp.returnTime : undefined;

  const supabase = await supabaseServer();
  const { data: carRow, error } = await supabase
    .from("cars")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !carRow) return notFound();

  const car = carRow as DbCar;
  const niceName = displayName(car.brand, car.name);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      <main className="flex-1 pt-20 md:pt-24">
        <div className="max-w-5xl mx-auto px-4 pb-10">
          {/* Title */}
          <h1 className="font-jomolhari text-xl md:text-2xl text-custom_black mb-2">
            {niceName}
          </h1>
          <div className="h-[2px] w-28 bg-[#7fbf7f]" />

          {/* Top gray box: image only */}
          <div className="mt-6 rounded-lg border border-gray-200 bg-[#F5F5F5] shadow-[0_3px_0_0_rgba(0,0,0,0.15)] p-5 md:p-6">
            <div className="relative mx-auto w-full max-w-3xl aspect-[5/3] rounded-xl overflow-hidden">
              <Image
                src={car.image_path}
                alt={niceName}
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>

          {/* Two cards row: left details / right price */}
          <div className="mt-8 grid md:grid-cols-2 gap-8">
            {/* LEFT: Details */}
            <section className="rounded-lg border border-gray-200 p-6 bg-white">
              <h2 className="font-jomolhari text-lg md:text-xl mb-4 text-custom_black">
                Vehicle
              </h2>
              <div className="text-gray-700 space-y-2">
                <div>
                  <strong>Model:</strong> {niceName}
                </div>
                <div>
                  <strong>Class:</strong>{" "}
                  {car.type === "ComfortPlus" ? "Comfort+" : car.type}
                </div>
                <div>
                  <strong>Seats:</strong> {car.pax}
                </div>
              </div>

              <h3 className="font-jomolhari text-lg md:text-xl mt-6 mb-2 text-custom_black">
                Specs
              </h3>
              <div className="text-gray-700 space-y-2">
                <div>
                  <strong>Fuel:</strong> {car.fuel}
                </div>
                <div>
                  <strong>Transmission:</strong> {car.transmission}
                </div>
              </div>
            </section>

            {/* RIGHT: Price / CTA */}
            <section className="rounded-lg border border-gray-200 p-6 bg-white">
              <div className="text-2xl font-semibold text-custom_black">
                {car.price_per_day}€{" "}
                <span className="text-base font-normal text-gray-600">
                  / day
                </span>
              </div>
              <p className="text-sm text-gray-600 mt-2">Taxes included.</p>
              <div className="mt-6 flex gap-3">
                <Link
                  href={{
                    pathname: `/checkout`,
                    query: { carId: car.id, pickupTime, returnTime },
                  }}
                  className="rounded-md bg-primary_orange text-white px-5 h-10 inline-flex items-center justify-center font-medium hover:opacity-95"
                >
                  Book now
                </Link>
                <Link
                  href="/cars"
                  className="rounded-md border border-gray-300 bg-white px-5 h-10 inline-flex items-center justify-center text-custom_black hover:bg-gray-50"
                >
                  Back to cars
                </Link>
              </div>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
