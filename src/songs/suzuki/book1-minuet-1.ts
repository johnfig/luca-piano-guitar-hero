import { Song, SongNote, MidiNote } from '@/types/game';
import { beatsToSeconds } from '@/utils/beats';

const BPM = 108;
const b = (beat: number) => beatsToSeconds(beat, BPM);

// MIDI constants used
const C4 = 60, D4 = 62, E4 = 64, F4 = 65, G4 = 67, A4 = 69, B4 = 71, C5 = 72, D5 = 74, E5 = 76;

// Minuet in G Major (BWV Anh. 114) - attributed to Christian Petzold
// The most famous "Bach" minuet from Suzuki Book 1
// 3/4 time - beats are in groups of 3
// Simplified for white keys
const melody: [number, MidiNote, number][] = [
  // Bar 1: D  G  A  (pickup + beat 1-2-3 of bar 1)
  [0, D4, 1], [1, G4, 1], [2, A4, 1],
  // Bar 2: B  C5  D5
  [3, B4, 1], [4, C5, 1], [5, D5, 1],
  // Bar 3: G  G  (half + quarter)
  [6, G4, 2], [8, G4, 1],
  // Bar 4: E  C5  D5  E5  D5
  [9, E4, 0.5], [9.5, C5, 0.5], [10, D5, 0.5], [10.5, E5, 0.5], [11, D5, 1],
  // Bar 5: C5  B  A  G
  [12, C5, 1], [13, B4, 1], [14, A4, 1],
  // Bar 6: B  A  G  F
  [15, B4, 0.5], [15.5, A4, 0.5], [16, G4, 1], [17, F4, 1],
  // Bar 7: G  A  G  F  E
  [18, G4, 0.5], [18.5, A4, 0.5], [19, G4, 0.5], [19.5, F4, 0.5], [20, E4, 1],
  // Bar 8: D  E  C  D  B4
  [21, D4, 0.5], [21.5, E4, 0.5], [22, C4, 0.5], [22.5, D4, 0.5], [23, B4, 1],
  // Bar 9: A  B  G  (resolution)
  [24, A4, 1], [25, B4, 0.5], [25.5, A4, 0.5], [26, G4, 2],

  // Part 2 (second half of minuet)
  // Bar 10: B  G  A  B
  [28, B4, 1], [29, G4, 1], [30, A4, 1],
  // Bar 11: B  C5  B  A
  [31, B4, 1], [32, C5, 1], [33, B4, 0.5], [33.5, A4, 0.5],
  // Bar 12: G  A  B  A  G
  [34, G4, 0.5], [34.5, A4, 0.5], [35, B4, 0.5], [35.5, A4, 0.5], [36, G4, 1],
  // Bar 13: F  G  A  G  F  E
  [37, F4, 0.5], [37.5, G4, 0.5], [38, A4, 0.5], [38.5, G4, 0.5], [39, F4, 0.5], [39.5, E4, 0.5],
  // Bar 14: D  G  B  D5
  [40, D4, 1], [41, G4, 1], [42, B4, 1],
  // Bar 15: C5  B  A  B  A  G
  [43, C5, 0.5], [43.5, B4, 0.5], [44, A4, 0.5], [44.5, B4, 0.5], [45, A4, 0.5], [45.5, G4, 0.5],
  // Bar 16: final G
  [46, G4, 2],
];

const notes: SongNote[] = melody.map(([beat, note, dur]) => ({
  time: b(beat),
  note,
  duration: b(dur),
}));

export const minuet1: Song = {
  id: 'suzuki-minuet-1',
  title: 'Minuet 1 in G',
  artist: 'J.S. Bach',
  difficulty: 'Medium',
  bpm: BPM,
  noteRange: { lowest: 60, highest: 76, whiteKeysOnly: true },
  notes,
};
