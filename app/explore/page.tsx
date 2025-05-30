import Image from "next/image";
import NavbarWrapper from "../components/NavbarWrapper";
import Footer from "../components/Footer";

export default function ExplorePage() {
  return (
    <>
      <NavbarWrapper />

      {/* Hero Section */}
      <section className="relative h-[70vh] w-full font-jomolhari">
        <Image
          src="/heroimage_explore.jpg"
          alt="Scenic Dalmatian Coast"
          fill
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

      {/* Journey Map */}
      <section className="bg-custom_lightgray py-12 text-center text-lg text-custom_black font-jomolhari">
        <div className="flex flex-wrap justify-center items-center gap-4 md:gap-8 px-4">
          <span>Dubrovnik</span>
          <Arrow />
          <a href="#imotski">
            <span className="underline font-semibold hover:scale-105 transition-transform duration-150">
              Imotski
            </span>
          </a>

          <Arrow />
          <span>Split</span>
          <Arrow />
          <span>Makarska</span>
          <Arrow />
          <span>Šibenik</span>
          <Arrow />
          <span>Zadar</span>
        </div>
      </section>

      {/* Imotski Section */}
      <section id="imotski" className="bg-[#f7f7f7] py-16 px-6 font-jomolhari">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-10">
          <div className="flex-1 max-w-xl">
            <h3 className="text-2xl md:text-3xl font-serif mb-4 border-b-2 border-primary_orange inline-block text-custom_black">
              Imotski
            </h3>
            <p className="text-gray-700 text-sm leading-relaxed">
              Nestled in the heart of the Dalmatian hinterland, Imotski is a
              charming town rich in natural wonders and history. Best known for
              its breathtaking Blue Lake (Modro Jezero) and mysterious Red Lake
              (Crveno Jezero)—two of the most stunning karst lakes in
              Europe—Imotski offers a unique escape for nature lovers and
              adventurers alike. During the summer, visitors can swim in the
              Blue Lake’s crystal-clear waters, explore medieval fortresses like
              Topana Fortress, or take in panoramic views of the surrounding
              vineyards and rugged landscapes. A short drive from the coast,
              Imotski is the perfect destination for those looking to experience
              the authentic beauty of inland Dalmatia while staying close to the
              Adriatic’s famous beaches. Whether you're hiking, sightseeing, or
              simply soaking in the local charm, Imotski promises an
              unforgettable summer adventure.
            </p>
          </div>

          <div className="flex-1">
            <div className="max-w-6xl mx-auto flex flex-col-reverse lg:flex-row items-center gap-10">
              <Image
                src="/places/imotski.jpg"
                alt="Imotski"
                width={600}
                height={400}
                className="w-full h-auto rounded-md shadow-md object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

function Arrow() {
  return <span className="text-2xl -mt-1">➝</span>;
}
