// app/components/NavbarClient.tsx (CLIENT)
"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import UserDropdown from "./UserDropdown";

type User = { id?: string; name?: string | null } | null;
type NavItem = {
  label: string;
  href: string;
  external?: boolean;
  target_blank?: boolean;
};

export default function NavbarClient({
  user,
  items,
}: {
  user: User;
  items: NavItem[];
}) {
  const pathname = usePathname();

  return (
    <nav className="flex justify-between items-center px-6 py-4 max-w-7xl mx-auto">
      <Link href="/">
        <Image
          src="/logo.png"
          alt="Cayenne Logo"
          width={160}
          height={40}
          priority
          style={{ height: "auto" }}
        />
      </Link>

      <div className="hidden md:flex gap-10 text-lg font-normal text-black font-jomolhari">
        {items.map((it) => {
          const isActive = !it.external && pathname === it.href;
          const common =
            "group relative inline-block text-black px-2 py-1 transition-all duration-150";
          const underline =
            "absolute left-0 bottom-0 h-[2px] bg-primary_orange transition-all duration-250";
          return it.external ? (
            <a
              key={it.href}
              href={it.href}
              target={it.target_blank ? "_blank" : undefined}
              rel={it.target_blank ? "noreferrer" : undefined}
              className={common}
            >
              <span className="relative z-10 group-hover:text-black transition-colors duration-200">
                {it.label}
              </span>
              <span
                className={`${underline} w-0 group-hover:w-full`}
                aria-hidden="true"
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
              <span className="relative z-10 group-hover:text-black transition-colors duration-200">
                {it.label}
              </span>
              <span
                className={`${underline} ${
                  isActive ? "w-full" : "w-0 group-hover:w-full"
                }`}
                aria-hidden="true"
              />
            </Link>
          );
        })}
      </div>

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
    </nav>
  );
}
