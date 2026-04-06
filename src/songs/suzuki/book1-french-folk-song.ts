import { Song, SongNote, MidiNote } from '@/types/game';
import { beatsToSeconds } from '@/utils/beats';

const BPM = 96;
const b = (beat: number) => beatsToSeconds(beat, BPM);

// MIDI constants used
const C4 = 60, D4 = 62, E4 = 64, F4 = 65, G4 = 67, A4 = 69, C5 = 72;

// French Folk Song (Au Clair de la Lune style, simplified)
// A simple stepwise melody in C major
const melody: [number, MidiNote, number][] = [
  // Phrase 1: C D E C | D E F D
  [0, C4, 1], [1, D4, 1], [2, E4, 1], [3, C4, 1],
  [4, D4, 1], [5, E4, 1], [6, F4, 1], [7, D4, 1],
  // Phrase 2: E F G E | F E D C
  [8, E4, 1], [9, F4, 1], [10, G4, 1], [11, E4, 1],
  [12, F4, 1], [13, E4, 1], [14, D4, 1], [15, C4, 1],
  // Phrase 3 (repeat of phrase 1): C D E C | D E F D
  [16, C4, 1], [17, D4, 1], [18, E4, 1], [19, C4, 1],
  [20, D4, 1], [21, E4, 1], [22, F4, 1], [23, D4, 1],
  // Phrase 4 (ending variation): E D C D | E F G C
  [24, E4, 1], [25, D4, 1], [26, C4, 1], [27, D4, 1],
  [28, E4, 1], [29, F4, 0.5], [30, E4, 0.5], [30.5, D4, 0.5], [31, C4, 2],
];

const notes: SongNote[] = melody.map(([beat, note, dur]) => ({
  time: b(beat),
  note,
  duration: b(dur),
}));

export const frenchFolkSong: Song = {
  id: 'suzuki-french-folk-song',
  title: 'French Folk Song',
  artist: 'Traditional',
  difficulty: 'Easy',
  bpm: BPM,
  noteRange: { lowest: 60, highest: 72, whiteKeysOnly: true },
  notes,
};
