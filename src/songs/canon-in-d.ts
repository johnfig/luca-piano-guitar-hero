import { Song, SongNote, MidiNote } from '@/types/game';
import { beatsToSeconds } from '@/utils/beats';

const BPM = 72;
const b = (beat: number) => beatsToSeconds(beat, BPM);

// Right hand — D major
const D4 = 62, E4 = 64, Fs4 = 66, G4 = 67, A4 = 69, B4 = 71, Cs5 = 73, D5 = 74;

// Left hand bass — the famous Canon chord progression: D A Bm F#m G D G A
const D3 = 50, A2 = 45, B2 = 47, Fs3 = 54, G3 = 55, A3 = 57;

// ===== RIGHT HAND — Canon in D melody (authentic D major) =====
const rightHand: [number, MidiNote, number][] = [
  // Phrase 1: D major chord progression melody
  [0, E4, 1], [1, G4, 1], [2, B4, 1], [3, A4, 1],

  // Ascending run
  [4, G4, 0.5], [4.5, A4, 0.5], [5, B4, 0.5], [5.5, Cs5, 0.5],
  [6, D5, 1], [7, Cs5, 0.5], [7.5, B4, 0.5],

  // Phrase 2: descending with ornamentation
  [8, A4, 0.5], [8.5, B4, 0.5], [9, Cs5, 0.5], [9.5, B4, 0.5],
  [10, A4, 0.5], [10.5, G4, 0.5], [11, Fs4, 0.5], [11.5, E4, 0.5],

  // Phrase 3: ascending chord tones
  [12, D4, 0.5], [12.5, E4, 0.5], [13, Fs4, 0.5], [13.5, G4, 0.5],
  [14, A4, 0.5], [14.5, B4, 0.5], [15, Cs5, 0.5], [15.5, D5, 0.5],

  // Phrase 4: the famous melody with held notes
  [16, D5, 1.5], [17.5, Cs5, 0.5],
  [18, B4, 1.5], [19.5, A4, 0.5],
  [20, G4, 1.5], [21.5, Fs4, 0.5],
  [22, G4, 1.5], [23.5, A4, 0.5],

  // Phrase 5: sixteenth-note-like runs
  [24, B4, 0.5], [24.5, A4, 0.5], [25, G4, 0.5], [25.5, Fs4, 0.5],
  [26, E4, 0.5], [26.5, Fs4, 0.5], [27, G4, 0.5], [27.5, A4, 0.5],
  [28, B4, 0.5], [28.5, Cs5, 0.5], [29, D5, 0.5], [29.5, Cs5, 0.5],
  [30, B4, 0.5], [30.5, A4, 0.5], [31, G4, 0.5], [31.5, Fs4, 0.5],

  // Phrase 6: second variation
  [32, E4, 0.5], [32.5, B4, 0.5], [33, A4, 0.5], [33.5, D5, 0.5],
  [34, Cs5, 0.5], [34.5, G4, 0.5], [35, A4, 0.5], [35.5, E4, 0.5],
  [36, Fs4, 0.5], [36.5, Cs5, 0.5], [37, B4, 0.5], [37.5, D5, 0.5],
  [38, Cs5, 0.5], [38.5, A4, 0.5], [39, B4, 0.5], [39.5, G4, 0.5],

  // Phrase 7: climactic ascending
  [40, D4, 0.5], [40.5, Fs4, 0.5], [41, E4, 0.5], [41.5, G4, 0.5],
  [42, Fs4, 0.5], [42.5, A4, 0.5], [43, G4, 0.5], [43.5, B4, 0.5],
  [44, A4, 0.5], [44.5, Cs5, 0.5], [45, B4, 0.5], [45.5, D5, 0.5],
  [46, Cs5, 1], [47, D5, 1],

  // Phrase 8: final resolution
  [48, B4, 0.5], [48.5, A4, 0.5], [49, G4, 0.5], [49.5, A4, 0.5],
  [50, B4, 1], [51, Cs5, 0.5], [51.5, D5, 0.5],
  [52, Cs5, 0.5], [52.5, B4, 0.5], [53, A4, 0.5], [53.5, G4, 0.5],
  [54, Fs4, 0.5], [54.5, E4, 0.5], [55, D4, 0.5], [55.5, E4, 0.5],
  [56, Fs4, 0.5], [56.5, G4, 0.5], [57, A4, 1], [58, B4, 1],

  // Final held chord tones
  [59, E4, 2], [59, G4, 2], [59, B4, 2],
];

// ===== LEFT HAND — Canon chord progression: D A Bm F#m G D G A =====
// Each chord gets 2 beats (half note), cycling through the progression
const leftHand: [number, MidiNote, number][] = [
  // Cycle 1 (phrases 1-2)
  [0, D3, 2], [2, A2, 2], [4, B2, 2], [6, Fs3, 2],
  [8, G3, 2], [10, D3, 2], [12, G3, 2], [14, A3, 2],
  // Cycle 2 (phrases 3-4)
  [16, D3, 2], [18, A2, 2], [20, B2, 2], [22, Fs3, 2],
  [24, G3, 2], [26, D3, 2], [28, G3, 2], [30, A3, 2],
  // Cycle 3 (phrases 5-6)
  [32, D3, 2], [34, A2, 2], [36, B2, 2], [38, Fs3, 2],
  [40, G3, 2], [42, D3, 2], [44, G3, 2], [46, A3, 2],
  // Cycle 4 (phrases 7-8)
  [48, D3, 2], [50, A2, 2], [52, B2, 2], [54, Fs3, 2],
  [56, G3, 2], [58, A3, 1],
  // Final
  [59, D3, 2],
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

export const canonInD: Song = {
  id: 'canon-in-d',
  title: 'Canon in D',
  artist: 'Johann Pachelbel',
  difficulty: 'Hard',
  bpm: BPM,
  noteRange: { lowest: 62, highest: 74, whiteKeysOnly: false },
  notes,
  pianoNotes,
  pianoNoteRange: { lowest: 45, highest: 74, whiteKeysOnly: false },
};
