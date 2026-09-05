import Image from "next/image";
import { youtubeEmbedUrl, youtubeThumbnail, youtubeWatchUrl } from "@/lib/youtube";
import ArrowLink from "./ArrowLink";
import type { YoutubeVideo } from "@/lib/types";

export default function VideoCard({ video }: { video: YoutubeVideo }) {
  const embed = youtubeEmbedUrl(video.youtube_url);
  const thumb =
    video.thumbnail_url || youtubeThumbnail(video.youtube_url) || undefined;
  return (
    <article className="overflow-hidden rounded-2xl border border-maroon-100 bg-white shadow-sm">
      <div className="relative aspect-video bg-maroon-950">
        {embed ? (
          <iframe
            src={embed}
            title={video.title}
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 h-full w-full"
          />
        ) : thumb ? (
          <Image src={thumb} alt={video.title} fill className="object-cover" />
        ) : null}
      </div>
      <div className="p-4">
        <h3 className="font-display text-lg leading-snug font-bold text-maroon-900">
          {video.title}
        </h3>
        <ArrowLink
          href={youtubeWatchUrl(video.youtube_url)}
          external
          className="mt-1 text-sm text-saffron-600 hover:text-saffron-500"
        >
          Watch on YouTube
        </ArrowLink>
      </div>
    </article>
  );
}
