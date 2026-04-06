export type PianoKey = 'C4' | 'D4' | 'E4' | 'F4' | 'G4' | 'A4' | 'B4' | 'C5';

export type HitRating = 'PERFECT' | 'GREAT' | 'GOOD' | 'MISS';

export type GameState = 'MENU' | 'COUNTDOWN' | 'PLAYING' | 'PAUSED' | 'RESULTS';

export type Grade = 'S' | 'A' | 'B' | 'C' | 'D' | 'F';

export type Difficulty = 'Easy' | 'Medium' | 'Hard';

export interface SongNote {
  time: number;       // seconds from song start when note should be hit
  note: PianoKey;
  duration: number;   // seconds the note is held
}

export interface Song {
  id: string;
  title: string;
  artist: string;
  difficulty: Difficulty;
  bpm: number;
  notes: SongNote[];
}

export interface ActiveNote {
  id: number;
  songNote: SongNote;
  lane: number;
  y: number;          // current y position (0 = top, 1 = hit zone)
  height: number;     // visual height based on duration
  hit: boolean;
  hitRating?: HitRating;
  missed: boolean;
  opacity: number;
}

export interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  color: string;
  size: number;
}

export interface HitEffect {
  x: number;
  y: number;
  time: number;
  rating: HitRating;
  lane: number;
}

export interface GameStats {
  perfect: number;
  great: number;
  good: number;
  miss: number;
  maxCombo: number;
  score: number;
  totalNotes: number;
}

export interface HighScore {
  songId: string;
  score: number;
  grade: Grade;
  maxCombo: number;
  date: string;
}
