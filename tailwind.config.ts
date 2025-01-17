import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        sidebar: 'var(--sidebar)',

        red:{
          '200':'var(--button-bg-red)'
        }
      },
      backgroundImage:{
        'home':"url('/images/home.jpg')",
        sidebar2: 'var(--sidebar-2)',
      }
    },
  },
  plugins: [],
} satisfies Config;
