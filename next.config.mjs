/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,
  // Hide the "N" dev indicator in the bottom-left corner (dev only; errors still show).
  devIndicators: false,
  experimental: {
    // Lets React's <ViewTransition> animate route navigations (see components/shell/Frame.js).
    viewTransition: true,
  },
};

export default nextConfig;
