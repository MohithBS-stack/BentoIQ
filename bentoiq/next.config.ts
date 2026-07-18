import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow images from common external sources
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "avatars.githubusercontent.com" },
      { protocol: "https", hostname: "lh3.googleusercontent.com"    },
      { protocol: "https", hostname: "*.supabase.co"                 },
    ],
  },
  // Strict mode for catching issues early
  reactStrictMode: true,
  // Compress output
  compress: true,
  // Helpful for debugging
  logging: {
    fetches: {
      fullUrl: process.env.NODE_ENV === "development",
    },
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
