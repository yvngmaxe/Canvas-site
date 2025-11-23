import PageLayout from "@/components/PageLayout";
import IroiroHeader from "@/components/IroiroHeader";
import SponsorsGrid, { type Sponsor } from "@/components/SponsorsGrid";
import {
  getIroiroSponsorsList,
  getIroiroSponsorDetail,
} from "@/app/_libs/microcms";

export const revalidate = 60;

export default async function IroiroSponsorsPage({
  searchParams,
}: {
  searchParams: Promise<{ draftKey?: string; contentId?: string }>;
}) {
  const { draftKey, contentId } = await searchParams;
  // microCMS からスポンサー一覧を取得（ISR: revalidate=60）
  // kidsPower の降順で取得（microCMS クエリ）
  const { contents } = await getIroiroSponsorsList({
    limit: 100,
    orders: "-kidsPower",
  });

  let sponsorsContents = contents.slice();

  if (draftKey && contentId) {
    try {
      const previewItem = await getIroiroSponsorDetail(contentId, { draftKey });

      if (previewItem) {
        sponsorsContents = sponsorsContents.filter(
          (item) => item.id !== contentId
        );
        sponsorsContents.push(previewItem);
      }
    } catch (error) {
      console.error("Failed to load draft sponsor", error);
    }
  }

  // microCMSのデータをUI用の型へマッピング
  // - 内部プロフィールへのリンクは contentId を使って `/iroiro/sponsors/${id}` を組み立てています
  // - これにより、リンク先は動的に生成されます（固定ファイルは不要）
  // 念のためフロント側でも降順に並び替え（未設定は 0 扱い）
  const toPlainText = (rich?: string) =>
    rich
      ?.replace(/<[^>]*>/g, " ")
      .replace(/\s+/g, " ")
      .trim() ?? "";

  const sponsors: Sponsor[] = sponsorsContents
    .sort((a, b) => (b.kidsPower ?? 0) - (a.kidsPower ?? 0))
    .map((c) => {
      const plain = toPlainText(c.description);
      const snippet = plain
        ? `${plain.slice(0, 60)}${plain.length > 60 ? "…" : ""}`
        : "";
      return {
        name: c.name,
        logo: c.logo?.url ?? "/images/test1.jpg",
        kidsPower: typeof c.kidsPower === "number" ? c.kidsPower : 0,
        description: snippet,
        url: c.url,
      } satisfies Sponsor;
    });
  return (
    <div className="page">
      <IroiroHeader active="sponsors" />
      <PageLayout title="iroiroスポンサー" subtitle="支援・協賛の皆さま">
        <SponsorsGrid
          sponsors={sponsors}
          leadText={`私たちは広島の子どもの価値ある学びのお手伝いをしています
キッズパワーは私たちが広島の子どもたちの未来を応援するパワーです`}
          mobileLeadBreakAfter="価値ある"
        />
      </PageLayout>
    </div>
  );
}
