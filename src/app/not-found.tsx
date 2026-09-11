import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-auto max-w-2xl px-4 py-20 text-center">
      <p className="bg-linear-to-br from-saffron-500 via-gulal-500 to-peacock-500 bg-clip-text font-display text-7xl text-transparent">
        ॐ
      </p>
      <h1 className="mt-4 font-display text-4xl font-extrabold text-maroon-900">Page Not Found</h1>
      <p className="mt-3 text-[17px] text-stone-600">
        The page you are looking for has moved or no longer exists. Baba guides every seeker home.
      </p>
      <Link
        href="/"
        className="btn-festive mt-6 inline-block min-h-12 rounded-full px-6 py-2.5 font-bold text-white shadow-lg transition-all hover:shadow-xl active:scale-[0.98]"
      >
        ← Back to Home
      </Link>
    </section>
  );
}
