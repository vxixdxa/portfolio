import type { Metadata } from "next";
import { Archivo, Space_Grotesk } from "next/font/google";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Mascot } from "@/components/mascot/Mascot";
import { locales, getDictionary, type Locale } from "@/lib/i18n";
import {
  siteName,
  siteUrl,
  siteDescription,
  ogLocale,
  htmlLang,
  absoluteUrl,
  googleSiteVerification,
} from "@/lib/seo";
import { notFound } from "next/navigation";

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

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

  const title = `${siteName} — ${dict.hero.label}`;
  // Keyword-oriented snippet for search; the visible hero tagline stays as-is.
  const description = siteDescription[locale];

  return {
    title: {
      default: title,
      template: `%s — ${siteName}`,
    },
    description,
    metadataBase: new URL(siteUrl),
    applicationName: siteName,
    authors: [{ name: siteName }],
    creator: siteName,
    keywords:
      locale === "zh"
        ? [
            "Vida Cheng",
            "產品設計師",
            "UI/UX 設計師",
            "作品集",
            "Product Designer",
            "UI/UX Designer",
            "Portfolio",
            "Design System",
          ]
        : [
            "Vida Cheng",
            "Product Designer",
            "UI/UX Designer",
            "Portfolio",
            "Design System",
            "Product Design",
            "User Experience",
          ],
    icons: {
      icon: "/favicon.svg",
    },
    alternates: {
      canonical: absoluteUrl(`/${locale}`),
      languages: {
        en: "/en",
        "zh-Hant": "/zh",
        "x-default": "/en",
      },
    },
    openGraph: {
      title,
      description,
      url: absoluteUrl(`/${locale}`),
      siteName,
      locale: ogLocale[locale],
      type: "website",
      images: [{ url: "/og.png", width: 1200, height: 1200, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/og.png"],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    verification: googleSiteVerification
      ? { google: googleSiteVerification }
      : undefined,
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

  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteName,
    url: absoluteUrl(`/${locale}`),
    jobTitle: dict.hero.label,
    description: dict.hero.description,
    image: absoluteUrl("/favicon.svg"),
    email: "mailto:vidacheng0722@gmail.com",
    sameAs: ["https://www.linkedin.com/in/vida-cheng"],
  };

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteName,
    url: siteUrl,
    inLanguage: htmlLang[locale],
  };

  return (
    <html
      lang={htmlLang[locale]}
      className={`${archivo.variable} ${spaceGrotesk.variable}`}
    >
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <Navbar locale={locale} dict={dict.nav} />
        <main>{children}</main>
        <Footer locale={locale} dict={dict.footer} />
        <Mascot dict={dict.mascot} />
      </body>
    </html>
  );
}
