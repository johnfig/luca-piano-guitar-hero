import { Song, SongNote, MidiNote } from '@/types/game';
import { beatsToSeconds } from '@/utils/beats';

const BPM = 120;
const b = (beat: number) => beatsToSeconds(beat, BPM);

const C4 = 60, D4 = 62, E4 = 64, F4 = 65, G4 = 67;

// Jingle Bells - James Lord Pierpont
// Chorus in C major, white keys only
const melody: [number, MidiNote, number][] = [
  // "Jin-gle bells, jin-gle bells, jin-gle all the way"
  [0, E4, 1],
  [1, E4, 1],
  [2, E4, 2],

  [4, E4, 1],
  [5, E4, 1],
  [6, E4, 2],

  [8, E4, 1],
  [9, G4, 1],
  [10, C4, 1.5],
  [11.5, D4, 0.5],
  [12, E4, 2],

  // "Oh what fun it is to ride in a one-horse o-pen sleigh"
  [14, F4, 1],
  [15, F4, 1],
  [16, F4, 1.5],
  [17.5, F4, 0.5],
  [18, F4, 1],
  [19, E4, 1],
  [20, E4, 1],
  [21, E4, 0.5],
  [21.5, E4, 0.5],
  [22, E4, 1],
  [23, D4, 1],
  [24, D4, 1],
  [25, E4, 1],
  [26, D4, 2],
  [28, G4, 2],

  // Repeat chorus: "Jin-gle bells, jin-gle bells, jin-gle all the way"
  [30, E4, 1],
  [31, E4, 1],
  [32, E4, 2],

  [34, E4, 1],
  [35, E4, 1],
  [36, E4, 2],

  [38, E4, 1],
  [39, G4, 1],
  [40, C4, 1.5],
  [41.5, D4, 0.5],
  [42, E4, 2],

  // "Oh what fun it is to ride in a one-horse o-pen sleigh"
  [44, F4, 1],
  [45, F4, 1],
  [46, F4, 1.5],
  [47.5, F4, 0.5],
  [48, F4, 1],
  [49, E4, 1],
  [50, E4, 1],
  [51, E4, 0.5],
  [51.5, E4, 0.5],
  [52, G4, 1],
  [53, G4, 1],
  [54, F4, 1],
  [55, D4, 1],
  [56, C4, 2],
];

const notes: SongNote[] = melody.map(([beat, note, dur]) => ({
  time: b(beat),
  note,
  duration: b(dur),
}));

export const jingleBells: Song = {
  id: 'popular-jingle-bells',
  title: 'Jingle Bells',
  artist: 'James Lord Pierpont',
  difficulty: 'Easy',
  bpm: BPM,
  noteRange: { lowest: 60, highest: 67, whiteKeysOnly: true },
  notes,
};
