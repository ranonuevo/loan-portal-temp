import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // Skip ESLint during production builds to prevent type/style issues from blocking deploys
    // ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
