import { Song, SongNote, MidiNote } from '@/types/game';
import { beatsToSeconds } from '@/utils/beats';

const BPM = 100;
const b = (beat: number) => beatsToSeconds(beat, BPM);

// MIDI note constants
const C4 = 60, D4 = 62, E4 = 64, F4 = 65, G4 = 67, A4 = 69;

// Twinkle Twinkle Little Star
// C C G G A A G | F F E E D D C | G G F F E E D | G G F F E E D | C C G G A A G | F F E E D D C
const melody: [number, MidiNote][] = [
  // Line 1: "Twinkle twinkle little star"
  [0, C4], [1, C4], [2, G4], [3, G4], [4, A4], [5, A4], [6, G4],
  // Line 2: "How I wonder what you are"
  [8, F4], [9, F4], [10, E4], [11, E4], [12, D4], [13, D4], [14, C4],
  // Line 3: "Up above the world so high"
  [16, G4], [17, G4], [18, F4], [19, F4], [20, E4], [21, E4], [22, D4],
  // Line 4: "Like a diamond in the sky"
  [24, G4], [25, G4], [26, F4], [27, F4], [28, E4], [29, E4], [30, D4],
  // Line 5: "Twinkle twinkle little star"
  [32, C4], [33, C4], [34, G4], [35, G4], [36, A4], [37, A4], [38, G4],
  // Line 6: "How I wonder what you are"
  [40, F4], [41, F4], [42, E4], [43, E4], [44, D4], [45, D4], [46, C4],
];

const notes: SongNote[] = melody.map(([beat, note]) => ({
  time: b(beat),
  note,
  duration: b(1), // quarter note
}));

export const twinkleTwinkle: Song = {
  id: 'twinkle-twinkle',
  title: 'Twinkle Twinkle Little Star',
  artist: 'Traditional',
  difficulty: 'Easy',
  bpm: BPM,
  noteRange: { lowest: 60, highest: 72, whiteKeysOnly: true }, // C4 to C5
  notes,
};
