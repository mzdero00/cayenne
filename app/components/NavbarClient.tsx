"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu } from "lucide-react";
import UserDropdown from "./UserDropdown";
import MobileMenu, { type NavItem } from "./MobileMenu";

type User = { id?: string; name?: string | null } | null;

export default function NavbarClient({
  user,
  items,
}: {
  user: User;
  items: NavItem[];
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const common =
    "group relative inline-block text-black px-2 py-1 transition-all duration-150";
  const underline =
    "absolute left-0 bottom-0 h-[2px] bg-primary_orange transition-all duration-250";

  return (
    <>
      <nav className="flex justify-between items-center px-6 py-4 max-w-7xl mx-auto">
        <Link href="/" className="shrink-0">
          <Image
            src="/logo.png"
            alt="Cayenne Logo"
            width={160}
            height={40}
            priority
            style={{ height: "auto" }}
          />
        </Link>

        {/* desktop links */}
        <div className="hidden md:flex gap-10 text-lg font-normal text-black font-jomolhari">
          {items.map((it) => {
            const isActive = !it.external && pathname === it.href;
            return it.external ? (
              <a
                key={it.href}
                href={it.href}
                target={it.target_blank ? "_blank" : undefined}
                rel={it.target_blank ? "noreferrer" : undefined}
                className={common}
              >
                <span className="relative z-10 group-hover:text-black">
                  {it.label}
                </span>
                <span
                  className={`${underline} w-0 group-hover:w-full`}
                  aria-hidden
                />
              </a>
            ) : (
              <Link
                key={it.href}
                href={it.href}
                className={`${common} ${
                  isActive ? "text-black font-semibold" : ""
                }`}
              >
                <span className="relative z-10 group-hover:text-black">
                  {it.label}
                </span>
                <span
                  className={`${underline} ${
                    isActive ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                  aria-hidden
                />
              </Link>
            );
          })}
        </div>

        {/* desktop user / auth */}
        <div className="hidden md:block">
          {user ? (
            <UserDropdown
              username={user.name ?? "User"}
              userId={user.id ?? "UserID"}
            />
          ) : (
            <div className="flex gap-3 items-center">
              <Link
                href="/signup"
                className="bg-white text-primary_orange px-4 py-2 rounded-md font-medium hover:opacity-90"
              >
                Sign Up
              </Link>
              <Link
                href="/login"
                className="bg-primary_green text-white px-4 py-2 rounded-md font-medium hover:opacity-90"
              >
                Login
              </Link>
            </div>
          )}
        </div>

        {/* mobile hamburger */}
        <button
          onClick={() => setOpen(true)}
          className="md:hidden p-2 rounded-md border border-black/10 bg-white/70 backdrop-blur text-custom_black"
          aria-label="Open menu"
        >
          <Menu className="w-5 h-5" />
        </button>
      </nav>

      {/* mobile menu extracted */}
      <MobileMenu
        open={open}
        onClose={() => setOpen(false)}
        items={items}
        user={user}
        pathname={pathname}
      />
    </>
  );
}
