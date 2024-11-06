/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ["localhost"],
  },
  // images: {
  //   domains: ["inspiring-actor-5fe41d2def.strapiapp.com", "localhost"],
  // },
  // images: {
  //   remotePatterns: [
  //     {
  //       protocol: "https",
  //       hostname: "inspiring-actor-5fe41d2def.media.strapiapp.com",
  //     },
  //   ],
  // },
};

export default nextConfig;
