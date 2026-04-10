import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  
  // 👇 FIX: Whitelist your phone's IP so it doesn't get blocked 👇
  allowedDevOrigins: ["192.168.0.103", "localhost"], 

  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**" },
    ],
    // Allows next/image to render without crashing when local files are missing.
    // Remove this line once all real images are in /public/images/
    dangerouslyAllowSVG: true,
    unoptimized: false,
  },
  // Suppress "invalid image" console errors for missing placeholder files
  logging: {
    fetches: { fullUrl: false },
  },
};

export default nextConfig;