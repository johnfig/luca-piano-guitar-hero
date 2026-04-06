import { HitRating, Grade } from '@/types/game';

export const HIT_WINDOWS: Record<Exclude<HitRating, 'MISS'>, number> = {
  'PERFECT': 0.05,  // +/- 50ms
  'GREAT': 0.10,    // +/- 100ms
  'GOOD': 0.15,     // +/- 150ms
};

export const HIT_POINTS: Record<HitRating, number> = {
  'PERFECT': 300,
  'GREAT': 200,
  'GOOD': 100,
  'MISS': 0,
};

export const COMBO_MULTIPLIER_THRESHOLDS = [
  { combo: 0, multiplier: 1 },
  { combo: 10, multiplier: 2 },
  { combo: 30, multiplier: 3 },
  { combo: 50, multiplier: 4 },
];

export const CRESCENDO_PERFECTS_NEEDED = 10;
export const CRESCENDO_DURATION = 10; // seconds
export const CRESCENDO_MULTIPLIER_BONUS = 2; // doubles current multiplier

export const GRADE_THRESHOLDS: { min: number; grade: Grade }[] = [
  { min: 0.95, grade: 'S' },
  { min: 0.90, grade: 'A' },
  { min: 0.80, grade: 'B' },
  { min: 0.70, grade: 'C' },
  { min: 0.60, grade: 'D' },
  { min: 0, grade: 'F' },
];
