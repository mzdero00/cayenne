"use client";

import { useEffect, useState } from "react";

export default function NavbarFrame({
  children,
  solid = false, // force white from the start (for pages without a hero)
}: {
  children: React.ReactNode;
  solid?: boolean;
}) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 5);
    onScroll(); // set initial state on mount
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // At top: subtle dark→transparent gradient. After scroll (or solid=true): white.
  const bgClass =
    solid || scrolled
      ? "bg-white backdrop-blur supports-[backdrop-filter]:bg-white shadow-md"
      : "bg-gradient-to-b from-black/10 to-transparent";

  return (
    <div
      className={`fixed top-0 left-0 w-full z-50 transition-colors duration-300 ${bgClass}`}
    >
      {children}
    </div>
  );
}
