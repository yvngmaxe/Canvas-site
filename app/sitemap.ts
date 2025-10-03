import type { MetadataRoute } from "next";

type MicroCmsBaseItem = {
  id: string;
  createdAt?: string;
  publishedAt?: string;
  updatedAt?: string;
};

type MicroCmsListResponse<T> = {
  contents: T[];
  totalCount?: number;
};

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/+$/, "");
const microCmsDomain = process.env.MICROCMS_SERVICE_DOMAIN;
const microCmsApiKey = process.env.MICROCMS_API_KEY;

const staticRoutes: Array<{
  path: string;
  changeFrequency?: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority?: MetadataRoute.Sitemap[number]["priority"];
}> = [
  { path: "/", changeFrequency: "weekly", priority: 1 },
  { path: "/news", changeFrequency: "daily", priority: 0.9 },
  { path: "/aboutus", changeFrequency: "monthly", priority: 0.8 },
  { path: "/company", changeFrequency: "monthly", priority: 0.6 },
  { path: "/business", changeFrequency: "monthly", priority: 0.6 },
  { path: "/greeting", changeFrequency: "yearly", priority: 0.4 },
  { path: "/contact", changeFrequency: "yearly", priority: 0.4 },
  { path: "/hiroba", changeFrequency: "monthly", priority: 0.5 },
  { path: "/iroiro/events", changeFrequency: "weekly", priority: 0.7 },
  { path: "/iroiro/iroiro", changeFrequency: "monthly", priority: 0.6 },
  { path: "/iroiro/sponsors", changeFrequency: "monthly", priority: 0.5 },
  { path: "/iroiro/kodomonews", changeFrequency: "weekly", priority: 0.6 },
];

const limit = 100;

async function fetchAllMicroCmsItems<T extends MicroCmsBaseItem>(endpoint: string): Promise<T[]> {
  if (!microCmsDomain || !microCmsApiKey) return [];

  const items: T[] = [];

  for (let offset = 0; offset < 5000; offset += limit) {
    const url = new URL(`/api/v1/${endpoint}`, `https://${microCmsDomain}.microcms.io`);
    url.searchParams.set("limit", limit.toString());
    url.searchParams.set("offset", offset.toString());

    try {
      const res = await fetch(url, {
        headers: { "X-MICROCMS-API-KEY": microCmsApiKey },
        next: { revalidate: 3600 },
      });

      if (!res.ok) break;

      const json = (await res.json()) as MicroCmsListResponse<T>;
      if (!Array.isArray(json.contents) || json.contents.length === 0) break;

      items.push(...json.contents);

      const fetchedAll = json.totalCount ? items.length >= json.totalCount : json.contents.length < limit;
      if (fetchedAll) break;
    } catch (error) {
      console.error(`[sitemap] Failed to fetch microCMS ${endpoint}:`, error);
      break;
    }
  }

  return items;
}

function resolveLastModified(item: MicroCmsBaseItem): string {
  return (
    item.updatedAt ||
    item.publishedAt ||
    item.createdAt ||
    new Date().toISOString()
  );
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const nowIso = new Date().toISOString();

  const entries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${siteUrl}${route.path}`,
    lastModified: nowIso,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  const dynamicTasks: Array<Promise<void>> = [];

  dynamicTasks.push(
    (async () => {
      const newsItems = await fetchAllMicroCmsItems<{ id: string } & MicroCmsBaseItem>("news");
      newsItems.forEach((item) => {
        entries.push({
          url: `${siteUrl}/news/${item.id}`,
          lastModified: resolveLastModified(item),
          changeFrequency: "weekly",
          priority: 0.5,
        });
      });
    })()
  );

  dynamicTasks.push(
    (async () => {
      const events = await fetchAllMicroCmsItems<{ id: string; date?: string } & MicroCmsBaseItem>(
        "iroiro_events"
      );
      events.forEach((item) => {
        const lastUpdated = item.date || resolveLastModified(item);
        entries.push({
          url: `${siteUrl}/iroiro/events/${item.id}`,
          lastModified: lastUpdated,
          changeFrequency: "weekly",
          priority: 0.6,
        });
      });
    })()
  );

  dynamicTasks.push(
    (async () => {
      const sponsors = await fetchAllMicroCmsItems<{ id: string } & MicroCmsBaseItem>("iroiro_sponsors");
      sponsors.forEach((item) => {
        entries.push({
          url: `${siteUrl}/iroiro/sponsors/${item.id}`,
          lastModified: resolveLastModified(item),
          changeFrequency: "monthly",
          priority: 0.45,
        });
      });
    })()
  );

  await Promise.all(dynamicTasks);

  return entries;
}
