import { Song, SongNote, MidiNote } from '@/types/game';
import { beatsToSeconds } from '@/utils/beats';

const BPM = 96;
const b = (beat: number) => beatsToSeconds(beat, BPM);

// MIDI constants used
const C4 = 60, D4 = 62, E4 = 64, F4 = 65, G4 = 67, A4 = 69, C5 = 72;

// Long Long Ago - Thomas Haynes Bayly
// Suzuki Book 1 arrangement
const melody: [number, MidiNote, number][] = [
  // Phrase 1: "Tell me the tales" - C E G G | A G F E
  [0, C4, 1], [1, E4, 1], [2, G4, 1], [3, G4, 1],
  [4, A4, 1], [5, G4, 1], [6, F4, 1], [7, E4, 1],
  // Phrase 2: "that to me were so dear" - D F A A | G ---
  [8, D4, 1], [9, F4, 1], [10, A4, 1], [11, A4, 1],
  [12, G4, 2], [14, G4, 2],
  // Phrase 3: "Long long ago" - C E G G | A G F E
  [16, C4, 1], [17, E4, 1], [18, G4, 1], [19, G4, 1],
  [20, A4, 1], [21, G4, 1], [22, F4, 1], [23, E4, 1],
  // Phrase 4: "long long ago" - D D E F | E ---
  [24, D4, 1], [25, D4, 1], [26, E4, 1], [27, F4, 1],
  [28, E4, 2], [30, C4, 2],
];

const notes: SongNote[] = melody.map(([beat, note, dur]) => ({
  time: b(beat),
  note,
  duration: b(dur),
}));

export const longLongAgo: Song = {
  id: 'suzuki-long-long-ago',
  title: 'Long Long Ago',
  artist: 'Thomas Haynes Bayly',
  difficulty: 'Easy',
  bpm: BPM,
  noteRange: { lowest: 60, highest: 72, whiteKeysOnly: true },
  notes,
};
