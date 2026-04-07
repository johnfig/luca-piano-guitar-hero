import { Song, SongNote, MidiNote } from '@/types/game';
import { beatsToSeconds } from '@/utils/beats';

const BPM = 104;
const b = (beat: number) => beatsToSeconds(beat, BPM);

// Minuet 3 - J.S. Bach (BWV Anh. 116)
// More complex minuet with faster runs and wider range
// G major (F#), 3/4 time

// Right hand MIDI constants
const G3 = 55, A3 = 57, B3 = 59, C4 = 60, D4 = 62, E4 = 64, Fs4 = 66, G4 = 67, A4 = 69, B4 = 71;

// Left hand MIDI constants
const G2 = 43, A2 = 45, B2 = 47, C3 = 48, D3 = 50, E3 = 52;

// ===== RIGHT HAND (authentic G major melody with F#) =====
const rightHand: [number, MidiNote, number][] = [
  // Part 1
  // Bar 1: D4  F#4  A4
  [0, D4, 1], [1, Fs4, 1], [2, A4, 1],
  // Bar 2: G4  E4  F#4
  [3, G4, 1], [4, E4, 1], [5, Fs4, 1],
  // Bar 3: D4  E4  C4
  [6, D4, 1], [7, E4, 1], [8, C4, 1],
  // Bar 4: D4  A3  B3
  [9, D4, 1], [10, A3, 1], [11, B3, 1],
  // Bar 5: G3  A3  B3  C4  D4  E4 (running scale)
  [12, G3, 0.5], [12.5, A3, 0.5], [13, B3, 0.5], [13.5, C4, 0.5],
  [14, D4, 0.5], [14.5, E4, 0.5],
  // Bar 6: F#4  G4  A4  B4  G4
  [15, Fs4, 0.5], [15.5, G4, 0.5], [16, A4, 0.5], [16.5, B4, 0.5], [17, G4, 1],
  // Bar 7: F#4  E4  D4  C4  B3  A3
  [18, Fs4, 0.5], [18.5, E4, 0.5], [19, D4, 0.5], [19.5, C4, 0.5],
  [20, B3, 0.5], [20.5, A3, 0.5],
  // Bar 8: G3 ---
  [21, G3, 2],

  // Part 2
  // Bar 9: A4  B4  A4 | G4  F#4  G4
  [23, A4, 1], [24, B4, 0.5], [24.5, A4, 0.5], [25, G4, 1],
  [26, Fs4, 1], [27, G4, 0.5], [27.5, Fs4, 0.5],
  // Bar 10: E4  F#4  E4 | D4  C4  D4
  [28, E4, 1], [29, Fs4, 0.5], [29.5, E4, 0.5], [30, D4, 1],
  [31, C4, 0.5], [31.5, D4, 0.5],
  // Bar 11: E4  D4  C4  B3  A3  B3
  [32, E4, 0.5], [32.5, D4, 0.5], [33, C4, 0.5], [33.5, B3, 0.5],
  [34, A3, 0.5], [34.5, B3, 0.5],
  // Bar 12: C4  B3  A3  G3  F#4  G4
  [35, C4, 0.5], [35.5, B3, 0.5], [36, A3, 0.5], [36.5, G3, 0.5],
  [37, Fs4, 0.5], [37.5, G4, 0.5],
  // Bar 13: A4  G4  F#4  E4  D4  E4
  [38, A4, 0.5], [38.5, G4, 0.5], [39, Fs4, 0.5], [39.5, E4, 0.5],
  [40, D4, 0.5], [40.5, E4, 0.5],
  // Bar 14: F#4  E4  D4  C4  B3  A3
  [41, Fs4, 0.5], [41.5, E4, 0.5], [42, D4, 0.5], [42.5, C4, 0.5],
  [43, B3, 0.5], [43.5, A3, 0.5],
  // Bar 15: G3 ---
  [44, G3, 2],
];

// ===== LEFT HAND (authentic walking bass in G major, 3/4 time) =====
// Based on Bach's original bass line from BWV Anh. 116
const leftHand: [number, MidiNote, number][] = [
  // Part 1
  // m1: D3 dotted half
  [0, D3, 3],
  // m2: E3  C3  D3 (quarter notes)
  [3, E3, 1], [4, C3, 1], [5, D3, 1],
  // m3: B2  C3  A2 (quarter notes)
  [6, B2, 1], [7, C3, 1], [8, A2, 1],
  // m4: D3 dotted half
  [9, D3, 3],
  // m5: G2 dotted half
  [12, G2, 3],
  // m6: D3 dotted half
  [15, D3, 3],
  // m7: D3 half + G2 quarter
  [18, D3, 2], [20, G2, 1],
  // m8: G2 dotted half (held to fill bar)
  [21, G2, 2],

  // Part 2
  // m9: D3  C3  B2 (descending quarter notes)
  [23, D3, 1], [24, C3, 1], [25, B2, 1],
  // m10: C3  D3  C3 (quarter notes)
  [26, C3, 1], [27, D3, 1], [28, C3, 1],
  // m11: A2  B2  C3 (ascending quarter notes)
  [29, A2, 1], [30, B2, 1], [31, C3, 1],
  // m12: D3  C3  B2 (descending quarter notes)
  [32, D3, 1], [33, C3, 1], [34, B2, 1],
  // m13: D3 dotted half
  [35, D3, 3],
  // m14: D3 half + G2 quarter
  [38, D3, 2], [40, G2, 1],
  // m15: G2 dotted half (held to fill bar)
  [41, G2, 2],
];

const notes: SongNote[] = rightHand.map(([beat, note, dur]) => ({
  time: b(beat), note, duration: b(dur),
}));

const bothHands = [...rightHand, ...leftHand].sort((a, b) => a[0] - b[0]);
const pianoNotes: SongNote[] = bothHands.map(([beat, note, dur]) => ({
  time: b(beat), note, duration: b(dur),
}));

export const minuet3: Song = {
  id: 'suzuki-minuet-3',
  title: 'Minuet 3',
  artist: 'J.S. Bach',
  difficulty: 'Hard',
  bpm: BPM,
  noteRange: { lowest: 55, highest: 71, whiteKeysOnly: false },
  notes,
  pianoNotes,
  pianoNoteRange: { lowest: 43, highest: 71, whiteKeysOnly: false },
};
