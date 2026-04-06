export interface Track {
  id: string;
  name: string;
  description: string;
  icon: string;           // emoji
  color: string;          // theme color
  levels: TrackLevel[];
}

export interface TrackLevel {
  levelNumber: number;
  songId: string;
  title: string;
  description: string;
  requiredStars: number;  // stars needed from previous levels to unlock (0 = always unlocked)
  xpReward: number;
  unlocksBadge?: string;  // badge ID earned on first completion
}
