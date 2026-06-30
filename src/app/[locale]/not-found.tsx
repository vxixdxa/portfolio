"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MascotSVG } from "@/components/mascot/MascotSVG";
import { getDictionary, type Locale, locales } from "@/lib/i18n";

export default function NotFound() {
  const pathname = usePathname();
  const segment = pathname?.split("/")[1] as Locale | undefined;
  const locale: Locale = segment && locales.includes(segment) ? segment : "en";
  const dict = getDictionary(locale);

  return (
    <>
      {/* Hide the floating site mascot on the 404 page so the lost variant
          can take center stage without doubling up. */}
      <style>{`.site-mascot { display: none !important; }`}</style>

      <section className="container-main pt-32 md:pt-40 pb-section text-center flex flex-col items-center">
        <div className="animate-wiggle origin-bottom mb-8">
          <MascotSVG variant="lost" size={128} />
        </div>

        <h1 className="font-heading text-display text-primary">404</h1>
        <p className="text-body-lg text-secondary mt-4 max-w-prose">
          {dict.notFound.title}
        </p>
        <p className="text-body text-muted-fg mt-2 max-w-prose">
          {dict.notFound.subtitle}
        </p>

        <Link
          href={`/${locale}/`}
          className="group inline-flex items-center gap-2 mt-10 px-6 py-3 rounded-full bg-accent text-white text-body-sm font-medium hover:opacity-90 transition-opacity"
        >
          <span>{dict.notFound.goHome}</span>
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="transition-transform duration-300 group-hover:translate-x-1"
            aria-hidden="true"
          >
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </Link>
      </section>
    </>
  );
}
