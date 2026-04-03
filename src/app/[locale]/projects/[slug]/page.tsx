import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import Image from "next/image";
import { projects } from "@/data/projects";
import { getProjectContent } from "@/lib/mdx";
import { FadeIn } from "@/components/FadeIn";
import { SectionLabel } from "@/components/SectionLabel";
import { getDictionary, locales, type Locale } from "@/lib/i18n";
import Link from "next/link";

interface Props {
  params: { locale: string; slug: string };
}

export async function generateStaticParams() {
  return projects.flatMap((project) =>
    locales.map((locale) => ({ locale, slug: project.slug }))
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = params.locale as Locale;
  const project = projects.find((p) => p.slug === params.slug);
  if (!project) return {};

  return {
    title: project.title,
    description: project.description[locale],
    alternates: {
      languages: {
        en: `/en/projects/${params.slug}`,
        "zh-Hant": `/zh/projects/${params.slug}`,
      },
    },
  };
}

/* eslint-disable @typescript-eslint/no-explicit-any */
const mdxComponents = {
  h2: (props: any) => (
    <h2 className="font-heading text-heading-2 text-primary mt-16 mb-6" {...props} />
  ),
  h3: (props: any) => (
    <h3 className="font-heading text-heading-3 text-primary mt-10 mb-4" {...props} />
  ),
  p: (props: any) => (
    <p className="text-body text-secondary mb-6 max-w-prose" {...props} />
  ),
  ul: (props: any) => (
    <ul className="text-body text-secondary mb-6 max-w-prose space-y-2 list-disc pl-6" {...props} />
  ),
  li: (props: any) => <li className="text-body text-secondary" {...props} />,
  strong: (props: any) => <strong className="text-primary font-semibold" {...props} />,
  blockquote: (props: any) => (
    <blockquote className="border-l-2 border-accent pl-6 my-8 max-w-prose" {...props} />
  ),
  hr: () => <hr className="border-border my-12" />,
};
/* eslint-enable @typescript-eslint/no-explicit-any */

export default async function ProjectPage({ params }: Props) {
  const locale = params.locale as Locale;
  const project = projects.find((p) => p.slug === params.slug);
  if (!project) notFound();

  const dict = await getDictionary(locale);
  const d = dict.projects;
  const mdxData = getProjectContent(params.slug, locale);

  const currentIndex = projects.findIndex((p) => p.slug === params.slug);
  const prevProject = currentIndex > 0 ? projects[currentIndex - 1] : null;
  const nextProject = currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null;

  return (
    <article className="container-main pt-32 md:pt-40 pb-section">
      {/* Back link */}
      <FadeIn>
        <Link
          href={`/${locale}/#work`}
          className="inline-flex items-center gap-2 text-body-sm text-muted-fg hover:text-accent transition-colors mb-12"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M13 8H3M3 8L7 4M3 8L7 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          {d.allProjects}
        </Link>
      </FadeIn>

      {/* Project Header */}
      <FadeIn>
        <SectionLabel>{project.category}</SectionLabel>
      </FadeIn>

      <FadeIn delay={100}>
        <h1 className="font-heading text-display text-primary mt-6 text-balance">
          {project.title}
        </h1>
      </FadeIn>

      <FadeIn delay={150}>
        <p className="text-body-lg text-secondary mt-4 max-w-2xl">
          {project.subtitle[locale]}
        </p>
      </FadeIn>

      {/* Hero Image */}
      <FadeIn delay={200}>
        <div
          className="mt-12 aspect-video rounded-sm overflow-hidden relative"
          style={{ backgroundColor: `${project.color}15` }}
        >
          {project.thumbnail ? (
            <Image
              src={project.thumbnail}
              alt={project.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 1200px"
              priority
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <span
                  className="font-heading text-heading-1 font-bold"
                  style={{ color: project.color }}
                >
                  {project.title}
                </span>
                <p className="text-caption text-muted-fg mt-2 uppercase tracking-widest">
                  {d.heroPlaceholder}
                </p>
              </div>
            </div>
          )}
        </div>
      </FadeIn>

      {/* Project Images Gallery */}
      {project.images.length > 0 && (
        <div className="mt-12 space-y-8">
          {project.images.map((img, i) => (
            <FadeIn key={img} delay={i * 80}>
              <div className="relative w-full overflow-hidden rounded-sm">
                <Image
                  src={img}
                  alt={`${project.title} - ${i + 1}`}
                  width={1200}
                  height={800}
                  className="w-full h-auto"
                  sizes="(max-width: 768px) 100vw, 1200px"
                />
              </div>
            </FadeIn>
          ))}
        </div>
      )}

      {/* MDX Content */}
      <FadeIn>
        <div className="mt-16">
          {mdxData ? (
            <MDXRemote source={mdxData.content} components={mdxComponents} />
          ) : (
            <div className="space-y-8">
              <p className="text-body text-secondary max-w-prose">
                {project.description[locale]}
              </p>
              <p className="text-body-sm text-muted-fg italic">{d.comingSoon}</p>
            </div>
          )}
        </div>
      </FadeIn>

      {/* Navigation */}
      <div className="mt-section pt-12 border-t border-border">
        <div className="flex items-center justify-between">
          {prevProject ? (
            <Link
              href={`/${locale}/projects/${prevProject.slug}`}
              className="group flex items-center gap-3 text-secondary hover:text-accent transition-colors"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="transition-transform group-hover:-translate-x-1">
                <path d="M15 10H5M5 10L9 6M5 10L9 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <div>
                <span className="text-caption text-muted-fg block">{d.previous}</span>
                <span className="font-heading text-heading-3">{prevProject.title}</span>
              </div>
            </Link>
          ) : (
            <div />
          )}

          {nextProject ? (
            <Link
              href={`/${locale}/projects/${nextProject.slug}`}
              className="group flex items-center gap-3 text-secondary hover:text-accent transition-colors text-right"
            >
              <div>
                <span className="text-caption text-muted-fg block">{d.next}</span>
                <span className="font-heading text-heading-3">{nextProject.title}</span>
              </div>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="transition-transform group-hover:translate-x-1">
                <path d="M5 10H15M15 10L11 6M15 10L11 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          ) : (
            <div />
          )}
        </div>
      </div>
    </article>
  );
}
