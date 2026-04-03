import type { Locale } from "@/lib/i18n";

interface FooterProps {
  locale: Locale;
  dict: {
    role: string;
    copyright: string;
  };
}

const socialLinks = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/vida-cheng" },
  { label: "Email", href: "mailto:vidacheng0722@gmail.com" },
];

export function Footer({ dict }: FooterProps) {
  const year = new Date().getFullYear();
  const copyright = dict.copyright.replace("{year}", String(year));

  return (
    <footer className="border-t border-border mt-section">
      <div className="container-main py-12 md:py-16">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <p className="font-heading text-lg font-semibold text-primary">
              Vida C.
            </p>
            <p className="text-body-sm text-muted-fg mt-1">{dict.role}</p>
          </div>

          <ul className="flex items-center gap-6">
            {socialLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-body-sm text-secondary hover:text-accent transition-colors"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-12 pt-6 border-t border-border">
          <p className="text-caption text-muted-fg uppercase">{copyright}</p>
        </div>
      </div>
    </footer>
  );
}
