import { getNewsDetail } from "@/app/_libs/microcms";
import Article from "@/components/Article";

type Props = {
  params: {
    id: string;
  };
};

export default async function Page({ params }: Props) {
  const data = await getNewsDetail(params.id);

  return <Article data={data} />;
}