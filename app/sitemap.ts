import type { MetadataRoute } from 'next'

// 主要固定ページのサイトマップを返す
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
  const now = new Date()

  const entries: MetadataRoute.Sitemap = [
    { url: `${base}/`, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: `${base}/news`, lastModified: now, changeFrequency: 'daily', priority: 0.9 },
    { url: `${base}/aboutus`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/company`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${base}/business`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${base}/greeting`, lastModified: now, changeFrequency: 'yearly', priority: 0.4 },
    { url: `${base}/contact`, lastModified: now, changeFrequency: 'yearly', priority: 0.4 },
    { url: `${base}/hiroba`, lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${base}/iroiro/events`, lastModified: now, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${base}/iroiro/iroiro`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${base}/iroiro/sponsors`, lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${base}/iroiro/kodomonews`, lastModified: now, changeFrequency: 'weekly', priority: 0.6 },
  ]

  // microCMSが設定されている場合は、ニュース詳細を追加する（失敗しても無視）
  const domain = process.env.MICROCMS_SERVICE_DOMAIN
  const apiKey = process.env.MICROCMS_API_KEY
  if (domain && apiKey) {
    try {
      const res = await fetch(`https://${domain}.microcms.io/api/v1/news?limit=100`, {
        headers: { 'X-MICROCMS-API-KEY': apiKey },
        // Next.jsのfetchキャッシュ設定（任意）
        next: { revalidate: 3600 },
      })
      if (res.ok) {
        const json = await res.json()
        if (Array.isArray(json.contents)) {
          for (const item of json.contents) {
            entries.push({
              url: `${base}/news/${item.id}`,
              lastModified: new Date(item.publishedAt || item.createdAt || now),
              changeFrequency: 'yearly',
              priority: 0.5,
            })
          }
        }
      }
      // iroiro events 詳細
      const evRes = await fetch(`https://${domain}.microcms.io/api/v1/iroiro_events?limit=100`, {
        headers: { 'X-MICROCMS-API-KEY': apiKey },
        next: { revalidate: 3600 },
      })
      if (evRes.ok) {
        const json = await evRes.json()
        if (Array.isArray(json.contents)) {
          for (const item of json.contents) {
            const last = item.date || item.publishedAt || item.createdAt || now
            entries.push({
              url: `${base}/iroiro/events/${item.id}`,
              lastModified: new Date(last),
              changeFrequency: 'weekly',
              priority: 0.6,
            })
          }
        }
      }
      // 子ども新聞 詳細
      const knRes = await fetch(`https://${domain}.microcms.io/api/v1/iroiro_kodomonews?limit=100`, {
        headers: { 'X-MICROCMS-API-KEY': apiKey },
        next: { revalidate: 3600 },
      })
      if (knRes.ok) {
        const json = await knRes.json()
        if (Array.isArray(json.contents)) {
          for (const item of json.contents) {
            const last = item.date || item.publishedAt || item.createdAt || now
            entries.push({
              url: `${base}/iroiro/kodomonews/${item.id}`,
              lastModified: new Date(last),
              changeFrequency: 'weekly',
              priority: 0.6,
            })
          }
        }
      }
    } catch {
      // 取得失敗時は静的な部分のみ返す
    }
  }

  return entries
}
