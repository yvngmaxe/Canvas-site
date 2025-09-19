import PageLayout from "@/components/PageLayout";
import IroiroHeader from "@/components/IroiroHeader";
import KodomoNewsList, { KodomoNewsItem } from "@/components/KodomoNewsList";

export default function IroiroNewsPage() {
  // 仮データ（後で microCMS 連携に差し替え）
  const items: KodomoNewsItem[] = [
    {
      id: "demo-1",
      title: "商店街レポート：みんなのおすすめを探したよ",
      date: "2024-08-21",
      summary: "地元の商店街で見つけたおすすめスポットを子どもたちが紹介。",
      thumbnailUrl: "/images/test1.jpg",
    },
    {
      id: "demo-2",
      title: "校庭のひみつ基地をつくったよ",
      date: "2024-09-03",
      summary: "身近な素材でつくる“ひみつ基地”づくりの記録。",
      thumbnailUrl: "/images/test2.jpg",
    },
    {
      id: "demo-3",
      title: "川の生きもの観察隊！",
      date: "2024-07-10",
      summary: "川辺で見つけた生きものたちと、観察のコツを紹介。",
      thumbnailUrl: "/images/test3.jpg",
    },
  ];

  return (
    <div className="page">
      <IroiroHeader active="kodomonews" />
      <PageLayout
        title="広島子ども新聞！！"
        subtitle=""
        preDivider={
          <p className="text-left text-3xl sm:text-4xl font-bold">
            子どもでもお仕事をして稼げる！！新聞を投稿しよう
          </p>
        }
      >
        <KodomoNewsList items={items} />
      </PageLayout>
    </div>
  );
}
