import { Song, SongNote, MidiNote } from '@/types/game';
import { beatsToSeconds } from '@/utils/beats';

const BPM = 108;
const b = (beat: number) => beatsToSeconds(beat, BPM);

// MIDI constants used
const C4 = 60, D4 = 62, E4 = 64, F4 = 65, G4 = 67, A4 = 69, C5 = 72;

// Allegretto - Suzuki Book 1
// This is essentially Ode to Joy's melody - a classic Suzuki piece
// Mixed rhythms with quarter and dotted patterns
const melody: [number, MidiNote, number][] = [
  // Line 1: E E F G | G F E D
  [0, E4, 1], [1, E4, 1], [2, F4, 1], [3, G4, 1],
  [4, G4, 1], [5, F4, 1], [6, E4, 1], [7, D4, 1],
  // Line 2: C C D E | E. D D-
  [8, C4, 1], [9, C4, 1], [10, D4, 1], [11, E4, 1],
  [12, E4, 1.5], [13.5, D4, 0.5], [14, D4, 2],
  // Line 3: E E F G | G F E D
  [16, E4, 1], [17, E4, 1], [18, F4, 1], [19, G4, 1],
  [20, G4, 1], [21, F4, 1], [22, E4, 1], [23, D4, 1],
  // Line 4: C C D E | D. C C-
  [24, C4, 1], [25, C4, 1], [26, D4, 1], [27, E4, 1],
  [28, D4, 1.5], [29.5, C4, 0.5], [30, C4, 2],
  // Line 5 (B section): D D E C | D E.F E C
  [32, D4, 1], [33, D4, 1], [34, E4, 1], [35, C4, 1],
  [36, D4, 1], [37, E4, 0.5], [37.5, F4, 0.5], [38, E4, 1], [39, C4, 1],
  // Line 6: D E.F E | D C D G
  [40, D4, 1], [41, E4, 0.5], [41.5, F4, 0.5], [42, E4, 1], [43, D4, 1],
  [44, C4, 1], [45, D4, 1], [46, G4, 2],
];

const notes: SongNote[] = melody.map(([beat, note, dur]) => ({
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
};
