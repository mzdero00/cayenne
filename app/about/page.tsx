import Image from "next/image";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ContactForm from "../components/ContactForm";
import heroAbout from "@/public/heroimage/heroimage_aboutus.png";

export const metadata = {
  title: "About Us | Cayenne",
  description:
    "Learn about Cayenne: our mission, story, and how to reach us — including address, company details, and an interactive map.",
};

export default function AboutPage() {
  return (
    <>
      <Navbar />

      {/* HERO */}
      <section className="relative min-h-[70vh] w-full font-jomolhari">
        <Image
          src={heroAbout}
          alt="Croatian countryside path under dramatic skies"
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/35" />

        {/* Headline + Glass Form (relative so the section grows to fit) */}
        <div className="relative z-10 mx-auto w-full max-w-4xl px-4 pt-28 pb-10">
          <h1 className="text-white text-3xl md:text-5xl font-light drop-shadow-sm text-center">
            Have a question?
          </h1>

          <div className="mt-6">
            <div className="rounded-2xl border border-white/40 bg-white/60 backdrop-blur-md shadow-xl p-5 sm:p-6 md:p-8 text-custom_black">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT + MAP */}
      <section className="bg-white py-14 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          <div>
            <p className="mt-20 text-gray-800 leading-7 font-jomolhari">
              Our rent-a-car service was founded in 2019 with the goal of
              providing safe, comfortable, and worry‑free travel across Croatia.
              Whether you&apos;re exploring the coast, islands, or inland areas,
              we offer a diverse fleet of vehicles, from compact city cars to
              spacious family‑friendly options.
            </p>
            <p className="mt-4 text-gray-800 leading-7 font-jomolhari">
              All our cars come with full insurance included in the price, and
              our flexible rental options allow you to tailor your journey to
              your needs. We are committed to reliability, affordability, and
              top‑notch service to ensure the best experience for every driver.
              Book your car today and explore Croatia with ease!
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="font-jomolhari text-xl md:text-2xl text-custom_black">
              Where to find us?
            </h2>
            <div className="rounded-xl overflow-hidden border border-gray-200 shadow-sm">
              <iframe
                title="Cayenne location map"
                src="https://www.google.com/maps?q=Ulica%20Bruna%20Bu%C5%A1i%C4%87a%2051B%2C%20Imotski&output=embed"
                className="w-full h-[260px] md:h-[300px]"
                loading="lazy"
              />
            </div>

            <div className="text-gray-800 leading-7">
              <p className="font-semibold">
                CAYENNE d.o.o. za trgovinu i usluge
              </p>
              <p>Ulica Bruna Bušića 51B, 21260, Imotski</p>
              <p>OIB 55098035050</p>
              <p>MBS 060408064</p>
              <p>Datum osnivanja 11.07.2019.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <Footer />
    </>
  );
}
