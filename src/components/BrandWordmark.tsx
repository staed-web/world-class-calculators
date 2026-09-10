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
  sm: "text-base sm:text-[17px]",
  /* Slightly refined vs prior text-xl so it balances a larger header mark */
  md: "text-[1.125rem] sm:text-[1.3rem]",
  lg: "text-2xl sm:text-[1.75rem]",
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

  const worldTone =
    tone === "light"
      ? "text-white/95"
      : "text-[color-mix(in_oklab,var(--foreground)_88%,var(--brand)_12%)]";

  return (
    <span
      className={`inline-flex items-baseline gap-[0.28em] leading-none ${sizeClass[size]} ${color} ${className}`}
      style={tone === "light" ? undefined : { color: "var(--foreground)" }}
    >
      <span className="font-serif font-semibold tracking-tight">MyCalcs</span>
      <span
        className={`font-sans text-[0.58em] font-bold uppercase tracking-[0.18em] sm:tracking-[0.2em] ${worldTone}`}
        style={
          tone === "light"
            ? undefined
            : {
                color:
                  "color-mix(in oklab, var(--foreground) 82%, var(--brand) 18%)",
              }
        }
      >
        WORLD
      </span>
    </span>
  );
}
