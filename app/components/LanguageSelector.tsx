// components/LanguageSelector.tsx
export default function LanguageSelector() {
  return (
    <div className="absolute bottom-4 left-4 text-white font-medium space-x-2 text-sm md:text-base">
      <span className="hover:underline cursor-pointer">EN</span>
      <span className="hover:underline cursor-pointer">HR</span>
      <span className="hover:underline cursor-pointer">DE</span>
    </div>
  );
}
