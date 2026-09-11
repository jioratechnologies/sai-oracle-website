import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-auto max-w-2xl px-4 py-20 text-center">
      <p className="font-display text-7xl text-gold-400">ॐ</p>
      <h1 className="mt-4 font-display text-4xl font-bold text-maroon-900">Page Not Found</h1>
      <p className="mt-3 text-[17px] text-stone-600">
        The page you are looking for has moved or no longer exists. Baba guides every seeker home.
      </p>
      <Link
        href="/"
        className="mt-6 inline-block rounded-full bg-maroon-800 px-6 py-2.5 font-semibold text-cream-50 hover:bg-maroon-700"
      >
        ← Back to Home
      </Link>
    </section>
  );
}
