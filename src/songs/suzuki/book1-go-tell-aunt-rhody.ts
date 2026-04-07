import { Song, SongNote, MidiNote } from '@/types/game';
import { beatsToSeconds } from '@/utils/beats';

const BPM = 100;
const b = (beat: number) => beatsToSeconds(beat, BPM);

// Go Tell Aunt Rhody - Traditional
// Suzuki Book 1 arrangement in G major (F#)

// Right hand MIDI constants
const D4 = 62, E4 = 64, Fs4 = 66, G4 = 67, A4 = 69, B4 = 71;

// Left hand MIDI constants
const G2 = 43, D3 = 50, G3 = 55, C3 = 48, B2 = 47, E3 = 52, A2 = 45;

// ===== RIGHT HAND (authentic G major melody) =====
const rightHand: [number, MidiNote, number][] = [
  // Phrase 1: "Go tell Aunt Rhody" - B B B A | G A B
  [0, B4, 1], [1, B4, 1], [2, B4, 1.5], [3.5, A4, 0.5],
  [4, G4, 1], [5, A4, 1], [6, B4, 2],
  // Phrase 2: D5 B A B | A G G
  [8, D4, 1], [9, B4, 1], [10, A4, 1], [11, B4, 1],
  [12, A4, 1.5], [13.5, G4, 0.5], [14, G4, 2],
  // Phrase 3: "The old grey goose is" - B B B A | G A B
  [16, B4, 1], [17, B4, 1], [18, B4, 1.5], [19.5, A4, 0.5],
  [20, G4, 1], [21, A4, 1], [22, B4, 2],
  // Phrase 4: A B D4 B | A G G
  [24, A4, 1], [25, B4, 1], [26, D4, 1], [27, B4, 1],
  [28, A4, 1.5], [29.5, G4, 0.5], [30, G4, 2],
];

// ===== LEFT HAND (root-fifth bass in G major) =====
const leftHand: [number, MidiNote, number][] = [
  // Phrase 1: G chord (root-fifth), C chord, G chord
  [0, G2, 1], [1, D3, 1], [2, G2, 1], [3, D3, 1],
  [4, C3, 1], [5, G2, 1], [6, G2, 1], [7, D3, 1],
  // Phrase 2: Em (E3-B2), D chord (D3-A2), G cadence
  [8, E3, 1], [9, B2, 1], [10, D3, 1], [11, G2, 1],
  [12, D3, 1], [13, A2, 1], [14, G2, 1], [15, D3, 1],
  // Phrase 3: G chord (root-fifth), C chord, G chord
  [16, G2, 1], [17, D3, 1], [18, G2, 1], [19, D3, 1],
  [20, C3, 1], [21, G2, 1], [22, G2, 1], [23, D3, 1],
  // Phrase 4: C chord, D chord, G cadence
  [24, C3, 1], [25, G3, 1], [26, D3, 1], [27, G2, 1],
  [28, D3, 1], [29, A2, 1], [30, G2, 2],
];

const notes: SongNote[] = rightHand.map(([beat, note, dur]) => ({
  time: b(beat), note, duration: b(dur),
}));

const bothHands = [...rightHand, ...leftHand].sort((a, b) => a[0] - b[0]);
const pianoNotes: SongNote[] = bothHands.map(([beat, note, dur]) => ({
  time: b(beat), note, duration: b(dur),
}));

export const goTellAuntRhody: Song = {
  id: 'suzuki-go-tell-aunt-rhody',
  title: 'Go Tell Aunt Rhody',
  artist: 'Traditional',
  difficulty: 'Easy',
  bpm: BPM,
  noteRange: { lowest: 62, highest: 71, whiteKeysOnly: true },
  notes,
  pianoNotes,
  pianoNoteRange: { lowest: 43, highest: 71, whiteKeysOnly: true },
};
