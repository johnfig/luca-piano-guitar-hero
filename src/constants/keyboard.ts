import { MidiNote, NoteRange } from '@/types/game';

// --- MIDI Note Utilities ---

const NOTE_NAMES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
const WHITE_KEY_SEMITONES = new Set([0, 2, 4, 5, 7, 9, 11]); // C, D, E, F, G, A, B

export function midiNoteToName(midi: MidiNote): string {
  const octave = Math.floor(midi / 12) - 1;
  const note = NOTE_NAMES[midi % 12];
  return `${note}${octave}`;
}

export function midiNoteToFrequency(midi: MidiNote): number {
  return 440 * Math.pow(2, (midi - 69) / 12);
}

export function isWhiteKey(midi: MidiNote): boolean {
  return WHITE_KEY_SEMITONES.has(midi % 12);
}

// --- Named MIDI constants ---

export const MIDDLE_C = 60; // C4

// --- Dynamic Lane Computation ---

/**
 * Given a NoteRange, compute the list of MIDI notes that become active lanes.
 * If whiteKeysOnly, only white keys in the range are included.
 */
export function getActiveLanes(range: NoteRange): MidiNote[] {
  const lanes: MidiNote[] = [];
  for (let n = range.lowest; n <= range.highest; n++) {
    if (range.whiteKeysOnly && !isWhiteKey(n)) continue;
    lanes.push(n);
  }
  return lanes;
}

/**
 * Given active lanes, build a lookup from MIDI note → lane index.
 */
export function buildNoteToLane(activeLanes: MidiNote[]): Map<MidiNote, number> {
  const map = new Map<MidiNote, number>();
  activeLanes.forEach((note, index) => map.set(note, index));
  return map;
}

// --- Dynamic Keyboard Mapping ---

// Piano-style layout: home row = white keys, top row = sharps between them
// Mirrors a real keyboard: ASDFGHJKL = white keys, QWERTYUIOP = black keys
const HOME_ROW: string[] = ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', "'"];
const TOP_ROW: string[] = ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '['];

/**
 * Build a keyboard key → MIDI note mapping for the given active lanes.
 *
 * Piano-style layout:
 *   Q  W  E     T  Y  U     O  P     ← sharps (black keys)
 *  A  S  D  F  G  H  J  K  L  ;     ← naturals (white keys)
 *
 * White keys get home row left-to-right. Each black key gets the top-row
 * key positioned between the two home-row keys it sits between.
 */
export function buildKeyboardMap(activeLanes: MidiNote[]): Record<string, MidiNote> {
  const map: Record<string, MidiNote> = {};

  // Separate white and black keys, preserving order
  const whites = activeLanes.filter(n => isWhiteKey(n));
  const blackSet = new Set(activeLanes.filter(n => !isWhiteKey(n)));

  if (blackSet.size === 0) {
    // All white keys — simple home row mapping
    for (let i = 0; i < whites.length && i < HOME_ROW.length; i++) {
      map[HOME_ROW[i]] = whites[i];
    }
  } else {
    // Mixed white + black: piano-style two-row layout
    let whiteIdx = 0;
    for (const note of whites) {
      if (whiteIdx >= HOME_ROW.length) break;
      map[HOME_ROW[whiteIdx]] = note;

      // Check if there's a black key between this white key and the next
      const blackAbove = note + 1; // semitone above
      if (blackSet.has(blackAbove) && whiteIdx < TOP_ROW.length) {
        map[TOP_ROW[whiteIdx]] = blackAbove;
      }
      whiteIdx++;
    }
  }

  return map;
}

/**
 * Get the display label for a keyboard key.
 */
export function getKeyLabel(key: string): string {
  if (key === ';') return ';';
  if (key === "'") return "'";
  if (key === ',') return ',';
  if (key === '.') return '.';
  if (key === '/') return '/';
  if (key === '[') return '[';
  if (key === ']') return ']';
  return key.toUpperCase();
}

/**
 * Build reverse map: MIDI note → keyboard key label
 */
export function buildKeyLabels(keyboardMap: Record<string, MidiNote>): Map<MidiNote, string> {
  const labels = new Map<MidiNote, string>();
  for (const [key, note] of Object.entries(keyboardMap)) {
    labels.set(note, getKeyLabel(key));
  }
  return labels;
}

// --- Default 8-lane range (backward compatibility) ---

export const DEFAULT_NOTE_RANGE: NoteRange = {
  lowest: 60,  // C4
  highest: 72, // C5
  whiteKeysOnly: true,
};

// Precomputed defaults for the original 8-lane layout
export const DEFAULT_ACTIVE_LANES = getActiveLanes(DEFAULT_NOTE_RANGE);
export const DEFAULT_NOTE_TO_LANE = buildNoteToLane(DEFAULT_ACTIVE_LANES);
export const DEFAULT_KEYBOARD_MAP = buildKeyboardMap(DEFAULT_ACTIVE_LANES);
export const DEFAULT_KEY_LABELS = buildKeyLabels(DEFAULT_KEYBOARD_MAP);
