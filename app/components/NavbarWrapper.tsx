"use client";

import { useEffect, useState } from "react";
import NavbarContent from "./NavbarContent";

export default function NavbarWrapper() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 5);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`fixed top-0 left-0 w-full z-50 transition-colors duration-300 ${
        scrolled
          ? "bg-primary_orange shadow-md"
          : "bg-gradient-to-b from-[rgba(0,0,0,0.09)] to-[rgba(0,0,0,0.01)]"
      }`}
    >
      <NavbarContent />
    </div>
  );
}
