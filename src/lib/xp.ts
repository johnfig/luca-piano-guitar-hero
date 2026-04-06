import { GameStats, Grade, Difficulty } from '@/types/game';

const BASE_XP: Record<Difficulty, number> = {
  Easy: 50,
  Medium: 100,
  Hard: 150,
};

const GRADE_BONUS: Record<Grade, number> = {
  S: 2.0,
  A: 1.5,
  B: 1.2,
  C: 1.0,
  D: 0.5,
  F: 0,
};

const FIRST_CLEAR_BONUS = 100;

export function calculateXPFromResult(
  stats: GameStats,
  grade: Grade,
  difficulty: Difficulty,
  isFirstClear: boolean,
): number {
  const base = BASE_XP[difficulty];
  const gradeMultiplier = GRADE_BONUS[grade];

  // Accuracy bonus: % of perfects * 50
  const perfectRatio = stats.totalNotes > 0 ? stats.perfect / stats.totalNotes : 0;
  const accuracyBonus = Math.floor(perfectRatio * 50);

  let xp = Math.floor(base * gradeMultiplier) + accuracyBonus;

  if (isFirstClear) {
    xp += FIRST_CLEAR_BONUS;
  }

  return Math.max(0, xp);
}
