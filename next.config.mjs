/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api-v2.alfiagashop.biz.id",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
