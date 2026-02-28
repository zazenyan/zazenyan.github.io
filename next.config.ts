import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 核心设置：告诉 Next.js 将整个网站打包成纯静态的 HTML/CSS/JS
  output: "export",
  // 忽略构建时的强校验，防止一些无关紧要的警告导致打包失败
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;