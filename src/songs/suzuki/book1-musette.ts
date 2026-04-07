import { Song, SongNote, MidiNote } from '@/types/game';
import { beatsToSeconds } from '@/utils/beats';

const BPM = 96;
const b = (beat: number) => beatsToSeconds(beat, BPM);

// Musette - J.S. Bach (from Notebook for Anna Magdalena Bach)
// Suzuki Book 1 arrangement in D major (F#, C#)

// Right hand MIDI constants
const D4 = 62, E4 = 64, Fs4 = 66, G4 = 67, A4 = 69, B4 = 71, Cs5 = 73, D5 = 74;

// Left hand MIDI constants
const A2 = 45, D3 = 50;

// ===== RIGHT HAND (authentic D major melody with F# and C#) =====
const rightHand: [number, MidiNote, number][] = [
  // Section A
  // Phrase 1: E F# G A B
  [0, E4, 0.5], [0.5, Fs4, 0.5], [1, G4, 0.5], [1.5, A4, 0.5], [2, B4, 1],
  // Phrase 2: A G F# E D
  [3, A4, 0.5], [3.5, G4, 0.5], [4, Fs4, 0.5], [4.5, E4, 0.5], [5, D4, 1],
  // Phrase 3: E F# G A B
  [6, E4, 0.5], [6.5, Fs4, 0.5], [7, G4, 0.5], [7.5, A4, 0.5], [8, B4, 1],
  // Phrase 4: C# B A G F# | E --
  [9, Cs5, 0.5], [9.5, B4, 0.5], [10, A4, 0.5], [10.5, G4, 0.5], [11, Fs4, 1],
  [12, E4, 2],
  // Section B (variation)
  // Phrase 5: B C# D5 C# B
  [14, B4, 0.5], [14.5, Cs5, 0.5], [15, D5, 0.5], [15.5, Cs5, 0.5], [16, B4, 1],
  // Phrase 6: A B C# B A
  [17, A4, 0.5], [17.5, B4, 0.5], [18, Cs5, 0.5], [18.5, B4, 0.5], [19, A4, 1],
  // Phrase 7: G A B A G
  [20, G4, 0.5], [20.5, A4, 0.5], [21, B4, 0.5], [21.5, A4, 0.5], [22, G4, 1],
  // Phrase 8: F# G A G F# | E --
  [23, Fs4, 0.5], [23.5, G4, 0.5], [24, A4, 0.5], [24.5, G4, 0.5], [25, Fs4, 1],
  [26, E4, 2],
  // Section A return (abbreviated)
  // Phrase 9: E F# G A B
  [28, E4, 0.5], [28.5, Fs4, 0.5], [29, G4, 0.5], [29.5, A4, 0.5], [30, B4, 1],
  // Phrase 10: C# B A G F# E D E | E --
  [31, Cs5, 0.5], [31.5, B4, 0.5], [32, A4, 0.5], [32.5, G4, 0.5], [33, Fs4, 0.5],
  [33.5, E4, 0.5], [34, D4, 0.5], [34.5, E4, 0.5], [35, E4, 2],
];

// ===== LEFT HAND (authentic musette drone bass in D major) =====
// The musette genre imitates a bagpipe with a sustained tonic pedal drone.
// D3 drone throughout Section A, A2 for dominant bars in Section B.
const leftHand: [number, MidiNote, number][] = [
  // Section A - D drone (tonic pedal)
  [0, D3, 2],
  [2, D3, 2],
  [4, D3, 2],
  [6, D3, 2],
  [8, D3, 2],
  [10, D3, 2],
  [12, D3, 2],
  // Section B - alternating dominant (A2) and tonic (D3)
  [14, D3, 2],
  [16, D3, 2],
  [17, A2, 2],
  [19, A2, 2],
  [20, D3, 2],
  [22, D3, 2],
  [23, A2, 2],
  [25, A2, 2],
  [26, D3, 2],
  // Section A return - D drone
  [28, D3, 2],
  [30, D3, 2],
  [32, D3, 2],
  [34, D3, 2],
];

const notes: SongNote[] = rightHand.map(([beat, note, dur]) => ({
  time: b(beat), note, duration: b(dur),
}));

const bothHands = [...rightHand, ...leftHand].sort((a, b) => a[0] - b[0]);
const pianoNotes: SongNote[] = bothHands.map(([beat, note, dur]) => ({
  time: b(beat), note, duration: b(dur),
}));

export const musette: Song = {
  id: 'suzuki-musette',
  title: 'Musette',
  artist: 'J.S. Bach',
  difficulty: 'Medium',
  bpm: BPM,
  noteRange: { lowest: 62, highest: 74, whiteKeysOnly: false },
  notes,
  pianoNotes,
  pianoNoteRange: { lowest: 45, highest: 74, whiteKeysOnly: false },
};
