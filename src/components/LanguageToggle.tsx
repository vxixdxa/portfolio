"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Locale } from "@/lib/i18n";

interface LanguageToggleProps {
  locale: Locale;
}

export function LanguageToggle({ locale }: LanguageToggleProps) {
  const pathname = usePathname();

  const targetLocale = locale === "en" ? "zh" : "en";
  const label = locale === "en" ? "中" : "EN";

  // Replace the locale segment in the current path
  const segments = pathname.split("/");
  segments[1] = targetLocale;
  const targetPath = segments.join("/");

  return (
    <Link
      href={targetPath}
      className="text-body-sm text-secondary hover:text-accent hover:border-accent transition-colors font-medium border border-border rounded-full px-3 py-1 cursor-pointer"
    >
      {label}
    </Link>
  );
}
