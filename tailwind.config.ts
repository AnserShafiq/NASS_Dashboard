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
        shadow:{
          '1':'var(--box-shadow-one)',
        },
        red:{
          '200':'var(--button-bg-red)'
        }
      },
      backgroundImage:{
        'home':"url('/images/home.jpg')",
        sidebar2: 'var(--sidebar-2)',
      },
      width:{
        sidebar: '16.5vw',
        dashboard: '83.5vw',
      }
    },
  },
  plugins: [],
} satisfies Config;
