import { Song, SongNote, MidiNote } from '@/types/game';
import { beatsToSeconds } from '@/utils/beats';

const BPM = 108;
const b = (beat: number) => beatsToSeconds(beat, BPM);

// Minuet in G Major (BWV Anh. 114) - attributed to Christian Petzold
// The most famous "Bach" minuet from Suzuki Book 1
// 3/4 time, G major (F#)

// Right hand MIDI constants
const C4 = 60, D4 = 62, E4 = 64, Fs4 = 66, G4 = 67, A4 = 69, B4 = 71, C5 = 72, D5 = 74, E5 = 76;

// Left hand MIDI constants
const G2 = 43, A2 = 45, B2 = 47, C3 = 48, D3 = 50, E3 = 52, Fs3 = 54, G3 = 55;

// ===== RIGHT HAND (authentic G major melody with F#) =====
const rightHand: [number, MidiNote, number][] = [
  // Part 1
  // Bar 1: D  G  A
  [0, D4, 1], [1, G4, 1], [2, A4, 1],
  // Bar 2: B  C5  D5
  [3, B4, 1], [4, C5, 1], [5, D5, 1],
  // Bar 3: G  G
  [6, G4, 2], [8, G4, 1],
  // Bar 4: E  C5  D5  E5  D5
  [9, E4, 0.5], [9.5, C5, 0.5], [10, D5, 0.5], [10.5, E5, 0.5], [11, D5, 1],
  // Bar 5: C5  B  A  G
  [12, C5, 1], [13, B4, 1], [14, A4, 1],
  // Bar 6: B  A  G  F#
  [15, B4, 0.5], [15.5, A4, 0.5], [16, G4, 1], [17, Fs4, 1],
  // Bar 7: G  A  G  F#  E
  [18, G4, 0.5], [18.5, A4, 0.5], [19, G4, 0.5], [19.5, Fs4, 0.5], [20, E4, 1],
  // Bar 8: D  E  C  D  B4
  [21, D4, 0.5], [21.5, E4, 0.5], [22, C4, 0.5], [22.5, D4, 0.5], [23, B4, 1],
  // Bar 9: A  B  A  G
  [24, A4, 1], [25, B4, 0.5], [25.5, A4, 0.5], [26, G4, 2],

  // Part 2
  // Bar 10: B  G  A
  [28, B4, 1], [29, G4, 1], [30, A4, 1],
  // Bar 11: B  C5  B  A
  [31, B4, 1], [32, C5, 1], [33, B4, 0.5], [33.5, A4, 0.5],
  // Bar 12: G  A  B  A  G
  [34, G4, 0.5], [34.5, A4, 0.5], [35, B4, 0.5], [35.5, A4, 0.5], [36, G4, 1],
  // Bar 13: F#  G  A  G  F#  E
  [37, Fs4, 0.5], [37.5, G4, 0.5], [38, A4, 0.5], [38.5, G4, 0.5], [39, Fs4, 0.5], [39.5, E4, 0.5],
  // Bar 14: D  G  B  D5
  [40, D4, 1], [41, G4, 1], [42, B4, 1],
  // Bar 15: C5  B  A  B  A  G
  [43, C5, 0.5], [43.5, B4, 0.5], [44, A4, 0.5], [44.5, B4, 0.5], [45, A4, 0.5], [45.5, G4, 0.5],
  // Bar 16: final G
  [46, G4, 2],
];

// ===== LEFT HAND (Petzold BWV Anh. 114 walking bass) =====
const leftHand: [number, MidiNote, number][] = [
  // Part 1 (bars 1-9)
  // Bar 1: G3 dotted half (pedal tone)
  [0, G3, 3],
  // Bar 2: G3 dotted half
  [3, G3, 3],
  // Bar 3: E3 C3 E3 (quarter notes)
  [6, E3, 1], [7, C3, 1], [8, E3, 1],
  // Bar 4: C3 half, quarter rest
  [9, C3, 2],
  // Bar 5: D3 dotted half
  [12, D3, 3],
  // Bar 6: G3 quarter, B2 quarter, C3 quarter
  [15, G3, 1], [16, B2, 1], [17, C3, 1],
  // Bar 7: A2 dotted half
  [18, A2, 3],
  // Bar 8: D3 half, G3 quarter
  [21, D3, 2], [23, G3, 1],
  // Bar 9: D3 half, G2 quarter
  [24, D3, 2], [26, G2, 2],

  // Part 2 (bars 10-16)
  // Bar 10: G3 dotted half
  [28, G3, 3],
  // Bar 11: G3 half, E3 quarter
  [31, G3, 2], [33, E3, 1],
  // Bar 12: C3 D3 E3 (quarter notes ascending)
  [34, C3, 1], [35, D3, 1], [36, E3, 1],
  // Bar 13: D3 dotted half
  [37, D3, 3],
  // Bar 14: G2 B2 G2 (quarter notes)
  [40, G2, 1], [41, B2, 1], [42, G2, 1],
  // Bar 15: C3 quarter, D3 quarter, D3 quarter
  [43, C3, 1], [44, D3, 1], [45, D3, 1],
  // Bar 16: G2 dotted half (final)
  [46, G2, 2],
];

const notes: SongNote[] = rightHand.map(([beat, note, dur]) => ({
  time: b(beat), note, duration: b(dur),
}));

const bothHands = [...rightHand, ...leftHand].sort((a, b) => a[0] - b[0]);
const pianoNotes: SongNote[] = bothHands.map(([beat, note, dur]) => ({
  time: b(beat), note, duration: b(dur),
}));

export const minuet1: Song = {
  id: 'suzuki-minuet-1',
  title: 'Minuet 1 in G',
  artist: 'J.S. Bach',
  difficulty: 'Medium',
  bpm: BPM,
  noteRange: { lowest: 60, highest: 76, whiteKeysOnly: false },
  notes,
  pianoNotes,
  pianoNoteRange: { lowest: 43, highest: 76, whiteKeysOnly: false },
};
