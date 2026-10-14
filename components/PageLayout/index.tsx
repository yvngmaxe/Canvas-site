import type { ReactNode } from 'react';
import DecoCircles from '@/components/DecoCircles';

interface PageLayoutProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
  topPadding?: 'default' | 'compact' | 'none';
  preDivider?: ReactNode; // 区切り線の上に挿入する任意コンテンツ
  decorated?: boolean | 'compact'; // 背景に丸とCANVASの文字を散らす（短いページは compact）
}

export default function PageLayout({ title, subtitle, children, topPadding = 'default', preDivider, decorated = false }: PageLayoutProps) {
  const topPadClass = topPadding === 'none'
    ? 'pt-0 sm:pt-0'
    : topPadding === 'compact'
    ? 'pt-16 sm:pt-20'
    : 'pt-28 sm:pt-32';
  const content = (
    <main className={`${decorated ? 'relative z-[1] ' : ''}mx-auto max-w-screen-lg px-4 ${topPadClass} pb-10 sm:pb-16`}>
      <div className="text-center">
        {/* 英字のタイトルはヒーローの「Learning, Connected.」と同じ書体（斜体）、日本語は明朝体 */}
        <h1
          className="text-4xl font-semibold italic tracking-[0.02em] sm:text-5xl"
          style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}
        >
          {title}
        </h1>
        {subtitle && (
          <p
            className="mt-4 text-lg tracking-[0.16em] text-foreground/80"
            style={{ fontFamily: 'var(--font-shippori), "Yu Mincho", serif' }}
          >
            {subtitle}
          </p>
        )}
      </div>

      {preDivider && (
        <div className="mt-6">
          {preDivider}
        </div>
      )}

      <div className={`${preDivider ? 'mt-4' : 'mt-12'} border-t border-gray-200 pt-8`}>
        {children}
      </div>
    </main>
  );

  if (!decorated) return content;

  // 飾りは画面幅いっぱいに広げ、本文（main）より奥に置く
  return (
    <div className="relative isolate">
      {content}
      <DecoCircles variant={decorated === true ? 'page' : decorated} />
    </div>
  );
}
