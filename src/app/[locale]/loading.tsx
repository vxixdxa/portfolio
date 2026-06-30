"use client";

import { usePathname } from "next/navigation";
import { LoadingIndicator } from "@/components/LoadingIndicator";
import { getDictionary, type Locale, locales } from "@/lib/i18n";

export default function Loading() {
  const pathname = usePathname();
  const segment = pathname?.split("/")[1] as Locale | undefined;
  const locale: Locale = segment && locales.includes(segment) ? segment : "en";
  const dict = getDictionary(locale);

  return <LoadingIndicator label={dict.common.loading} fullscreen />;
}
