import { Song, SongNote, MidiNote } from '@/types/game';
import { beatsToSeconds } from '@/utils/beats';

const BPM = 108;
const b = (beat: number) => beatsToSeconds(beat, BPM);

// Right hand — D major (with F#)
const D4 = 62, E4 = 64, Fs4 = 66, G4 = 67, A4 = 69, B4 = 71;

// Left hand bass notes
const D3 = 50, A2 = 45, A3 = 57, G3 = 55;

// ===== RIGHT HAND — Ode to Joy in D major =====
const rightHand: [number, MidiNote, number][] = [
  // Line 1: F# F# G A | A G F# E
  [0, Fs4, 1], [1, Fs4, 1], [2, G4, 1], [3, A4, 1],
  [4, A4, 1], [5, G4, 1], [6, Fs4, 1], [7, E4, 1],
  // Line 2: D D E F# | F# E E
  [8, D4, 1], [9, D4, 1], [10, E4, 1], [11, Fs4, 1],
  [12, Fs4, 1.5], [13.5, E4, 0.5], [14, E4, 2],
  // Line 3: F# F# G A | A G F# E
  [16, Fs4, 1], [17, Fs4, 1], [18, G4, 1], [19, A4, 1],
  [20, A4, 1], [21, G4, 1], [22, Fs4, 1], [23, E4, 1],
  // Line 4: D D E F# | E D D
  [24, D4, 1], [25, D4, 1], [26, E4, 1], [27, Fs4, 1],
  [28, E4, 1.5], [29.5, D4, 0.5], [30, D4, 2],
];

// ===== LEFT HAND — harmonic bass (one note per melody beat) =====
// Harmony for "F# F# G A | A G F# E | D D E F# | F#. E E" in D major:
//   D  D  G  A | A  G  D  A | D  D  A  D | D   A  A
const leftHand: [number, MidiNote, number][] = [
  // Line 1: F#4 F#4 G4 A4
  [0, D3, 1], [1, D3, 1], [2, G3, 1], [3, A3, 1],
  // Line 1 cont: A4 G4 F#4 E4
  [4, A2, 1], [5, G3, 1], [6, D3, 1], [7, A2, 1],
  // Line 2: D4 D4 E4 F#4
  [8, D3, 1], [9, D3, 1], [10, A2, 1], [11, D3, 1],
  // Line 2 cont: F#4. E4 E4
  [12, D3, 2], [14, A2, 2],
  // Line 3: same as line 1
  [16, D3, 1], [17, D3, 1], [18, G3, 1], [19, A3, 1],
  [20, A2, 1], [21, G3, 1], [22, D3, 1], [23, A2, 1],
  // Line 4: D4 D4 E4 F#4
  [24, D3, 1], [25, D3, 1], [26, A2, 1], [27, D3, 1],
  // Line 4 cont: E4. D4 D4
  [28, A2, 2], [30, D3, 2],
];

const notes: SongNote[] = rightHand.map(([beat, note, dur]) => ({
  time: b(beat),
  note,
  duration: b(dur),
}));

const bothHands = [...rightHand, ...leftHand].sort((a, b) => a[0] - b[0]);
const pianoNotes: SongNote[] = bothHands.map(([beat, note, dur]) => ({
  time: b(beat),
  note,
  duration: b(dur),
}));

export const odeToJoy: Song = {
  id: 'ode-to-joy',
  title: 'Ode to Joy',
  artist: 'Ludwig van Beethoven',
  difficulty: 'Medium',
  bpm: BPM,
  noteRange: { lowest: 62, highest: 69, whiteKeysOnly: false },
  notes,
  pianoNotes,
  pianoNoteRange: { lowest: 38, highest: 69, whiteKeysOnly: false },
};
