import { PianoKey, HitRating } from '@/types/game';

export const LANE_COLORS: Record<PianoKey, string> = {
  'C4': '#ff3366',  // hot pink
  'D4': '#ff6633',  // orange
  'E4': '#ffcc00',  // yellow
  'F4': '#33ff66',  // green
  'G4': '#00ccff',  // cyan
  'A4': '#3366ff',  // blue
  'B4': '#9933ff',  // purple
  'C5': '#ff33cc',  // magenta
};

export const LANE_COLORS_DIM: Record<PianoKey, string> = {
  'C4': '#661429',
  'D4': '#662914',
  'E4': '#665200',
  'F4': '#146629',
  'G4': '#005266',
  'A4': '#142966',
  'B4': '#3d1466',
  'C5': '#661452',
};

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
