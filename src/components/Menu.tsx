'use client';

import { Song, UserProfile } from '@/types/game';
import { songs } from '@/songs';
import { xpToNextLevel } from '@/lib/storage';

const AVATARS = ['🎹', '🎵', '🎶', '🎸', '🎻', '🎺', '🥁', '🎤', '🦊', '🐱', '🐶', '🦁'];

interface MenuProps {
  onSelectSong: (song: Song) => void;
  profile: UserProfile | null;
  onSwitchProfile: () => void;
  onBack: () => void;
}

const difficultyColors = {
  Easy: 'text-green-400 border-green-400/30',
  Medium: 'text-yellow-400 border-yellow-400/30',
  Hard: 'text-red-400 border-red-400/30',
};

export default function Menu({ onSelectSong, profile, onSwitchProfile, onBack }: MenuProps) {
  const xpProgress = profile ? xpToNextLevel(profile) : null;
  const avatar = profile ? (AVATARS[profile.avatarIndex] ?? '🎹') : '🎹';

  return (
    <div className="fixed inset-0 flex flex-col items-center bg-[#0a0a1a] z-50 overflow-y-auto">
      {/* Profile bar */}
      {profile && (
        <div className="w-full max-w-lg px-4 pt-4">
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
              {xpProgress && (
                <div className="mt-1 flex items-center gap-2">
                  <div className="flex-1 h-1 rounded-full bg-white/10 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-purple-500 to-pink-500"
                      style={{ width: `${xpProgress.needed > 0 ? (xpProgress.current / xpProgress.needed) * 100 : 100}%` }}
                    />
                  </div>
                  <span className="text-gray-600 text-xs">{xpProgress.current}/{xpProgress.needed} XP</span>
                </div>
              )}
            </div>
            <span className="text-gray-600 text-xs">Switch</span>
          </button>
        </div>
      )}

      {/* Back button */}
      <div className="w-full max-w-lg px-4 mt-4">
        <button
          onClick={onBack}
          className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
        >
          ←
        </button>
      </div>

      {/* Title */}
      <div className="mb-8 mt-4 text-center">
        <h1 className="text-7xl font-black tracking-tight mb-2">
          <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent">
            PIANO
          </span>
          <span className="text-white ml-3">HERO</span>
        </h1>
        <p className="text-gray-500 text-lg tracking-widest uppercase">
          Master the keys
        </p>
      </div>

      {/* Song list */}
      <div className="w-full max-w-lg space-y-3 px-4 pb-8">
        <h2 className="text-gray-400 text-sm font-semibold uppercase tracking-wider mb-4">
          Select a Song
        </h2>
        {songs.map((song) => {
          const progress = profile?.songProgress[song.id];
          const stars = progress?.stars ?? 0;

          return (
            <button
              key={song.id}
              onClick={() => onSelectSong(song)}
              className="w-full group relative overflow-hidden rounded-xl border border-white/10 bg-white/5 px-6 py-4 text-left transition-all hover:bg-white/10 hover:border-white/20 hover:scale-[1.02] active:scale-[0.98]"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-white font-semibold text-lg group-hover:text-white/90">
                    {song.title}
                  </h3>
                  <p className="text-gray-500 text-sm">{song.artist}</p>
                  {/* Stars */}
                  {stars > 0 && (
                    <div className="flex gap-0.5 mt-1">
                      {[1, 2, 3].map(s => (
                        <span key={s} className={`text-sm ${s <= stars ? 'text-yellow-400' : 'text-gray-700'}`}>
                          ★
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-gray-500 text-xs">{song.notes.length} notes</span>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold border ${difficultyColors[song.difficulty]}`}
                  >
                    {song.difficulty}
                  </span>
                </div>
              </div>

              {/* Best score */}
              {progress && (
                <div className="mt-2 flex items-center gap-3 text-xs text-gray-500">
                  <span>Best: {progress.bestScore.toLocaleString()}</span>
                  <span className="text-purple-400">{progress.bestGrade}</span>
                  <span>{progress.bestAccuracy.toFixed(0)}%</span>
                </div>
              )}

              {/* Hover gradient */}
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500/0 via-purple-500/5 to-cyan-500/0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            </button>
          );
        })}
      </div>

      {/* Key guide */}
      <div className="pb-8 text-center">
        <p className="text-gray-600 text-xs mb-2">KEYBOARD MAPPING</p>
        <div className="flex gap-1">
          {['A', 'S', 'D', 'F', '', 'J', 'K', 'L', ';'].map((key, i) =>
            key === '' ? (
              <div key={i} className="w-4" />
            ) : (
              <div
                key={i}
                className="w-10 h-10 rounded-lg border border-white/20 bg-white/5 flex items-center justify-center text-gray-400 text-sm font-mono"
              >
                {key}
              </div>
            )
          )}
        </div>
        <p className="text-gray-600 text-xs mt-2">C4 &mdash; D4 &mdash; E4 &mdash; F4 &nbsp;&nbsp;&nbsp; G4 &mdash; A4 &mdash; B4 &mdash; C5</p>
      </div>
    </div>
  );
}
