import { Song, SongNote, MidiNote } from '@/types/game';
import { beatsToSeconds } from '@/utils/beats';

const BPM = 85;
const b = (beat: number) => beatsToSeconds(beat, BPM);

const C4 = 60, D4 = 62, E4 = 64, F4 = 65, G4 = 67;

// Row Row Row Your Boat — uses 5 notes (C D E F G)
const melody: [number, MidiNote, number][] = [
  // "Row, row, row your boat"
  [0, C4, 1.5], [1.5, C4, 0.5], [2, C4, 1], [3, D4, 0.5], [3.5, E4, 1.5],
  // "Gent-ly down the stream"
  [5, E4, 1], [6, D4, 0.5], [6.5, E4, 1], [7.5, F4, 0.5], [8, G4, 3],
  // "Mer-ri-ly, mer-ri-ly, mer-ri-ly, mer-ri-ly"
  [11, G4, 0.5], [11.5, G4, 0.5], [12, E4, 0.5], [12.5, E4, 0.5],
  [13, C4, 0.5], [13.5, C4, 0.5],
  // "Life is but a dream"
  [14, G4, 1], [15, F4, 0.5], [15.5, E4, 1], [16.5, D4, 0.5], [17, C4, 3],
];

const notes: SongNote[] = melody.map(([beat, note, dur]) => ({
  time: b(beat),
  note,
  duration: b(dur),
}));

export const rowRowRow: Song = {
  id: 'beginner-row-row-row',
  title: 'Row Row Row Your Boat',
  artist: 'Traditional',
  difficulty: 'Easy',
  bpm: BPM,
  noteRange: { lowest: 60, highest: 67, whiteKeysOnly: true },
  notes,
};
