import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "i.ytimg.com" },
      { protocol: "https", hostname: "*.supabase.co" },
    ],
  },
  redirects() {
    return [
      {
        source: "/videos",
        destination: "/gallery?tab=videos",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
