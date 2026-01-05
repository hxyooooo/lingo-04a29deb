/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'qinghua-blue': '#177CB0',      // 青花蓝 - 主色
        'ruyao-tianqing': '#E6F4F1',    // 汝窑天青 - 辅助色
        'tangse-amber': '#F4A460',      // 糖色 - 强调色
        'ink-grey': '#333333',          // 墨灰 - 正文色
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