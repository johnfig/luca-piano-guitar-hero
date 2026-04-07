import { Song, SongNote, MidiNote } from '@/types/game';
import { beatsToSeconds } from '@/utils/beats';

const BPM = 132;
const b = (beat: number) => beatsToSeconds(beat, BPM);

// Perpetual Motion - Suzuki Book 1
// Continuous running eighth notes throughout - a technical exercise
// D major (F#, C#)

// Right hand MIDI constants
const D4 = 62, E4 = 64, Fs4 = 66, G4 = 67, A4 = 69, B4 = 71, Cs5 = 73, D5 = 74, E5 = 76;

// Left hand MIDI constants
const D2 = 38, A2 = 45, D3 = 50, G3 = 55, E3 = 52, B2 = 47, G2 = 43;

// ===== RIGHT HAND (authentic D major melody with F# and C#) =====
const rightHand: [number, MidiNote, number][] = [
  // Bar 1-2: ascending D major scale
  [0, D4, 0.5], [0.5, E4, 0.5], [1, Fs4, 0.5], [1.5, G4, 0.5],
  [2, A4, 0.5], [2.5, B4, 0.5], [3, Cs5, 0.5], [3.5, D5, 0.5],
  // Bar 3-4: descending from E5
  [4, E5, 0.5], [4.5, D5, 0.5], [5, Cs5, 0.5], [5.5, B4, 0.5],
  [6, A4, 0.5], [6.5, G4, 0.5], [7, Fs4, 0.5], [7.5, E4, 0.5],
  // Bar 5-6: zigzag pattern
  [8, D4, 0.5], [8.5, Fs4, 0.5], [9, E4, 0.5], [9.5, G4, 0.5],
  [10, Fs4, 0.5], [10.5, A4, 0.5], [11, G4, 0.5], [11.5, B4, 0.5],
  // Bar 7-8: ascending to peak, then down
  [12, A4, 0.5], [12.5, Cs5, 0.5], [13, B4, 0.5], [13.5, D5, 0.5],
  [14, Cs5, 0.5], [14.5, E5, 0.5], [15, D5, 0.5], [15.5, Cs5, 0.5],
  // Bar 9-10: descending scale pattern
  [16, B4, 0.5], [16.5, A4, 0.5], [17, G4, 0.5], [17.5, Fs4, 0.5],
  [18, E4, 0.5], [18.5, D4, 0.5], [19, E4, 0.5], [19.5, Fs4, 0.5],
  // Bar 11-12: ascending again
  [20, G4, 0.5], [20.5, A4, 0.5], [21, B4, 0.5], [21.5, Cs5, 0.5],
  [22, D5, 0.5], [22.5, E5, 0.5], [23, D5, 0.5], [23.5, Cs5, 0.5],
  // Bar 13-14: descending to resolution
  [24, B4, 0.5], [24.5, A4, 0.5], [25, G4, 0.5], [25.5, Fs4, 0.5],
  [26, E4, 0.5], [26.5, Fs4, 0.5], [27, E4, 0.5], [27.5, D4, 0.5],
  // Bar 15-16: final cadence
  [28, E4, 0.5], [28.5, Fs4, 0.5], [29, G4, 0.5], [29.5, A4, 0.5],
  [30, Fs4, 0.5], [30.5, E4, 0.5], [31, D4, 1],
];

// ===== LEFT HAND (quarter-note bass following D major progression) =====
const leftHand: [number, MidiNote, number][] = [
  // Bar 1-2: D chord (D3-A2-D3-A2)
  [0, D3, 1], [1, A2, 1], [2, D3, 1], [3, A2, 1],
  // Bar 3-4: A chord (A2-E3), D chord (D3-A2)
  [4, A2, 1], [5, E3, 1], [6, D3, 1], [7, A2, 1],
  // Bar 5-6: D chord (D3-A2), G chord (G2-D3)
  [8, D3, 1], [9, A2, 1], [10, D3, 1], [11, G2, 1],
  // Bar 7-8: A chord (A2-E3-A2-E3)
  [12, A2, 1], [13, E3, 1], [14, A2, 1], [15, E3, 1],
  // Bar 9-10: D chord (D3-A2), Bm-Em (B2-E3)
  [16, D3, 1], [17, A2, 1], [18, B2, 1], [19, E3, 1],
  // Bar 11-12: G chord (G2-D3), A chord (A2-E3)
  [20, G2, 1], [21, D3, 1], [22, A2, 1], [23, E3, 1],
  // Bar 13-14: D (D3-A2), A (A2-E3)
  [24, D3, 1], [25, A2, 1], [26, A2, 1], [27, E3, 1],
  // Bar 15-16: A-D final cadence
  [28, A2, 1], [29, E3, 1], [30, D3, 1], [31, D2, 1],
];

const notes: SongNote[] = rightHand.map(([beat, note, dur]) => ({
  time: b(beat), note, duration: b(dur),
}));

const bothHands = [...rightHand, ...leftHand].sort((a, b) => a[0] - b[0]);
const pianoNotes: SongNote[] = bothHands.map(([beat, note, dur]) => ({
  time: b(beat), note, duration: b(dur),
}));

export const perpetualMotion: Song = {
  id: 'suzuki-perpetual-motion',
  title: 'Perpetual Motion',
  artist: 'Suzuki',
  difficulty: 'Medium',
  bpm: BPM,
  noteRange: { lowest: 62, highest: 76, whiteKeysOnly: false },
  notes,
  pianoNotes,
  pianoNoteRange: { lowest: 38, highest: 76, whiteKeysOnly: false },
};
