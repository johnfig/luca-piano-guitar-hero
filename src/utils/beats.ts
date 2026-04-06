export function beatsToSeconds(beat: number, bpm: number): number {
  return beat * (60 / bpm);
}
