"use client";

import Link from "next/link";
import {
  X,
  ChevronRight,
  CalendarCheck,
  Settings,
  LogOut,
  User2,
} from "lucide-react";
import { logout } from "@/app/actions/logout";

type User = { id?: string; name?: string | null } | null;
export type NavItem = {
  label: string;
  href: string;
  external?: boolean;
  target_blank?: boolean;
};

export default function MobileMenu({
  open,
  onClose,
  items,
  user,
  pathname,
}: {
  open: boolean;
  onClose: () => void;
  items: NavItem[];
  user: User;
  pathname: string;
}) {
  if (!open) return null;

  return (
    <>
      {/* Opaque scrim */}
      <div
        className="fixed inset-0 z-[100] bg-black/50"
        onClick={onClose}
        aria-hidden
      />

      {/* Drawer: solid bg, its own stacking context, scrollable */}
      <div
        className="
          fixed top-0 right-0 z-[110]
          h-dvh w-80 max-w-[90%]
          bg-white isolate
          shadow-2xl border-l border-black/10
          overflow-y-auto overscroll-contain
        "
        role="dialog"
        aria-modal="true"
      >
        <div className="flex items-center justify-between px-4 h-16 border-b border-black/10">
          <span className="font-jomolhari text-lg text-custom_black">Menu</span>
          <button
            onClick={onClose}
            className="p-2 rounded-md hover:bg-black/5"
            aria-label="Close menu"
          >
            <X className="w-5 h-5 text-custom_black" />
          </button>
        </div>

        <div className="px-4 py-4 space-y-2">
          {items.map((it) => {
            const active = !it.external && pathname === it.href;
            const rowCls = `flex items-center justify-between px-3 py-3 rounded-xl border transition ${
              active
                ? "bg-primary_orange/5 border-primary_orange/60"
                : "bg-white border-black/10 hover:border-primary_orange/50"
            }`;
            const content = (
              <>
                <span className="text-custom_black">{it.label}</span>
                <ChevronRight className="w-5 h-5 text-black/50" />
              </>
            );

            return it.external ? (
              <a
                key={it.href}
                href={it.href}
                target={it.target_blank ? "_blank" : undefined}
                rel={it.target_blank ? "noopener noreferrer" : undefined}
                className={rowCls}
                onClick={onClose}
              >
                {content}
              </a>
            ) : (
              <Link
                key={it.href}
                href={it.href}
                className={rowCls}
                onClick={onClose}
              >
                {content}
              </Link>
            );
          })}

          {user ? (
            <>
              <div className="flex items-center gap-3 px-3 py-2 rounded-xl bg-white border border-black/10">
                <User2 className="w-5 h-5 text-black/60" />
                <div className="text-sm text-gray-700">
                  Signed in as{" "}
                  <span className="font-medium text-custom_black">
                    {user.name ?? "User"}
                  </span>
                </div>
              </div>

              <Link
                href="/reservations"
                className="flex items-center justify-between px-3 py-3 rounded-xl bg-white border border-black/10 hover:border-primary_orange/50"
                onClick={onClose}
              >
                <span className="text-custom_black">My Reservations</span>
                <CalendarCheck className="w-5 h-5 text-black/50" />
              </Link>

              <Link
                href="/profile"
                className="flex items-center justify-between px-3 py-3 rounded-xl bg-white border border-black/10 hover:border-primary_orange/50"
                onClick={onClose}
              >
                <span className="text-custom_black">Account</span>
                <Settings className="w-5 h-5 text-black/50" />
              </Link>

              <form action={logout} method="post" className="pt-1">
                <button className="w-full flex items-center justify-between px-3 py-3 rounded-xl border bg-red-50 border-red-200 text-red-700 hover:bg-red-100 hover:border-red-300">
                  <span>Log out</span>
                  <LogOut className="w-5 h-5 text-red-600" />
                </button>
              </form>
            </>
          ) : (
            <div className="flex gap-2 pt-2">
              <Link
                href="/signup"
                className="flex-1 rounded-xl bg-primary_orange text-white px-3 py-3 text-center font-medium hover:opacity-95"
                onClick={onClose}
              >
                Sign Up
              </Link>
              <Link
                href="/login"
                className="flex-1 rounded-xl border border-black/10 bg-white px-3 py-3 text-center text-custom_black hover:border-primary_orange/50"
                onClick={onClose}
              >
                Login
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
