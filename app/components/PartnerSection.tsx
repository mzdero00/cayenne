import Image from "next/image";

export default function PartnerSection() {
  return (
    <section className="bg-white py-12">
      <div className="max-w-5xl mx-auto flex justify-center gap-16 flex-wrap items-center">
        <Image
          src="/partners/partner1.png"
          alt="Scheda"
          width={140}
          height={60}
        />
        <Image
          src="/partners/partner2.png"
          alt="Jamnica"
          width={140}
          height={60}
        />
        <Image
          src="/partners/partner3.png"
          alt="Roto"
          width={140}
          height={60}
        />
      </div>
    </section>
  );
}
