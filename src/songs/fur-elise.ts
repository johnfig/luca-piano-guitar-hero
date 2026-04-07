import { Song, SongNote, MidiNote } from '@/types/game';
import { beatsToSeconds } from '@/utils/beats';

const BPM = 130;
const b = (beat: number) => beatsToSeconds(beat, BPM);

// NOTE: OCTAVE_OFFSET = -12 is applied by the engine, so every note plays
// one octave lower than written here. Write notes at the octave you see in
// the sheet music — the engine shifts them into the playable keyboard range.

// Right hand constants
const C4 = 60, D4 = 62, E4 = 64, F4 = 65, G4 = 67, A4 = 69, B4 = 71;
const C5 = 72, D5 = 74, E5 = 76;
const Gs4 = 68; // G#4
const Ds5 = 75; // D#5

// B section RH high notes (from Mutopia WoO59 score)
const F5 = 77, G5 = 79, A5 = 81, Bb5 = 82;
const Bb4 = 70;

// Left hand — A section (A minor)
const E2 = 40;
const A2 = 45;
const C3 = 48, E3 = 52, G3 = 55;
const Gs3 = 56; // G#3
const A3 = 57;

// Left hand — B section (F major / Bb major / C7)
const F3 = 53, Bb3 = 58;
// reuses: A3=57, C4=60, D4=62, G3=55, C3=48, E3=52

// ===== RIGHT HAND (one-hand: RH melody only) =====
// Source: Beethoven WoO 59, Mutopia Project / Breitkopf & Härtel 1888
const rightHand: [number, MidiNote, number][] = [
  // === A SECTION, first time (mm. 1–12) ===
  // Opening trill motif: E–D#–E–D#–E–B–D–C
  [0, E5, 0.5], [0.5, Ds5, 0.5], [1, E5, 0.5], [1.5, Ds5, 0.5],
  [2, E5, 0.5], [2.5, B4, 0.5], [3, D5, 0.5], [3.5, C5, 0.5],
  // Am resolution — A4 dotted quarter
  [4, A4, 1.5],
  // RH fills: ascending C–E–A arpeggio
  [5.5, C4, 0.5], [6, E4, 0.5], [6.5, A4, 0.5],
  // E dominant — B4 dotted quarter
  [7, B4, 1.5],
  // RH fills: ascending E–G#–B arpeggio
  [8.5, E4, 0.5], [9, Gs4, 0.5], [9.5, B4, 0.5],
  // Am — C5 dotted quarter
  [10, C5, 1.5],

  // Opening motif, second time (leads to 2nd ending)
  [11.5, E5, 0.5], [12, Ds5, 0.5], [12.5, E5, 0.5], [13, Ds5, 0.5],
  [13.5, E5, 0.5], [14, B4, 0.5], [14.5, D5, 0.5], [15, C5, 0.5],
  // Am resolution
  [15.5, A4, 1.5],
  // RH fills: C–E–A
  [17, C4, 0.5], [17.5, E4, 0.5], [18, A4, 0.5],
  // E dominant — B4
  [18.5, B4, 1.5],
  // 2nd ending: descending E–C5–B–A
  [20, E4, 0.5], [20.5, C5, 0.5], [21, B4, 0.5],
  // Final Am — A4 dotted quarter
  [21.5, A4, 1.5],

  // === B SECTION — F major (mm. 23–33) ===
  // Transcribed note-for-note from Mutopia WoO59 (Breitkopf & Härtel 1888).
  // Grace notes omitted (F4–A4 before m23). Ornamental 32nd groups simplified.

  // m23: c''4 [+ ornamental tail f''16. e''32 → simplified to C5 full measure]
  [23, C5, 1.5],

  // m24: e''8 d''8 bes''16. a''32 (simplified: E5–D5–Bb5 as 3 eighths)
  [24.5, E5, 0.5],
  [25, D5, 0.5],
  [25.5, Bb5, 0.5],

  // m25: a''16 g''16 f''16 e''16 d''16 c''16  (descending 16th scale)
  [26, A5, 0.25], [26.25, G5, 0.25], [26.5, F5, 0.25],
  [26.75, E5, 0.25], [27, D5, 0.25], [27.25, C5, 0.25],

  // m26: bes'8 a'8  [ornamental turn a'32 g'32 a'32 bes'32 → simplified]
  [27.5, Bb4, 0.5],
  [28, A4, 0.5],
  [28.5, Bb4, 0.5],

  // m27: c''4 d''16 dis''16
  [29, C5, 1.0], [30, D5, 0.25], [30.25, Ds5, 0.25],

  // m28: e''8. e''16 f''16 a'16
  [30.5, E5, 0.75],
  [31.25, E5, 0.25],
  [31.5, F5, 0.25],
  [31.75, A4, 0.25],

  // m29: c''4 d''16. b'32
  [32, C5, 1.0], [33, D5, 0.375], [33.375, B4, 0.125],

  // m30–33: transition phrase back toward Am
  [33.5, A4, 1.5],      // m30: A4 resolve
  [35, C5, 1.5],         // m31: echo of B section opening
  [36.5, B4, 0.5], [37, A4, 0.5], [37.5, G4, 0.5],  // m32: descend to Am
  [38, E5, 1.5],         // m33: dominant E5 leading back to A section

  // === A SECTION RETURN (mm. 39–50, abbreviated) ===
  [39.5, E5, 0.5], [40, Ds5, 0.5], [40.5, E5, 0.5], [41, Ds5, 0.5],
  [41.5, E5, 0.5], [42, B4, 0.5], [42.5, D5, 0.5], [43, C5, 0.5],
  [43.5, A4, 1.5],

  [45, C4, 0.5], [45.5, E4, 0.5], [46, A4, 0.5],
  [46.5, B4, 1.5],

  [48, E4, 0.5], [48.5, Gs4, 0.5], [49, B4, 0.5],
  [49.5, C5, 1.5],

  // Final trill + cadence
  [51, E5, 0.5], [51.5, Ds5, 0.5], [52, E5, 0.5], [52.5, Ds5, 0.5],
  [53, E5, 0.5], [53.5, B4, 0.5], [54, D5, 0.5], [54.5, C5, 0.5],
  [55, A4, 1.5],

  [56.5, E4, 0.5], [57, C5, 0.5], [57.5, B4, 0.5], [58, A4, 2.0],
];

// ===== LEFT HAND (used in two-hand mode) =====
// A section: A minor / E major arpeggios (E2–E3–G#3 for dominant, per Mutopia)
// B section: F major / Bb major / C7 arpeggios (per Mutopia LH: f-a-c'-a-c'-a …)
const leftHand: [number, MidiNote, number][] = [
  // === A section, first time ===
  // m3: Am — A2–E3–A3
  [4, A2, 0.5], [4.5, E3, 0.5], [5, A3, 0.5],
  // m5: E major — E2–E3–G#3 (Beethoven's actual voicing from Mutopia)
  [7, E2, 0.5], [7.5, E3, 0.5], [8, Gs3, 0.5],
  // m7: Am — A2–E3–A3
  [10, A2, 0.5], [10.5, E3, 0.5], [11, A3, 0.5],

  // === A section, second time ===
  // Am under A4 (beat 15.5)
  [15.5, A2, 0.5], [16, E3, 0.5], [16.5, A3, 0.5],
  // E major under B4 (beat 18.5)
  [18.5, E2, 0.5], [19, E3, 0.5], [19.5, Gs3, 0.5],
  // Am under final A4 (beat 21.5)
  [21.5, A2, 0.5], [22, E3, 0.5], [22.5, A3, 0.5],

  // === B section LH — from Mutopia: "f a c' a c' a | f bes d' bes d' bes …" ===
  // Each group of 3 = simplified 3-note arpeggio per 3/8 measure

  // m23: F major (F3–A3–C4)
  [23, F3, 0.5], [23.5, A3, 0.5], [24, C4, 0.5],
  // m24: Bb major (F3–Bb3–D4)
  [24.5, F3, 0.5], [25, Bb3, 0.5], [25.5, D4, 0.5],
  // m25: C7 (C3–G3–Bb3)
  [26, C3, 0.5], [26.5, G3, 0.5], [27, Bb3, 0.5],
  // m26: F major
  [27.5, F3, 0.5], [28, A3, 0.5], [28.5, C4, 0.5],
  // m27: F major continuing
  [29, F3, 0.5], [29.5, A3, 0.5], [30, C4, 0.5],
  // m28: G7 (G3–B3–D4) — dominant of C
  [30.5, G3, 0.5], [31, A3, 0.5], [31.5, D4, 0.5],
  // m29: C major (C3–E3–G3)
  [32, C3, 0.5], [32.5, E3, 0.5], [33, G3, 0.5],
  // m30: Am
  [33.5, A2, 0.5], [34, E3, 0.5], [34.5, A3, 0.5],
  // m31: F major
  [35, F3, 0.5], [35.5, A3, 0.5], [36, C4, 0.5],
  // m32: E major — dominant of Am (E2–E3–G#3)
  [36.5, E2, 0.5], [37, E3, 0.5], [37.5, Gs3, 0.5],
  // m33: E dominant continuing
  [38, E2, 0.5], [38.5, E3, 0.5], [39, Gs3, 0.5],

  // === A section return LH ===
  // Mirrors the A section LH, offset to match return RH entries
  [43.5, A2, 0.5], [44, E3, 0.5], [44.5, A3, 0.5],  // Am under A4 (beat 43.5)
  [46.5, E2, 0.5], [47, E3, 0.5], [47.5, Gs3, 0.5],  // E under B4 (beat 46.5)
  [49.5, A2, 0.5], [50, E3, 0.5], [50.5, A3, 0.5],   // Am under C5 (beat 49.5)
  [55, A2, 0.5], [55.5, E3, 0.5], [56, A3, 0.5],     // Am under A4 (beat 55)
  [58, A2, 0.5], [58.5, E3, 0.5], [59, A3, 0.5],     // Am — final
];

const notes: SongNote[] = rightHand.map(([beat, note, dur]) => ({
  time: b(beat),
  note,
  duration: b(dur),
}));

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
  // RH range: C4(60) to Bb5(82) in file → C3–Bb4 in game after offset
  noteRange: { lowest: 60, highest: 82, whiteKeysOnly: false },
  notes,
  pianoNotes,
  // Two-hand range: E2(40) LH lowest → Bb5(82) RH highest
  pianoNoteRange: { lowest: 40, highest: 82, whiteKeysOnly: false },
};
