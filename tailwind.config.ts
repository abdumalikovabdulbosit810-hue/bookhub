import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";

const config: Config = {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: "hsl(var(--card))",
        "card-foreground": "hsl(var(--card-foreground))",
        muted: "hsl(var(--muted))",
        "muted-foreground": "hsl(var(--muted-foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))"
        },
        success: "#10B981",
        warning: "#F59E0B",
        danger: "#EF4444"
      },
      borderRadius: {
        sm: "4px",
        md: "6px",
        lg: "8px",
        xl: "12px"
      },
      boxShadow: {
        soft: "0 14px 40px rgba(15, 23, 42, 0.10)",
        premium: "0 24px 80px rgba(76, 29, 149, 0.18)",
        glow: "0 0 0 1px rgba(109, 40, 217, 0.12), 0 18px 70px rgba(109, 40, 217, 0.24)"
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" }
        }
      },
      animation: {
        float: "float 4s ease-in-out infinite"
      }
    }
  },
  plugins: [animate]
};

export default config;
