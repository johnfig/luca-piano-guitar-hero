import { Song, SongNote, MidiNote } from '@/types/game';
import { beatsToSeconds } from '@/utils/beats';

const BPM = 120;
const b = (beat: number) => beatsToSeconds(beat, BPM);

// Allegro - Suzuki Book 1
// Fast, lively piece with running eighth notes in G major (F#)

// Right hand MIDI constants
const G3 = 55, A3 = 57, B3 = 59, C4 = 60, D4 = 62, E4 = 64, Fs4 = 66, G4 = 67;

// Left hand MIDI constants
const G2 = 43, D3 = 50, _G3 = 55, C3 = 48, A2 = 45, E3 = 52, B2 = 47;

// ===== RIGHT HAND (authentic G major melody with F#) =====
const rightHand: [number, MidiNote, number][] = [
  // Phrase 1: ascending G major scale fragments
  [0, G3, 0.5], [0.5, A3, 0.5], [1, B3, 0.5], [1.5, C4, 0.5],
  [2, D4, 1], [3, D4, 1],
  // Phrase 2: descending from E4
  [4, E4, 0.5], [4.5, D4, 0.5], [5, C4, 0.5], [5.5, B3, 0.5],
  [6, A3, 1], [7, A3, 1],
  // Phrase 3: ascending to high range
  [8, B3, 0.5], [8.5, C4, 0.5], [9, D4, 0.5], [9.5, E4, 0.5],
  [10, Fs4, 0.5], [10.5, E4, 0.5], [11, D4, 0.5], [11.5, C4, 0.5],
  // Phrase 4: descending resolution
  [12, B3, 0.5], [12.5, A3, 0.5], [13, G3, 0.5], [13.5, A3, 0.5],
  [14, G3, 2],
  // Phrase 5: repeat with variation
  [16, G3, 0.5], [16.5, A3, 0.5], [17, B3, 0.5], [17.5, C4, 0.5],
  [18, D4, 1], [19, D4, 1],
  // Phrase 6: higher variation
  [20, E4, 0.5], [20.5, Fs4, 0.5], [21, G4, 0.5], [21.5, Fs4, 0.5],
  [22, E4, 0.5], [22.5, D4, 0.5], [23, C4, 0.5], [23.5, B3, 0.5],
  // Phrase 7: final descending run
  [24, A3, 0.5], [24.5, B3, 0.5], [25, C4, 0.5], [25.5, D4, 0.5],
  [26, B3, 0.5], [26.5, A3, 0.5], [27, G3, 0.5], [27.5, A3, 0.5],
  [28, G3, 2],
];

// ===== LEFT HAND (active quarter-note bass in G major) =====
const leftHand: [number, MidiNote, number][] = [
  // Phrase 1: G chord (G2-D3-G2-D3)
  [0, G2, 1], [1, D3, 1], [2, G2, 1], [3, D3, 1],
  // Phrase 2: C chord (C3-G2), D chord (D3-A2)
  [4, C3, 1], [5, G2, 1], [6, D3, 1], [7, A2, 1],
  // Phrase 3: Em (E3-B2), D (D3-A2)
  [8, E3, 1], [9, B2, 1], [10, D3, 1], [11, A2, 1],
  // Phrase 4: D-G cadence
  [12, D3, 1], [13, A2, 1], [14, G2, 2],
  // Phrase 5: G chord (G2-D3-G2-D3)
  [16, G2, 1], [17, D3, 1], [18, G2, 1], [19, D3, 1],
  // Phrase 6: C chord (C3-G2), D walking (D3-A2-B2-D3)
  [20, C3, 1], [21, G2, 1], [22, D3, 1], [23, A2, 1],
  // Phrase 7: D-G final cadence
  [24, D3, 1], [25, A2, 1], [26, D3, 1], [27, A2, 1],
  [28, G2, 2],
];

const notes: SongNote[] = rightHand.map(([beat, note, dur]) => ({
  time: b(beat), note, duration: b(dur),
}));

const bothHands = [...rightHand, ...leftHand].sort((a, b) => a[0] - b[0]);
const pianoNotes: SongNote[] = bothHands.map(([beat, note, dur]) => ({
  time: b(beat), note, duration: b(dur),
}));

export const allegro: Song = {
  id: 'suzuki-allegro',
  title: 'Allegro',
  artist: 'Suzuki',
  difficulty: 'Medium',
  bpm: BPM,
  noteRange: { lowest: 55, highest: 67, whiteKeysOnly: false },
  notes,
  pianoNotes,
  pianoNoteRange: { lowest: 43, highest: 67, whiteKeysOnly: false },
};
