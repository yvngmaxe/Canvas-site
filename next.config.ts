import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.microcms-assets.io',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'assets.st-note.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  // 実績ページは v2.0 でやめた（事業内容の事例紹介と内容が重なるため）。
  // 古いアドレスが検索などに残っていても、事業内容ページへ案内する。
  // 戻す可能性があるので、ブラウザに覚えさせない一時的な転送（307）にしている
  async redirects() {
    return [
      { source: "/achievements", destination: "/business", permanent: false },
      { source: "/achievements/:id", destination: "/business", permanent: false },
    ];
  },
};

export default nextConfig;

