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
    <div className="mb-10 px-8 sm:px-16">
      {/* 小見出し(英語部分) */}
      <p
        className="text-xs md:text-sm font-semibold tracking-[0.22em] uppercase"
        style={{ color: "var(--accent, #f20900)" }}
      >
        {label}
      </p>

      {/* title + line (same row) */}
      <div className="mt-3 flex items-center gap-6">
        <h2 className="text-4xl md:text-6xl font-semibold tracking-tight leading-[1.05] text-gray-900 shrink-0">
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
