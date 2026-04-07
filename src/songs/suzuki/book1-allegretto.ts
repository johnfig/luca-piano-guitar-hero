import { Song, SongNote, MidiNote } from '@/types/game';
import { beatsToSeconds } from '@/utils/beats';

const BPM = 116;
const b = (beat: number) => beatsToSeconds(beat, BPM);

// Allegretto - Suzuki Book 1
// A light, graceful piece in G major (F#)
// 4/4 time, moderately quick

// Right hand MIDI constants
const C4 = 60, D4 = 62, E4 = 64, Fs4 = 66, G4 = 67, A4 = 69, B4 = 71, C5 = 72;

// Left hand MIDI constants
const G2 = 43, D3 = 50, G3 = 55, C3 = 48, A2 = 45, E3 = 52, B2 = 47;

// ===== RIGHT HAND (authentic G major melody with F#) =====
const rightHand: [number, MidiNote, number][] = [
  // Part A
  // Bar 1-2: C E G E | F# A G F#
  [0, C4, 1], [1, E4, 1], [2, G4, 1], [3, E4, 1],
  [4, Fs4, 1], [5, A4, 1], [6, G4, 1], [7, Fs4, 1],
  // Bar 3-4: E D C D | E - G -
  [8, E4, 1], [9, D4, 1], [10, C4, 1], [11, D4, 1],
  [12, E4, 2], [14, G4, 2],
  // Bar 5-6: C E G E | F# A G F#
  [16, C4, 1], [17, E4, 1], [18, G4, 1], [19, E4, 1],
  [20, Fs4, 1], [21, A4, 1], [22, G4, 1], [23, Fs4, 1],
  // Bar 7-8: E D C D | C - C -
  [24, E4, 1], [25, D4, 1], [26, C4, 1], [27, D4, 1],
  [28, C4, 2], [30, C4, 2],

  // Part B
  // Bar 9-10: G A B C5 | B A G A
  [32, G4, 1], [33, A4, 1], [34, B4, 1], [35, C5, 1],
  [36, B4, 1], [37, A4, 1], [38, G4, 1], [39, A4, 1],
  // Bar 11-12: G F# E F# | G - E -
  [40, G4, 1], [41, Fs4, 1], [42, E4, 1], [43, Fs4, 1],
  [44, G4, 2], [46, E4, 2],

  // Part A'
  // Bar 13-14: C E G E | F# A G F#
  [48, C4, 1], [49, E4, 1], [50, G4, 1], [51, E4, 1],
  [52, Fs4, 1], [53, A4, 1], [54, G4, 1], [55, Fs4, 1],
  // Bar 15-16: E F# E D | C - -
  [56, E4, 1], [57, Fs4, 0.5], [57.5, E4, 0.5], [58, D4, 1], [59, C4, 1],
  [60, C4, 2],
];

// ===== LEFT HAND (walking bass in G major) =====
const leftHand: [number, MidiNote, number][] = [
  // Part A
  // Bar 1: C chord - walking C G C G
  [0, C3, 1], [1, G3, 1], [2, C3, 1], [3, G3, 1],
  // Bar 2: D chord - walking D A D A
  [4, D3, 1], [5, A2, 1], [6, D3, 1], [7, A2, 1],
  // Bar 3: C-G walking bass
  [8, C3, 1], [9, B2, 1], [10, C3, 1], [11, G2, 1],
  // Bar 4: C chord
  [12, C3, 1], [13, G3, 1], [14, C3, 1], [15, G3, 1],
  // Bar 5: C chord (repeat of bar 1)
  [16, C3, 1], [17, G3, 1], [18, C3, 1], [19, G3, 1],
  // Bar 6: D chord
  [20, D3, 1], [21, A2, 1], [22, D3, 1], [23, A2, 1],
  // Bar 7: C-G walking bass to cadence
  [24, C3, 1], [25, B2, 1], [26, C3, 1], [27, G2, 1],
  // Bar 8: C resolution
  [28, C3, 1], [29, G2, 1], [30, C3, 1], [31, G3, 1],

  // Part B
  // Bar 9: G chord - walking G D G D
  [32, G2, 1], [33, D3, 1], [34, G2, 1], [35, G3, 1],
  // Bar 10: G-D walking
  [36, G3, 1], [37, D3, 1], [38, G2, 1], [39, D3, 1],
  // Bar 11: Em-D walking
  [40, E3, 1], [41, B2, 1], [42, A2, 1], [43, D3, 1],
  // Bar 12: G to C transition
  [44, G2, 1], [45, D3, 1], [46, C3, 1], [47, G2, 1],

  // Part A'
  // Bar 13: C chord
  [48, C3, 1], [49, G3, 1], [50, C3, 1], [51, G3, 1],
  // Bar 14: D chord
  [52, D3, 1], [53, A2, 1], [54, D3, 1], [55, A2, 1],
  // Bar 15: C walking to cadence
  [56, C3, 1], [57, B2, 1], [58, G2, 1], [59, C3, 1],
  // Bar 16: C final
  [60, C3, 2],
];

const notes: SongNote[] = rightHand.map(([beat, note, dur]) => ({
  time: b(beat), note, duration: b(dur),
}));

const bothHands = [...rightHand, ...leftHand].sort((a, b) => a[0] - b[0]);
const pianoNotes: SongNote[] = bothHands.map(([beat, note, dur]) => ({
  time: b(beat), note, duration: b(dur),
}));

export const allegretto: Song = {
  id: 'suzuki-allegretto',
  title: 'Allegretto',
  artist: 'Suzuki',
  difficulty: 'Medium',
  bpm: BPM,
  noteRange: { lowest: 60, highest: 72, whiteKeysOnly: false },
  notes,
  pianoNotes,
  pianoNoteRange: { lowest: 43, highest: 72, whiteKeysOnly: false },
};
