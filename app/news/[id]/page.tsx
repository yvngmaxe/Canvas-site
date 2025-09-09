import { getNewsDetail } from "@/app/_libs/microcms";
import Article from "@/components/Article";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const data = await getNewsDetail(id);
  return <Article data={data} />;
}
