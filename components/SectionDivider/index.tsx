// components/SectionDivider.tsx
export default function SectionDivider() {
  return (
    <div className="w-full mx-auto my-20">
      <svg
        width="100%"
        height="16"
        viewBox="0 0 1440 16"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0 8 C 150 1, 300 15, 450 8 S 750 1, 900 8 S 1200 15, 1440 8"
          stroke="url(#grad1)"
          strokeWidth="6"
          vectorEffect="non-scaling-stroke"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          opacity="0.85"
        />
        <defs>
          <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FFB6C1" />
            <stop offset="50%" stopColor="#FFE4B5" />
            <stop offset="100%" stopColor="#B0E0E6" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
