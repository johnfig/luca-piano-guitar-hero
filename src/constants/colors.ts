import { HitRating } from '@/types/game';

// 16-color cycling palette for dynamic lane counts
const COLOR_PALETTE = [
  '#ff3366',  // hot pink
  '#ff6633',  // orange
  '#ffcc00',  // yellow
  '#33ff66',  // green
  '#00ccff',  // cyan
  '#3366ff',  // blue
  '#9933ff',  // purple
  '#ff33cc',  // magenta
  '#ff9966',  // peach
  '#66ff99',  // mint
  '#6699ff',  // periwinkle
  '#cc66ff',  // lavender
  '#ffcc66',  // gold
  '#66ccff',  // sky
  '#ff66cc',  // rose
  '#99ff66',  // lime
];

const DIM_PALETTE = [
  '#661429',
  '#662914',
  '#665200',
  '#146629',
  '#005266',
  '#142966',
  '#3d1466',
  '#661452',
  '#663d29',
  '#296640',
  '#293d66',
  '#522966',
  '#665229',
  '#295266',
  '#662952',
  '#3d6629',
];

/**
 * Get lane color by index. Cycles through the palette for large lane counts.
 */
export function getLaneColor(laneIndex: number): string {
  return COLOR_PALETTE[laneIndex % COLOR_PALETTE.length];
}

/**
 * Get dim lane color by index.
 */
export function getLaneColorDim(laneIndex: number): string {
  return DIM_PALETTE[laneIndex % DIM_PALETTE.length];
}

export const HIT_RATING_COLORS: Record<HitRating, string> = {
  'PERFECT': '#ffdd00',
  'GREAT': '#00ff88',
  'GOOD': '#00aaff',
  'MISS': '#ff3333',
};

export const BG_COLOR = '#0a0a1a';
export const LANE_LINE_COLOR = 'rgba(255, 255, 255, 0.06)';
export const HIT_ZONE_COLOR = 'rgba(255, 255, 255, 0.15)';
export const CRESCENDO_COLOR = '#ffd700';
