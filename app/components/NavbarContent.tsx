import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { auth } from "@/auth";
import UserDropdown from "./UserDropdown";
import { githubSignIn } from "../actions/signIn";

export default async function NavbarContent() {
  const session = await auth();

  return (
    <nav className="flex justify-between items-center px-6 py-4 max-w-7xl mx-auto">
      <Link href="/">
        <Image
          src="/logo.png"
          alt="Cayenne Logo"
          width={160}
          height={40}
          priority
        />
      </Link>

      <div className="hidden md:flex gap-10 text-lg font-medium text-black">
        <NavLink href="/cars">Car Selection</NavLink>
        <NavLink href="/explore">Exploring Dalmatia</NavLink>
        <NavLink href="/about">About Us</NavLink>
      </div>

      {session?.user ? (
        <UserDropdown
          username={session.user.name ?? "User"}
          userId={session.user.id ?? "UserID"}
        />
      ) : (
        <div className="flex gap-3 items-center">
          <Link href="/signup">
            <button className="bg-white text-primary_orange px-4 py-2 rounded-md font-medium hover:opacity-90">
              Sign Up
            </button>
          </Link>
          <form action={githubSignIn}>
            <button
              type="submit"
              className="bg-primary_green text-white px-4 py-2 rounded-md font-medium hover:opacity-90"
            >
              Login
            </button>
          </form>
        </div>
      )}
    </nav>
  );
}

const NavLink = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`group relative inline-block text-black px-2 py-1 transition-all duration-150 ${
        isActive ? "text-black font-semibold" : ""
      }`}
    >
      <span className="relative z-10 group-hover:text-black transition-colors duration-200">
        {children}
      </span>
      <span
        className={`absolute left-0 bottom-0 h-[2px] bg-primary_orange transition-all duration-250 ${
          isActive ? "w-full" : "w-0 group-hover:w-full"
        }`}
        aria-hidden="true"
      />
    </Link>
  );
};
