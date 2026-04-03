import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { locales, getDictionary, type Locale } from "@/lib/i18n";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const locale = params.locale as Locale;
  const dict = await getDictionary(locale);

  const title = "Vida Cheng — " + dict.hero.label;
  const description = dict.hero.description;

  return {
    title: {
      default: title,
      template: "%s — Vida Cheng",
    },
    description,
    metadataBase: new URL("https://vidacheng.vercel.app"),
    openGraph: {
      title,
      description,
      type: "website",
    },
    alternates: {
      languages: {
        en: "/en",
        "zh-Hant": "/zh",
      },
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const locale = params.locale as Locale;

  if (!locales.includes(locale)) {
    notFound();
  }

  const dict = await getDictionary(locale);

  return (
    <>
      <Navbar locale={locale} dict={dict.nav} />
      <main>{children}</main>
      <Footer locale={locale} dict={dict.footer} />
    </>
  );
}
