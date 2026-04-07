import { Song, SongNote, MidiNote } from '@/types/game';
import { beatsToSeconds } from '@/utils/beats';

const BPM = 76;
const b = (beat: number) => beatsToSeconds(beat, BPM);

// NOTE: OCTAVE_OFFSET = -12 is applied by the engine.
// File pitch → game pitch: e.g. Fs5(78) → Fs4(66) in game.

// Right hand — D major (one octave above game pitch)
const A4 = 69, B4 = 71;
const Cs5 = 73, D5 = 74, E5 = 76, Fs5 = 78, G5 = 79, A5 = 81;
const Fs4 = 66, G4 = 67;

// Left hand — canon bass ostinato: D–A–Bm–F#m–G–D–G–A
// (each chord = 2 beats = half note in 4/4)
const D3 = 50, A2 = 45, B2 = 47, Fs3 = 54, G3 = 55, A3 = 57;

// ===== RIGHT HAND — Pachelbel Canon theme, then variations =====
// Source: Original Pachelbel Canon in D, public domain.
// Theme = descending D-major scale in half notes, then ascending, then 8th-note variations.
const rightHand: [number, MidiNote, number][] = [
  // === THEME — half notes (2 beats each), mm. 3–10 in original ===
  // Voice 1 entry: F#–E–D–C#–B–A–B–C#
  [0, Fs5, 2],   // F#4 in game — 3rd of D major
  [2, E5, 2],    // E4
  [4, D5, 2],    // D4 — root
  [6, Cs5, 2],   // C#4
  [8, B4, 2],    // B3 — leading to Am area
  [10, A4, 2],   // A3 — bottom of phrase
  [12, B4, 2],   // B3 — ascend
  [14, Cs5, 2],  // C#4

  // === THEME SECOND PHRASE — ascending ===
  // D–E–F#–G–A–B–C#–D
  [16, D5, 2],
  [18, E5, 2],
  [20, Fs5, 2],
  [22, G5, 2],   // G4 in game
  [24, A5, 2],   // A4
  [26, G5, 2],
  [28, Fs5, 2],
  [30, E5, 2],

  // === VARIATION 1 — quarter notes (1 beat each) ===
  // Characteristic flowing Canon melody over the bass
  [32, D5, 1], [33, Cs5, 1], [34, B4, 1], [35, Cs5, 1],
  [36, D5, 1], [37, E5, 1], [38, Fs5, 1], [39, G5, 1],
  [40, A5, 1], [41, G5, 1], [42, Fs5, 1], [43, E5, 1],
  [44, D5, 1], [45, E5, 1], [46, Fs5, 1], [47, G5, 1],

  // === VARIATION 2 — 8th notes (0.5 beats each) ===
  // The famous flowing 8th-note Canon in D melody
  [48, Fs5, 0.5], [48.5, E5, 0.5], [49, D5, 0.5], [49.5, Cs5, 0.5],
  [50, B4, 0.5], [50.5, A4, 0.5], [51, B4, 0.5], [51.5, Cs5, 0.5],
  [52, D5, 0.5], [52.5, Cs5, 0.5], [53, B4, 0.5], [53.5, A4, 0.5],
  [54, G4, 0.5], [54.5, Fs4, 0.5], [55, G4, 0.5], [55.5, A4, 0.5],

  [56, B4, 0.5], [56.5, Cs5, 0.5], [57, D5, 0.5], [57.5, E5, 0.5],
  [58, Fs5, 0.5], [58.5, G5, 0.5], [59, A5, 0.5], [59.5, B4, 0.5],
  [60, Cs5, 0.5], [60.5, D5, 0.5], [61, E5, 0.5], [61.5, Fs5, 0.5],
  [62, G5, 0.5], [62.5, Fs5, 0.5], [63, E5, 0.5], [63.5, D5, 0.5],

  // Final — held notes resolving to D
  [64, D5, 2],   // D major resolution
  [66, Fs5, 2],
  [68, A5, 2],
  [70, D5, 4],   // final D held
];

// ===== LEFT HAND — D–A–Bm–F#m–G–D–G–A repeating ostinato =====
// Each chord root = 2 beats. Cycle repeats every 16 beats.
function buildBass(startBeat: number, cycles: number): [number, MidiNote, number][] {
  const pattern: [MidiNote, number][] = [
    [D3, 2], [A2, 2], [B2, 2], [Fs3, 2],
    [G3, 2], [D3, 2], [G3, 2], [A3, 2],
  ];
  const result: [number, MidiNote, number][] = [];
  let beat = startBeat;
  for (let c = 0; c < cycles; c++) {
    for (const [note, dur] of pattern) {
      result.push([beat, note, dur]);
      beat += dur;
    }
  }
  return result;
}

// Bass runs from beat 0 through beat 74 (about 5 full cycles)
const leftHand = buildBass(0, 5);

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

export const canonInD: Song = {
  id: 'canon-in-d',
  title: 'Canon in D',
  artist: 'Johann Pachelbel',
  difficulty: 'Hard',
  bpm: BPM,
  // RH file range: Fs4(66) to A5(81) → Fs3–A4 in game after offset
  noteRange: { lowest: 66, highest: 81, whiteKeysOnly: false },
  notes,
  pianoNotes,
  // LH lowest: A2(45) → A1 in game; RH highest: A5(81) → A4 in game
  pianoNoteRange: { lowest: 45, highest: 81, whiteKeysOnly: false },
};
