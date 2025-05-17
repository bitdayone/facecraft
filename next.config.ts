import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["ridsgcmezr0hepjd.public.blob.vercel-storage.com"],
  },
  // @ts-ignore
  experimental: {
    optimizeFonts: false,
  },
};

export default nextConfig;
