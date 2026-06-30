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
      en: "Redesigned the online brand presence for a premium medical aesthetics center, enhancing brand trust and online consultation conversion through warm visual language and optimized information architecture.",
      zh: "為高端醫美中心重塑線上品牌形象，透過溫暖的視覺語言與優化的資訊架構，成功提升品牌信任感與線上預約轉換率。",
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
      en: "Built a comprehensive back-office management system spanning 7+ departments for an esports company, establishing a Design System with 60+ reusable components that significantly improved cross-team design efficiency.",
      zh: "為電競遊戲公司打造涵蓋 7+ 部門的後台管理系統，建立了 60+ 可複用元件的 Design System，大幅提升跨團隊設計效率。",
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
      en: "Redesigned a lottery platform's betting flow from 6 steps to 3, built a unified Design Library for 10+ game types, and improved first-time bet success rate to 95% through user behavior analysis.",
      zh: "重新設計彩票平台的下注流程，從 6 步縮減至 3 步，為 10+ 種彩種建立統一的 Design Library，透過用戶行為分析將首次下注成功率提升至 95%。",
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
