import { Song, SongNote, MidiNote } from '@/types/game';
import { beatsToSeconds } from '@/utils/beats';

const BPM = 100;
const b = (beat: number) => beatsToSeconds(beat, BPM);

// Minuet 2 in G minor (BWV Anh. 115) - attributed to Christian Petzold
// Companion to Minuet 1 - G minor (Bb, Eb, raised 7th F#)
// 3/4 time

// Right hand MIDI constants
const A3 = 57, Bb3 = 58, C4 = 60, D4 = 62, Eb4 = 63, Fs4 = 66, G4 = 67, A4 = 69, Bb4 = 70;

// Left hand MIDI constants
const G2 = 43, A2 = 45, Bb2 = 46, C3 = 48, D3 = 50, Eb3 = 51, Fs3 = 54, G3 = 55;

// ===== RIGHT HAND (authentic G minor melody) =====
const rightHand: [number, MidiNote, number][] = [
  // Part 1
  // Bar 1: Eb4  F#4  G4
  [0, Eb4, 1], [1, Fs4, 1], [2, G4, 1],
  // Bar 2: A4  Bb4  G4
  [3, A4, 1.5], [4.5, Bb4, 0.5], [5, G4, 1],
  // Bar 3: F#4  Eb4  D4
  [6, Fs4, 1], [7, Eb4, 1], [8, D4, 1],
  // Bar 4: Eb4  F#4  G4  A4 ---
  [9, Eb4, 1], [10, Fs4, 1], [11, G4, 1],
  [12, A4, 2], [14, A4, 1],
  // Bar 5-6: Bb4  A4  G4 | F#4  Eb4  D4
  [15, Bb4, 1], [16, A4, 1], [17, G4, 1],
  [18, Fs4, 1], [19, Eb4, 1], [20, D4, 1],
  // Bar 7-8: C4  Bb3  A3 | Bb3  C4  D4  Eb4 ---
  [21, C4, 1], [22, Bb3, 1], [23, A3, 1],
  [24, Bb3, 0.5], [24.5, C4, 0.5], [25, D4, 1], [26, Eb4, 2],

  // Part 2
  // Bar 9: A4  G4  F#4
  [28, A4, 1], [29, G4, 1], [30, Fs4, 1],
  // Bar 10: Eb4  D4  Eb4
  [31, Eb4, 1], [32, D4, 1], [33, Eb4, 1],
  // Bar 11: F#4  G4  A4
  [34, Fs4, 1], [35, G4, 1], [36, A4, 1],
  // Bar 12: Bb4  A4  G4  F#4  Eb4
  [37, Bb4, 1], [38, A4, 0.5], [38.5, G4, 0.5], [39, Fs4, 0.5], [39.5, Eb4, 0.5],
  // Bar 13: D4  Eb4  F#4
  [40, D4, 1], [41, Eb4, 1], [42, Fs4, 1],
  // Bar 14: Eb4  F#4  Eb4  D4 ---
  [43, Eb4, 0.5], [43.5, Fs4, 0.5], [44, Eb4, 1], [45, D4, 2],
];

// ===== LEFT HAND (authentic walking bass in G minor, 3/4 time) =====
// Based on Petzold's original bass line from BWV Anh. 115
const leftHand: [number, MidiNote, number][] = [
  // Part 1
  // m1: G3 dotted half
  [0, G3, 3],
  // m2: D3 dotted half
  [3, D3, 3],
  // m3: G3  A3  Bb3 (ascending quarter notes)
  [6, G3, 1], [7, A3, 1], [8, Bb3, 1],
  // m4: C3 dotted half
  [9, C3, 3],
  // m5: D3 dotted half
  [12, D3, 3],
  // m6: G3  F#3  G3 (quarter notes)
  [15, G3, 1], [16, Fs3, 1], [17, G3, 1],
  // m7: D3 dotted half
  [18, D3, 3],
  // m8: Eb3  D3  C3 (descending quarter notes)
  [21, Eb3, 1], [22, D3, 1], [23, C3, 1],
  // m9: G2 dotted half
  [24, G2, 3],

  // Part 2
  // m10: D3 dotted half
  [28, D3, 3],
  // m11: C3  D3  Eb3 (ascending quarter notes)
  [31, C3, 1], [32, D3, 1], [33, Eb3, 1],
  // m12: D3 dotted half
  [34, D3, 3],
  // m13: G3  F#3  G3 (quarter notes)
  [37, G3, 1], [38, Fs3, 1], [39, G3, 1],
  // m14: G2  A2  Bb2 (ascending quarter notes)
  [40, G2, 1], [41, A2, 1], [42, Bb2, 1],
  // m15: D3 half + G2 quarter
  [43, D3, 2], [45, G2, 1],
];

const notes: SongNote[] = rightHand.map(([beat, note, dur]) => ({
  time: b(beat), note, duration: b(dur),
}));

const bothHands = [...rightHand, ...leftHand].sort((a, b) => a[0] - b[0]);
const pianoNotes: SongNote[] = bothHands.map(([beat, note, dur]) => ({
  time: b(beat), note, duration: b(dur),
}));

export const minuet2: Song = {
  id: 'suzuki-minuet-2',
  title: 'Minuet 2 in G minor',
  artist: 'J.S. Bach',
  difficulty: 'Medium',
  bpm: BPM,
  noteRange: { lowest: 57, highest: 70, whiteKeysOnly: false },
  notes,
  pianoNotes,
  pianoNoteRange: { lowest: 43, highest: 70, whiteKeysOnly: false },
};
