import type { Locale } from "@/lib/i18n";

/** Canonical production URL. Update this if the custom domain changes. */
export const siteUrl = "https://vidac.vercel.app";

export const siteName = "Vida Cheng";

/**
 * Google Search Console verification token.
 * In Search Console choose the "HTML tag" method and paste ONLY the value of
 * its content="..." attribute here, then redeploy. Leave empty to omit the tag.
 */
export const googleSiteVerification = "";

/**
 * Keyword-oriented meta description for the home page. Kept separate from the
 * visible hero tagline so search snippets carry searchable terms (role,
 * specialties, industries) without altering the on-page brand copy.
 */
export const siteDescription: Record<Locale, string> = {
  en: "Vida Cheng — Product Designer & UI/UX Designer crafting design systems and seamless user experiences across healthcare, esports, fintech, and enterprise products. View the portfolio.",
  zh: "Vida Cheng 是產品設計師與 UI/UX 設計師，專精 Design System 與跨產業（醫美、電競、金融科技、企業通訊）的流暢使用者體驗。歡迎瀏覽作品集。",
};

/** Maps an internal locale to a BCP-47 language tag used in hreflang / og:locale. */
export const ogLocale: Record<Locale, string> = {
  en: "en_US",
  zh: "zh_TW",
};

export const htmlLang: Record<Locale, string> = {
  en: "en",
  zh: "zh-Hant",
};

/** Absolute URL helper for sitemap / canonical / JSON-LD. */
export const absoluteUrl = (path = "") =>
  `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
