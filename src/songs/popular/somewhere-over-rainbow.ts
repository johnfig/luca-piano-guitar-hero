import { Song, SongNote, MidiNote } from '@/types/game';
import { beatsToSeconds } from '@/utils/beats';

const BPM = 80;
const b = (beat: number) => beatsToSeconds(beat, BPM);

const C4 = 60, D4 = 62, E4 = 64, F4 = 65, G4 = 67, A4 = 69, B4 = 71, C5 = 72, D5 = 74, E5 = 76;

// Somewhere Over the Rainbow - Harold Arlen
// Simplified white-key arrangement in C major
// The iconic octave leap opening, then the lyrical melody
const melody: [number, MidiNote, number][] = [
  // "Some-where o-ver the rain-bow" (iconic octave leap)
  [0, C4, 2],
  [2, C5, 1.5],
  [3.5, B4, 0.5],
  [4, A4, 1],
  [5, B4, 1],
  [6, C5, 1],
  [7, A4, 1],

  // "way up high"
  [8, F4, 1.5],
  [9.5, G4, 0.5],
  [10, E4, 2],

  // "There's a land that I heard of once in a lull-a-by"
  [12, C4, 1],
  [13, D4, 1],
  [14, E4, 1],
  [15, F4, 0.5],
  [15.5, E4, 0.5],
  [16, D4, 1],
  [17, E4, 0.5],
  [17.5, F4, 0.5],
  [18, E4, 1],
  [19, D4, 1],
  [20, C4, 2],

  // "Some-where o-ver the rain-bow" (2nd verse)
  [22, C4, 2],
  [24, C5, 1.5],
  [25.5, B4, 0.5],
  [26, A4, 1],
  [27, B4, 1],
  [28, C5, 1],
  [29, A4, 1],

  // "skies are blue"
  [30, F4, 1.5],
  [31.5, G4, 0.5],
  [32, E4, 2],

  // "And the dreams that you dare to dream real-ly do come true"
  [34, C4, 1],
  [35, D4, 1],
  [36, E4, 1],
  [37, F4, 0.5],
  [37.5, G4, 0.5],
  [38, A4, 1],
  [39, G4, 0.5],
  [39.5, F4, 0.5],
  [40, E4, 1],
  [41, D4, 1],
  [42, C4, 2],
];

const notes: SongNote[] = melody.map(([beat, note, dur]) => ({
  time: b(beat),
  note,
  duration: b(dur),
}));

export const somewhereOverRainbow: Song = {
  id: 'popular-somewhere-over-rainbow',
  title: 'Somewhere Over the Rainbow',
  artist: 'Harold Arlen',
  difficulty: 'Medium',
  bpm: BPM,
  noteRange: { lowest: 60, highest: 72, whiteKeysOnly: true },
  notes,
};
