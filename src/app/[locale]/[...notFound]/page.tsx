import { notFound } from "next/navigation";

// Catch-all route to ensure unmatched URLs under /[locale]/* trigger
// the [locale]/not-found.tsx (which has access to Navbar / Footer / Mascot)
// instead of the root Next.js default 404.
export default function CatchAllNotFound() {
  notFound();
}
