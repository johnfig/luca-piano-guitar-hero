import { Song, SongNote, MidiNote } from '@/types/game';
import { beatsToSeconds } from '@/utils/beats';

const BPM = 130;
const b = (beat: number) => beatsToSeconds(beat, BPM);

const C4 = 60, D4 = 62, E4 = 64, F4 = 65, G4 = 67, A4 = 69, B4 = 71, C5 = 72;

// Fur Elise - Beethoven (simplified for white keys)
const melody: [number, MidiNote, number][] = [
  // Opening motif (the iconic part) - repeat 1
  [0, E4, 0.5],
  [0.5, D4, 0.5],
  [1, E4, 0.5],
  [1.5, D4, 0.5],
  [2, E4, 0.5],
  [2.5, B4, 0.5],
  [3, D4, 0.5],
  [3.5, C4, 0.5],
  // A minor resolution
  [4, A4, 1],

  // C E A ascending
  [5.5, C4, 0.5],
  [6, E4, 0.5],
  [6.5, A4, 0.5],
  // B resolving
  [7, B4, 1],

  // E G B ascending
  [8.5, E4, 0.5],
  [9, G4, 0.5],
  [9.5, B4, 0.5],
  // C5 resolving
  [10, C5, 1],

  // Opening motif repeat 2
  [11.5, E4, 0.5],
  [12, D4, 0.5],
  [12.5, E4, 0.5],
  [13, D4, 0.5],
  [13.5, E4, 0.5],
  [14, B4, 0.5],
  [14.5, D4, 0.5],
  [15, C4, 0.5],
  // A minor resolution
  [15.5, A4, 1],

  // C E A ascending
  [17, C4, 0.5],
  [17.5, E4, 0.5],
  [18, A4, 0.5],
  // B resolving
  [18.5, B4, 1],

  // E C B A descending resolution
  [20, E4, 0.5],
  [20.5, C5, 0.5],
  [21, B4, 0.5],
  [21.5, A4, 1.5],

  // Second section - descending pattern
  [23.5, B4, 0.5],
  [24, C5, 0.5],
  [24.5, D4, 0.5],
  [25, E4, 1],

  [26.5, G4, 0.5],
  [27, F4, 0.5],
  [27.5, E4, 0.5],
  [28, D4, 1],

  [29.5, F4, 0.5],
  [30, E4, 0.5],
  [30.5, D4, 0.5],
  [31, C4, 1],

  // Final motif return
  [32.5, E4, 0.5],
  [33, D4, 0.5],
  [33.5, E4, 0.5],
  [34, D4, 0.5],
  [34.5, E4, 0.5],
  [35, B4, 0.5],
  [35.5, D4, 0.5],
  [36, C4, 0.5],
  [36.5, A4, 1.5],
];

const notes: SongNote[] = melody.map(([beat, note, dur]) => ({
  time: b(beat),
  note,
  duration: b(dur),
}));

export const furElise: Song = {
  id: 'fur-elise',
  title: 'Fur Elise',
  artist: 'Ludwig van Beethoven',
  difficulty: 'Medium',
  bpm: BPM,
  noteRange: { lowest: 60, highest: 72, whiteKeysOnly: true },
  notes,
};
