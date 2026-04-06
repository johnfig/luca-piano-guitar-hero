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

  return (
    <button
      onClick={onClick}
      disabled={!isUnlocked}
      className={`relative flex items-center gap-4 w-full px-4 py-3 rounded-xl transition-all ${
        !isUnlocked
          ? 'opacity-40 cursor-not-allowed'
          : isCurrentLevel
            ? 'bg-white/10 border-2 scale-[1.02]'
            : isCompleted
              ? 'bg-white/5 border border-white/10 hover:bg-white/10 hover:scale-[1.01]'
              : 'bg-white/5 border border-white/10 hover:bg-white/10 hover:scale-[1.01]'
      }`}
      style={{
        borderColor: isCurrentLevel ? trackColor : undefined,
        boxShadow: isCurrentLevel ? `0 0 20px ${trackColor}30` : undefined,
      }}
    >
      {/* Level number circle */}
      <div
        className={`w-12 h-12 rounded-full flex items-center justify-center font-black text-lg flex-shrink-0 ${
          !isUnlocked
            ? 'bg-gray-800 text-gray-600'
            : isCompleted
              ? 'text-white'
              : 'bg-white/10 text-white'
        }`}
        style={{
          backgroundColor: isCompleted ? trackColor : undefined,
        }}
      >
        {!isUnlocked ? '🔒' : isCompleted ? '✓' : level.levelNumber}
      </div>

      {/* Song info */}
      <div className="flex-1 text-left min-w-0">
        <h4 className={`font-semibold truncate ${isUnlocked ? 'text-white' : 'text-gray-600'}`}>
          {level.title}
        </h4>
        <p className={`text-xs truncate ${isUnlocked ? 'text-gray-500' : 'text-gray-700'}`}>
          {level.description}
        </p>

        {/* Stars */}
        {isUnlocked && (
          <div className="flex gap-0.5 mt-1">
            {[1, 2, 3].map(s => (
              <span
                key={s}
                className={`text-xs ${s <= stars ? 'text-yellow-400' : 'text-gray-700'}`}
              >
                ★
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Best score */}
      {songProgress && (
        <div className="text-right flex-shrink-0">
          <p className="text-gray-400 text-sm font-bold">{songProgress.bestGrade}</p>
          <p className="text-gray-600 text-xs">{songProgress.bestScore.toLocaleString()}</p>
        </div>
      )}

      {/* Current level pulse indicator */}
      {isCurrentLevel && (
        <div
          className="absolute -left-1 top-1/2 -translate-y-1/2 w-2 h-8 rounded-full animate-pulse"
          style={{ backgroundColor: trackColor }}
        />
      )}
    </button>
  );
}
