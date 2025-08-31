import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="flex items-center justify-center min-h-[calc(100vh-200px)] px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        <p className="text-base font-semibold text-accent">404</p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-5xl">
          ページが見つかりません
        </h1>
        <p className="mt-6 text-base leading-7 text-foreground/80">
          申し訳ありませんが、お探しのページは存在しないようです。
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link
            href="/"
            className="rounded-md bg-accent px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-accent/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            トップページに戻る
          </Link>
        </div>
      </div>
    </main>
  );
}
