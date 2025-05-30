import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function CarCategorySection() {
  return (
    <section className="bg-custom_lightgray py-16 px-4">
      <div className="max-w-6xl mx-auto flex flex-col items-center text-center space-y-10">
        {/* Cars */}
        <div className="flex flex-col gap-6 md:gap-10 items-center">
          <div className="flex justify-center gap-6 md:gap-12 items-end flex-wrap">
            <Image
              src="/cars/clio_side.png"
              alt="Car 1"
              width={200}
              height={100}
              className="object-contain"
            />
            <Image
              src="/cars/megane_side.png"
              alt="Car 2"
              width={240}
              height={100}
              className="object-contain"
            />
            <Image
              src="/cars/passat_side.png"
              alt="Car 3"
              width={220}
              height={100}
              className="object-contain"
            />
          </div>

          {/* Category selector */}
          <div className="flex items-center gap-3 text-lg text-custom_black">
            <ChevronLeft className="w-5 h-5 cursor-pointer" />
            <span className="font-jomolhari font-medium">Comfort</span>
            <ChevronRight className="w-5 h-5 cursor-pointer" />
          </div>

          {/* View All Button */}
          <button className="font-jomolhari bg-primary_green text-white font-medium px-6 py-2 rounded-md hover:opacity-90">
            View all vehicles
          </button>

          {/* Footer note */}
          <p className="font-sansita text-custom_black italic text-lg">
            Collaborations to Date
          </p>
        </div>
      </div>
    </section>
  );
}
