import PageLayout from "@/components/PageLayout";
import IroiroHeader from "@/components/IroiroHeader";
import EventList from "@/components/EventList";
import { getIroiroEventsList } from "@/app/_libs/microcms";
import type { IroiroEvent } from "@/app/_libs/microcms";

export const revalidate = 60;

export default async function IroiroEventsPage() {
  // microCMS からイベント一覧を取得（ISR: revalidate=60）
  // date の昇順（近い日付が先）で取得。microCMS 側で未設定/過去分が混在してもフロントで最終整列。
  const { contents } = await getIroiroEventsList({ limit: 100, orders: "date" });

  // 念のためフロント側で整列（date 未設定は末尾）
  const events: IroiroEvent[] = contents
    .slice()
    .sort((a, b) => {
      const ta = a.date ? new Date(a.date).getTime() : Number.POSITIVE_INFINITY;
      const tb = b.date ? new Date(b.date).getTime() : Number.POSITIVE_INFINITY;
      return ta - tb;
    });

  return (
    <div className="page">
      <IroiroHeader active="events" />
      <PageLayout title="iroiroイベント一覧" subtitle="イベント情報">
        <EventList events={events} />
      </PageLayout>
    </div>
  );
}
