import { Song, SongNote, MidiNote } from '@/types/game';
import { beatsToSeconds } from '@/utils/beats';

const BPM = 84;
const b = (beat: number) => beatsToSeconds(beat, BPM);

// Andantino - Suzuki Book 1
// Lyrical piece in G major (F#)

// Right hand MIDI constants
const D4 = 62, E4 = 64, Fs4 = 66, G4 = 67, A4 = 69;

// Left hand MIDI constants
const G2 = 43, D3 = 50, G3 = 55, C3 = 48, A2 = 45, E3 = 52, B2 = 47;

// ===== RIGHT HAND (authentic G major melody with F#) =====
const rightHand: [number, MidiNote, number][] = [
  // Phrase 1: D4 E4 F#4 G4 | A4 G4 F#4 E4
  [0, D4, 1], [1, E4, 1], [2, Fs4, 1], [3, G4, 1],
  [4, A4, 1], [5, G4, 1], [6, Fs4, 1], [7, E4, 1],
  // Phrase 2: D4 E4 F#4 D4 | E4 --- D4 ---
  [8, D4, 1], [9, E4, 1], [10, Fs4, 1], [11, D4, 1],
  [12, E4, 2], [14, D4, 2],
  // Phrase 3: D4 E4 F#4 G4 | A4 G4 F#4 E4
  [16, D4, 1], [17, E4, 1], [18, Fs4, 1], [19, G4, 1],
  [20, A4, 1], [21, G4, 1], [22, Fs4, 1], [23, E4, 1],
  // Phrase 4: D4 F#4 A4 D4 | E4 F#4 E4 D4
  [24, D4, 1], [25, Fs4, 1], [26, A4, 1], [27, D4, 1],
  [28, E4, 1], [29, Fs4, 0.5], [29.5, E4, 0.5], [30, D4, 2],
  // Phrase 5 (B section): F#4 G4 A4 F#4 | G4 F#4 E4
  [32, Fs4, 1], [33, G4, 1], [34, A4, 1], [35, Fs4, 1],
  [36, G4, 1.5], [37.5, Fs4, 0.5], [38, E4, 2],
  // Phrase 6 (closing): D4 E4 F#4 G4 | F#4 E4 D4 ---
  [40, D4, 1], [41, E4, 1], [42, Fs4, 1], [43, G4, 1],
  [44, Fs4, 1], [45, E4, 1], [46, D4, 2],
];

// ===== LEFT HAND (root-fifth bass in G major) =====
const leftHand: [number, MidiNote, number][] = [
  // Phrase 1: G chord (G2-D3), D chord, G chord
  [0, G2, 1], [1, D3, 1], [2, G2, 1], [3, D3, 1],
  [4, G3, 1], [5, D3, 1], [6, G2, 1], [7, D3, 1],
  // Phrase 2: G (G2-D3), A minor, D chord
  [8, G2, 1], [9, D3, 1], [10, A2, 1], [11, D3, 1],
  [12, A2, 1], [13, E3, 1], [14, D3, 1], [15, A2, 1],
  // Phrase 3: G chord (G2-D3), repeat
  [16, G2, 1], [17, D3, 1], [18, G2, 1], [19, D3, 1],
  [20, G3, 1], [21, D3, 1], [22, G2, 1], [23, D3, 1],
  // Phrase 4: G-D-Em cadence, resolve to G
  [24, G2, 1], [25, D3, 1], [26, A2, 1], [27, D3, 1],
  [28, A2, 1], [29, D3, 1], [30, G2, 2],
  // Phrase 5 (B section): D chord (D3-A2), Em (E3-B2)
  [32, D3, 1], [33, A2, 1], [34, D3, 1], [35, A2, 1],
  [36, E3, 1], [37, B2, 1], [38, A2, 1], [39, E3, 1],
  // Phrase 6: G-D cadence, resolve to G
  [40, G2, 1], [41, D3, 1], [42, G2, 1], [43, D3, 1],
  [44, A2, 1], [45, D3, 1], [46, G2, 2],
];

const notes: SongNote[] = rightHand.map(([beat, note, dur]) => ({
  time: b(beat), note, duration: b(dur),
}));

const bothHands = [...rightHand, ...leftHand].sort((a, b) => a[0] - b[0]);
const pianoNotes: SongNote[] = bothHands.map(([beat, note, dur]) => ({
  time: b(beat), note, duration: b(dur),
}));

export const andantino: Song = {
  id: 'suzuki-andantino',
  title: 'Andantino',
  artist: 'Suzuki',
  difficulty: 'Medium',
  bpm: BPM,
  noteRange: { lowest: 62, highest: 69, whiteKeysOnly: false },
  notes,
  pianoNotes,
  pianoNoteRange: { lowest: 43, highest: 69, whiteKeysOnly: false },
};
