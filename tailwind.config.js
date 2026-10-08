/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        eco: {
          primary: '#16A34A',
          dark: '#166534',
          lime: '#84CC16',
          bg: '#F7FAF7',
          surface: '#FFFFFF',
          text: '#17231A',
          muted: '#647067',
          border: '#E3ECE4',
          subtle: '#EEF5EF',
          card: '#FFFFFF',
          gold: '#F59E0B',
          sky: '#0284C7',
          coral: '#F43F5E',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        display: ['"Outfit"', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'eco-sm': '0 2px 8px -2px rgba(22, 101, 52, 0.08), 0 1px 4px -1px rgba(22, 101, 52, 0.04)',
        'eco': '0 10px 25px -5px rgba(22, 101, 52, 0.08), 0 8px 10px -6px rgba(22, 101, 52, 0.04)',
        'eco-lg': '0 20px 35px -10px rgba(22, 101, 52, 0.12), 0 10px 20px -5px rgba(22, 101, 52, 0.06)',
        'eco-glow': '0 0 25px -3px rgba(132, 204, 22, 0.35)',
        'emerald-glow': '0 0 30px -5px rgba(22, 163, 74, 0.3)',
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.25rem',
        '3xl': '1.75rem',
      }
    },
  },
  plugins: [],
}
