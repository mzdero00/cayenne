import Image from "next/image";
import Link from "next/link";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export const metadata = {
  title: "My Reservations | Cayenne",
};

type Reservation = {
  id: string;
  className: string; // "Compact"
  model: string; // "Renault Clio"
  brand?: string; // "Renault"
  image: string; // car image path
  pickupDate: string; // dd/mm/yyyy
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
    image: "/car/renault-clio.png", // ✅ exact path/casing
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

function brandLogoPath(brand?: string) {
  if (!brand) return "";
  const key = brand.toLowerCase();
  if (key === "renault") return "/icons/renault_logo.png";
  return ""; // add more brand logos here if needed
}

function ReservationCard({ res }: { res: Reservation }) {
  const href = `/reservations/${res.id}`;
  const logo = brandLogoPath(res.brand); // <-- use the helper

  return (
    <Link
      href={href}
      className="group block"
      aria-label={`View reservation ${res.id}`}
    >
      <article className="rounded-xl border border-black/10 bg-white shadow-sm hover:shadow-md transition-shadow p-4 sm:p-5 cursor-pointer">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 min-h-[160px]">
          {/* 1) INFO */}
          <div className="order-2 md:order-1">
            <div className="text-lg font-semibold text-black mb-2">
              {res.className}
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-black/80">
                <IconCalendar />
                <span>
                  {res.pickupDate} - {res.returnDate}
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm text-black/80">
                <IconClock />
                {res.pickupTime}
              </div>
            </div>
          </div>

          {/* 2) LOGO + CAR (centered) */}
          <div className="order-1 md:order-2 flex flex-col items-center justify-center">
            {logo ? (
              <Image
                src={logo}
                alt={res.brand ?? "Brand"}
                width={90}
                height={22}
                className="mb-2 opacity-80"
              />
            ) : null}
            <div className="relative w-60 h-28 md:w-72 md:h-32">
              <Image
                src={res.image}
                alt={res.model}
                fill
                className="object-contain"
                priority={false}
              />
            </div>
          </div>

          {/* 3) STATUS (top-right) + MORE INFO (bottom-right) */}
          <div className="order-3 md:order-3 flex flex-col items-end justify-between">
            {res.status === "Paid" ? (
              <span className="inline-flex items-center gap-1 text-green-700">
                <IconPaid />
                <span className="font-medium">Paid</span>
              </span>
            ) : (
              <span className="text-amber-700">{res.status}</span>
            )}

            <div className="inline-flex items-center gap-2 text-black/80 group-hover:text-black">
              <span>More info</span>
              <IconChevronRight />
            </div>
          </div>
        </div>
      </article>
    </Link>
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
