import Link from "next/link";

export default function NotFound() {
  return (
    <section className="container-main pt-32 md:pt-40 pb-section text-center">
      <h1 className="font-heading text-display text-primary">404</h1>
      <p className="text-body-lg text-secondary mt-4">
        This page could not be found.
      </p>
      <Link
        href="/en/"
        className="inline-block mt-8 text-accent text-body-sm font-medium hover:opacity-70 transition-opacity"
      >
        Go Home
      </Link>
    </section>
  );
}
