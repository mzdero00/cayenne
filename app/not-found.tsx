import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <main
      className="min-h-screen flex flex-col bg-[#f2f3f4]"
      aria-labelledby="nf-title"
    >
      <section className="flex-1 grid place-items-center px-6 py-14 md:py-20">
        <div className="w-full max-w-xl text-center">
          <h1
            id="nf-title"
            className="text-2xl md:text-3xl text-black mb-6 font-light"
          >
            Looks like we crashed!
          </h1>

          <p className="text-lg md:text-xl text-black/90">
            We’ll get you right{" "}
            <Link
              href="/"
              className="text-green-700 underline hover:text-green-800"
            >
              back up
            </Link>
            .
          </p>

          <div className="mt-8 flex justify-center">
            <div className="rounded-2xl bg-white/80 border border-black/5 p-4 shadow-sm">
              <Image
                src="/icons/car_crash.gif"
                alt="Crashed car animation"
                width={240}
                height={130}
                unoptimized
                className="h-auto"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      <footer className="pb-10 flex flex-col items-center gap-3">
        <Image
          src="/logo.png"
          alt="Cayenne"
          width={140}
          height={40}
          priority
          className="h-auto w-auto"
        />
        <div className="text-black/80">© Cayenne 2025</div>
      </footer>
    </main>
  );
}
