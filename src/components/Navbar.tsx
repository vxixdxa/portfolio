"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import type { Locale } from "@/lib/i18n";
import { LanguageToggle } from "./LanguageToggle";

interface NavbarProps {
  locale: Locale;
  dict: {
    work: string;
    about: string;
    contact: string;
  };
}

export function Navbar({ locale, dict }: NavbarProps) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    { label: dict.work, href: `/${locale}/#work` },
    { label: dict.about, href: `/${locale}/about` },
    { label: dict.contact, href: `/${locale}/about#contact` },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <nav className="container-main flex items-center justify-between h-16 md:h-20">
        <Link
          href={`/${locale}/`}
          className="font-heading text-lg md:text-xl font-semibold text-primary tracking-tight hover:opacity-70 transition-opacity cursor-pointer"
        >
          Vida C.
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          <ul className="flex items-center gap-8">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`font-body text-body-sm transition-opacity hover:opacity-70 cursor-pointer ${
                    pathname === item.href
                      ? "text-primary font-medium"
                      : "text-secondary"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <LanguageToggle locale={locale} />
        </div>

        {/* Mobile: language toggle + hamburger */}
        <div className="flex md:hidden items-center gap-4">
          <LanguageToggle locale={locale} />
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex flex-col justify-center items-center w-10 h-10 cursor-pointer"
            aria-label="Toggle menu"
          >
            <span
              className={`block w-5 h-[1.5px] bg-primary transition-all duration-300 ${
                mobileOpen ? "rotate-45 translate-y-[3px]" : ""
              }`}
            />
            <span
              className={`block w-5 h-[1.5px] bg-primary mt-[5px] transition-all duration-300 ${
                mobileOpen ? "-rotate-45 -translate-y-[2px]" : ""
              }`}
            />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-border/50 bg-background/95 backdrop-blur-md">
          <ul className="container-main py-6 space-y-4">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`block font-body text-body transition-opacity hover:opacity-70 cursor-pointer ${
                    pathname === item.href
                      ? "text-primary font-medium"
                      : "text-secondary"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
