/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  images: {
    // Server-mode image optimization is enabled (Netlify Next.js Runtime serves
    // optimized AVIF/WebP and resizes per the `sizes` props). Local WebP sources
    // are optimized further automatically.
    // Add real CDN/remote hosts here when swapping in remote photography.
    remotePatterns: [],
  },
};

export default nextConfig;
