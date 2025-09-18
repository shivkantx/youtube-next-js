import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // ✅ Ignore ESLint errors during production builds on Vercel
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
