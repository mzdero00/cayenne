import Image from "next/image";

export default function FeatureSection() {
  return (
    <section className="relative pt-32 pb-32 py-16 px-6 bg-white">
      <div>
        <Image
          src="/wave.png"
          alt="Decorative wave"
          fill
          className="object-cover"
          priority
        />
      </div>

      <div className="text-center font-sansita mb-12 px-4">
        <h2 className="text-2xl md:text-3xl  font-semibold text-black">
          Drive more. Spend less.
        </h2>
        <h3 className="text-black text-2xl font-sansita md:text-3xl">
          Rent with{" "}
          <span className="font-sansita text-blue-500 font-medium">
            confidence!
          </span>
        </h3>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-6 pt-20">
        <FeatureCard
          icon="/icons/car-insurance.png"
          title="Full Insurance Included"
          color="text-primary_orange "
          description="Enjoy peace of mind with comprehensive coverage already in the price. No extra fees, no surprises."
        />
        <FeatureCard
          icon="/icons/schedule.png"
          title="Flexible Rental Extensions"
          color="text-primary_orange"
          description="We’re here to accommodate your travel plans. Extend your return date whenever you need — no hassle, no stress."
        />
        <FeatureCard
          icon="/icons/route.png"
          title="From Dalmatia to Every Corner of Croatia"
          color="text-primary_orange"
          description="Based in Dalmatia, but operating nationwide—explore Croatia with ease, wherever you go."
        />
      </div>
    </section>
  );
}

function FeatureCard({
  icon,
  title,
  description,
  color,
}: {
  icon: string;
  title: string;
  description: string;
  color?: string;
}) {
  return (
    <div className="bg-[#e8e7e6]/80 backdrop-blur rounded-xl p-6 shadow-md text-center">
      <div className="w-10 h-10 mx-auto mb-4">
        <Image src={icon} alt={title} width={40} height={40} />
      </div>
      <h4 className={`font-semibold mb-2 ${color || "text-black"}`}>{title}</h4>
      <p className="text-sm text-gray-700">{description}</p>
    </div>
  );
}
