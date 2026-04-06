import { PianoKey } from '@/types/game';
import { KEY_MAP, NOTE_TO_LANE } from '@/constants/keyboard';

export type NoteCallback = (note: PianoKey, lane: number) => void;

class InputManager {
  private pressedKeys: Set<string> = new Set();
  private onKeyDownCallback: NoteCallback | null = null;
  private onKeyUpCallback: NoteCallback | null = null;
  private active = false;

  private handleKeyDown = (event: KeyboardEvent): void => {
    if (event.repeat) return;

    const key = event.key.toLowerCase();
    const note = KEY_MAP[key];

    if (!note) return;

    event.preventDefault();
    this.pressedKeys.add(key);

    if (this.onKeyDownCallback) {
      this.onKeyDownCallback(note, NOTE_TO_LANE[note]);
    }
  };

  private handleKeyUp = (event: KeyboardEvent): void => {
    const key = event.key.toLowerCase();
    const note = KEY_MAP[key];

    if (!note) return;

    event.preventDefault();
    this.pressedKeys.delete(key);

    if (this.onKeyUpCallback) {
      this.onKeyUpCallback(note, NOTE_TO_LANE[note]);
    }
  };

  set onKeyDown(callback: NoteCallback | null) {
    this.onKeyDownCallback = callback;
  }

  set onKeyUp(callback: NoteCallback | null) {
    this.onKeyUpCallback = callback;
  }

  isPressed(note: PianoKey): boolean {
    const entry = Object.entries(KEY_MAP).find(([, n]) => n === note);
    return entry ? this.pressedKeys.has(entry[0]) : false;
  }

  getPressedNotes(): PianoKey[] {
    return Array.from(this.pressedKeys)
      .map((key) => KEY_MAP[key])
      .filter((note): note is PianoKey => note !== undefined);
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
