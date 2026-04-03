import Link from "next/link";
import Image from "next/image";
import type { Project } from "@/data/projects";
import type { Locale } from "@/lib/i18n";

interface ProjectCardProps {
  project: Project;
  locale: Locale;
  viewCaseStudyLabel: string;
}

export function ProjectCard({ project, locale, viewCaseStudyLabel }: ProjectCardProps) {
  return (
    <Link
      href={`/${locale}/projects/${project.slug}`}
      className="group block cursor-pointer"
    >
      <article className="space-y-4">
        {/* Thumbnail */}
        <div
          className="relative aspect-[16/10] overflow-hidden rounded-sm transition-all duration-500 group-hover:shadow-lg"
          style={{
            background: `linear-gradient(145deg, ${project.color}08 0%, ${project.color}18 50%, ${project.color}08 100%)`,
          }}
        >
          {project.thumbnail ? (
            /* Real image */
            <Image
              src={project.thumbnail}
              alt={project.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          ) : (
            /* Placeholder */
            <>
              <div
                className="absolute inset-0 opacity-[0.03]"
                style={{
                  backgroundImage: `linear-gradient(${project.color} 1px, transparent 1px), linear-gradient(90deg, ${project.color} 1px, transparent 1px)`,
                  backgroundSize: "40px 40px",
                }}
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center p-8">
                <span
                  className="font-heading text-heading-2 font-bold text-center transition-transform duration-500 group-hover:scale-[1.02]"
                  style={{ color: project.color }}
                >
                  {project.title}
                </span>
                <span className="mt-2 text-caption text-muted-fg uppercase tracking-widest">
                  {project.category}
                </span>
              </div>
            </>
          )}

          {/* Hover overlay */}
          <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-colors duration-500" />
        </div>

        {/* Info */}
        <div className="space-y-1">
          <h3 className="font-heading text-heading-3 text-primary">
            {project.title}
          </h3>
          <p className="text-body-sm text-secondary line-clamp-2">
            {project.description[locale]}
          </p>
        </div>

        {/* Arrow indicator */}
        <div className="flex items-center gap-2 text-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span className="text-body-sm font-medium">{viewCaseStudyLabel}</span>
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            className="transition-transform duration-300 group-hover:translate-x-1"
          >
            <path
              d="M3 8H13M13 8L9 4M13 8L9 12"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </article>
    </Link>
  );
}
