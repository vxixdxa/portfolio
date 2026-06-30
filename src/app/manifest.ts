import type { MetadataRoute } from "next";
import { siteName } from "@/lib/seo";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${siteName} — Product Designer`,
    short_name: siteName,
    description:
      "Portfolio of Vida Cheng, a Product / UI/UX Designer crafting seamless experiences for complex systems.",
    start_url: "/",
    display: "standalone",
    background_color: "#FAFAFA",
    theme_color: "#1500FF",
    icons: [
      {
        src: "/favicon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
