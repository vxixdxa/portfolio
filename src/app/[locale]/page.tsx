import { projects } from "@/data/projects";
import { ProjectCard } from "@/components/ProjectCard";
import { FadeIn } from "@/components/FadeIn";
import { SectionLabel } from "@/components/SectionLabel";
import { getDictionary, type Locale } from "@/lib/i18n";
import Link from "next/link";

interface Props {
  params: { locale: string };
}

export default async function HomePage({ params }: Props) {
  const locale = params.locale as Locale;
  const dict = await getDictionary(locale);
  const h = dict.hero;

  return (
    <>
      {/* Hero */}
      <section className="container-main pt-32 md:pt-40">
        <FadeIn>
          <SectionLabel>{h.label}</SectionLabel>
        </FadeIn>

        <FadeIn delay={100}>
          <h1 className="font-heading text-display text-primary mt-6 max-w-4xl text-balance">
            {h.heading}
          </h1>
        </FadeIn>

        <FadeIn delay={200}>
          <p className="text-body-lg text-secondary mt-6 max-w-2xl">
            {h.description}
          </p>
        </FadeIn>

        {/* Scroll CTA */}
        <FadeIn delay={350}>
          <Link
            href={`/${locale}/#work`}
            className="inline-flex items-center gap-2 mt-10 text-body-sm text-muted-fg hover:text-accent transition-colors cursor-pointer group"
          >
            <span>{dict.projects.label}</span>
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              className="transition-transform group-hover:translate-y-0.5"
            >
              <path
                d="M8 3V13M8 13L4 9M8 13L12 9"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </FadeIn>
      </section>

      {/* Projects */}
      <section id="work" className="container-main pt-16 md:pt-20 pb-section">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {projects.map((project, index) => (
            <FadeIn key={project.slug} delay={index * 100}>
              <ProjectCard
                project={project}
                locale={locale}
                viewCaseStudyLabel={dict.projects.viewCaseStudy}
              />
            </FadeIn>
          ))}
        </div>
      </section>
    </>
  );
}
