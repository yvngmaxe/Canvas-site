export function SectionHeader({
  label,
  title,
  description,
}: {
  label: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="relative z-[1] mb-0 w-full max-w-[1080px] px-4 sm:px-6 lg:px-0 mx-auto">
      {/* 小見出し(英語部分) */}
      <p
        className="text-sm md:text-base font-semibold tracking-[0.24em] uppercase"
        style={{
          color: "var(--accent, #e8002d)",
          // 英字のラベルは、ヒーローの英字と同じ書体
          fontFamily: "var(--font-cormorant), Georgia, serif",
        }}
      >
        {label}
      </p>

      {/* title + line (same row) */}
      <div className="mt-3 flex items-center gap-6">
        <h2
          className="text-3xl md:text-4xl font-bold tracking-[0.08em] leading-[1.05] text-gray-900 shrink-0"
          // 日本語の見出しは、ヒーローの和文と同じ明朝体
          style={{ fontFamily: 'var(--font-shippori), "Yu Mincho", serif' }}
        >
          {title}
        </h2>

        {/* line to the right */}
        <div className="h-px bg-gray-300 flex-1 -translate-y-2 sm:-translate-y-6" />
      </div>

      {description && (
        <p className="mt-4 text-base md:text-lg text-gray-600 max-w-2xl leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}
