import { Song, SongNote, MidiNote } from '@/types/game';
import { beatsToSeconds } from '@/utils/beats';

const BPM = 100;
const b = (beat: number) => beatsToSeconds(beat, BPM);

const C4 = 60, D4 = 62, E4 = 64, F4 = 65, G4 = 67, A4 = 69, C5 = 72;
const Bb4 = 70; // Bb4 needed for last phrase

// Happy Birthday - Traditional
// In C major — the last phrase uses Bb (b7) which is standard for this song
const melody: [number, MidiNote, number][] = [
  // "Hap-py birth-day to you"
  [0, C4, 0.75],
  [0.75, C4, 0.25],
  [1, D4, 1],
  [2, C4, 1],
  [3, F4, 1],
  [4, E4, 2],

  // "Hap-py birth-day to you"
  [6, C4, 0.75],
  [6.75, C4, 0.25],
  [7, D4, 1],
  [8, C4, 1],
  [9, G4, 1],
  [10, F4, 2],

  // "Hap-py birth-day dear ___"
  [12, C4, 0.75],
  [12.75, C4, 0.25],
  [13, C5, 1],
  [14, A4, 1],
  [15, F4, 1],
  [16, E4, 1],
  [17, D4, 1],

  // "Hap-py birth-day to you"
  [18.5, Bb4, 0.75],
  [19.25, Bb4, 0.25],
  [20, A4, 1],
  [21, F4, 1],
  [22, G4, 1],
  [23, F4, 2],
];

const notes: SongNote[] = melody.map(([beat, note, dur]) => ({
  time: b(beat),
  note,
  duration: b(dur),
}));

export const happyBirthday: Song = {
  id: 'popular-happy-birthday',
  title: 'Happy Birthday',
  artist: 'Traditional',
  difficulty: 'Easy',
  bpm: BPM,
  noteRange: { lowest: 60, highest: 72, whiteKeysOnly: false },
  notes,
};
