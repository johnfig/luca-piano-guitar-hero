import { Song, SongNote, MidiNote } from '@/types/game';
import { beatsToSeconds } from '@/utils/beats';

const BPM = 80;
const b = (beat: number) => beatsToSeconds(beat, BPM);

const C4 = 60, D4 = 62, E4 = 64;

// Rain Rain Go Away — simple 3-note children's song
const melody: [number, MidiNote, number][] = [
  // "Rain, rain, go a-way"
  [0, E4, 1], [1, E4, 1], [2, D4, 1], [3, D4, 1], [4, C4, 2],
  // "Come a-gain a-no-ther day"
  [6, E4, 1], [7, E4, 1], [8, D4, 1], [9, D4, 1], [10, C4, 2],
  // "Lit-tle John-ny wants to play"
  [12, C4, 1], [13, C4, 1], [14, D4, 1], [15, D4, 1], [16, E4, 2],
  // "Rain, rain, go a-way"
  [18, E4, 1], [19, E4, 1], [20, D4, 1], [21, D4, 1], [22, C4, 2],
];

const notes: SongNote[] = melody.map(([beat, note, dur]) => ({
  time: b(beat),
  note,
  duration: b(dur),
}));

export const rainRain: Song = {
  id: 'beginner-rain-rain',
  title: 'Rain Rain Go Away',
  artist: 'Traditional',
  difficulty: 'Easy',
  bpm: BPM,
  noteRange: { lowest: 60, highest: 64, whiteKeysOnly: true },
  notes,
};
