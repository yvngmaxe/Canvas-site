import type { MetadataRoute } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export default function robots(): MetadataRoute.Robots {
  // プレビュー用のサイト（環境変数 SITE_NOINDEX=1）は、どの検索エンジンにも全ページ載せない
  if (process.env.SITE_NOINDEX === "1") {
    return { rules: [{ userAgent: "*", disallow: ["/"] }] };
  }

  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/"],
        disallow: [
          "/auth/",
          "/account",
          "/account/",
          "/api/",
        ],
      },
    ],
    sitemap: [`${siteUrl}/sitemap.xml`],
  };
}
