import { Instagram, Facebook } from "lucide-react";
import { FaTiktok } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="font-jomolhari bg-primary_orange text-black py-6 px-4">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-sm gap-4 md:gap-0">
        {/* Left - Social Icons */}
        <div className="flex gap-4">
          <Instagram className="w-5 h-5 hover:opacity-75 cursor-pointer" />
          <Facebook className="w-5 h-5 hover:opacity-75 cursor-pointer" />
          <FaTiktok className="w-5 h-5 hover:opacity-75 cursor-pointer" />
        </div>

        {/* Center - Links */}
        <div className="flex flex-wrap justify-center gap-4 text-xs text-black/90">
          <a href="#">Contact</a>
          <a href="#">Rent information</a>
          <a href="#">Contract template</a>
          <a href="#">Privacy</a>
          <a href="#">Cookie settings</a>
        </div>

        {/* Right - Copyright */}
        <div className="text-black/70 text-xs">© Cayenne 2025</div>
      </div>
    </footer>
  );
}
