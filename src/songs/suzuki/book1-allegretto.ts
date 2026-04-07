import { Song, SongNote, MidiNote } from '@/types/game';
import { beatsToSeconds } from '@/utils/beats';

const BPM = 116;
const b = (beat: number) => beatsToSeconds(beat, BPM);

// MIDI constants
const C4 = 60, D4 = 62, E4 = 64, F4 = 65, G4 = 67, A4 = 69, B4 = 71, C5 = 72;

// Allegretto - Suzuki Book 1
// A light, graceful piece in C major with a singing melody
// NOT Ode to Joy — this is a distinct piece
// 4/4 time, moderately quick
const melody: [number, MidiNote, number][] = [
  // Part A: ascending/descending melodic idea
  // Bar 1-2: C E G E | F A G F
  [0, C4, 1], [1, E4, 1], [2, G4, 1], [3, E4, 1],
  [4, F4, 1], [5, A4, 1], [6, G4, 1], [7, F4, 1],
  // Bar 3-4: E D C D | E - - -
  [8, E4, 1], [9, D4, 1], [10, C4, 1], [11, D4, 1],
  [12, E4, 2], [14, G4, 2],
  // Bar 5-6: C E G E | F A G F (repeat of opening)
  [16, C4, 1], [17, E4, 1], [18, G4, 1], [19, E4, 1],
  [20, F4, 1], [21, A4, 1], [22, G4, 1], [23, F4, 1],
  // Bar 7-8: E D C D | C - - -
  [24, E4, 1], [25, D4, 1], [26, C4, 1], [27, D4, 1],
  [28, C4, 2], [30, C4, 2],

  // Part B: contrasting section, higher register
  // Bar 9-10: G A B C5 | B A G A
  [32, G4, 1], [33, A4, 1], [34, B4, 1], [35, C5, 1],
  [36, B4, 1], [37, A4, 1], [38, G4, 1], [39, A4, 1],
  // Bar 11-12: G F E F | G - - -
  [40, G4, 1], [41, F4, 1], [42, E4, 1], [43, F4, 1],
  [44, G4, 2], [46, E4, 2],

  // Part A': return with slight variation
  // Bar 13-14: C E G E | F A G F
  [48, C4, 1], [49, E4, 1], [50, G4, 1], [51, E4, 1],
  [52, F4, 1], [53, A4, 1], [54, G4, 1], [55, F4, 1],
  // Bar 15-16: E F E D | C - - -
  [56, E4, 1], [57, F4, 0.5], [57.5, E4, 0.5], [58, D4, 1], [59, C4, 1],
  [60, C4, 2],
];

// G major piano version: F → F# (only accidental in G major)
const Fs4 = 66; // F#4
const pianoMelody: [number, MidiNote, number][] = [
  // Part A
  [0, C4, 1], [1, E4, 1], [2, G4, 1], [3, E4, 1],
  [4, Fs4, 1], [5, A4, 1], [6, G4, 1], [7, Fs4, 1],
  [8, E4, 1], [9, D4, 1], [10, C4, 1], [11, D4, 1],
  [12, E4, 2], [14, G4, 2],
  [16, C4, 1], [17, E4, 1], [18, G4, 1], [19, E4, 1],
  [20, Fs4, 1], [21, A4, 1], [22, G4, 1], [23, Fs4, 1],
  [24, E4, 1], [25, D4, 1], [26, C4, 1], [27, D4, 1],
  [28, C4, 2], [30, C4, 2],

  // Part B
  [32, G4, 1], [33, A4, 1], [34, B4, 1], [35, C5, 1],
  [36, B4, 1], [37, A4, 1], [38, G4, 1], [39, A4, 1],
  [40, G4, 1], [41, Fs4, 1], [42, E4, 1], [43, Fs4, 1],
  [44, G4, 2], [46, E4, 2],

  // Part A'
  [48, C4, 1], [49, E4, 1], [50, G4, 1], [51, E4, 1],
  [52, Fs4, 1], [53, A4, 1], [54, G4, 1], [55, Fs4, 1],
  [56, E4, 1], [57, Fs4, 0.5], [57.5, E4, 0.5], [58, D4, 1], [59, C4, 1],
  [60, C4, 2],
];

const notes: SongNote[] = melody.map(([beat, note, dur]) => ({
  time: b(beat),
  note,
  duration: b(dur),
}));

const pianoNotes: SongNote[] = pianoMelody.map(([beat, note, dur]) => ({
  time: b(beat),
  note,
  duration: b(dur),
}));

export const allegretto: Song = {
  id: 'suzuki-allegretto',
  title: 'Allegretto',
  artist: 'Suzuki',
  difficulty: 'Medium',
  bpm: BPM,
  noteRange: { lowest: 60, highest: 72, whiteKeysOnly: true },
  notes,
  pianoNotes,
  pianoNoteRange: { lowest: 60, highest: 72, whiteKeysOnly: false },
};
