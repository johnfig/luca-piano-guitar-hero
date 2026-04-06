'use client';

import { MidiNote } from '@/types/game';
import { midiNoteToName } from '@/constants/keyboard';
import { getLaneColor } from '@/constants/colors';

interface PianoKeyboardProps {
  activeLanes: MidiNote[];
  keyLabels: Map<MidiNote, string>;
  pressedNotes: Set<MidiNote>;
  hitLanes: Set<number>; // lanes that just got a hit (for flash effect)
}

export default function PianoKeyboard({ activeLanes, keyLabels, pressedNotes, hitLanes }: PianoKeyboardProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-30 flex">
      {activeLanes.map((midiNote, lane) => {
        const isPressed = pressedNotes.has(midiNote);
        const isHit = hitLanes.has(lane);
        const color = getLaneColor(lane);
        const label = keyLabels.get(midiNote) ?? '';
        const noteName = midiNoteToName(midiNote);

        return (
          <div
            key={lane}
            className="flex-1 relative"
            style={{ height: '80px' }}
          >
            {/* Key background */}
            <div
              className="absolute inset-0 border-t border-x border-white/10 transition-colors duration-75"
              style={{
                backgroundColor: isPressed
                  ? color + '40'
                  : isHit
                    ? color + '20'
                    : 'rgba(20,20,35,0.95)',
                boxShadow: isPressed
                  ? `0 0 30px ${color}60, inset 0 0 20px ${color}30`
                  : 'none',
              }}
            />

            {/* Top glow line when pressed */}
            {isPressed && (
              <div
                className="absolute top-0 left-0 right-0 h-1"
                style={{ backgroundColor: color, boxShadow: `0 0 10px ${color}` }}
              />
            )}

            {/* Key label */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span
                className="text-lg font-bold transition-colors duration-75"
                style={{ color: isPressed ? color : 'rgba(255,255,255,0.3)' }}
              >
                {label}
              </span>
              <span className="text-[10px] text-gray-600 mt-0.5">{noteName}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
