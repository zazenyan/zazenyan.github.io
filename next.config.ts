/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    // 忽略云端打包时的 TS 严格审查报错
    ignoreBuildErrors: true,
  },
};

export default nextConfig;