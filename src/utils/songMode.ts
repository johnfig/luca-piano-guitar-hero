import { Song, SongNote, NoteRange } from '@/types/game';

export interface ResolvedSongData {
  notes: SongNote[];
  noteRange: NoteRange;
  isMidiMode: boolean;
}

/**
 * Resolve which note set to use based on MIDI connection status.
 * When MIDI is connected and pianoNotes exist, use the authentic version.
 * Otherwise fall back to the simplified keyboard version.
 */
export function resolveSongData(
  song: Song,
  midiConnected: boolean,
): ResolvedSongData {
  const usePiano = midiConnected && !!song.pianoNotes;
  return {
    notes: usePiano ? song.pianoNotes! : song.notes,
    noteRange: usePiano ? (song.pianoNoteRange ?? song.noteRange) : song.noteRange,
    isMidiMode: usePiano,
  };
}
