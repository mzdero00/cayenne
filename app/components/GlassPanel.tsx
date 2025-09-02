export default function GlassPanel({
  children,
  className = "",
}: React.PropsWithChildren<{ className?: string }>) {
  return (
    <div
      className={[
        "rounded-2xl border border-white/20 bg-white/30 backdrop-blur-md shadow-xl",
        "p-6 sm:p-8 lg:p-10",
        "max-w-xl sm:max-w-2xl w-full",
        "max-h-[70vh] overflow-y-auto",
        className,
      ].join(" ")}
    >
      {children}
    </div>
  );
}
