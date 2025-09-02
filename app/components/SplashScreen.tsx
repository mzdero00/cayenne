"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function SplashScreen() {
  const [mounted, setMounted] = useState(false);
  const [fade, setFade] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("cayenne:splash-seen")) return;

    setMounted(true);
    const t1 = setTimeout(() => setFade(true), 1100);
    const t2 = setTimeout(() => {
      setMounted(false);
      sessionStorage.setItem("cayenne:splash-seen", "1");
    }, 1700);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  if (!mounted) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-[#f2f3f4] 
                  transition-opacity duration-500 ${
                    fade ? "opacity-0" : "opacity-100"
                  }`}
      aria-label="Loading"
    >
      <div className="flex flex-col items-center justify-center">
        <Image
          src="/logo.png"
          alt="Cayenne"
          width={220}
          height={64}
          priority
          style={{ height: "auto" }}
        />
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-gray-700">
        © Cayenne 2025
      </div>
    </div>
  );
}
