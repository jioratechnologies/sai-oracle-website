import PageHero from "@/components/PageHero";
import VideoCard from "@/components/VideoCard";
import { getVideos } from "@/lib/site";

export const revalidate = 300;

export const metadata = { title: "Videos & Bhajans" };

export default async function VideosPage() {
  const videos = await getVideos(24);
  return (
    <>
      <PageHero
        eyebrow="Bhajans & Darshan"
        title="Videos & Bhajans"
        intro="Aartis, bhajans and discourses for your daily sadhana. Click any video to watch."
      />
      <section className="mx-auto max-w-6xl px-4 py-12">
        {videos.length === 0 ? (
          <p className="rounded-2xl border border-maroon-100 bg-white p-8 text-center text-stone-600">
            Videos will be added soon. 🙏
          </p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {videos.map((v) => (
              <VideoCard key={v.id} video={v} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}
