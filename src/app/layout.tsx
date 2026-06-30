import "./globals.css";

// The <html> and <body> tags live in [locale]/layout.tsx so that the `lang`
// attribute can be set per-locale. This root layout stays a pass-through.
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
