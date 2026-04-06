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

// Generate a winding path: nodes snake left-center-right-center-left...
function getNodePosition(index: number, total: number): { x: number } {
  // Pattern: center, right, center, left, center, right, center, left...
  // Creates a gentle S-curve
  const positions = [0, 1, 0, -1]; // center, right, center, left
  const pos = positions[index % 4];
  return { x: pos };
}

export default function TrackMap({ track, profile, onSelectSong, onBack }: TrackMapProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const trackProgress = profile.trackProgress[track.id];

  const isLevelUnlocked = (levelNumber: number): boolean => {
    const level = track.levels.find(l => l.levelNumber === levelNumber);
    if (!level) return false;
    if (level.requiredStars === 0) return true;
    const prevLevel = track.levels.find(l => l.levelNumber === levelNumber - 1);
    if (!prevLevel) return true;
    const prevStars = profile.songProgress[prevLevel.songId]?.stars ?? 0;
    return prevStars >= level.requiredStars;
  };

  // Find current level (first uncompleted unlocked level)
  const currentLevelNumber = (() => {
    for (const level of track.levels) {
      const songProg = profile.songProgress[level.songId];
      if (!songProg || songProg.stars === 0) {
        if (isLevelUnlocked(level.levelNumber)) {
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

  const handleSelectLevel = (songId: string) => {
    const song = getSong(songId);
    if (song) {
      onSelectSong(song);
    }
  };

  // Stats
  const completedCount = track.levels.filter(l => {
    const sp = profile.songProgress[l.songId];
    return sp && sp.stars > 0;
  }).length;
  const totalStars = track.levels.reduce((sum, l) => {
    return sum + (profile.songProgress[l.songId]?.stars ?? 0);
  }, 0);
  const maxStars = track.levels.length * 3;
  const allComplete = completedCount === track.levels.length;

  return (
    <div className="fixed inset-0 flex flex-col bg-[#0a0a1a] z-50">
      {/* Header */}
      <div className="flex-shrink-0 px-4 pt-4 pb-3 bg-gradient-to-b from-[#0a0a1a] to-transparent relative z-10">
        <div className="flex items-center gap-4 max-w-lg mx-auto">
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

          {/* Progress bar */}
          <div className="w-20">
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

      {/* Scrollable map */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto">
        <div className="max-w-lg mx-auto px-4 pt-4 pb-12">
          {/* Winding path with nodes */}
          <div className="relative">
            {/* SVG connecting paths */}
            <svg
              className="absolute inset-0 pointer-events-none"
              style={{ zIndex: 0, width: '100%', height: track.levels.length * 140 }}
              viewBox={`0 0 400 ${track.levels.length * 140}`}
              preserveAspectRatio="none"
            >
              {track.levels.map((level, index) => {
                if (index === 0) return null;
                const prevPos = getNodePosition(index - 1, track.levels.length);
                const currPos = getNodePosition(index, track.levels.length);

                const prevX = 200 + prevPos.x * 80;
                const currX = 200 + currPos.x * 80;
                const prevY = (index - 1) * 140 + 40;
                const currY = index * 140 + 40;

                const isConnectedCompleted =
                  (profile.songProgress[track.levels[index - 1].songId]?.stars ?? 0) > 0;

                return (
                  <path
                    key={`path-${index}`}
                    d={`M ${prevX} ${prevY} C ${prevX} ${prevY + 50}, ${currX} ${currY - 50}, ${currX} ${currY}`}
                    fill="none"
                    stroke={isConnectedCompleted ? track.color : 'rgba(255,255,255,0.08)'}
                    strokeOpacity={isConnectedCompleted ? 0.4 : 1}
                    strokeWidth={isConnectedCompleted ? 6 : 4}
                    strokeDasharray={isConnectedCompleted ? 'none' : '10 10'}
                    strokeLinecap="round"
                  />
                );
              })}
            </svg>

            {/* Level nodes */}
            <div className="relative" style={{ zIndex: 1 }}>
              {track.levels.map((level, index) => {
                const unlocked = isLevelUnlocked(level.levelNumber);
                const isCurrent = level.levelNumber === currentLevelNumber;
                const songProg = profile.songProgress[level.songId];
                const pos = getNodePosition(index, track.levels.length);

                const translateX = pos.x * 25;

                return (
                  <div
                    key={level.levelNumber}
                    data-level={level.levelNumber}
                    className="flex justify-center"
                    style={{
                      height: 140,
                      transform: `translateX(${translateX}%)`,
                    }}
                  >
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
            </div>
          </div>

          {/* Track completion message */}
          {allComplete && (
            <div className="text-center py-8">
              <span className="text-5xl">🏆</span>
              <p className="text-white font-black text-2xl mt-3">Track Complete!</p>
              <p className="text-gray-400 text-sm mt-1">You&apos;ve mastered every song. Amazing!</p>
              <div className="mt-3 flex justify-center gap-1">
                {[...Array(3)].map((_, i) => (
                  <span key={i} className="text-2xl text-yellow-400">★</span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
