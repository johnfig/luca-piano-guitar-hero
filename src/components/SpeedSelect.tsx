'use client';

import { Song } from '@/types/game';

export type SpeedOption = 0.5 | 0.75 | 1;

interface SpeedSelectProps {
  song: Song;
  onStart: (speed: SpeedOption) => void;
  onBack: () => void;
}

const SPEEDS: { value: SpeedOption; label: string; desc: string; color: string }[] = [
  { value: 0.5, label: '0.5x', desc: 'Super Slow', color: 'from-blue-500 to-cyan-500' },
  { value: 0.75, label: '0.75x', desc: 'Slow', color: 'from-purple-500 to-blue-500' },
  { value: 1, label: '1x', desc: 'Normal', color: 'from-pink-500 to-purple-500' },
];

export default function SpeedSelect({ song, onStart, onBack }: SpeedSelectProps) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#0a0a1a] z-50 p-4">
      <div className="text-center max-w-sm w-full space-y-8">
        {/* Song info */}
        <div>
          <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">{song.artist}</p>
          <h2 className="text-3xl font-black text-white">{song.title}</h2>
          <div className="flex justify-center gap-3 mt-2 text-sm text-gray-500">
            <span>{song.notes.length} notes</span>
            <span>{song.difficulty}</span>
          </div>
        </div>

        {/* Speed options */}
        <div className="space-y-3">
          <p className="text-gray-400 text-sm font-semibold uppercase tracking-wider">
            Choose Speed
          </p>

          {SPEEDS.map(({ value, label, desc, color }) => (
            <button
              key={value}
              onClick={() => onStart(value)}
              className="w-full group relative overflow-hidden rounded-xl border border-white/10 bg-white/5 px-6 py-4 text-left transition-all hover:bg-white/10 hover:border-white/20 hover:scale-[1.02] active:scale-[0.98]"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <span className={`text-2xl font-black bg-gradient-to-r ${color} bg-clip-text text-transparent`}>
                    {label}
                  </span>
                  <span className="text-gray-400 text-sm">{desc}</span>
                </div>
                {value === 1 ? (
                  <span className="text-xs text-gray-500 px-2 py-0.5 rounded-full bg-white/5">
                    Full XP
                  </span>
                ) : (
                  <span className="text-xs text-blue-400 px-2 py-0.5 rounded-full bg-blue-500/10">
                    Practice
                  </span>
                )}
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500/0 via-purple-500/5 to-cyan-500/0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            </button>
          ))}
        </div>

        {/* Back */}
        <button
          onClick={onBack}
          className="text-gray-600 hover:text-gray-300 text-sm transition-colors"
        >
          ← Back
        </button>
      </div>
    </div>
  );
}
