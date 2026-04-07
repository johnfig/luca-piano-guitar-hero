import { Song, SongNote, MidiNote } from '@/types/game';
import { beatsToSeconds } from '@/utils/beats';

const BPM = 68;
const b = (beat: number) => beatsToSeconds(beat, BPM);

const C4 = 60, D4 = 62, E4 = 64, F4 = 65, G4 = 67, A4 = 69, B4 = 71, C5 = 72;

// Let It Go - from Frozen (Kristen Anderson-Lopez & Robert Lopez)
// Chorus transposed to C major from original Ab major (scale: Ab→C, Bb→D, C→E, Db→F, Eb→G)
const melody: [number, MidiNote, number][] = [
  // "Let it go, let it go"
  [0, C4, 1],
  [1, D4, 1],
  [2, E4, 2.5],

  [4.5, C4, 0.5],
  [5, D4, 1],
  [6, E4, 1],
  [7, G4, 2],

  // "Can't hold it back any-more"
  [9, C4, 0.5],
  [9.5, D4, 0.5],
  [10, E4, 1],
  [11, G4, 1],
  [12, F4, 2.5],

  [14.5, E4, 0.5],
  [15, D4, 2],

  // "Let it go, let it go"
  [17, C4, 1],
  [18, D4, 1],
  [19, E4, 2.5],

  [21.5, C4, 0.5],
  [22, D4, 1],
  [23, E4, 1],
  [24, G4, 2],

  // "Turn a-way and slam the door"
  [26, G4, 0.5],
  [26.5, F4, 0.5],
  [27, E4, 1],
  [28, F4, 1],
  [29, E4, 1],
  [30, D4, 1],
  [31, C4, 2],

  // "I don't care what they're going to say"
  [33, E4, 0.5],
  [33.5, F4, 0.5],
  [34, G4, 1],
  [35, G4, 0.5],
  [35.5, F4, 0.5],
  [36, E4, 1],
  [37, F4, 0.5],
  [37.5, G4, 0.5],
  [38, A4, 2],

  // "Let the storm rage on"
  [40, A4, 0.5],
  [40.5, B4, 0.5],
  [41, C5, 1.5],
  [42.5, B4, 0.5],
  [43, A4, 1],
  [44, G4, 2],
];

const notes: SongNote[] = melody.map(([beat, note, dur]) => ({
  time: b(beat),
  note,
  duration: b(dur),
}));

export const letItGo: Song = {
  id: 'popular-let-it-go',
  title: 'Let It Go',
  artist: 'Kristen Anderson-Lopez & Robert Lopez',
  difficulty: 'Medium',
  bpm: BPM,
  noteRange: { lowest: 60, highest: 72, whiteKeysOnly: true },
  notes,
};
