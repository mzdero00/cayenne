import Link from "next/link";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { redirect } from "next/navigation";
import { supabaseServer } from "@/lib/supabase-server"; // server helper (async)

// File: app/profile/page.tsx
export const metadata = {
  title: "My Profile | Cayenne",
};

function IconId() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className="w-5 h-5 text-black/80">
      <rect
        x="3"
        y="5"
        width="18"
        height="14"
        rx="2"
        ry="2"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <circle
        cx="8"
        cy="12"
        r="2.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path
        d="M12.5 10h7m-7 4h7"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}
function IconUser() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className="w-5 h-5 text-black/80">
      <circle
        cx="12"
        cy="8"
        r="3.2"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path
        d="M4 20a8 8 0 0 1 16 0"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}
function IconMail() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className="w-5 h-5 text-black/80">
      <rect
        x="3"
        y="5"
        width="18"
        height="14"
        rx="2"
        ry="2"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path
        d="M4 7l8 6 8-6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}
function IconPencil() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className="w-4 h-4">
      <path
        d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25z"
        fill="currentColor"
      />
      <path
        d="M20.71 7.04a1 1 0 0 0 0-1.41L18.37 3.29a1 1 0 0 0-1.41 0l-1.34 1.34 3.75 3.75 1.34-1.34z"
        fill="currentColor"
      />
    </svg>
  );
}
function IconCalendar() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className="w-5 h-5 text-black/80">
      <path
        d="M7 2v3M17 2v3M3 9h18M5 5h14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default async function ProfilePage() {
  // Auth (server-side)
  const supabase = await supabaseServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  // Load profile row (optional)
  const { data: profile } = await supabase
    .from("profiles")
    .select("id, full_name, created_at")
    .eq("id", user.id)
    .single();

  // Derive display fields
  const email = user.email ?? "you@example.com";
  const username = email.includes("@") ? email.split("@")[0] : "username";
  const fullName =
    profile?.full_name ??
    (typeof user.user_metadata?.full_name === "string"
      ? user.user_metadata.full_name
      : null) ??
    username;
  const memberSince = user.created_at
    ? new Date(user.created_at).toLocaleDateString("en-GB")
    : "—";
  const provider =
    typeof user.app_metadata?.provider === "string"
      ? user.app_metadata.provider
      : "password";

  return (
    <>
      <Navbar solid />

      <main className="bg-white min-h-screen px-4">
        <section className="max-w-6xl mx-auto pt-28 pb-24">
          <h1 className="font-jomolhari text-2xl md:text-3xl text-custom_black">
            My Profile
          </h1>
          <div className="h-[2px] bg-primary_orange/60 w-24 mt-1 mb-8" />

          <div className="grid grid-cols-1 lg:grid-cols-[360px_1fr] gap-6 items-start">
            {/* Left: profile card */}
            <div className="rounded-xl border border-black/10 bg-gray-50 shadow-sm p-5">
              <ul className="space-y-4 text-black">
                <li className="flex items-center gap-3">
                  <IconId /> <span className="font-medium">{username}</span>
                </li>
                <li className="flex items-center gap-3">
                  <IconUser /> <span>{fullName}</span>
                </li>
                <li className="flex items-center gap-3">
                  <IconMail /> <span>{email}</span>
                </li>
                <li className="flex items-center gap-3">
                  <IconCalendar /> <span>Member since {memberSince}</span>
                </li>
                <li className="flex items-center gap-3">
                  <span
                    className="inline-block w-5 h-5 rounded-full bg-black/80"
                    aria-hidden
                  />{" "}
                  <span>Provider: {provider}</span>
                </li>
              </ul>

              <div className="mt-6 flex justify-end">
                <Link
                  href="/profile/edit"
                  className="text-sm text-orange-700 hover:text-orange-800 inline-flex items-center gap-2"
                >
                  Edit information <IconPencil />
                </Link>
              </div>
            </div>

            {/* Right: actions */}
            <div className="space-y-4">
              <Link
                href="/profile/password"
                className="block rounded-xl border border-black/10 bg-gray-50 shadow-sm hover:shadow-md transition p-5 text-center text-black"
              >
                Change password
              </Link>
              <Link
                href="/reservations"
                className="block rounded-xl border border-black/10 bg-gray-50 shadow-sm hover:shadow-md transition p-5 text-center text-black"
              >
                Reservation history
              </Link>
              <Link
                href="/profile/delete"
                className="block rounded-xl border border-black/10 bg-gray-50 shadow-sm hover:shadow-md transition p-5 text-center text-red-600"
              >
                Delete my account
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
