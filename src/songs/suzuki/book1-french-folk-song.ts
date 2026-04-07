import { Song, SongNote, MidiNote } from '@/types/game';
import { beatsToSeconds } from '@/utils/beats';

const BPM = 96;
const b = (beat: number) => beatsToSeconds(beat, BPM);

// French Folk Song - Traditional
// Suzuki Book 1 arrangement in D minor (Bb, no other accidentals used)
// Simple stepwise melody

// Right hand MIDI constants
const D4 = 62, E4 = 64, F4 = 65, G4 = 67, A4 = 69;

// Left hand MIDI constants
const D2 = 38, A2 = 45, D3 = 50, F3 = 53, C3 = 48, G2 = 43, Bb2 = 46;

// ===== RIGHT HAND (authentic D minor melody) =====
// The Suzuki French Folk Song uses only white keys in D minor
// (no Bb needed in this particular melody - it stays within D E F G A)
const rightHand: [number, MidiNote, number][] = [
  // Phrase 1: D E F D | E F G E
  [0, D4, 1], [1, E4, 1], [2, F4, 1], [3, D4, 1],
  [4, E4, 1], [5, F4, 1], [6, G4, 1], [7, E4, 1],
  // Phrase 2: F G A F | G F E D
  [8, F4, 1], [9, G4, 1], [10, A4, 1], [11, F4, 1],
  [12, G4, 1], [13, F4, 1], [14, E4, 1], [15, D4, 1],
  // Phrase 3 (repeat of phrase 1): D E F D | E F G E
  [16, D4, 1], [17, E4, 1], [18, F4, 1], [19, D4, 1],
  [20, E4, 1], [21, F4, 1], [22, G4, 1], [23, E4, 1],
  // Phrase 4 (ending variation): F E D E | F G F E D
  [24, F4, 1], [25, E4, 1], [26, D4, 1], [27, E4, 1],
  [28, F4, 1], [29, G4, 0.5], [30, F4, 0.5], [30.5, E4, 0.5], [31, D4, 2],
];

// ===== LEFT HAND (root-fifth bass in D minor) =====
const leftHand: [number, MidiNote, number][] = [
  // Phrase 1: Dm (D3-A2), Dm (D3-A2) | Am (A2-E), C (C3-G2)
  [0, D3, 1], [1, A2, 1], [2, D3, 1], [3, A2, 1],
  [4, A2, 1], [5, D3, 1], [6, C3, 1], [7, G2, 1],
  // Phrase 2: Dm (D3-A2), F (F3-C3) | C (C3-G2), Dm (D3-A2)
  [8, D3, 1], [9, A2, 1], [10, F3, 1], [11, C3, 1],
  [12, C3, 1], [13, G2, 1], [14, A2, 1], [15, D3, 1],
  // Phrase 3: Dm (D3-A2), Dm (D3-A2) | Am (A2-E), C (C3-G2)
  [16, D3, 1], [17, A2, 1], [18, D3, 1], [19, A2, 1],
  [20, A2, 1], [21, D3, 1], [22, C3, 1], [23, G2, 1],
  // Phrase 4: Bb (Bb2-F3), Am (A2-D3) | Dm cadence (A2-D3-D2)
  [24, Bb2, 1], [25, F3, 1], [26, A2, 1], [27, D3, 1],
  [28, A2, 1], [29, D3, 1], [31, D2, 2],
];

const notes: SongNote[] = rightHand.map(([beat, note, dur]) => ({
  time: b(beat), note, duration: b(dur),
}));

const bothHands = [...rightHand, ...leftHand].sort((a, b) => a[0] - b[0]);
const pianoNotes: SongNote[] = bothHands.map(([beat, note, dur]) => ({
  time: b(beat), note, duration: b(dur),
}));

export const frenchFolkSong: Song = {
  id: 'suzuki-french-folk-song',
  title: 'French Folk Song',
  artist: 'Traditional',
  difficulty: 'Easy',
  bpm: BPM,
  noteRange: { lowest: 62, highest: 69, whiteKeysOnly: true },
  notes,
  pianoNotes,
  pianoNoteRange: { lowest: 38, highest: 69, whiteKeysOnly: false },
};
