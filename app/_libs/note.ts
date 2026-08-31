import { XMLParser } from "fast-xml-parser";

const NOTE_RSS_URL = "https://note.com/tomoya_canvas/rss";

export type NoteArticle = {
  id: string;
  title: string;
  link: string;
  date: string; // YYYY-MM-DD
  thumbnail?: string;
  excerpt: string;
  creatorName: string;
  creatorImage?: string;
};

type RssItem = {
  title?: string;
  link?: string;
  guid?: string;
  pubDate?: string;
  description?: string;
  "media:thumbnail"?: string;
  "note:creatorName"?: string;
  "note:creatorImage"?: string;
};

export async function getNoteArticles(limit = 6): Promise<NoteArticle[]> {
  const res = await fetch(NOTE_RSS_URL, {
    next: { revalidate: 3600 },
    headers: { "User-Agent": "canvas-site-lp-bot" },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch note RSS: ${res.status}`);
  }

  const xml = await res.text();
  const parser = new XMLParser({ ignoreAttributes: true, cdataPropName: "__cdata" });
  const parsed = parser.parse(xml);

  const rawItems = parsed?.rss?.channel?.item;
  const items: RssItem[] = Array.isArray(rawItems)
    ? rawItems
    : rawItems
      ? [rawItems]
      : [];

  return items.slice(0, limit).map((item) => toNoteArticle(item));
}

function toNoteArticle(item: RssItem): NoteArticle {
  const link = item.link ?? item.guid ?? "";
  const pubDate = item.pubDate ? new Date(item.pubDate) : undefined;
  const date =
    pubDate && !Number.isNaN(pubDate.getTime())
      ? pubDate.toISOString().slice(0, 10)
      : "";

  return {
    id: item.guid ?? link,
    title: item.title ?? "",
    link,
    date,
    thumbnail: item["media:thumbnail"],
    excerpt: buildExcerpt(extractCdata(item.description)),
    creatorName: item["note:creatorName"] ?? "",
    creatorImage: item["note:creatorImage"],
  };
}

function extractCdata(value: unknown): string {
  if (typeof value === "string") return value;
  if (value && typeof value === "object" && "__cdata" in value) {
    const cdata = (value as { __cdata: unknown }).__cdata;
    return typeof cdata === "string" ? cdata : "";
  }
  return "";
}

function buildExcerpt(html: string, length = 90): string {
  const text = html
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .replace(/続きをみる\s*$/, "")
    .trim();
  return text.length > length ? `${text.slice(0, length)}…` : text;
}
