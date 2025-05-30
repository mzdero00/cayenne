// app/page.tsx
import Image from "next/image";
import RentalForm from "../components/RentalForm";
import LanguageSelector from "../components/LanguageSelector";
import FeatureSection from "../components/FeatureSection";
import NavbarWrapper from "../components/NavbarWrapper";
import CarCategorySection from "../components/CarCategorySection";
import PartnerSection from "../components/PartnerSection";
import Footer from "../components/Footer";

export default function HomePage() {
  return (
    <>
      <NavbarWrapper />
      <main
        className="relative h-screen w-full bg-cover bg-center"
        style={{ backgroundImage: "url('/heroimage.jpg')" }}
      >
        {/* Overlay to darken background slightly */}
        <div className="absolute inset-0 bg-black/10 z-0" />

        {/* Content */}
        <div className="relative z-10 flex flex-col h-full items-center justify-center px-4">
          <RentalForm />
          <LanguageSelector />
        </div>
      </main>
      <FeatureSection />
      <CarCategorySection />
      <PartnerSection />
      <Footer />
    </>
  );
}
