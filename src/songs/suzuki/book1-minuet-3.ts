import { Song, SongNote, MidiNote } from '@/types/game';
import { beatsToSeconds } from '@/utils/beats';

const BPM = 104;
const b = (beat: number) => beatsToSeconds(beat, BPM);

// MIDI constants used
const C4 = 60, D4 = 62, E4 = 64, F4 = 65, G4 = 67, A4 = 69, B4 = 71, C5 = 72, D5 = 74, E5 = 76;

// Minuet 3 - J.S. Bach
// More complex minuet with faster runs and wider range
// 3/4 time, simplified for white keys
const melody: [number, MidiNote, number][] = [
  // Part 1
  // Bar 1: G  B  D5
  [0, G4, 1], [1, B4, 1], [2, D5, 1],
  // Bar 2: C5  A  B
  [3, C5, 1], [4, A4, 1], [5, B4, 1],
  // Bar 3: G  A  F
  [6, G4, 1], [7, A4, 1], [8, F4, 1],
  // Bar 4: G  D  E
  [9, G4, 1], [10, D4, 1], [11, E4, 1],
  // Bar 5: C  D  E  F  G  A (running scale)
  [12, C4, 0.5], [12.5, D4, 0.5], [13, E4, 0.5], [13.5, F4, 0.5],
  [14, G4, 0.5], [14.5, A4, 0.5],
  // Bar 6: B  C5  D5  E5  C5
  [15, B4, 0.5], [15.5, C5, 0.5], [16, D5, 0.5], [16.5, E5, 0.5], [17, C5, 1],
  // Bar 7: B  A  G  F  E  D
  [18, B4, 0.5], [18.5, A4, 0.5], [19, G4, 0.5], [19.5, F4, 0.5],
  [20, E4, 0.5], [20.5, D4, 0.5],
  // Bar 8: C ---
  [21, C4, 2],

  // Part 2
  // Bar 9: D5  E5  D5 | C5  B  C5
  [23, D5, 1], [24, E5, 0.5], [24.5, D5, 0.5], [25, C5, 1],
  [26, B4, 1], [27, C5, 0.5], [27.5, B4, 0.5],
  // Bar 10: A  B  A | G  F  G
  [28, A4, 1], [29, B4, 0.5], [29.5, A4, 0.5], [30, G4, 1],
  [31, F4, 0.5], [31.5, G4, 0.5],
  // Bar 11: A  G  F  E  D  E
  [32, A4, 0.5], [32.5, G4, 0.5], [33, F4, 0.5], [33.5, E4, 0.5],
  [34, D4, 0.5], [34.5, E4, 0.5],
  // Bar 12: F  E  D  C  B  C5
  [35, F4, 0.5], [35.5, E4, 0.5], [36, D4, 0.5], [36.5, C4, 0.5],
  [37, B4, 0.5], [37.5, C5, 0.5],
  // Bar 13: D5  C5  B  A  G  A
  [38, D5, 0.5], [38.5, C5, 0.5], [39, B4, 0.5], [39.5, A4, 0.5],
  [40, G4, 0.5], [40.5, A4, 0.5],
  // Bar 14: B  A  G  F  E  D
  [41, B4, 0.5], [41.5, A4, 0.5], [42, G4, 0.5], [42.5, F4, 0.5],
  [43, E4, 0.5], [43.5, D4, 0.5],
  // Bar 15: C ---
  [44, C4, 2],
];

const notes: SongNote[] = melody.map(([beat, note, dur]) => ({
  time: b(beat),
  note,
  duration: b(dur),
}));

export const minuet3: Song = {
  id: 'suzuki-minuet-3',
  title: 'Minuet 3',
  artist: 'J.S. Bach',
  difficulty: 'Hard',
  bpm: BPM,
  noteRange: { lowest: 60, highest: 76, whiteKeysOnly: true },
  notes,
};
