import type { Metadata } from "next";
import { FadeIn } from "@/components/FadeIn";
import { SectionLabel } from "@/components/SectionLabel";
import { getDictionary, type Locale } from "@/lib/i18n";

interface Props {
  params: { locale: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = params.locale as Locale;
  const dict = await getDictionary(locale);
  return {
    title: dict.about.label,
    alternates: {
      languages: { en: "/en/about", "zh-Hant": "/zh/about" },
    },
  };
}

const skillItems = {
  design: ["UI Design", "UX Research", "Wireframing", "Prototyping", "Design System", "Responsive Design"],
  tools: ["Figma", "Principle", "Protopie", "Webflow", "Storybook"],
  ai: ["ChatGPT", "Claude", "Midjourney", "Cursor", "V0"],
  methods: ["User Interview", "Usability Testing", "Competitive Analysis", "Journey Mapping", "A/B Testing"],
};

export default async function AboutPage({ params }: Props) {
  const locale = params.locale as Locale;
  const dict = await getDictionary(locale);
  const d = dict.about;

  const principles = [
    { num: "01", title: d.principle1Title, desc: d.principle1Desc },
    { num: "02", title: d.principle2Title, desc: d.principle2Desc },
    { num: "03", title: d.principle3Title, desc: d.principle3Desc },
  ];

  const skills = [
    { category: d.skillCatDesign, items: skillItems.design },
    { category: d.skillCatTools, items: skillItems.tools },
    { category: d.skillCatAI, items: skillItems.ai },
    { category: d.skillCatMethods, items: skillItems.methods },
  ];

  return (
    <section className="container-main pt-32 md:pt-40 pb-section">
      {/* Bio */}
      <FadeIn>
        <SectionLabel>{d.label}</SectionLabel>
      </FadeIn>

      <FadeIn delay={100}>
        <h1 className="font-heading text-heading-1 text-primary mt-6 max-w-3xl text-balance">
          {d.heading}
        </h1>
      </FadeIn>

      <FadeIn delay={200}>
        <div className="mt-8 max-w-prose space-y-6 text-body text-secondary">
          <p>{d.bio1}</p>
          {d.bio2 && <p>{d.bio2}</p>}
          <p>{d.bio3}</p>
        </div>
      </FadeIn>

      {/* Design Principles — with numbers */}
      <FadeIn delay={300}>
        <div className="mt-section pt-12 border-t border-border">
          <SectionLabel>{d.principlesLabel}</SectionLabel>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
            {principles.map((p) => (
              <div key={p.num} className="space-y-3">
                <span className="font-heading text-display text-accent/15">
                  {p.num}
                </span>
                <h3 className="font-heading text-heading-3 text-primary -mt-4">
                  {p.title}
                </h3>
                <p className="text-body-sm text-secondary">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </FadeIn>

      {/* Skills — Tag/Pill layout */}
      <FadeIn>
        <div className="mt-section pt-12 border-t border-border">
          <SectionLabel>{d.skillsLabel}</SectionLabel>
          <div className="mt-8 space-y-8">
            {skills.map((group) => (
              <div key={group.category}>
                <h3 className="font-heading text-heading-3 text-primary mb-4">
                  {group.category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="inline-block text-body-sm text-secondary border border-border rounded-full px-4 py-1.5"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </FadeIn>

      {/* Contact — enhanced CTA */}
      <FadeIn>
        <div id="contact" className="mt-section pt-12 border-t border-border scroll-mt-24">
          <SectionLabel>{d.contactLabel}</SectionLabel>
          <div className="mt-8 max-w-prose">
            <p className="text-body text-secondary mb-8">{d.contactDesc}</p>
            <div className="space-y-4">
              <a
                href="mailto:vidacheng0722@gmail.com"
                className="inline-flex items-center gap-2 font-heading text-heading-3 text-accent hover:opacity-70 transition-opacity"
              >
                vidacheng0722@gmail.com
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M5 15L15 5M15 5H8M15 5V12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/in/vida-cheng"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-heading text-heading-3 text-secondary hover:text-accent transition-colors"
              >
                LinkedIn
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M5 15L15 5M15 5H8M15 5V12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </FadeIn>
    </section>
  );
}
