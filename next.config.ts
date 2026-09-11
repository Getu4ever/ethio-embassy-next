import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      // Document workflows upload multiple PDFs/images (up to 8 MB each).
      bodySizeLimit: "40mb",
    },
  },
};

export default nextConfig;
