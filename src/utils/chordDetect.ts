import { MidiNote } from '@/types/game';

const NOTE_NAMES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

// Chord interval patterns (semitones from root)
const CHORD_PATTERNS: [string, number[]][] = [
  // Triads
  ['maj', [0, 4, 7]],
  ['min', [0, 3, 7]],
  ['dim', [0, 3, 6]],
  ['aug', [0, 4, 8]],
  ['sus4', [0, 5, 7]],
  ['sus2', [0, 2, 7]],
  // Seventh chords
  ['maj7', [0, 4, 7, 11]],
  ['7', [0, 4, 7, 10]],
  ['min7', [0, 3, 7, 10]],
  ['dim7', [0, 3, 6, 9]],
  // Power chord
  ['5', [0, 7]],
];

/**
 * Detect a chord name from a set of pressed MIDI notes.
 * Returns the chord name (e.g., "C maj", "Am", "G7") or null if not recognized.
 */
export function detectChord(pressedNotes: Set<MidiNote>): string | null {
  if (pressedNotes.size < 2) return null;

  // Get unique pitch classes (0-11), sorted
  const pitchClasses = [...new Set([...pressedNotes].map(n => n % 12))].sort((a, b) => a - b);
  if (pitchClasses.length < 2) return null;

  // Try each pitch class as a potential root
  for (const root of pitchClasses) {
    const intervals = pitchClasses.map(pc => (pc - root + 12) % 12).sort((a, b) => a - b);

    for (const [name, pattern] of CHORD_PATTERNS) {
      if (intervals.length === pattern.length && intervals.every((v, i) => v === pattern[i])) {
        const rootName = NOTE_NAMES[root];
        if (name === 'maj') return rootName;
        if (name === 'min') return `${rootName}m`;
        return `${rootName}${name}`;
      }
    }
  }

  // Check for inversions — try all rotations
  for (const root of pitchClasses) {
    const intervals = pitchClasses.map(pc => (pc - root + 12) % 12).sort((a, b) => a - b);

    for (const [name, pattern] of CHORD_PATTERNS) {
      if (intervals.length !== pattern.length) continue;
      // Check if intervals match any rotation of the pattern
      for (let rot = 1; rot < pattern.length; rot++) {
        const rotated = pattern.map(p => (p - pattern[rot] + 12) % 12).sort((a, b) => a - b);
        if (intervals.every((v, i) => v === rotated[i])) {
          const chordRoot = (root + pattern[rot]) % 12;
          const rootName = NOTE_NAMES[chordRoot];
          const slash = NOTE_NAMES[root];
          if (name === 'maj') return `${rootName}/${slash}`;
          if (name === 'min') return `${rootName}m/${slash}`;
          return `${rootName}${name}/${slash}`;
        }
      }
    }
  }

  return null;
}
