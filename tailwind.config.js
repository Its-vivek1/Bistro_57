/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        b57: {
          cream: '#F5EBD7',
          creamSurface: '#FAF4E8',
          creamCard: '#FFFFFF',
          brown: '#3A241C',
          brownDark: '#1E120D',
          espresso: '#140C08',
          red: '#C83A2E',
          redDark: '#A0251B',
          orange: '#E67A18',
          orangeLight: '#F28C28',
          yellow: '#F5C542',
          pink: '#E62A8A',
          darkBg: '#151515',
          darkCard: '#1C1C1C',
          darkBorder: '#2E2E2E'
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
        display: ['Playfair Display', 'serif'],
        heading: ['Outfit', 'sans-serif'],
        handwritten: ['Caveat', 'cursive']
      },
      boxShadow: {
        'b57-sm': '0 2px 8px rgba(58, 36, 28, 0.08)',
        'b57-md': '0 8px 24px rgba(58, 36, 28, 0.12)',
        'b57-lg': '0 16px 36px rgba(58, 36, 28, 0.16)',
        'b57-glow': '0 0 30px rgba(242, 140, 40, 0.35)',
        'b57-gold': '0 0 25px rgba(245, 197, 66, 0.3)',
      }
    },
  },
  plugins: [],
}
