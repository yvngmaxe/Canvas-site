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
    <div className="mb-16 pl-6 pr-6 sm:pl-12 sm:pr-12">
      {/* 小見出し(英語部分) */}
      <p
        className="text-xs md:text-sm font-semibold tracking-[0.22em] uppercase"
        style={{ color: "var(--accent, #f20900)" }}
      >
        {label}
      </p>

      {/* title + line (same row) */}
      <div className="mt-4 flex items-center gap-8">
        <h2 className="text-4xl md:text-6xl font-semibold tracking-tight leading-[1.05] text-gray-900 shrink-0">
          {title}
        </h2>

        {/* line to the right */}
        <div className="h-px bg-gray-300 flex-1 -translate-y-3 sm:-translate-y-8" />
      </div>

      {description && (
        <p className="mt-6 text-base md:text-lg text-gray-600 max-w-2xl leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}
