/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  // For Netlify deployment with next export
  output: 'export',
  // Disable server components for static export
  experimental: {
    appDir: false,
  },
}

module.exports = nextConfig