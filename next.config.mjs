/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  experimental: {
    staleTimes: {
      dynamic: 0, //动态渲染的路由缓存默认缓存 30s
      static: 180, // 静态渲染的理由缓存默认混存 5分钟
    },
  },
  webpack(config, options) {
    // 直接使用img标签导入svg时，客户端显示失败
    config.module.rules.push({
      test: /\.svg$/,
      type: 'asset', // type选择asset
      parser: {
        dataUrlCondition: {
          maxSize: 1, //10 * 1024, // 小于10kb转base64位
        },
      },
    });

    return config;
  },
};

export default nextConfig;
