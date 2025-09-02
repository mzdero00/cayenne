import Image from "next/image";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ExploreInteractive from "../components/ExploreInteractive";
import heroExplore from "@/public/heroimage/heroimage_explore.jpg";

export const metadata = {
  title: "Explore Dalmatia | Cayenne",
};

export default function ExplorePage() {
  return (
    <>
      <Navbar />

      <section className="relative h-[70vh] w-full font-jomolhari">
        <Image
          src={heroExplore}
          alt="Scenic Dalmatian Coast"
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-white text-center px-4">
          <h2 className="text-3xl md:text-5xl font-light mb-4">
            Scenic Roads, Timeless Beauty
          </h2>
          <h1 className="text-2xl md:text-4xl font-semibold">
            A Journey Through Coastal Wonders
          </h1>
        </div>
      </section>

      <ExploreInteractive />

      <section className="bg-white py-12 text-center font-jomolhari">
        <p className="text-gray-700">
          If you want to learn more, please visit TripAdvisor.
        </p>
        <a
          href="https://www.tripadvisor.com/"
          target="_blank"
          rel="noreferrer"
          className="inline-block mt-3 underline text-sky-700 hover:text-sky-800"
        >
          Learn More
        </a>
      </section>

      <Footer />
    </>
  );
}
