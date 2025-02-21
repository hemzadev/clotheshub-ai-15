
import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "#2f57bd",
        input: "#2f57bd",
        ring: "#0047ff",
        background: "#1c202b",
        foreground: "#ffffff",
        primary: {
          DEFAULT: "#0047ff",
          foreground: "#ffffff",
        },
        secondary: {
          DEFAULT: "#2f57bd",
          foreground: "#ffffff",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "#ffffff",
        },
        muted: {
          DEFAULT: "#2f57bd",
          foreground: "#ffffff",
        },
        accent: {
          DEFAULT: "#8babfd",
          foreground: "#1c202b",
        },
        popover: {
          DEFAULT: "#1c202b",
          foreground: "#ffffff",
        },
        card: {
          DEFAULT: "#1c202b",
          foreground: "#ffffff",
        },
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        fadeIn: {
          from: { opacity: "0", transform: "translateY(10px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        slideIn: {
          from: { transform: "translateX(-100%)" },
          to: { transform: "translateX(0)" },
        },
        glow: {
          '0%, 100%': { 
            boxShadow: '0 0 15px #0047ff',
            transform: 'scale(1)'
          },
          '50%': { 
            boxShadow: '0 0 30px #0047ff',
            transform: 'scale(1.05)'
          }
        },
        popIn: {
          '0%': { 
            opacity: '0',
            filter: 'blur(10px)',
            transform: 'scale(0.95)'
          },
          '100%': { 
            opacity: '1',
            filter: 'blur(0px)',
            transform: 'scale(1)'
          }
        }
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        fadeIn: "fadeIn 0.5s ease-out forwards",
        slideIn: "slideIn 0.3s ease-out forwards",
        glow: "glow 2s ease-in-out infinite",
        popIn: "popIn 0.25s ease-out forwards"
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
