'use client';

import { SongProgress } from '@/types/game';
import { TrackLevel } from '@/types/tracks';

interface LevelNodeProps {
  level: TrackLevel;
  songProgress: SongProgress | undefined;
  isUnlocked: boolean;
  isCurrentLevel: boolean;
  trackColor: string;
  onClick: () => void;
}

export default function LevelNode({
  level,
  songProgress,
  isUnlocked,
  isCurrentLevel,
  trackColor,
  onClick,
}: LevelNodeProps) {
  const stars = songProgress?.stars ?? 0;
  const isCompleted = stars > 0;

  // Node size
  const size = isCurrentLevel ? 80 : 64;

  return (
    <div className="flex flex-col items-center gap-1">
      {/* Main circle button */}
      <button
        onClick={onClick}
        disabled={!isUnlocked}
        className="relative group"
        style={{ width: size, height: size }}
      >
        {/* Glow ring for current level */}
        {isCurrentLevel && (
          <div
            className="absolute inset-[-6px] rounded-full animate-pulse"
            style={{
              background: `radial-gradient(circle, ${trackColor}40 0%, transparent 70%)`,
            }}
          />
        )}

        {/* Outer ring */}
        <div
          className={`absolute inset-0 rounded-full transition-all ${
            !isUnlocked
              ? 'bg-gray-800/80'
              : isCompleted
                ? ''
                : isCurrentLevel
                  ? ''
                  : 'bg-white/10'
          } ${isUnlocked && !isCompleted ? 'group-hover:scale-110' : ''}`}
          style={{
            backgroundColor: isCompleted ? trackColor : isCurrentLevel ? trackColor + '40' : undefined,
            border: isCurrentLevel && !isCompleted ? `3px solid ${trackColor}` : isCompleted ? `3px solid ${trackColor}` : '2px solid rgba(255,255,255,0.1)',
            boxShadow: isCompleted ? `0 4px 20px ${trackColor}50` : isCurrentLevel ? `0 0 30px ${trackColor}30` : undefined,
          }}
        />

        {/* Inner content */}
        <div className="absolute inset-0 flex items-center justify-center">
          {!isUnlocked ? (
            <span className="text-gray-600 text-xl">🔒</span>
          ) : isCompleted ? (
            <span className="text-white text-2xl font-black drop-shadow-lg">✓</span>
          ) : (
            <span
              className="font-black drop-shadow-sm"
              style={{
                fontSize: isCurrentLevel ? '1.5rem' : '1.25rem',
                color: isCurrentLevel ? trackColor : 'rgba(255,255,255,0.8)',
              }}
            >
              {level.levelNumber}
            </span>
          )}
        </div>

        {/* Hover scale for unlocked nodes */}
        {isUnlocked && (
          <div className="absolute inset-0 rounded-full group-hover:scale-110 group-active:scale-95 transition-transform" />
        )}
      </button>

      {/* "START" label for current level */}
      {isCurrentLevel && !isCompleted && (
        <div
          className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider animate-bounce"
          style={{ backgroundColor: trackColor, color: 'white' }}
        >
          START
        </div>
      )}

      {/* Stars display */}
      {isCompleted && (
        <div className="flex gap-0.5 -mt-0.5">
          {[1, 2, 3].map(s => (
            <span
              key={s}
              className={`text-sm ${s <= stars ? 'text-yellow-400' : 'text-gray-700'}`}
              style={{ textShadow: s <= stars ? '0 0 8px rgba(255,215,0,0.5)' : 'none' }}
            >
              ★
            </span>
          ))}
        </div>
      )}

      {/* Song title (shown on hover or always for current) */}
      <p className={`text-xs max-w-[120px] text-center truncate ${
        isCurrentLevel ? 'text-gray-300 font-semibold' : isUnlocked ? 'text-gray-500' : 'text-gray-700'
      }`}>
        {level.title}
      </p>
    </div>
  );
}
