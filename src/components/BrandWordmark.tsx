/** Classic professional wordmark: serif MyCalcs + small-caps WORLD.
 * Default tone follows theme tokens (--foreground) so it stays visible
 * on the light header without relying on Tailwind dark: media queries.
 */
type Props = {
  className?: string;
  /** theme = CSS var --foreground; light = white on dark/hero surfaces */
  tone?: "navy" | "theme" | "light";
  size?: "sm" | "md" | "lg";
};

const sizeClass = {
  sm: "text-[15px] sm:text-base",
  md: "text-lg sm:text-xl",
  lg: "text-xl sm:text-2xl",
} as const;

export function BrandWordmark({
  className = "",
  tone = "theme",
  size = "sm",
}: Props) {
  // "navy" kept as alias for theme tokens (header must track light/dark via CSS vars)
  const color =
    tone === "light"
      ? "text-white"
      : "text-foreground";

  return (
    <span
      className={`inline-flex items-baseline gap-[0.35em] leading-none ${sizeClass[size]} ${color} ${className}`}
      style={tone === "light" ? undefined : { color: "var(--foreground)" }}
    >
      <span className="font-serif font-semibold tracking-tight">MyCalcs</span>
      <span className="font-sans text-[0.52em] font-semibold uppercase tracking-[0.22em] opacity-90">
        WORLD
      </span>
    </span>
  );
}
