import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { Locale } from "@/lib/i18n";

export function getProjectContent(slug: string, locale: Locale) {
  const contentDirectory = path.join(process.cwd(), "src/content/projects", locale);
  const fullPath = path.join(contentDirectory, `${slug}.mdx`);

  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { content, data } = matter(fileContents);

  return {
    content,
    frontmatter: data,
  };
}

export function getAllProjectSlugs() {
  const contentDirectory = path.join(process.cwd(), "src/content/projects", "en");

  if (!fs.existsSync(contentDirectory)) {
    return [];
  }

  const files = fs.readdirSync(contentDirectory);
  return files
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}
