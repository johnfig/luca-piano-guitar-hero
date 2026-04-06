import { Song, SongNote, MidiNote } from '@/types/game';
import { beatsToSeconds } from '@/utils/beats';

const BPM = 110;
const b = (beat: number) => beatsToSeconds(beat, BPM);

const C4 = 60, D4 = 62, E4 = 64, G4 = 67;

// Mary Had a Little Lamb
// E D C D E E E | D D D | E G G | E D C D E E E E D D E D C
const melody: [number, MidiNote][] = [
  // "Mary had a little lamb"
  [0, E4], [1, D4], [2, C4], [3, D4], [4, E4], [5, E4], [6, E4],
  // "Little lamb, little lamb"
  [8, D4], [9, D4], [10, D4],
  // "Mary had a"
  [12, E4], [13, G4], [14, G4],
  // "Little lamb, its fleece was white as snow"
  [16, E4], [17, D4], [18, C4], [19, D4], [20, E4], [21, E4], [22, E4], [23, E4],
  [24, D4], [25, D4], [26, E4], [27, D4], [28, C4],
];

const notes: SongNote[] = melody.map(([beat, note]) => ({
  time: b(beat),
  note,
  duration: b(1),
}));

export const maryHadALittleLamb: Song = {
  id: 'mary-had-a-little-lamb',
  title: 'Mary Had a Little Lamb',
  artist: 'Traditional',
  difficulty: 'Easy',
  bpm: BPM,
  noteRange: { lowest: 60, highest: 72, whiteKeysOnly: true },
  notes,
};
