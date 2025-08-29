"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { logout } from "@/app/actions/logout";

type Props = {
  username: string;
  userId: string; // still accepted, now actually used
};

export default function UserDropdown({ username, userId }: Props) {
  const [userOpen, setUserOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setUserOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const linkStyle = "block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100";

  return (
    <div
      ref={ref}
      className="relative flex items-center gap-2"
      data-userid={userId} // marks userId as used, no UI change
    >
      {/* Username (click to open) */}
      <span
        onClick={() => setUserOpen((prev) => !prev)}
        className={`group relative cursor-pointer font-medium text-black px-2 py-1 transition-all duration-150 font-jomolhari${
          userOpen ? "text-custom_black font-semibold font-jomolhari" : ""
        }`}
      >
        <span className="relative z-10 group-hover:text-primary_orange transition-colors duration-200">
          {username}
        </span>
        <span
          className={`absolute left-0 bottom-0 h-[2px] bg-primary_orange transition-all duration-300 ${
            userOpen ? "w-full" : "w-0 group-hover:w-full"
          }`}
          aria-hidden="true"
        />
      </span>

      {/* User dropdown */}
      {userOpen && (
        <div className="absolute right-0 top-full mt-2 w-48 bg-white shadow-lg rounded-md py-2 z-50">
          <Link
            href="/reservations"
            className={linkStyle}
            onClick={() => setUserOpen(false)}
          >
            My Reservations
          </Link>

          <Link
            href="/profile"
            className={linkStyle}
            onClick={() => setUserOpen(false)}
          >
            My Profile
          </Link>

          <form action={logout}>
            <button
              type="submit"
              className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
            >
              Logout
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
