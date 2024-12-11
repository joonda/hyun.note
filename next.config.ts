// next.config.ts
import { NextConfig } from 'next';;

const nextConfig: NextConfig = {
  webpack(config, options) {
    config.module.rules.push({
      test: /\.mdx$/,
      use: [
        {
          loader: '@mdx-js/loader',
          options: {
            // 필요한 경우 설정을 추가할 수 있습니다
          },
        },
      ],
    });
    return config;
  },
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'mdx'], // MDX를 페이지 확장자로 추가
};

export default nextConfig;
