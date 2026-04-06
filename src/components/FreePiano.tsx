'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { MidiNote } from '@/types/game';
import { midiNoteToName, isWhiteKey } from '@/constants/keyboard';
import { MIDI_49_LOWEST, MIDI_49_HIGHEST } from '@/utils/pianoPositions';
import AudioEngine from '@/engine/AudioEngine';
import InputManager from '@/engine/InputManager';

interface FreePianoProps {
  inputManager: InputManager;
  onBack: () => void;
}

const WHITE_KEY_HEIGHT = 120;
const BLACK_KEY_HEIGHT = 75;

export default function FreePiano({ inputManager, onBack }: FreePianoProps) {
  const [pressedNotes, setPressedNotes] = useState<Set<MidiNote>>(new Set());
  const audioRef = useRef<AudioEngine | null>(null);

  // Init audio
  useEffect(() => {
    audioRef.current = AudioEngine.getInstance();
    if (!audioRef.current.isInitialized()) {
      audioRef.current.init();
    }
  }, []);

  // Set up input listening
  useEffect(() => {
    const input = inputManager;

    // Build a full-range noteToLane so all MIDI notes trigger callbacks
    input.setActiveLanes(buildFullRange());

    input.onKeyDown = (midiNote: MidiNote) => {
      audioRef.current?.startNote(midiNote);
      setPressedNotes(prev => new Set(prev).add(midiNote));
    };

    input.onKeyUp = (midiNote: MidiNote) => {
      audioRef.current?.stopNote(midiNote);
      setPressedNotes(prev => {
        const next = new Set(prev);
        next.delete(midiNote);
        return next;
      });
    };

    input.start();

    return () => {
      input.stop();
      audioRef.current?.stopAllNotes();
    };
  }, [inputManager]);

  // Escape to go back
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.code === 'Escape') {
        onBack();
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onBack]);

  // Build all notes in 49-key range
  const allNotes = buildFullRange();
  const whiteNotes = allNotes.filter(n => isWhiteKey(n));
  const blackNotes = allNotes.filter(n => !isWhiteKey(n));

  const whiteKeyWidth = 100 / whiteNotes.length;
  const blackKeyWidth = whiteKeyWidth * 0.62;

  const whiteKeyIndex = new Map<MidiNote, number>();
  whiteNotes.forEach((n, i) => whiteKeyIndex.set(n, i));

  const keyPositions = new Map<MidiNote, { x: number; width: number }>();
  whiteNotes.forEach((note, i) => {
    keyPositions.set(note, { x: i * whiteKeyWidth, width: whiteKeyWidth });
  });
  blackNotes.forEach(note => {
    const idx = whiteKeyIndex.get(note - 1);
    if (idx !== undefined) {
      const rightEdge = (idx + 1) * whiteKeyWidth;
      keyPositions.set(note, { x: rightEdge - blackKeyWidth / 2, width: blackKeyWidth });
    }
  });

  return (
    <div className="fixed inset-0 flex flex-col z-50" style={{ backgroundColor: '#0F0B1A' }}>
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4">
        <button
          onClick={onBack}
          className="text-gray-400 hover:text-white transition-colors text-sm"
        >
          ← Back
        </button>
        <h1 className="text-white text-lg font-semibold">Free Play Piano</h1>
        <span className="text-gray-500 text-xs">ESC to exit</span>
      </div>

      {/* Main area — visual feedback */}
      <div className="flex-1 flex items-center justify-center">
        {pressedNotes.size > 0 ? (
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 flex-wrap">
              {[...pressedNotes].sort().map(note => (
                <span
                  key={note}
                  className="text-3xl font-bold px-4 py-2 rounded-xl"
                  style={{
                    color: isWhiteKey(note) ? '#ffffff' : '#a0a0ff',
                    backgroundColor: isWhiteKey(note) ? 'rgba(255,255,255,0.1)' : 'rgba(160,160,255,0.1)',
                    border: `1px solid ${isWhiteKey(note) ? 'rgba(255,255,255,0.2)' : 'rgba(160,160,255,0.2)'}`,
                  }}
                >
                  {midiNoteToName(note)}
                </span>
              ))}
            </div>
          </div>
        ) : (
          <p className="text-gray-500 text-lg">Play any key on your MIDI keyboard...</p>
        )}
      </div>

      {/* Full piano keyboard */}
      <div className="relative" style={{ height: WHITE_KEY_HEIGHT }}>
        {/* White keys */}
        {whiteNotes.map(midiNote => {
          const isPressed = pressedNotes.has(midiNote);
          const pos = keyPositions.get(midiNote)!;
          const isC = midiNote % 12 === 0;
          const octave = Math.floor(midiNote / 12) - 1;

          return (
            <div
              key={`w-${midiNote}`}
              className="absolute top-0"
              style={{
                left: `${pos.x}%`,
                width: `${pos.width}%`,
                height: WHITE_KEY_HEIGHT,
              }}
            >
              <div
                className="absolute inset-0 transition-colors duration-75"
                style={{
                  background: isPressed
                    ? 'linear-gradient(to bottom, #e0e0e0, #b8d4f0, #a0c4e8)'
                    : 'linear-gradient(to bottom, #f4f4f4, #e8e8e8, #d8d8d8)',
                  borderLeft: '1px solid rgba(0,0,0,0.12)',
                  borderRight: '1px solid rgba(0,0,0,0.12)',
                  borderBottom: '4px solid rgba(0,0,0,0.15)',
                  borderRadius: '0 0 6px 6px',
                }}
              />
              {isPressed && (
                <div
                  className="absolute left-0 right-0"
                  style={{
                    top: BLACK_KEY_HEIGHT,
                    bottom: 0,
                    background: 'linear-gradient(to bottom, rgba(100,180,255,0.4), rgba(100,180,255,0.2))',
                    borderRadius: '0 0 6px 6px',
                  }}
                />
              )}
              <div className="absolute inset-0 flex flex-col items-center justify-end pb-3 pointer-events-none">
                {isC && (
                  <span
                    className="text-[10px] font-bold"
                    style={{ color: isPressed ? '#4488cc' : 'rgba(0,0,0,0.3)' }}
                  >
                    C{octave}
                  </span>
                )}
              </div>
            </div>
          );
        })}

        {/* Black keys */}
        {blackNotes.map(midiNote => {
          const isPressed = pressedNotes.has(midiNote);
          const pos = keyPositions.get(midiNote);
          if (!pos) return null;

          return (
            <div
              key={`b-${midiNote}`}
              className="absolute top-0 z-10"
              style={{
                left: `${pos.x}%`,
                width: `${pos.width}%`,
                height: BLACK_KEY_HEIGHT,
              }}
            >
              <div
                className="absolute inset-0 transition-colors duration-75"
                style={{
                  background: isPressed
                    ? 'linear-gradient(to bottom, #6688bb, #445588)'
                    : 'linear-gradient(to bottom, #2a2a2a, #1a1a1a)',
                  borderLeft: '1px solid rgba(0,0,0,0.4)',
                  borderRight: '1px solid rgba(0,0,0,0.4)',
                  borderBottom: '3px solid rgba(0,0,0,0.7)',
                  borderRadius: '0 0 4px 4px',
                  boxShadow: isPressed
                    ? '0 0 10px rgba(100,140,200,0.4)'
                    : '0 3px 8px rgba(0,0,0,0.6)',
                }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

function buildFullRange(): MidiNote[] {
  const notes: MidiNote[] = [];
  for (let n = MIDI_49_LOWEST; n <= MIDI_49_HIGHEST; n++) {
    notes.push(n);
  }
  return notes;
}
