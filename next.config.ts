import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'standalone',
  reactStrictMode: false,
  transpilePackages: ['ahooks'],
  sassOptions: {
    silenceDeprecations: ['legacy-js-api'],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // experimental: {
  //   staleTimes: {
  //     dynamic: 0, //动态渲染的路由缓存默认缓存 30s
  //     static: 180, // 静态渲染的理由缓存默认混存 5分钟
  //   },
  // },
};

export default nextConfig;
