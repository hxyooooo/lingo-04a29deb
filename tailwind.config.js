/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'qinghua-blue': '#4A90E2',
        'qianqing-blue': '#87CEEB',
        'danhe-color': '#D2691E',
        'qiansong-green': '#98FB98',
        'miyellow': '#F5DEB3',
        'ancient-paper': '#FDF5E6'
      }
    },
  },
  plugins: [],
}