import { Song, SongNote, MidiNote } from '@/types/game';
import { beatsToSeconds } from '@/utils/beats';

const BPM = 96;
const b = (beat: number) => beatsToSeconds(beat, BPM);

// MIDI constants used
const C4 = 60, D4 = 62, E4 = 64, F4 = 65, G4 = 67, A4 = 69, B4 = 71, C5 = 72;

// Musette - J.S. Bach (from Notebook for Anna Magdalena Bach)
// Suzuki Book 1 arrangement, white keys only
// In D major originally, simplified to C major for white keys
const melody: [number, MidiNote, number][] = [
  // Section A
  // Phrase 1: D E F G A
  [0, D4, 0.5], [0.5, E4, 0.5], [1, F4, 0.5], [1.5, G4, 0.5], [2, A4, 1],
  // Phrase 2: G F E D C
  [3, G4, 0.5], [3.5, F4, 0.5], [4, E4, 0.5], [4.5, D4, 0.5], [5, C4, 1],
  // Phrase 3: D E F G A
  [6, D4, 0.5], [6.5, E4, 0.5], [7, F4, 0.5], [7.5, G4, 0.5], [8, A4, 1],
  // Phrase 4: B A G F E | D --
  [9, B4, 0.5], [9.5, A4, 0.5], [10, G4, 0.5], [10.5, F4, 0.5], [11, E4, 1],
  [12, D4, 2],
  // Section B (variation)
  // Phrase 5: A B C5 B A
  [14, A4, 0.5], [14.5, B4, 0.5], [15, C5, 0.5], [15.5, B4, 0.5], [16, A4, 1],
  // Phrase 6: G A B A G
  [17, G4, 0.5], [17.5, A4, 0.5], [18, B4, 0.5], [18.5, A4, 0.5], [19, G4, 1],
  // Phrase 7: F G A G F
  [20, F4, 0.5], [20.5, G4, 0.5], [21, A4, 0.5], [21.5, G4, 0.5], [22, F4, 1],
  // Phrase 8: E F G F E | D --
  [23, E4, 0.5], [23.5, F4, 0.5], [24, G4, 0.5], [24.5, F4, 0.5], [25, E4, 1],
  [26, D4, 2],
  // Section A return (abbreviated)
  // Phrase 9: D E F G A
  [28, D4, 0.5], [28.5, E4, 0.5], [29, F4, 0.5], [29.5, G4, 0.5], [30, A4, 1],
  // Phrase 10: B A G F E | D --
  [31, B4, 0.5], [31.5, A4, 0.5], [32, G4, 0.5], [32.5, F4, 0.5], [33, E4, 0.5],
  [33.5, D4, 0.5], [34, C4, 0.5], [34.5, D4, 0.5], [35, D4, 2],
];

const notes: SongNote[] = melody.map(([beat, note, dur]) => ({
  time: b(beat),
  note,
  duration: b(dur),
}));

export const musette: Song = {
  id: 'suzuki-musette',
  title: 'Musette',
  artist: 'J.S. Bach',
  difficulty: 'Medium',
  bpm: BPM,
  noteRange: { lowest: 60, highest: 72, whiteKeysOnly: true },
  notes,
};
