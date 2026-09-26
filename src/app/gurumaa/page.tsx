import { Suspense } from "react";
import MaaClientPortal from "./MaaClientPortal";

export const metadata = {
  title: "Beloved Maa · Sai Oracle",
  description:
    "Life journey, spiritual guidance, human values, and documented divine miracles of beloved Maa, founder of Satyadeep Sai Universe.",
};

export default function GurumaaPage() {
  return (
    <section className="mx-auto max-w-6xl px-4 pt-8 pb-14 sm:pt-10 sm:pb-20">
      <Suspense
        fallback={
          <div className="py-20 text-center text-sm font-semibold text-stone-400">
            Loading...
          </div>
        }
      >
        <MaaClientPortal />
      </Suspense>
    </section>
  );
}
