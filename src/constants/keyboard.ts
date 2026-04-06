import { PianoKey } from '@/types/game';

export const KEY_MAP: Record<string, PianoKey> = {
  'a': 'C4',
  's': 'D4',
  'd': 'E4',
  'f': 'F4',
  'j': 'G4',
  'k': 'A4',
  'l': 'B4',
  ';': 'C5',
};

export const NOTE_TO_LANE: Record<PianoKey, number> = {
  'C4': 0,
  'D4': 1,
  'E4': 2,
  'F4': 3,
  'G4': 4,
  'A4': 5,
  'B4': 6,
  'C5': 7,
};

export const LANE_TO_NOTE: PianoKey[] = ['C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4', 'C5'];

export const NOTE_FREQUENCIES: Record<PianoKey, number> = {
  'C4': 261.63,
  'D4': 293.66,
  'E4': 329.63,
  'F4': 349.23,
  'G4': 392.00,
  'A4': 440.00,
  'B4': 493.88,
  'C5': 523.25,
};

export const KEY_LABELS: Record<PianoKey, string> = {
  'C4': 'A',
  'D4': 'S',
  'E4': 'D',
  'F4': 'F',
  'G4': 'J',
  'A4': 'K',
  'B4': 'L',
  'C5': ';',
};

export const TOTAL_LANES = 8;
