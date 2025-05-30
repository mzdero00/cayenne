import Image from "next/image";
import Link from "next/link";
import { auth, signIn } from "@/auth";
import UserDropdown from "./UserDropdown";

const Navbar = async () => {
  const session = await auth();

  return (
    <header className="w-full absolute top-0 left-0 z-50 bg-gradient-to-b from-[rgba(0,0,0,0.05)] to-[rgba(0,0,0,0.01)]">
      <nav className="flex justify-between items-center px-6 py-4 max-w-7xl mx-auto">
        {/* Logo */}
        <Link href="/">
          <Image
            src="/logo.png"
            alt="Cayenne Logo"
            width={160}
            height={40}
            priority
          />
        </Link>

        {/* Center Nav - desktop only */}
        <div className="hidden md:flex gap-10 text-lg font-medium text-black">
          <NavLink href="/cars">Car Selection</NavLink>
          <NavLink href="/explore">Exploring Dalmatia</NavLink>
          <NavLink href="/about">About Us</NavLink>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-4">
          {session?.user ? (
            <UserDropdown
              username={session.user.name ?? "User"}
              userId={session.user.id ?? ""}
            />
          ) : (
            <div className="flex gap-3 items-center">
              <Link href="/signup">
                <button className="bg-primary_orange text-white px-4 py-2 rounded-md font-medium hover:opacity-90">
                  Sign Up
                </button>
              </Link>
              <form
                action={async () => {
                  "use server";
                  await signIn("github");
                }}
              >
                <button
                  type="submit"
                  className="bg-primary_green text-white px-4 py-2 rounded-md font-medium hover:opacity-90"
                >
                  Login
                </button>
              </form>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;

const NavLink = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => (
  <Link
    href={href}
    className="transition-all duration-150 hover:scale-[1.05] hover:text-custom_black"
  >
    {children}
  </Link>
);
