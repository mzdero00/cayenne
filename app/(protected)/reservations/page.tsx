import Image from "next/image";
import Link from "next/link";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

// File: app/reservations/page.tsx
// Uses car images like /public/cars/renault-clio.png (replace paths to match your assets)

export const metadata = {
  title: "My Reservations | Cayenne",
};

type Reservation = {
  id: string;
  className: string; // e.g., "Compact"
  model: string; // e.g., "Renault Clio"
  brand?: string; // e.g., "Renault"
  image: string; // car image path
  pickupDate: string; // ISO or formatted
  returnDate: string;
  pickupTime: string; // "12:00"
  status: "Paid" | "Unpaid" | "Pending";
};

// Demo data — replace with real user reservations.
const reservations: Reservation[] = [
  {
    id: "abc123",
    className: "Compact",
    model: "Renault Clio",
    brand: "Renault",
    image: "/cars/Renault-Clio.webp",
    pickupDate: "21/08/2025",
    returnDate: "27/08/2025",
    pickupTime: "12:00",
    status: "Paid",
  },
];

function IconCalendar() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className="w-5 h-5 text-black/80">
      <path
        d="M7 2v3M17 2v3M3 9h18M5 5h14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}
function IconClock() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className="w-5 h-5 text-black/80">
      <path
        d="M12 7v6l4 2"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle
        cx="12"
        cy="12"
        r="9"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      />
    </svg>
  );
}
function IconPaid() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className="w-5 h-5 text-green-700">
      <path
        d="M3 7h18v10H3z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path
        d="M7 12h10M9 10h2m2 4h2"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}
function IconChevronRight() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className="w-5 h-5 text-black/80">
      <path
        d="M9 6l6 6-6 6"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ReservationCard({ res }: { res: Reservation }) {
  return (
    <article className="relative rounded-xl border border-black/10 bg-gray-50 shadow-sm hover:shadow-md transition-shadow">
      <div className="p-4 sm:p-5">
        {/* Top Row: class + status */}
        <div className="flex items-start justify-between">
          <div className="text-lg font-semibold text-black">
            {res.className}
          </div>
          {res.status === "Paid" ? (
            <div className="flex items-center gap-2 text-green-700">
              <IconPaid /> <span className="font-medium">Paid</span>
            </div>
          ) : (
            <div className="text-amber-700">{res.status}</div>
          )}
        </div>

        {/* Middle Row: details + car image */}
        <div className="mt-3 grid grid-cols-1 sm:grid-cols-[auto_1fr_auto] items-center gap-4">
          {/* Icons + dates */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm text-black/80">
              <IconCalendar /> {res.pickname}
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm text-black/80">
              <IconCalendar />
              <span>
                {res.pickupDate} - {res.returnDate}
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm text-black/80">
              <IconClock /> {res.pickupTime}
            </div>
          </div>
          {/* Car image */}
          <div className="justify-self-center sm:justify-self-end w-44 h-24 relative">
            <Image
              src={res.image}
              alt={res.model}
              fill
              className="object-contain"
              priority={false}
            />
          </div>
        </div>

        {/* Bottom Row: More info link */}
        <div className="mt-3 flex items-center justify-end">
          <Link
            href={`/reservations/${res.id}`}
            className="inline-flex items-center gap-2 text-black/80 hover:text-black"
          >
            <span>More info</span>
            <IconChevronRight />
          </Link>
        </div>
      </div>
    </article>
  );
}

export default function ReservationsPage() {
  return (
    <>
      <Navbar solid />

      <main className="bg-white min-h-screen px-4">
        <section className="max-w-5xl mx-auto pt-28 pb-20">
          <h1 className="font-jomolhari text-2xl md:text-3xl text-custom_black">
            My Reservations
          </h1>
          <div className="h-[2px] bg-primary_orange/60 w-24 mt-1 mb-6" />

          <div className="space-y-4">
            {reservations.map((r) => (
              <ReservationCard key={r.id} res={r} />
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
