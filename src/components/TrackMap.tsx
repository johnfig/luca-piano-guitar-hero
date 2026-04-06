'use client';

import { useRef, useEffect } from 'react';
import { UserProfile, Song } from '@/types/game';
import { Track } from '@/types/tracks';
import { getSong } from '@/data/songRegistry';
import LevelNode from './LevelNode';

interface TrackMapProps {
  track: Track;
  profile: UserProfile;
  onSelectSong: (song: Song) => void;
  onBack: () => void;
}

// Book boundaries for Suzuki track visual theming
const SUZUKI_BOOK_BOUNDARIES = [
  { startLevel: 1, endLevel: 14, label: 'Book 1 — Beginner', bgClass: 'from-green-900/20 to-green-800/5' },
];

export default function TrackMap({ track, profile, onSelectSong, onBack }: TrackMapProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const trackProgress = profile.trackProgress[track.id];

  // Compute total stars earned in this track (for unlock checks)
  const getTotalStarsUpTo = (levelNumber: number): number => {
    let total = 0;
    for (const level of track.levels) {
      if (level.levelNumber >= levelNumber) break;
      const songProg = profile.songProgress[level.songId];
      if (songProg) total += songProg.stars;
    }
    return total;
  };

  // Find current level (first uncompleted unlocked level)
  const currentLevelNumber = (() => {
    for (const level of track.levels) {
      const songProg = profile.songProgress[level.songId];
      if (!songProg || songProg.stars === 0) {
        // Check if this level is unlocked
        const starsEarned = getTotalStarsUpTo(level.levelNumber);
        const prevLevel = track.levels.find(l => l.levelNumber === level.levelNumber - 1);
        const prevStars = prevLevel ? (profile.songProgress[prevLevel.songId]?.stars ?? 0) : 999;
        if (level.requiredStars === 0 || prevStars >= level.requiredStars) {
          return level.levelNumber;
        }
      }
    }
    return track.levels[track.levels.length - 1]?.levelNumber ?? 1;
  })();

  // Auto-scroll to current level on mount
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const currentNode = el.querySelector(`[data-level="${currentLevelNumber}"]`);
    if (currentNode) {
      setTimeout(() => {
        currentNode.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 300);
    }
  }, [currentLevelNumber]);

  const isLevelUnlocked = (levelNumber: number): boolean => {
    const level = track.levels.find(l => l.levelNumber === levelNumber);
    if (!level) return false;
    if (level.requiredStars === 0) return true;

    // Check previous level has enough stars
    const prevLevel = track.levels.find(l => l.levelNumber === levelNumber - 1);
    if (!prevLevel) return true;
    const prevStars = profile.songProgress[prevLevel.songId]?.stars ?? 0;
    return prevStars >= level.requiredStars;
  };

  const handleSelectLevel = (songId: string) => {
    const song = getSong(songId);
    if (song) {
      onSelectSong(song);
    }
  };

  // Total stats
  const completedCount = track.levels.filter(l => {
    const sp = profile.songProgress[l.songId];
    return sp && sp.stars > 0;
  }).length;
  const totalStars = track.levels.reduce((sum, l) => {
    return sum + (profile.songProgress[l.songId]?.stars ?? 0);
  }, 0);
  const maxStars = track.levels.length * 3;

  return (
    <div className="fixed inset-0 flex flex-col bg-[#0a0a1a] z-50">
      {/* Header */}
      <div className="flex-shrink-0 px-4 pt-4 pb-3">
        <div className="flex items-center gap-4 max-w-2xl mx-auto">
          <button
            onClick={onBack}
            className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            ←
          </button>

          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className="text-xl">{track.icon}</span>
              <h2 className="text-white font-bold text-lg">{track.name}</h2>
            </div>
            <div className="flex items-center gap-3 mt-0.5">
              <span className="text-gray-500 text-xs">{completedCount}/{track.levels.length} levels</span>
              <span className="text-yellow-400 text-xs">★ {totalStars}/{maxStars}</span>
            </div>
          </div>

          {/* Track progress bar */}
          <div className="w-24">
            <div className="h-2 rounded-full bg-white/10 overflow-hidden">
              <div
                className="h-full rounded-full transition-all"
                style={{
                  width: `${(completedCount / track.levels.length) * 100}%`,
                  backgroundColor: track.color,
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Scrollable level list */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 pb-8">
        <div className="max-w-2xl mx-auto space-y-2 pt-2">
          {track.levels.map((level, index) => {
            const unlocked = isLevelUnlocked(level.levelNumber);
            const isCurrent = level.levelNumber === currentLevelNumber;
            const songProg = profile.songProgress[level.songId];

            return (
              <div key={level.levelNumber} data-level={level.levelNumber}>
                {/* Connection line between levels */}
                {index > 0 && (
                  <div className="flex justify-center -my-1">
                    <div
                      className="w-0.5 h-4"
                      style={{
                        backgroundColor: unlocked ? track.color + '40' : 'rgba(255,255,255,0.05)',
                      }}
                    />
                  </div>
                )}

                <LevelNode
                  level={level}
                  songProgress={songProg}
                  isUnlocked={unlocked}
                  isCurrentLevel={isCurrent}
                  trackColor={track.color}
                  onClick={() => unlocked && handleSelectLevel(level.songId)}
                />
              </div>
            );
          })}

          {/* Track completion message */}
          {completedCount === track.levels.length && (
            <div className="text-center py-8">
              <span className="text-4xl">🏆</span>
              <p className="text-white font-bold text-lg mt-2">Track Complete!</p>
              <p className="text-gray-500 text-sm">You&apos;ve mastered every song. Amazing!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
