import type { ReactNode } from 'react';

interface PageLayoutProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
  topPadding?: 'default' | 'compact' | 'none';
}

export default function PageLayout({ title, subtitle, children, topPadding = 'default' }: PageLayoutProps) {
  const topPadClass = topPadding === 'none'
    ? 'pt-0 sm:pt-0'
    : topPadding === 'compact'
    ? 'pt-16 sm:pt-20'
    : 'pt-28 sm:pt-32';
  return (
    <main className={`mx-auto max-w-screen-lg px-4 ${topPadClass} pb-10 sm:pb-16`}>
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{title}</h1>
        {subtitle && (
          <p className="mt-4 text-lg text-foreground/80">
            {subtitle}
          </p>
        )}
      </div>

      <div className="mt-12 border-t border-gray-200 pt-8">
        {children}
      </div>
    </main>
  );
}
