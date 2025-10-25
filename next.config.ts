import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,

  images: {
    unoptimized: true,
    domains: [
      "closetfrontrecruiting.blob.core.windows.net",
      "via.placeholder.com",
    ],
  },
};

export default nextConfig;
