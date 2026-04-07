import { Song, SongNote, MidiNote } from '@/types/game';
import { beatsToSeconds } from '@/utils/beats';

const BPM = 85;
const b = (beat: number) => beatsToSeconds(beat, BPM);

const C4 = 60, D4 = 62, E4 = 64;

// Au Clair de la Lune — classic French melody, only 3 notes
const melody: [number, MidiNote, number][] = [
  // Phrase 1: "Au clair de la lu-ne"
  [0, C4, 1], [1, C4, 1], [2, C4, 1], [3, D4, 1],
  [4, E4, 2], [6, D4, 2],
  // Phrase 2: "Mon ami Pier-rot"
  [8, C4, 1], [9, E4, 1], [10, D4, 1], [11, D4, 1],
  [12, C4, 3],

  // Phrase 3 (repeat): "Au clair de la lu-ne"
  [16, C4, 1], [17, C4, 1], [18, C4, 1], [19, D4, 1],
  [20, E4, 2], [22, D4, 2],
  // Phrase 4: "Mon ami Pier-rot"
  [24, C4, 1], [25, E4, 1], [26, D4, 1], [27, D4, 1],
  [28, C4, 3],
];

const notes: SongNote[] = melody.map(([beat, note, dur]) => ({
  time: b(beat),
  note,
  duration: b(dur),
}));

export const auClairDeLaLune: Song = {
  id: 'beginner-au-clair',
  title: 'Au Clair de la Lune',
  artist: 'Traditional (French)',
  difficulty: 'Easy',
  bpm: BPM,
  noteRange: { lowest: 60, highest: 64, whiteKeysOnly: true },
  notes,
};
