// next.config.ts

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Required for static export
  output: 'export',

  // The name of your repository
  basePath: '/ReSource-Hub',
  assetPrefix: '/ReSource-Hub/',

  // Required for Next.js Image component on static export
  images: {
    unoptimized: true,
  },
};

export default nextConfig;