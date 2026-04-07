import { Song, SongNote, MidiNote } from '@/types/game';
import { beatsToSeconds } from '@/utils/beats';

const BPM = 108;
const b = (beat: number) => beatsToSeconds(beat, BPM);

// Right hand — D major (with F#)
const D4 = 62, E4 = 64, Fs4 = 66, G4 = 67, A4 = 69, B4 = 71;

// Left hand bass notes
const D3 = 50, A2 = 45, D2 = 38, G2 = 43, A3 = 57, Fs3 = 54, G3 = 55;

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

// ===== LEFT HAND — bass accompaniment =====
const leftHand: [number, MidiNote, number][] = [
  // Line 1: D and A bass
  [0, D3, 2], [2, G3, 2],
  [4, D3, 2], [6, A3, 2],
  // Line 2
  [8, D3, 2], [10, A3, 2],
  [12, D3, 2], [14, A2, 2],
  // Line 3: same as line 1
  [16, D3, 2], [18, G3, 2],
  [20, D3, 2], [22, A3, 2],
  // Line 4
  [24, D3, 2], [26, A3, 2],
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
