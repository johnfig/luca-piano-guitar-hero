import { Song, SongNote, MidiNote } from '@/types/game';
import { beatsToSeconds } from '@/utils/beats';

const BPM = 108;
const b = (beat: number) => beatsToSeconds(beat, BPM);

// MIDI constants used
const C4 = 60, D4 = 62, E4 = 64, F4 = 65, G4 = 67, A4 = 69, C5 = 72;

// London Bridge Is Falling Down
// Traditional melody in C major
const melody: [number, MidiNote, number][] = [
  // Phrase 1: "London Bridge is falling down" - G A G F | E F G
  [0, G4, 1.5], [1.5, A4, 0.5], [2, G4, 1], [3, F4, 1],
  [4, E4, 1], [5, F4, 1], [6, G4, 2],
  // Phrase 2: "My fair lady" - D E F | E F G
  [8, D4, 1], [9, E4, 1], [10, F4, 2],
  [12, E4, 1], [13, F4, 1], [14, G4, 2],
  // Phrase 3: "London Bridge is falling down" - G A G F | E F G
  [16, G4, 1.5], [17.5, A4, 0.5], [18, G4, 1], [19, F4, 1],
  [20, E4, 1], [21, F4, 1], [22, G4, 2],
  // Phrase 4: "My fair lady" - D G | E C
  [24, D4, 2], [26, G4, 2],
  [28, E4, 1.5], [29.5, D4, 0.5], [30, C4, 2],
];

const notes: SongNote[] = melody.map(([beat, note, dur]) => ({
  time: b(beat),
  note,
  duration: b(dur),
}));

export const londonBridge: Song = {
  id: 'suzuki-london-bridge',
  title: 'London Bridge Is Falling Down',
  artist: 'Traditional',
  difficulty: 'Easy',
  bpm: BPM,
  noteRange: { lowest: 60, highest: 72, whiteKeysOnly: true },
  notes,
};
