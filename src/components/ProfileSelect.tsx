'use client';

import { UserProfile } from '@/types/game';
import { xpToNextLevel } from '@/lib/storage';

const AVATARS = ['🎹', '🎵', '🎶', '🎸', '🎻', '🎺', '🥁', '🎤', '🦊', '🐱', '🐶', '🦁'];

interface ProfileSelectProps {
  profiles: UserProfile[];
  onSelectProfile: (id: string) => void;
  onCreateNew: () => void;
}

export default function ProfileSelect({ profiles, onSelectProfile, onCreateNew }: ProfileSelectProps) {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-[#0a0a1a] z-50 p-4">
      {/* Title */}
      <div className="mb-10 text-center">
        <h1 className="text-6xl font-black tracking-tight mb-2">
          <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent">
            PIANO
          </span>
          <span className="text-white ml-3">HERO</span>
        </h1>
        <p className="text-gray-400 text-lg mt-2">Who&apos;s playing?</p>
      </div>

      {/* Profile cards */}
      <div className="w-full max-w-md space-y-3">
        {profiles.map((profile) => {
          const { current, needed } = xpToNextLevel(profile);
          const progressPct = needed > 0 ? (current / needed) * 100 : 100;
          const avatar = AVATARS[profile.avatarIndex] ?? '🎹';

          return (
            <button
              key={profile.id}
              onClick={() => onSelectProfile(profile.id)}
              className="w-full group relative overflow-hidden rounded-xl border border-white/10 bg-white/5 px-5 py-4 text-left transition-all hover:bg-white/10 hover:border-white/20 hover:scale-[1.02] active:scale-[0.98]"
            >
              <div className="flex items-center gap-4">
                {/* Avatar */}
                <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center text-2xl flex-shrink-0">
                  {avatar}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="text-white font-semibold text-lg truncate">
                      {profile.displayName}
                    </h3>
                    <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-purple-500/20 text-purple-300 flex-shrink-0">
                      Lv.{profile.level}
                    </span>
                  </div>

                  {/* XP bar */}
                  <div className="mt-1.5 flex items-center gap-2">
                    <div className="flex-1 h-1.5 rounded-full bg-white/10 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-purple-500 to-pink-500"
                        style={{ width: `${progressPct}%` }}
                      />
                    </div>
                    <span className="text-gray-500 text-xs flex-shrink-0">{profile.xp} XP</span>
                  </div>

                  {/* Stats row */}
                  <div className="flex items-center gap-3 mt-1.5 text-xs text-gray-500">
                    {profile.currentStreak > 0 && (
                      <span className="text-orange-400">🔥 {profile.currentStreak} day streak</span>
                    )}
                    <span>{Object.keys(profile.songProgress).length} songs played</span>
                  </div>
                </div>
              </div>

              {/* Hover gradient */}
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500/0 via-purple-500/5 to-cyan-500/0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            </button>
          );
        })}

        {/* Add new profile */}
        <button
          onClick={onCreateNew}
          className="w-full rounded-xl border-2 border-dashed border-white/15 px-5 py-4 text-center text-gray-500 hover:text-white hover:border-white/30 transition-colors"
        >
          <span className="text-2xl mr-2">+</span>
          Add Player
        </button>
      </div>
    </div>
  );
}
