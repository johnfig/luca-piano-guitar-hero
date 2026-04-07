import { Song, SongNote, MidiNote } from '@/types/game';
import { beatsToSeconds } from '@/utils/beats';

const BPM = 90;
const b = (beat: number) => beatsToSeconds(beat, BPM);

const C4 = 60, D4 = 62, E4 = 64, G4 = 67;

// Lightly Row — classic beginner piece, 4 notes (C D E G)
const melody: [number, MidiNote, number][] = [
  // Part A: "Light-ly row, light-ly row"
  [0, E4, 1], [1, D4, 1], [2, C4, 1], [3, D4, 1],
  [4, E4, 1], [5, E4, 1], [6, E4, 2],
  // "O'er the deep blue sea"
  [8, D4, 1], [9, D4, 1], [10, D4, 2],
  // "Sing and float, sing and float"
  [12, E4, 1], [13, G4, 1], [14, G4, 2],

  // Part B: "Light-ly row, light-ly row"
  [16, E4, 1], [17, D4, 1], [18, C4, 1], [19, D4, 1],
  [20, E4, 1], [21, E4, 1], [22, E4, 1], [23, E4, 1],
  // "O'er the deep blue sea"
  [24, D4, 1], [25, D4, 1], [26, E4, 1], [27, D4, 1],
  [28, C4, 3],
];

const notes: SongNote[] = melody.map(([beat, note, dur]) => ({
  time: b(beat),
  note,
  duration: b(dur),
}));

export const lightlyRow: Song = {
  id: 'beginner-lightly-row',
  title: 'Lightly Row',
  artist: 'Traditional',
  difficulty: 'Easy',
  bpm: BPM,
  noteRange: { lowest: 60, highest: 67, whiteKeysOnly: true },
  notes,
};
