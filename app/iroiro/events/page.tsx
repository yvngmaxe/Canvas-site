import PageLayout from "@/components/PageLayout";
import IroiroHeader from "@/components/IroiroHeader";
import EventList from "@/components/EventList";
import type { IroiroEvent } from "@/app/_libs/microcms";

export const revalidate = 60;

export default async function IroiroEventsPage() {
  // 仮データ（CMS連携なし）
  const events: IroiroEvent[] = [
    {
      id: "ev1",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      publishedAt: new Date().toISOString(),
      revisedAt: new Date().toISOString(),
      title: "放課後ワークショップ：未来の仕事を描こう",
      date: "2025-10-05",
      place: "広島市中区 こども文化科学館",
      thumbnail: { url: "/images/test1.jpg", width: 1200, height: 800 },
    },
    {
      id: "ev2",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      publishedAt: new Date().toISOString(),
      revisedAt: new Date().toISOString(),
      title: "地域企業と学ぶ！おしごと探検ツアー",
      date: "2025-10-20",
      place: "呉市 阿賀マリン",
      thumbnail: { url: "/images/test2.jpg", width: 1200, height: 800 },
    },
    {
      id: "ev3",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      publishedAt: new Date().toISOString(),
      revisedAt: new Date().toISOString(),
      title: "親子でチャレンジ！テック×アート体験会",
      date: "2025-11-03",
      place: "福山市ものづくり交流館",
      thumbnail: { url: "/images/test3.jpg", width: 1200, height: 800 },
    },
  ];

  return (
    <div className="page">
      <IroiroHeader active="events" />
      <PageLayout title="iroiroイベント一覧" subtitle="イベント情報">
        <EventList events={events} />
      </PageLayout>
    </div>
  );
}
