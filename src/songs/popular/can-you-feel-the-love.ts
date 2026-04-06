import { Song, SongNote, MidiNote } from '@/types/game';
import { beatsToSeconds } from '@/utils/beats';

const BPM = 76;
const b = (beat: number) => beatsToSeconds(beat, BPM);

const C4 = 60, D4 = 62, E4 = 64, F4 = 65, G4 = 67, A4 = 69, B4 = 71, C5 = 72;

// Can You Feel the Love Tonight - Elton John (from The Lion King)
// Simplified white-key chorus melody in C major
const melody: [number, MidiNote, number][] = [
  // "Can you feel the love to-night"
  [0, C4, 0.5],
  [0.5, E4, 0.5],
  [1, G4, 1.5],
  [2.5, F4, 0.5],
  [3, E4, 1],
  [4, F4, 1],
  [5, E4, 1],
  [6, D4, 2],

  // "It is where we are"
  [8, C4, 0.5],
  [8.5, E4, 0.5],
  [9, G4, 1.5],
  [10.5, A4, 0.5],
  [11, G4, 1],
  [12, F4, 1],
  [13, E4, 1],
  [14, C4, 2],

  // "It's e-nough for this wide-eyed"
  [16, C4, 0.5],
  [16.5, E4, 0.5],
  [17, G4, 1.5],
  [18.5, F4, 0.5],
  [19, E4, 1],
  [20, F4, 1],
  [21, E4, 1],
  [22, D4, 2],

  // "wan-der-er that we got this far"
  [24, D4, 0.5],
  [24.5, E4, 0.5],
  [25, F4, 1],
  [26, E4, 1],
  [27, D4, 0.5],
  [27.5, C4, 0.5],
  [28, D4, 1],
  [29, E4, 1],
  [30, C4, 2],

  // "And can you feel the love to-night"
  [32, C4, 0.5],
  [32.5, E4, 0.5],
  [33, A4, 2],
  [35, G4, 1],
  [36, F4, 1],
  [37, E4, 1],
  [38, D4, 2],

  // "How it's laid to rest"
  [40, C4, 0.5],
  [40.5, E4, 0.5],
  [41, G4, 1.5],
  [42.5, A4, 0.5],
  [43, G4, 1],
  [44, F4, 2],
];

const notes: SongNote[] = melody.map(([beat, note, dur]) => ({
  time: b(beat),
  note,
  duration: b(dur),
}));

export const canYouFeelTheLove: Song = {
  id: 'popular-can-you-feel-the-love',
  title: 'Can You Feel the Love Tonight',
  artist: 'Elton John',
  difficulty: 'Medium',
  bpm: BPM,
  noteRange: { lowest: 60, highest: 72, whiteKeysOnly: true },
  notes,
};
