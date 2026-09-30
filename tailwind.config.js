import animate from 'tailwindcss-animate';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './index.tsx',
    './App.tsx',
    './constants.ts',
    './siteContent.ts',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          red: '#c94625',
          yellow: '#fdc939',
          beige: '#fde8c8',
          dark: '#2d2d2d',
        },
      },
      fontFamily: {
        // 拉丁字在前、中文在後：英數走 Inter，中文自動 fallback 到 Noto Sans TC
        sans: ['Inter', '"Noto Sans TC"', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        // 斜光掃過：前 1/3 個週期在走，後面留白等下一輪。
        // 不是每秒閃一次的跑馬燈，是每隔三秒才亮一次的那種。
        sheen: {
          '0%': { transform: 'translateX(-160%) skewX(-20deg)', opacity: '0' },
          '6%': { opacity: '1' },
          '30%': { transform: 'translateX(300%) skewX(-20deg)', opacity: '0' },
          '100%': { transform: 'translateX(300%) skewX(-20deg)', opacity: '0' },
        },
        // 框邊的呼吸光暈。
        // ⚠️ Tailwind 的 ring 也是用 box-shadow 實作的，這裡一旦直接寫
        // box-shadow 就會把 ring-2 整個蓋掉、紅框會在動畫期間消失（而且不報錯）。
        // 所以每一格都要自己把紅框和陰影一起畫出來。
        glow: {
          '0%, 100%': {
            boxShadow:
              '0 0 0 2px rgba(201, 70, 37, 0.35), 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 0 0 2px rgba(201, 70, 37, 0)',
          },
          '50%': {
            boxShadow:
              '0 0 0 2px rgba(201, 70, 37, 0.6), 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 0 0 8px rgba(201, 70, 37, 0.14)',
          },
        },
        // 跑馬燈：內容複製成兩份，跑到 -50% 剛好接回原點、看不出接縫。
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        /* 秒數在元件用 inline style 覆寫，讓每一排的 px/秒 一致 */
        marquee: 'marquee 40s linear infinite',
        sheen: 'sheen 3.2s ease-out infinite',
        glow: 'glow 2.6s ease-in-out infinite',
      },
    },
  },
  plugins: [animate],
};
