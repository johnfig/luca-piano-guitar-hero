'use client';

import { PianoKey } from '@/types/game';
import { LANE_TO_NOTE, KEY_LABELS, TOTAL_LANES } from '@/constants/keyboard';
import { LANE_COLORS } from '@/constants/colors';

interface PianoKeyboardProps {
  pressedNotes: Set<PianoKey>;
  hitLanes: Set<number>; // lanes that just got a hit (for flash effect)
}

export default function PianoKeyboard({ pressedNotes, hitLanes }: PianoKeyboardProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-30 flex">
      {Array.from({ length: TOTAL_LANES }, (_, lane) => {
        const note = LANE_TO_NOTE[lane];
        const isPressed = pressedNotes.has(note);
        const isHit = hitLanes.has(lane);
        const color = LANE_COLORS[note];
        const label = KEY_LABELS[note];

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
              <span className="text-[10px] text-gray-600 mt-0.5">{note}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
