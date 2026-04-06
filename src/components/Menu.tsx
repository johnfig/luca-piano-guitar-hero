'use client';

import { Song } from '@/types/game';
import { songs } from '@/songs';

interface MenuProps {
  onSelectSong: (song: Song) => void;
}

const difficultyColors = {
  Easy: 'text-green-400 border-green-400/30',
  Medium: 'text-yellow-400 border-yellow-400/30',
  Hard: 'text-red-400 border-red-400/30',
};

export default function Menu({ onSelectSong }: MenuProps) {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-[#0a0a1a] z-50">
      {/* Title */}
      <div className="mb-12 text-center">
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
      <div className="w-full max-w-lg space-y-3 px-4">
        <h2 className="text-gray-400 text-sm font-semibold uppercase tracking-wider mb-4">
          Select a Song
        </h2>
        {songs.map((song) => (
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

            {/* Hover gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-pink-500/0 via-purple-500/5 to-cyan-500/0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
          </button>
        ))}
      </div>

      {/* Key guide */}
      <div className="mt-12 text-center">
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
