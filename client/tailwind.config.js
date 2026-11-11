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
          // Light luxury palette
          bg:       '#F8F5EF',       // Primary background — warm ivory
          alt:      '#EDE4D6',       // Alternate sections — champagne cream
          card:     '#FFFDFA',       // Card surfaces
          text:     '#332D29',       // Primary text — warm near-black
          sub:      '#746A60',       // Secondary text — warm taupe
          border:   '#DDD3C4',       // Subtle dividers
          gold:     '#B79A65',       // Accent gold
          'gold-light': '#CDB98A',   // Lighter gold
          'gold-dark':  '#9A7F4B',   // Deeper gold

          // Keep legacy tokens for any still-used dark components (carousel, etc.)
          dark:     '#111111',
          charcoal: '#181818',
          surface:  '#1E1E1E',
          ivory:    '#F5F0E8',
          cream:    '#EDE4D4',
          muted:    '#8E8E8E',
        }
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans:  ['"Outfit"', 'Inter', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        eyebrow: '0.25em',
        widest:  '0.3em',
      },
      boxShadow: {
        'card-light': '0 2px 12px rgba(51,45,41,0.06), 0 1px 3px rgba(51,45,41,0.04)',
        'card-hover': '0 8px 30px rgba(51,45,41,0.10), 0 2px 8px rgba(51,45,41,0.06)',
        'gold-sm':    '0 2px 8px rgba(183,154,101,0.18)',
        'gold-md':    '0 4px 18px rgba(183,154,101,0.25)',
      },
    },
  },
  plugins: [],
}
