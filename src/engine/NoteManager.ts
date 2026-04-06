import { MidiNote, Song, ActiveNote, HitRating } from '@/types/game';
import { HIT_WINDOWS } from '@/constants/scoring';
import { MISS_WINDOW } from '@/constants/timing';

class NoteManager {
  private song: Song;
  private noteToLane: Map<MidiNote, number>;
  private activeNotes: ActiveNote[] = [];
  private nextNoteIndex = 0;
  private noteIdCounter = 0;

  constructor(song: Song, noteToLane: Map<MidiNote, number>) {
    this.song = song;
    this.noteToLane = noteToLane;
  }

  update(currentTime: number, fallDuration: number): void {
    // Spawn notes that should now be visible.
    // A note becomes visible when currentTime >= note.time - fallDuration
    while (
      this.nextNoteIndex < this.song.notes.length &&
      currentTime >= this.song.notes[this.nextNoteIndex].time - fallDuration
    ) {
      const songNote = this.song.notes[this.nextNoteIndex];
      const lane = this.noteToLane.get(songNote.note) ?? 0;

      this.activeNotes.push({
        id: this.noteIdCounter++,
        songNote,
        lane,
        y: 0,
        height: songNote.duration / fallDuration,
        hit: false,
        missed: false,
        opacity: 1,
      });

      this.nextNoteIndex++;
    }

    // Update y positions and detect misses
    for (const note of this.activeNotes) {
      if (note.hit || note.missed) continue;

      // y = 0 at top (spawn), y = 1 at hit zone
      note.y = (currentTime - (note.songNote.time - fallDuration)) / fallDuration;

      // If note has passed the hit zone by MISS_WINDOW, mark as missed
      const timePastTarget = currentTime - note.songNote.time;
      if (timePastTarget > MISS_WINDOW) {
        note.missed = true;
      }
    }

    // Fade out hit/missed notes and remove fully faded ones
    this.activeNotes = this.activeNotes.filter((note) => {
      if (note.hit) {
        note.opacity -= 0.08;
        return note.opacity > 0;
      }
      if (note.missed) {
        note.opacity -= 0.03;
        return note.opacity > 0;
      }
      return true;
    });
  }

  checkHit(
    midiNote: MidiNote,
    currentTime: number
  ): { note: ActiveNote; rating: HitRating } | null {
    const lane = this.noteToLane.get(midiNote);
    if (lane === undefined) return null;

    // Find un-hit notes in this lane, sorted by closest to the target time
    const candidates = this.activeNotes
      .filter((n) => !n.hit && !n.missed && n.lane === lane)
      .sort(
        (a, b) =>
          Math.abs(a.songNote.time - currentTime) -
          Math.abs(b.songNote.time - currentTime)
      );

    if (candidates.length === 0) return null;

    const closest = candidates[0];
    const timeDiff = Math.abs(closest.songNote.time - currentTime);

    // Determine hit rating by checking tightest window first
    let rating: HitRating | null = null;
    if (timeDiff <= HIT_WINDOWS.PERFECT) {
      rating = 'PERFECT';
    } else if (timeDiff <= HIT_WINDOWS.GREAT) {
      rating = 'GREAT';
    } else if (timeDiff <= HIT_WINDOWS.GOOD) {
      rating = 'GOOD';
    }

    if (!rating) return null;

    closest.hit = true;
    closest.hitRating = rating;

    return { note: closest, rating };
  }

  getVisibleNotes(): ActiveNote[] {
    return this.activeNotes;
  }

  isComplete(currentTime: number): boolean {
    if (this.song.notes.length === 0) return true;

    const allSpawned = this.nextNoteIndex >= this.song.notes.length;
    const allProcessed = this.activeNotes.every((n) => n.hit || n.missed);
    const lastNoteTime = this.song.notes[this.song.notes.length - 1].time;

    return allSpawned && allProcessed && currentTime > lastNoteTime + MISS_WINDOW + 0.5;
  }

  reset(): void {
    this.activeNotes = [];
    this.nextNoteIndex = 0;
    this.noteIdCounter = 0;
  }
}

export default NoteManager;
