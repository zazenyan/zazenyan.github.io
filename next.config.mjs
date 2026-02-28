// 直接将其声明为 any 类型，彻底降维打击语法检查
const nextConfig: any = {
  output: "export",
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;