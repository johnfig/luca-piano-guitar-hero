import { Song, SongNote, MidiNote } from '@/types/game';
import { beatsToSeconds } from '@/utils/beats';

const BPM = 80;
const b = (beat: number) => beatsToSeconds(beat, BPM);

const C4 = 60, D4 = 62, E4 = 64;

// Hot Cross Buns — the very first song every child learns
// Only 3 notes: E D C
const melody: [number, MidiNote, number][] = [
  // "Hot cross buns"
  [0, E4, 1], [1, D4, 1], [2, C4, 2],
  // "Hot cross buns"
  [4, E4, 1], [5, D4, 1], [6, C4, 2],
  // "One a penny, two a penny"
  [8, C4, 0.5], [8.5, C4, 0.5], [9, C4, 0.5], [9.5, C4, 0.5],
  [10, D4, 0.5], [10.5, D4, 0.5], [11, D4, 0.5], [11.5, D4, 0.5],
  // "Hot cross buns"
  [12, E4, 1], [13, D4, 1], [14, C4, 2],
];

const notes: SongNote[] = melody.map(([beat, note, dur]) => ({
  time: b(beat),
  note,
  duration: b(dur),
}));

export const hotCrossBuns: Song = {
  id: 'beginner-hot-cross-buns',
  title: 'Hot Cross Buns',
  artist: 'Traditional',
  difficulty: 'Easy',
  bpm: BPM,
  noteRange: { lowest: 60, highest: 64, whiteKeysOnly: true },
  notes,
};
