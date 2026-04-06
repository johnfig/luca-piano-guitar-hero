'use client';

interface CrescendoMeterProps {
  meter: number;        // 0-1
  isReady: boolean;
  isActive: boolean;
  timeRemaining: number;
}

export default function CrescendoMeter({ meter, isReady, isActive, timeRemaining }: CrescendoMeterProps) {
  if (meter === 0 && !isActive) return null;

  return (
    <div className="fixed left-4 top-1/2 -translate-y-1/2 z-40 pointer-events-none">
      <div className="relative w-3 h-48 rounded-full bg-white/10 overflow-hidden">
        {/* Fill */}
        <div
          className={`absolute bottom-0 left-0 right-0 rounded-full transition-all duration-100 ${
            isActive ? 'animate-pulse' : ''
          }`}
          style={{
            height: `${(isActive ? timeRemaining / 10 : meter) * 100}%`,
            background: isActive
              ? 'linear-gradient(to top, #ffd700, #ffaa00)'
              : isReady
                ? 'linear-gradient(to top, #ffd700, #ffcc00)'
                : 'linear-gradient(to top, #666, #999)',
            boxShadow: isActive || isReady
              ? '0 0 10px rgba(255,215,0,0.6)'
              : 'none',
          }}
        />
      </div>

      {/* Label */}
      {isReady && !isActive && (
        <div className="mt-2 text-center">
          <p className="text-yellow-400 text-[10px] font-bold animate-pulse">SPACE</p>
        </div>
      )}
      {isActive && (
        <div className="mt-2 text-center">
          <p className="text-yellow-300 text-[10px] font-black animate-pulse">
            {Math.ceil(timeRemaining)}s
          </p>
        </div>
      )}
    </div>
  );
}
