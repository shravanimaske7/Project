import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        command: {
          dark: "#0a0f1d",
          panel: "#0f172a",
          card: "rgba(15, 23, 42, 0.85)",
          border: "#1e293b",
          accent: "#38bdf8",
          water: "#06b6d4",
          warning: "#f59e0b",
          danger: "#ef4444",
          safe: "#10b981",
        },
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "radar-ping": "radarPing 2s cubic-bezier(0, 0, 0.2, 1) infinite",
        "flow-dash": "flowDash 1.5s linear infinite",
      },
      keyframes: {
        radarPing: {
          "75%, 100%": {
            transform: "scale(2.5)",
            opacity: "0",
          },
        },
        flowDash: {
          to: {
            strokeDashoffset: "-20",
          },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "glass-gradient":
          "linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.01) 100%)",
      },
    },
  },
  plugins: [],
};
export default config;
