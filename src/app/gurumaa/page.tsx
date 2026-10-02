import { Suspense } from "react";
import MaaClientPortal from "./MaaClientPortal";
import { getMediaMap } from "@/lib/site";

export const metadata = {
  title: "Beloved Maa · Sai Oracle",
  description:
    "Life journey, spiritual guidance, human values, and documented divine miracles of beloved Maa, founder of Satyadeep Sai Universe.",
};

export default async function GurumaaPage() {
  const mediaMap = await getMediaMap();
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-8 pb-14 sm:pt-10 sm:pb-20">
      <Suspense
        fallback={
          <div className="py-20 text-center text-sm font-semibold text-stone-400">
            Loading...
          </div>
        }
      >
        <MaaClientPortal mediaMap={mediaMap} />
      </Suspense>
    </section>
  );
}
