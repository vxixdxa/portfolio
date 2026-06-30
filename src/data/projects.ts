import type { Locale } from "@/lib/i18n";

export interface Project {
  slug: string;
  title: string;
  subtitle: Record<Locale, string>;
  category: string;
  description: Record<Locale, string>;
  role: Record<Locale, string>;
  duration: Record<Locale, string>;
  tools: string[];
  color: string;
  thumbnail: string | null;
  images: string[];
}

export const projects: Project[] = [
  {
    slug: "321-sports-live-streaming",
    title: "321 Sports Live Streaming",
    subtitle: {
      en: "Sports Streaming Platform",
      zh: "體育直播平台",
    },
    category: "Web + Mobile App",
    description: {
      en: "Designed a cross-device viewing experience for a sports live streaming platform — integrating live broadcast, real-time chat, scores, and interactive features while keeping a clear visual hierarchy and smooth operation in high information-density contexts.",
      zh: "為體育直播平台設計跨裝置觀看體驗，整合賽事直播、即時聊天、比分資訊與互動功能，在高資訊密度的情境下維持清楚的視覺層級與流暢的操作體驗。",
    },
    role: {
      en: "UI/UX Designer",
      zh: "UI/UX 設計師",
    },
    duration: {
      en: "4 months",
      zh: "4 個月",
    },
    tools: ["Figma", "Principle"],
    color: "#0EA5E9",
    thumbnail: "/images/projects/321-sports-live-streaming/hero.png",
    images: [
      "/images/projects/321-sports-live-streaming/01.png",
    ],
  },
  {
    slug: "66-chat",
    title: "66 Chat",
    subtitle: {
      en: "Enterprise Communication Platform",
      zh: "企業通訊平台",
    },
    category: "Web App",
    description: {
      en: "Planned the multi-role permissions, contact management, and business upgrade experience for an enterprise communication platform — turning complex organizational communication flows into a clear, scalable product architecture.",
      zh: "規劃企業通訊平台的多角色權限、聯絡人管理與商務升級體驗，將複雜的組織溝通流程轉化為清楚、可擴充的產品架構。",
    },
    role: {
      en: "UI/UX Designer",
      zh: "UI/UX 設計師",
    },
    duration: {
      en: "3 months",
      zh: "3 個月",
    },
    tools: ["Figma", "Protopie"],
    color: "#003399",
    thumbnail: "/images/projects/66-chat/hero.png",
    images: [
      "/images/projects/66-chat/01.png",
    ],
  },
  {
    slug: "heal-aesthetic",
    title: "HEAL Aesthetic",
    subtitle: {
      en: "Medical Aesthetics Brand Website",
      zh: "醫美品牌官網",
    },
    category: "Web Design",
    description: {
      en: "Reimagined the website experience for a medical aesthetics brand — building brand trust through clear information architecture, a warm yet professional visual language, and well-defined booking paths.",
      zh: "為醫美品牌重新規劃網站體驗，透過清楚的資訊架構、溫暖專業的視覺語言與明確的預約路徑，建立品牌信任感。",
    },
    role: {
      en: "UI/UX Designer",
      zh: "UI/UX 設計師",
    },
    duration: {
      en: "8 weeks",
      zh: "8 週",
    },
    tools: ["Figma", "Webflow"],
    color: "#C4A882",
    thumbnail: "/images/projects/heal-aesthetic.png",
    images: [
      "/images/projects/heal-aesthetic/01.png",
      "/images/projects/heal-aesthetic/02.png",
    ],
  },
  {
    slug: "im-esports-backoffice",
    title: "IM ESports Backoffice",
    subtitle: {
      en: "Esports Management System",
      zh: "電競後台管理系統",
    },
    category: "Dashboard / Design System",
    description: {
      en: "Redesigned the back-office management system for an esports gaming company — integrating cross-department workflows, role-oriented dashboards, and a scalable design system to improve the consistency and maintainability of the backoffice product.",
      zh: "重新設計電競遊戲公司的後台管理系統，整合跨部門操作流程、角色導向 Dashboard 與可擴充的設計系統，提升後台產品的一致性與可維護性。",
    },
    role: {
      en: "Lead UI/UX Designer",
      zh: "首席 UI/UX 設計師",
    },
    duration: {
      en: "6 months",
      zh: "6 個月",
    },
    tools: ["Figma", "Storybook"],
    color: "#6366F1",
    thumbnail: "/images/projects/im-esports-backoffice.png",
    images: [
      "/images/projects/im-esports-backoffice/02.png",
    ],
  },
  {
    slug: "lottery-app",
    title: "Lottery App",
    subtitle: {
      en: "Lottery Entertainment App Redesign",
      zh: "彩票娛樂 APP 改版",
    },
    category: "Mobile App",
    description: {
      en: "Redesigned the core flows and information architecture of a lottery entertainment app — turning a high information-density, transaction-heavy interface into a clearer, faster, and more understandable mobile experience.",
      zh: "重新設計彩票娛樂 App 的核心操作流程與資訊架構，將高資訊密度的交易型介面轉化為更清楚、快速且容易理解的行動端體驗。",
    },
    role: {
      en: "UI/UX Designer",
      zh: "UI/UX 設計師",
    },
    duration: {
      en: "3 months",
      zh: "3 個月",
    },
    tools: ["Figma", "Protopie"],
    color: "#F59E0B",
    thumbnail: "/images/projects/lottery-app.png",
    images: [
      "/images/projects/lottery-app/01.png",
      "/images/projects/lottery-app/03.png",
      "/images/projects/lottery-app/04.png",
    ],
  },
];
