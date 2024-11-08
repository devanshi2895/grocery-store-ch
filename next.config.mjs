/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ["trusty-boot-3e9a61a1aa.media.strapiapp.com", "localhost"],
  },
  // images: {
  //   domains: ["inspiring-actor-5fe41d2def.strapiapp.com", "localhost"],
  // },
  // images: {
  //   remotePatterns: [
  //     {
  //       protocol: "https",
  //       // hostname: "inspiring-actor-5fe41d2def.media.strapiapp.com",
  //       hostname: "trusty-boot-3e9a61a1aa.media.strapiapp.com",
  //     },
  //   ],
  // },
};

export default nextConfig;
