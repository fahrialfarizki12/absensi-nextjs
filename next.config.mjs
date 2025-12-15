/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.alfiagashop.biz.id",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
