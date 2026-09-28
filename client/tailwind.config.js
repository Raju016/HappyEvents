/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: '#111111',
          charcoal: '#181818',
          surface: '#1E1E1E',
          border: 'rgba(201, 164, 92, 0.2)',
          ivory: '#F5F0E8',
          cream: '#EDE4D4',
          gold: {
            DEFAULT: '#C9A45C',
            light: '#DFC07F',
            dark: '#A6823B',
            muted: 'rgba(201, 164, 92, 0.15)',
          },
          muted: '#8E8E8E',
        }
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"Outfit"', 'Inter', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        eyebrow: '0.25em',
        widest: '0.3em',
      }
    },
  },
  plugins: [],
}
