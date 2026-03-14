export function ScrollIndicator() {
  return (
    <div
      className="
          pointer-events-none
          absolute bottom-6 left-1/2 -translate-x-1/2
          flex flex-col items-center
          text-white/70
          select-none
          sm:bottom-8
        "
      aria-hidden="true"
    >
      <span
        className="
            text-[10px] sm:text-[11px]
            font-light tracking-[0.35em]
            uppercase
          "
      >
        Scroll
      </span>

      <div
        className="
            relative mt-3
            h-12 w-px sm:h-14
            overflow-hidden
            bg-white/25
          "
      >
        <span
          className="
              absolute left-1/2 top-0
              h-2 w-2 -translate-x-1/2 rounded-full
              bg-white/75
              animate-scroll-dot
            "
        />
      </div>
    </div>
  );
}
