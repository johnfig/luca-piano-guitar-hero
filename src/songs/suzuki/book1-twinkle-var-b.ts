import { Song, SongNote, MidiNote } from '@/types/game';
import { beatsToSeconds } from '@/utils/beats';

const BPM = 100;
const b = (beat: number) => beatsToSeconds(beat, BPM);

// MIDI constants used
const C4 = 60, D4 = 62, E4 = 64, F4 = 65, G4 = 67, A4 = 69;

// Twinkle Twinkle Variation B - dotted rhythm (long-short pattern)
// Each pair becomes dotted-quarter + eighth: 0.75 + 0.25 beats
// Stays in C major for piano beginners (no pianoNotes needed)
const melody: [number, MidiNote, number][] = [
  // Line 1: "Twinkle twinkle little star" - dotted rhythm
  [0, C4, 0.75], [0.75, C4, 0.25], [1, G4, 0.75], [1.75, G4, 0.25],
  [2, A4, 0.75], [2.75, A4, 0.25], [3, G4, 1],
  // Line 2: "How I wonder what you are"
  [4, F4, 0.75], [4.75, F4, 0.25], [5, E4, 0.75], [5.75, E4, 0.25],
  [6, D4, 0.75], [6.75, D4, 0.25], [7, C4, 1],
  // Line 3: "Up above the world so high"
  [8, G4, 0.75], [8.75, G4, 0.25], [9, F4, 0.75], [9.75, F4, 0.25],
  [10, E4, 0.75], [10.75, E4, 0.25], [11, D4, 1],
  // Line 4: "Like a diamond in the sky"
  [12, G4, 0.75], [12.75, G4, 0.25], [13, F4, 0.75], [13.75, F4, 0.25],
  [14, E4, 0.75], [14.75, E4, 0.25], [15, D4, 1],
  // Line 5: "Twinkle twinkle little star"
  [16, C4, 0.75], [16.75, C4, 0.25], [17, G4, 0.75], [17.75, G4, 0.25],
  [18, A4, 0.75], [18.75, A4, 0.25], [19, G4, 1],
  // Line 6: "How I wonder what you are"
  [20, F4, 0.75], [20.75, F4, 0.25], [21, E4, 0.75], [21.75, E4, 0.25],
  [22, D4, 0.75], [22.75, D4, 0.25], [23, C4, 1],
];

const notes: SongNote[] = melody.map(([beat, note, dur]) => ({
  time: b(beat),
  note,
  duration: b(dur),
}));

export const twinkleVarB: Song = {
  id: 'suzuki-twinkle-var-b',
  title: 'Twinkle Twinkle Variation B',
  artist: 'Suzuki',
  difficulty: 'Easy',
  bpm: BPM,
  noteRange: { lowest: 60, highest: 72, whiteKeysOnly: true },
  notes,
};
