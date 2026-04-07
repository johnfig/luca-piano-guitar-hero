import { Song, SongNote, MidiNote } from '@/types/game';
import { beatsToSeconds } from '@/utils/beats';

const BPM = 130;
const b = (beat: number) => beatsToSeconds(beat, BPM);

// Right hand notes
const C4 = 60, D4 = 62, E4 = 64, F4 = 65, G4 = 67, A4 = 69, B4 = 71, C5 = 72;
const Gs4 = 68; // G#4
const Ds5 = 75; // D#5
const D5 = 74;
const E5 = 76;

// Left hand bass notes
const E2 = 40;  // bass E for dominant chord
const G2 = 43;  // bass G for B section
const A2 = 45;
const C3 = 48, E3 = 52, G3 = 55;
const Gs3 = 56; // G#3
const A3 = 57, B3 = 59;

// ===== RIGHT HAND (one-hand version) =====
// Authentic Fur Elise melody in A minor with correct accidentals
const rightHand: [number, MidiNote, number][] = [
  // Opening motif - repeat 1
  [0, E5, 0.5],
  [0.5, Ds5, 0.5],
  [1, E5, 0.5],
  [1.5, Ds5, 0.5],
  [2, E5, 0.5],
  [2.5, B4, 0.5],
  [3, D5, 0.5],
  [3.5, C5, 0.5],
  // Am resolution — held dotted quarter (full 3/8 measure)
  [4, A4, 1.5],

  // RH arpeggio: C E A
  [5.5, C4, 0.5],
  [6, E4, 0.5],
  [6.5, A4, 0.5],
  // B resolving — held dotted quarter
  [7, B4, 1.5],

  // RH arpeggio: E G# B
  [8.5, E4, 0.5],
  [9, Gs4, 0.5],
  [9.5, B4, 0.5],
  // C5 resolving — held dotted quarter
  [10, C5, 1.5],

  // Opening motif repeat 2
  [11.5, E5, 0.5],
  [12, Ds5, 0.5],
  [12.5, E5, 0.5],
  [13, Ds5, 0.5],
  [13.5, E5, 0.5],
  [14, B4, 0.5],
  [14.5, D5, 0.5],
  [15, C5, 0.5],
  // Am resolution — held dotted quarter
  [15.5, A4, 1.5],

  // RH arpeggio: C E A
  [17, C4, 0.5],
  [17.5, E4, 0.5],
  [18, A4, 0.5],
  // B resolving — held dotted quarter
  [18.5, B4, 1.5],

  // RH descending: E C5 B A — final A held dotted quarter
  [20, E4, 0.5],
  [20.5, C5, 0.5],
  [21, B4, 0.5],
  [21.5, A4, 1.5],

  // B section — ascending sequence
  [23.5, B4, 0.5],
  [24, C5, 0.5],
  [24.5, D5, 0.5],
  [25, E5, 1.5],

  [26.5, G4, 0.5],
  [27, F4, 0.5],
  [27.5, E4, 0.5],
  [28, D4, 1.5],

  [29.5, F4, 0.5],
  [30, E4, 0.5],
  [30.5, D4, 0.5],
  [31, C4, 1.5],

  // Final motif return
  [32.5, E5, 0.5],
  [33, Ds5, 0.5],
  [33.5, E5, 0.5],
  [34, Ds5, 0.5],
  [34.5, E5, 0.5],
  [35, B4, 0.5],
  [35.5, D5, 0.5],
  [36, C5, 0.5],
  [36.5, A4, 1.5],
];

// ===== LEFT HAND (bass accompaniment from the actual score) =====
// In 3/8 time: each arpeggiated chord spans 3 eighth notes = 1.5 beats.
// LH rests during the E5-D#5 trill passages.
const leftHand: [number, MidiNote, number][] = [
  // === A section, first time ===

  // m3: A minor resolution (under RH A4 at beat 4)
  [4, A2, 0.5],
  [4.5, E3, 0.5],
  [5, A3, 0.5],

  // m4: LH rests (RH arpeggiation C-E-A)

  // m5: E major resolution (under RH B4 at beat 7)
  // Beethoven's score: E2-E3-G#3 arpeggio
  [7, E2, 0.5],
  [7.5, E3, 0.5],
  [8, Gs3, 0.5],

  // m6: LH rests (RH arpeggiation E-G#-B)

  // m7: A minor (under RH C5 at beat 10)
  [10, A2, 0.5],
  [10.5, E3, 0.5],
  [11, A3, 0.5],

  // Trill repeats (beats 11.5-15): LH rests

  // === A section, second time ===

  // Am resolution (under RH A4 at beat 15.5)
  [15.5, A2, 0.5],
  [16, E3, 0.5],
  [16.5, A3, 0.5],

  // E major (under RH B4 at beat 18.5) — E2-E3-G#3
  [18.5, E2, 0.5],
  [19, E3, 0.5],
  [19.5, Gs3, 0.5],

  // Am under final held A4 at beat 21.5
  [21.5, A2, 0.5],
  [22, E3, 0.5],
  [22.5, A3, 0.5],

  // === B section ===

  // C major (under ascending B-C-D-E, E5 at beat 25)
  // Beethoven's score: C3-G3-C4
  [23.5, C3, 0.5],
  [24, G3, 0.5],
  [24.5, C4, 0.5],

  // G major (under descending G-F-E, D4 at beat 28)
  // Beethoven's score: G2-G3-B3
  [26.5, G2, 0.5],
  [27, G3, 0.5],
  [27.5, B3, 0.5],

  // A minor (under descending F-E-D, C4 at beat 31)
  [29.5, A2, 0.5],
  [30, E3, 0.5],
  [30.5, A3, 0.5],

  // E unison (leading back to trill)
  // Beethoven's score: E2-E3-E4 (octave doubling, not a chord)
  [31, E2, 0.5],
  [31.5, E3, 0.5],
  [32, E4, 0.5],

  // === Final A section return ===

  // Am under final resolution (RH A4 at beat 36.5)
  [36.5, A2, 0.5],
  [37, E3, 0.5],
  [37.5, A3, 0.5],
];

const notes: SongNote[] = rightHand.map(([beat, note, dur]) => ({
  time: b(beat),
  note,
  duration: b(dur),
}));

// Two-hand version: RH + LH combined
const bothHands = [...rightHand, ...leftHand].sort((a, b) => a[0] - b[0]);
const pianoNotes: SongNote[] = bothHands.map(([beat, note, dur]) => ({
  time: b(beat),
  note,
  duration: b(dur),
}));

export const furElise: Song = {
  id: 'fur-elise',
  title: 'Fur Elise',
  artist: 'Ludwig van Beethoven',
  difficulty: 'Medium',
  bpm: BPM,
  noteRange: { lowest: 60, highest: 76, whiteKeysOnly: false },
  notes,
  pianoNotes,
  pianoNoteRange: { lowest: 40, highest: 76, whiteKeysOnly: false },
};
