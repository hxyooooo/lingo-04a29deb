/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'qinghua-blue': '#177CB0',
        'ruyao-celadon': '#E6F4F1',
        'tang-color': '#F4A460',
        'heritage-gold': '#D4AF37',
        'ancient-bronze': '#8C7853',
        'ink-black': '#2C2C2C',
        'rice-white': '#F5F5DC',
        'vermilion': '#E34234',
        'bamboo-green': '#7BA05B',
        'plum-blossom-pink': '#E6B3A3',
        'ceramic-blue': '#2F4F4F',
        'sandalwood-yellow': '#F4C430'
      }
    },
  },
  plugins: [],
}