'use client';

import { GameStats, Grade, Song } from '@/types/game';

interface ResultsScreenProps {
  song: Song;
  stats: GameStats;
  grade: Grade;
  onReplay: () => void;
  onMenu: () => void;
}

const gradeColors: Record<Grade, string> = {
  S: 'from-yellow-300 to-yellow-500',
  A: 'from-green-300 to-green-500',
  B: 'from-blue-300 to-blue-500',
  C: 'from-purple-300 to-purple-500',
  D: 'from-orange-300 to-orange-500',
  F: 'from-red-400 to-red-600',
};

const gradeGlow: Record<Grade, string> = {
  S: '0 0 60px rgba(255,215,0,0.5)',
  A: '0 0 40px rgba(34,197,94,0.4)',
  B: '0 0 40px rgba(59,130,246,0.4)',
  C: '0 0 30px rgba(168,85,247,0.3)',
  D: '0 0 30px rgba(249,115,22,0.3)',
  F: '0 0 30px rgba(239,68,68,0.3)',
};

export default function ResultsScreen({ song, stats, grade, onReplay, onMenu }: ResultsScreenProps) {
  const accuracy = stats.totalNotes > 0
    ? ((stats.perfect + stats.great + stats.good) / stats.totalNotes * 100).toFixed(1)
    : '0';

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#0a0a1a] z-50">
      <div className="text-center space-y-8 max-w-md w-full px-4">
        {/* Song info */}
        <div>
          <p className="text-gray-500 text-sm uppercase tracking-wider">Results</p>
          <h2 className="text-2xl font-bold text-white mt-1">{song.title}</h2>
        </div>

        {/* Grade */}
        <div
          className="inline-block"
          style={{ filter: `drop-shadow(${gradeGlow[grade]})` }}
        >
          <span
            className={`text-9xl font-black bg-gradient-to-b ${gradeColors[grade]} bg-clip-text text-transparent`}
          >
            {grade}
          </span>
        </div>

        {/* Score */}
        <div>
          <p className="text-5xl font-black text-white tabular-nums">
            {stats.score.toLocaleString()}
          </p>
          <p className="text-gray-500 text-sm mt-1">{accuracy}% accuracy</p>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 gap-3">
          <StatBox label="Perfect" value={stats.perfect} color="text-yellow-400" />
          <StatBox label="Great" value={stats.great} color="text-green-400" />
          <StatBox label="Good" value={stats.good} color="text-blue-400" />
          <StatBox label="Miss" value={stats.miss} color="text-red-400" />
        </div>

        {/* Max combo */}
        <div className="py-3 px-4 rounded-xl bg-white/5 border border-white/10">
          <p className="text-gray-500 text-xs uppercase tracking-wider">Max Combo</p>
          <p className="text-2xl font-black text-white">{stats.maxCombo}</p>
        </div>

        {/* Actions */}
        <div className="flex gap-3 justify-center">
          <button
            onClick={onReplay}
            className="py-3 px-8 rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold text-lg hover:scale-105 active:scale-95 transition-transform"
          >
            Play Again
          </button>
          <button
            onClick={onMenu}
            className="py-3 px-8 rounded-xl border border-white/20 text-gray-400 font-semibold hover:text-white hover:border-white/40 transition-colors"
          >
            Menu
          </button>
        </div>
      </div>
    </div>
  );
}

function StatBox({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div className="py-3 px-4 rounded-xl bg-white/5 border border-white/10">
      <p className="text-gray-500 text-xs uppercase tracking-wider">{label}</p>
      <p className={`text-2xl font-black ${color}`}>{value}</p>
    </div>
  );
}
