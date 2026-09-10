/** Classic navy/cream circular badge for category emoji marks. */
const sizes = {
  sm: "h-5 w-5 text-[12px]",
  md: "h-6 w-6 text-[13px]",
  lg: "h-9 w-9 text-[17px]",
} as const;

export type CategoryIconSize = keyof typeof sizes;

export function CategoryIcon({
  icon,
  size = "md",
  className = "",
}: {
  icon: string;
  size?: CategoryIconSize;
  className?: string;
}) {
  return (
    <span
      aria-hidden
      className={`category-icon inline-flex shrink-0 items-center justify-center rounded-full leading-none ${sizes[size]} ${className}`}
    >
      {icon}
    </span>
  );
}
