import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "enj9paxgz9lwlsv5.public.blob.vercel-storage.com",
      },
    ],
  },
};

export default nextConfig;
