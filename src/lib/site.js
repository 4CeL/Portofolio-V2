// Absolute site URL for metadata, sitemap, and robots.
// On Vercel the production domain is read from the system env; locally it falls back to localhost.
const vercelHost = process.env.VERCEL_PROJECT_PRODUCTION_URL || process.env.VERCEL_URL;

export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || (vercelHost ? `https://${vercelHost}` : "http://localhost:3000");
