// app/page.tsx
import { Suspense } from "react";
import FilterMenu from "../components/FilterMenu";
import LanguageSelector from "../components/LanguageSelector";
import FeatureSection from "../components/FeatureSection";
import CarCategorySection from "../components/CarCategorySection";
import PartnerSection from "../components/PartnerSection";
import Footer from "../components/Footer";

export default function HomePage() {
  return (
    <>
      <main
        className="relative min-h-[100svh] w-full bg-cover bg-center"
        style={{ backgroundImage: "url('/heroimage/heroimage.jpg')" }}
      >
        {/* Soft overlay */}
        <div className="absolute inset-0 bg-black/10 z-0" />

        {/* Language selector pinned to hero; hide on phones */}
        <div className="absolute left-3 bottom-3 md:left-6 md:bottom-6 z-10 hidden md:block">
          <Suspense fallback={null}>
            <LanguageSelector />
          </Suspense>
        </div>

        {/* Centered glass card — matching look & mobile-safe height */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full px-3 z-10">
          <div
            className="
              mx-auto w-full max-w-3xl md:max-w-4xl
              rounded-2xl ring-1 ring-white/60 shadow-xl
              bg-gradient-to-b from-white/40 via-white/35 to-white/30
              backdrop-blur-md
              p-5 sm:p-7 lg:p-9
              max-h-[60vh] sm:max-h-[65vh]
              overflow-y-auto overscroll-contain
              [-webkit-overflow-scrolling:touch] [scrollbar-gutter:stable]
            "
          >
            <Suspense fallback={null}>
              <FilterMenu />
            </Suspense>
          </div>
        </div>
      </main>

      <FeatureSection />
      <CarCategorySection />
      <PartnerSection />
      <Footer />
    </>
  );
}
