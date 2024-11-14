import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  //  External Image Config
  images: {
    domains: ["i.ytimg.com"],
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        net: false,
        tls: false,
        fs: false,
        child_process: false,
      };
    }
    return config;
  },
};

export default nextConfig;
