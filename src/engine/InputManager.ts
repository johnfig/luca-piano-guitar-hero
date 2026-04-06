import { MidiNote } from '@/types/game';
import { buildKeyboardMap, buildNoteToLane, getActiveLanes, DEFAULT_NOTE_RANGE } from '@/constants/keyboard';

export type NoteCallback = (midiNote: MidiNote, lane: number) => void;

class InputManager {
  private pressedKeys: Set<string> = new Set();
  private onKeyDownCallback: NoteCallback | null = null;
  private onKeyUpCallback: NoteCallback | null = null;
  private active = false;

  // Dynamic mappings (rebuilt per song)
  private keyboardMap: Record<string, MidiNote>;
  private noteToLane: Map<MidiNote, number>;

  constructor() {
    // Default to the original 8-lane layout
    const defaultLanes = getActiveLanes(DEFAULT_NOTE_RANGE);
    this.keyboardMap = buildKeyboardMap(defaultLanes);
    this.noteToLane = buildNoteToLane(defaultLanes);
  }

  /**
   * Set active lanes for the current song. Rebuilds keyboard mapping.
   */
  setActiveLanes(activeLanes: MidiNote[]): void {
    this.keyboardMap = buildKeyboardMap(activeLanes);
    this.noteToLane = buildNoteToLane(activeLanes);
  }

  private handleKeyDown = (event: KeyboardEvent): void => {
    if (event.repeat) return;

    const key = event.key.toLowerCase();
    const midiNote = this.keyboardMap[key];

    if (midiNote === undefined) return;

    event.preventDefault();
    this.pressedKeys.add(key);

    const lane = this.noteToLane.get(midiNote);
    if (lane !== undefined && this.onKeyDownCallback) {
      this.onKeyDownCallback(midiNote, lane);
    }
  };

  private handleKeyUp = (event: KeyboardEvent): void => {
    const key = event.key.toLowerCase();
    const midiNote = this.keyboardMap[key];

    if (midiNote === undefined) return;

    event.preventDefault();
    this.pressedKeys.delete(key);

    const lane = this.noteToLane.get(midiNote);
    if (lane !== undefined && this.onKeyUpCallback) {
      this.onKeyUpCallback(midiNote, lane);
    }
  };

  set onKeyDown(callback: NoteCallback | null) {
    this.onKeyDownCallback = callback;
  }

  set onKeyUp(callback: NoteCallback | null) {
    this.onKeyUpCallback = callback;
  }

  isPressed(midiNote: MidiNote): boolean {
    const entry = Object.entries(this.keyboardMap).find(([, n]) => n === midiNote);
    return entry ? this.pressedKeys.has(entry[0]) : false;
  }

  getPressedNotes(): MidiNote[] {
    return Array.from(this.pressedKeys)
      .map((key) => this.keyboardMap[key])
      .filter((note): note is MidiNote => note !== undefined);
  }

  start(): void {
    if (this.active) return;
    window.addEventListener('keydown', this.handleKeyDown);
    window.addEventListener('keyup', this.handleKeyUp);
    this.active = true;
  }

  stop(): void {
    if (!this.active) return;
    window.removeEventListener('keydown', this.handleKeyDown);
    window.removeEventListener('keyup', this.handleKeyUp);
    this.pressedKeys.clear();
    this.active = false;
  }
}

export default InputManager;
