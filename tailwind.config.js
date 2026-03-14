module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#ffffff",
        foreground: "#222222",
        accent: "#f20900",
      },
      keyframes: {
        "scroll-dot": {
          "0%": { transform: "translate(-50%, 0)", opacity: "0" },
          "20%": { opacity: "1" },
          "80%": { transform: "translate(-50%, 180%)", opacity: "1" },
          "100%": { transform: "translate(-50%, 220%)", opacity: "0" },
        },
      },
      animation: {
        "scroll-dot": "scroll-dot 1.8s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
