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

// Row layouts for different lane counts
const ROW_SINGLE: string[] = ['a', 's', 'd', 'f', 'j', 'k', 'l', ';'];
const ROW_EXTENDED: string[] = ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', "'"];
const ROW_TOP: string[] = ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']'];
const ROW_BOTTOM: string[] = ['z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/'];

/**
 * Build a keyboard key → MIDI note mapping for the given active lanes.
 * Strategy:
 * - <=8 lanes: ASDF JKL; (original layout)
 * - 9-11 lanes: ASDFGHJKL;'
 * - 12+ lanes: two rows (bottom + top)
 */
export function buildKeyboardMap(activeLanes: MidiNote[]): Record<string, MidiNote> {
  const count = activeLanes.length;
  const map: Record<string, MidiNote> = {};

  if (count <= 8) {
    // Use the original ASDF JKL; layout
    for (let i = 0; i < count; i++) {
      map[ROW_SINGLE[i]] = activeLanes[i];
    }
  } else if (count <= 11) {
    // Extended home row
    for (let i = 0; i < count; i++) {
      if (i < ROW_EXTENDED.length) {
        map[ROW_EXTENDED[i]] = activeLanes[i];
      }
    }
  } else {
    // Two rows: bottom row for lower notes, top row for higher notes
    const bottomCount = Math.ceil(count / 2);
    const topCount = count - bottomCount;

    for (let i = 0; i < bottomCount; i++) {
      if (i < ROW_BOTTOM.length) {
        map[ROW_BOTTOM[i]] = activeLanes[i];
      }
    }
    for (let i = 0; i < topCount; i++) {
      if (i < ROW_TOP.length) {
        map[ROW_TOP[i]] = activeLanes[bottomCount + i];
      }
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
