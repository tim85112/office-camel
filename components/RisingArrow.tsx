import React, { useId } from 'react';

interface RisingArrowProps {
  /** 同一排有好幾顆時錯開一點，避免整排同步像機器 */
  delayMs?: number;
}

/**
 * 數字旁邊那顆「還在往上長」的箭頭。
 *
 * 做法：一個剛好一顆箭頭高的窗，裡面直排兩顆一模一樣的箭頭，
 * 整條往上推半格就剛好換成第二顆、看不出接縫，然後無限循環。
 * 每圈先停一下讓人看清楚，再加速往上衝出去、下一顆從底下滑進來。
 *
 * 尾巴是往下淡掉的漸層，所以就算停住也看得出是「往上衝」的方向。
 * 刻意不加底框：加了框就變成 ⬆️ 那種 emoji 鍵帽（2026-11-03 並排比過）。
 * 尺寸全用 em，跟著數字字級走；關掉動態效果偏好時停在第一顆、照樣看得懂。
 */
const RisingArrow: React.FC<RisingArrowProps> = ({ delayMs = 0 }) => {
  // React 的 useId 可能帶冒號或特殊括號，放進 url(#…) 會失效，先洗成安全字元
  const baseId = useId().replace(/[^a-zA-Z0-9_-]/g, '');

  return (
    <span
      aria-hidden="true"
      className="relative ml-1.5 inline-block h-[1em] w-[0.6em] shrink-0 overflow-hidden [mask-image:linear-gradient(to_top,transparent,#000_25%,#000_90%,transparent)]"
    >
      <span
        className="absolute inset-x-0 top-0 flex flex-col animate-climb motion-reduce:animate-none"
        style={delayMs ? { animationDelay: `${delayMs}ms` } : undefined}
      >
        <ArrowGlyph gradientId={`${baseId}-a`} />
        <ArrowGlyph gradientId={`${baseId}-b`} />
      </span>
    </span>
  );
};

/** 實心圓角三角箭頭＋往下淡掉的粗尾巴（品牌紅 → 橘 → 透明黃），跟特粗數字的筆畫份量對得上 */
const ArrowGlyph: React.FC<{ gradientId: string }> = ({ gradientId }) => (
  <svg viewBox="0 0 24 40" className="block h-[1em] w-[0.6em]" fill="none">
    <defs>
      <linearGradient id={gradientId} gradientUnits="userSpaceOnUse" x1="0" y1="12" x2="0" y2="39">
        <stop offset="0" stopColor="#c94625" />
        <stop offset="0.45" stopColor="#e46a2f" stopOpacity="0.6" />
        <stop offset="1" stopColor="#fdc939" stopOpacity="0" />
      </linearGradient>
    </defs>
    <rect x="8.6" y="12" width="6.8" height="27" rx="3.4" fill={`url(#${gradientId})`} />
    <path d="M12 4.5 20.5 16.2H3.5Z" fill="#c94625" stroke="#c94625" strokeWidth="2.6" strokeLinejoin="round" />
  </svg>
);

export default RisingArrow;
