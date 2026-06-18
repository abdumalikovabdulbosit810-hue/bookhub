import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "covers.openlibrary.org" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "m.media-amazon.com" }
    ]
  },
  experimental: {
    optimizePackageImports: ["lucide-react", "@mui/material", "antd"]
  }
};

export default nextConfig;
