"use client";

import { useEffect } from "react";
import { pushRecentCalculator } from "@/lib/recentCalculators";

export function TrackRecentCalculator({
  slug,
  category,
  name,
  href,
}: {
  slug: string;
  category: string;
  name: string;
  href: string;
}) {
  useEffect(() => {
    pushRecentCalculator({ slug, category, name, href });
  }, [slug, category, name, href]);
  return null;
}
