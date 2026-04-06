'use client';

import { useEffect, useState } from 'react';

interface CountdownProps {
  onComplete: () => void;
}

export default function Countdown({ onComplete }: CountdownProps) {
  const [count, setCount] = useState(3);

  useEffect(() => {
    if (count === 0) {
      const timer = setTimeout(onComplete, 400);
      return () => clearTimeout(timer);
    }

    const timer = setTimeout(() => setCount((c) => c - 1), 800);
    return () => clearTimeout(timer);
  }, [count, onComplete]);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
      <div className="relative">
        <span
          key={count}
          className="text-9xl font-black text-white animate-ping-once"
          style={{
            textShadow: count > 0
              ? '0 0 40px rgba(255,100,200,0.8), 0 0 80px rgba(255,100,200,0.4)'
              : '0 0 40px rgba(255,215,0,0.8), 0 0 80px rgba(255,215,0,0.4)',
          }}
        >
          {count > 0 ? count : 'GO!'}
        </span>
      </div>
    </div>
  );
}
