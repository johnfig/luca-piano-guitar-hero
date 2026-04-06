'use client';

import { UserProfile } from '@/types/game';
import { Track } from '@/types/tracks';
import { ALL_TRACKS } from '@/data/tracks';
import { xpToNextLevel } from '@/lib/storage';

const AVATARS = ['🎹', '🎵', '🎶', '🎸', '🎻', '🎺', '🥁', '🎤', '🦊', '🐱', '🐶', '🦁'];

interface TrackSelectProps {
  profile: UserProfile;
  onSelectTrack: (track: Track) => void;
  onFreePlay: () => void;
  onSwitchProfile: () => void;
}

export default function TrackSelect({ profile, onSelectTrack, onFreePlay, onSwitchProfile }: TrackSelectProps) {
  const xpProgress = xpToNextLevel(profile);
  const avatar = AVATARS[profile.avatarIndex] ?? '🎹';

  return (
    <div className="fixed inset-0 flex flex-col bg-[#0a0a1a] z-50 overflow-y-auto">
      {/* Profile bar */}
      <div className="w-full max-w-2xl mx-auto px-4 pt-4">
        <button
          onClick={onSwitchProfile}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
        >
          <span className="text-2xl">{avatar}</span>
          <div className="flex-1 text-left">
            <div className="flex items-center gap-2">
              <span className="text-white font-semibold">{profile.displayName}</span>
              <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-purple-500/20 text-purple-300">
                Lv.{profile.level}
              </span>
              {profile.currentStreak > 0 && (
                <span className="text-orange-400 text-xs">🔥 {profile.currentStreak}</span>
              )}
            </div>
            <div className="mt-1 flex items-center gap-2">
              <div className="flex-1 h-1 rounded-full bg-white/10 overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-purple-500 to-pink-500"
                  style={{ width: `${xpProgress.needed > 0 ? (xpProgress.current / xpProgress.needed) * 100 : 100}%` }}
                />
              </div>
              <span className="text-gray-600 text-xs">{profile.xp} XP</span>
            </div>
          </div>
          <span className="text-gray-600 text-xs">Switch</span>
        </button>
      </div>

      {/* Title */}
      <div className="text-center mt-8 mb-6">
        <h1 className="text-5xl font-black tracking-tight">
          <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent">
            PIANO
          </span>
          <span className="text-white ml-3">HERO</span>
        </h1>
        <p className="text-gray-500 text-sm mt-2 tracking-widest uppercase">Choose your path</p>
      </div>

      {/* Track cards */}
      <div className="w-full max-w-2xl mx-auto px-4 space-y-4">
        {ALL_TRACKS.map((track) => {
          const trackProgress = profile.trackProgress[track.id];
          const completedCount = trackProgress?.completedLevels.length ?? 0;
          const totalCount = track.levels.length;
          const progressPct = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

          // Count total stars earned in this track
          let totalStars = 0;
          for (const level of track.levels) {
            const songProg = profile.songProgress[level.songId];
            if (songProg) totalStars += songProg.stars;
          }

          return (
            <button
              key={track.id}
              onClick={() => onSelectTrack(track)}
              className="w-full group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 text-left transition-all hover:bg-white/10 hover:border-white/20 hover:scale-[1.01] active:scale-[0.99]"
            >
              <div className="flex items-start gap-4">
                {/* Icon */}
                <div
                  className="w-16 h-16 rounded-xl flex items-center justify-center text-3xl flex-shrink-0"
                  style={{ backgroundColor: track.color + '20', border: `2px solid ${track.color}40` }}
                >
                  {track.icon}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-white font-bold text-xl group-hover:text-white/90">
                    {track.name}
                  </h3>
                  <p className="text-gray-500 text-sm mt-0.5">{track.description}</p>

                  {/* Progress bar */}
                  <div className="mt-3 flex items-center gap-2">
                    <div className="flex-1 h-2 rounded-full bg-white/10 overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all"
                        style={{
                          width: `${progressPct}%`,
                          backgroundColor: track.color,
                        }}
                      />
                    </div>
                    <span className="text-gray-500 text-xs flex-shrink-0">
                      {completedCount}/{totalCount}
                    </span>
                  </div>

                  {/* Stars */}
                  {totalStars > 0 && (
                    <div className="mt-1.5 text-xs text-yellow-400">
                      ★ {totalStars} stars earned
                    </div>
                  )}
                </div>
              </div>

              {/* Hover gradient */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                style={{
                  background: `linear-gradient(135deg, ${track.color}08, transparent 50%)`,
                }}
              />
            </button>
          );
        })}

        {/* Free Play */}
        <button
          onClick={onFreePlay}
          className="w-full group rounded-2xl border border-dashed border-white/15 p-5 text-center transition-all hover:bg-white/5 hover:border-white/25"
        >
          <span className="text-gray-500 group-hover:text-gray-300 font-semibold">
            🎵 Free Play — Pick any song
          </span>
        </button>
      </div>

      {/* Bottom spacer */}
      <div className="h-8" />
    </div>
  );
}
