/** Classic professional wordmark: serif MyCalcs + small-caps WORLD (navy). */
type Props = {
  className?: string;
  /** Light text for dark/hero surfaces */
  tone?: "navy" | "light";
  size?: "sm" | "md" | "lg";
};

const sizeClass = {
  sm: "text-[15px] sm:text-base",
  md: "text-lg sm:text-xl",
  lg: "text-xl sm:text-2xl",
} as const;

export function BrandWordmark({
  className = "",
  tone = "navy",
  size = "sm",
}: Props) {
  const color =
    tone === "light"
      ? "text-white"
      : "text-[#07234a] dark:text-slate-100";

  return (
    <span
      className={`inline-flex items-baseline gap-[0.35em] leading-none ${sizeClass[size]} ${color} ${className}`}
    >
      <span className="font-serif font-semibold tracking-tight">MyCalcs</span>
      <span className="font-sans text-[0.52em] font-semibold uppercase tracking-[0.22em] opacity-90">
        WORLD
      </span>
    </span>
  );
}
