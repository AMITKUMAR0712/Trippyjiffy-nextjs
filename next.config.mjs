/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "trippyjiffy.com" },
      { protocol: "https", hostname: "placehold.co" },
      { protocol: "http", hostname: "localhost" },
    ],
  },
  async rewrites() {
    // Local dev/start convenience only: in real production, nginx proxies
    // /api/* to the backend directly and this route never reaches Next.js.
    // Locally there's no nginx, so without this the relative "/api/..."
    // image/API paths used in production mode would 404 against the Next
    // server instead of the actual backend on port 5005.
    const backend = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5005";
    return [
      { source: "/api/:path*", destination: `${backend}/api/:path*` },
    ];
  },
};

export default nextConfig;
