import Hero from "@/components/Hero";
import Audience from "@/components/Audience/Audience";
import TopNews from "@/components/TopNews/TopNews";
import SectionSeparator from "@/components/SectionSeparator/SectionSeparator";

export default function Home() {
  return (
    <main>
      <Hero />
      <Audience />
      <TopNews />
      <SectionSeparator />

      {/* VISION セクションのプレースホルダー */}
      <section style={{ padding: '40px 20px', textAlign: 'center', backgroundColor: 'white' }}>
        <h2 style={{ fontSize: '2em', marginBottom: '20px' }}>VISION</h2>
        <p style={{ fontSize: '1.1em', color: '#555' }}>
          ここに「VISION」のコンテンツが入ります。
          詳細を教えていただければ、ここに再構築します。
        </p>
      </section>

      <SectionSeparator />

      {/* iroiro広島 の直書きコンテンツのプレースホルダー */}
      <section style={{ padding: '40px 20px', textAlign: 'center', backgroundColor: 'white' }}>
        <h2 style={{ fontSize: '2em', marginBottom: '20px' }}>iroiro広島</h2>
        <p style={{ fontSize: '1.1em', color: '#555' }}>
          ここに「iroiro広島」の元のコンテンツが入ります。
          詳細を教えていただければ、ここに再構築します。
        </p>
      </section>

      <SectionSeparator />
    </main>
  );
}