import { Song, SongNote, MidiNote } from '@/types/game';
import { beatsToSeconds } from '@/utils/beats';

const BPM = 100;
const b = (beat: number) => beatsToSeconds(beat, BPM);

// Suzuki Twinkle Variation B - in A major (authentic key)
// Dotted rhythm (long-short pattern)
// A major: A B C# D E F# G#

// Right hand MIDI constants
const A3 = 57, B3 = 59, Cs4 = 61, D4 = 62, E4 = 64;

// Left hand MIDI constants
const A2 = 45, E3 = 52, D3 = 50, E2 = 40;

// ===== RIGHT HAND (authentic A major melody) =====
const rightHand: [number, MidiNote, number][] = [
  // Line 1: "Twinkle twinkle little star" - dotted rhythm
  [0, A3, 0.75], [0.75, A3, 0.25], [1, E4, 0.75], [1.75, E4, 0.25],
  [2, E4, 0.75], [2.75, E4, 0.25], [3, E4, 1],
  // Line 2: "How I wonder what you are"
  [4, D4, 0.75], [4.75, D4, 0.25], [5, Cs4, 0.75], [5.75, Cs4, 0.25],
  [6, B3, 0.75], [6.75, B3, 0.25], [7, A3, 1],
  // Line 3: "Up above the world so high"
  [8, E4, 0.75], [8.75, E4, 0.25], [9, D4, 0.75], [9.75, D4, 0.25],
  [10, Cs4, 0.75], [10.75, Cs4, 0.25], [11, B3, 1],
  // Line 4: "Like a diamond in the sky"
  [12, E4, 0.75], [12.75, E4, 0.25], [13, D4, 0.75], [13.75, D4, 0.25],
  [14, Cs4, 0.75], [14.75, Cs4, 0.25], [15, B3, 1],
  // Line 5: "Twinkle twinkle little star"
  [16, A3, 0.75], [16.75, A3, 0.25], [17, E4, 0.75], [17.75, E4, 0.25],
  [18, E4, 0.75], [18.75, E4, 0.25], [19, E4, 1],
  // Line 6: "How I wonder what you are"
  [20, D4, 0.75], [20.75, D4, 0.25], [21, Cs4, 0.75], [21.75, Cs4, 0.25],
  [22, B3, 0.75], [22.75, B3, 0.25], [23, A3, 1],
];

// ===== LEFT HAND (root-fifth alternating bass in A major) =====
const leftHand: [number, MidiNote, number][] = [
  // Line 1: A chord (A2-E3), E chord (E2-E3)
  [0, A2, 1], [1, E3, 1], [2, E2, 1], [3, E3, 1],
  // Line 2: D chord (D3-A2), A chord (A2-E3)
  [4, D3, 1], [5, A2, 1], [6, E2, 1], [7, A2, 1],
  // Line 3: E chord (E3-E2), D chord (D3-A2)
  [8, E3, 1], [9, E2, 1], [10, D3, 1], [11, A2, 1],
  // Line 4: E chord (E3-E2), D chord (D3-A2)
  [12, E3, 1], [13, E2, 1], [14, D3, 1], [15, A2, 1],
  // Line 5: A chord (A2-E3), E chord (E2-E3)
  [16, A2, 1], [17, E3, 1], [18, E2, 1], [19, E3, 1],
  // Line 6: D chord (D3-A2), A cadence (E2-A2)
  [20, D3, 1], [21, A2, 1], [22, E2, 1], [23, A2, 1],
];

const notes: SongNote[] = rightHand.map(([beat, note, dur]) => ({
  time: b(beat), note, duration: b(dur),
}));

const bothHands = [...rightHand, ...leftHand].sort((a, b) => a[0] - b[0]);
const pianoNotes: SongNote[] = bothHands.map(([beat, note, dur]) => ({
  time: b(beat), note, duration: b(dur),
}));

export const twinkleVarB: Song = {
  id: 'suzuki-twinkle-var-b',
  title: 'Twinkle Twinkle Variation B',
  artist: 'Suzuki',
  difficulty: 'Easy',
  bpm: BPM,
  noteRange: { lowest: 57, highest: 64, whiteKeysOnly: false },
  notes,
  pianoNotes,
  pianoNoteRange: { lowest: 40, highest: 64, whiteKeysOnly: false },
};
