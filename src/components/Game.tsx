'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { GameState, Song, PianoKey, ActiveNote, Particle, HitEffect } from '@/types/game';
import { NOTE_TO_LANE } from '@/constants/keyboard';
import { LANE_COLORS } from '@/constants/colors';
import { FALL_DURATION } from '@/constants/timing';
import { LANE_TO_NOTE } from '@/constants/keyboard';

import AudioEngine from '@/engine/AudioEngine';
import InputManager from '@/engine/InputManager';
import NoteManager from '@/engine/NoteManager';
import ScoreManager from '@/engine/ScoreManager';
import ParticleSystem from '@/engine/ParticleSystem';
import EffectsManager from '@/engine/EffectsManager';

import Menu from './Menu';
import Countdown from './Countdown';
import PausedOverlay from './PausedOverlay';
import ResultsScreen from './ResultsScreen';
import HUD from './HUD';
import CrescendoMeter from './CrescendoMeter';
import PianoKeyboard from './PianoKeyboard';
import GameCanvas from './GameCanvas';

export default function Game() {
  const [gameState, setGameState] = useState<GameState>('MENU');
  const [currentSong, setCurrentSong] = useState<Song | null>(null);

  // Render state (updated every frame)
  const [visibleNotes, setVisibleNotes] = useState<ActiveNote[]>([]);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [effects, setEffects] = useState<HitEffect[]>([]);
  const [pressedNotes, setPressedNotes] = useState<Set<PianoKey>>(new Set());
  const [pressedLanes, setPressedLanes] = useState<Set<number>>(new Set());
  const [hitLanes, setHitLanes] = useState<Set<number>>(new Set());
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [multiplier, setMultiplier] = useState(1);
  const [crescendoMeter, setCrescendoMeter] = useState(0);
  const [crescendoReady, setCrescendoReady] = useState(false);
  const [crescendoActive, setCrescendoActive] = useState(false);
  const [crescendoTime, setCrescendoTime] = useState(0);
  const [songProgress, setSongProgress] = useState(0);

  // Engine refs
  const audioRef = useRef<AudioEngine | null>(null);
  const inputRef = useRef<InputManager | null>(null);
  const noteManagerRef = useRef<NoteManager | null>(null);
  const scoreManagerRef = useRef<ScoreManager | null>(null);
  const particleRef = useRef<ParticleSystem | null>(null);
  const effectsRef = useRef<EffectsManager | null>(null);

  // Timing refs
  const gameStartTimeRef = useRef(0);
  const lastFrameTimeRef = useRef(0);
  const rafRef = useRef<number>(0);
  const pauseTimeRef = useRef(0);
  const totalPausedRef = useRef(0);

  // Initialize audio on first interaction
  const initAudio = useCallback(() => {
    if (!audioRef.current) {
      audioRef.current = AudioEngine.getInstance();
    }
    if (!audioRef.current.isInitialized()) {
      audioRef.current.init();
    }
  }, []);

  // Handle song selection
  const handleSelectSong = useCallback((song: Song) => {
    initAudio();
    setCurrentSong(song);
    setGameState('COUNTDOWN');
  }, [initAudio]);

  // Start playing after countdown
  const handleCountdownComplete = useCallback(() => {
    if (!currentSong) return;

    // Initialize engines
    const noteManager = new NoteManager(currentSong);
    const scoreManager = new ScoreManager();
    const particleSys = new ParticleSystem();
    const effectsMgr = new EffectsManager();

    scoreManager.setTotalNotes(currentSong.notes.length);

    noteManagerRef.current = noteManager;
    scoreManagerRef.current = scoreManager;
    particleRef.current = particleSys;
    effectsRef.current = effectsMgr;

    // Set up input
    if (!inputRef.current) {
      inputRef.current = new InputManager();
    }

    gameStartTimeRef.current = performance.now() / 1000;
    lastFrameTimeRef.current = gameStartTimeRef.current;
    totalPausedRef.current = 0;

    setGameState('PLAYING');
  }, [currentSong]);

  // Key press handler
  const handleNotePress = useCallback((note: PianoKey, lane: number) => {
    const audio = audioRef.current;
    const noteManager = noteManagerRef.current;
    const scoreManager = scoreManagerRef.current;
    const particleSys = particleRef.current;
    const effectsMgr = effectsRef.current;

    if (!audio || !noteManager || !scoreManager || !particleSys || !effectsMgr) return;

    // Play piano sound
    audio.playNote(note, 0.3);

    // Check for hit
    const currentTime = performance.now() / 1000 - gameStartTimeRef.current - totalPausedRef.current;
    const hitResult = noteManager.checkHit(note, currentTime);

    if (hitResult) {
      scoreManager.addHit(hitResult.rating);
      audio.playHitSound();

      const combo = scoreManager.getCombo();
      audio.playComboSound(combo);

      // Emit particles at hit location
      const canvasWidth = window.innerWidth;
      const laneWidth = canvasWidth / 8;
      const hitX = lane * laneWidth + laneWidth / 2;
      const hitY = (window.innerHeight - 80) * 0.85;
      const color = LANE_COLORS[note];

      const particleCount = hitResult.rating === 'PERFECT' ? 15 : hitResult.rating === 'GREAT' ? 10 : 5;
      particleSys.emit(hitX, hitY, color, particleCount);
      effectsMgr.addHitEffect(lane, hitResult.rating, hitX, hitY);

      // Flash the lane
      setHitLanes((prev) => {
        const next = new Set(prev);
        next.add(lane);
        setTimeout(() => {
          setHitLanes((p) => {
            const n = new Set(p);
            n.delete(lane);
            return n;
          });
        }, 100);
        return next;
      });
    } else {
      // Key pressed but no note to hit — still play the sound but no points
    }
  }, []);

  // Handle space for crescendo
  useEffect(() => {
    const handleSpace = (e: KeyboardEvent) => {
      if (e.code === 'Space' && gameState === 'PLAYING') {
        e.preventDefault();
        const sm = scoreManagerRef.current;
        if (sm && sm.isCrescendoReady()) {
          sm.activateCrescendo();
          audioRef.current?.playCrescendoActivate();
        }
      }
    };
    window.addEventListener('keydown', handleSpace);
    return () => window.removeEventListener('keydown', handleSpace);
  }, [gameState]);

  // Handle escape for pause
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.code === 'Escape') {
        if (gameState === 'PLAYING') {
          pauseTimeRef.current = performance.now() / 1000;
          setGameState('PAUSED');
        } else if (gameState === 'PAUSED') {
          handleResume();
        }
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [gameState]);

  const handleResume = useCallback(() => {
    const pausedDuration = performance.now() / 1000 - pauseTimeRef.current;
    totalPausedRef.current += pausedDuration;
    setGameState('PLAYING');
  }, []);

  const handleQuit = useCallback(() => {
    inputRef.current?.stop();
    cancelAnimationFrame(rafRef.current);
    setGameState('MENU');
    setCurrentSong(null);
  }, []);

  const handleReplay = useCallback(() => {
    if (currentSong) {
      setGameState('COUNTDOWN');
    }
  }, [currentSong]);

  // Main game loop
  useEffect(() => {
    if (gameState !== 'PLAYING') {
      if (gameState === 'PAUSED') {
        inputRef.current?.stop();
      }
      return;
    }

    // Start input listening
    const input = inputRef.current!;
    input.onKeyDown = handleNotePress;
    input.onKeyUp = (note: PianoKey) => {
      setPressedNotes((prev) => {
        const next = new Set(prev);
        next.delete(note);
        return next;
      });
      setPressedLanes((prev) => {
        const next = new Set(prev);
        next.delete(NOTE_TO_LANE[note]);
        return next;
      });
    };

    // Wrap onKeyDown to also track pressed state
    const originalHandler = handleNotePress;
    input.onKeyDown = (note: PianoKey, lane: number) => {
      setPressedNotes((prev) => new Set(prev).add(note));
      setPressedLanes((prev) => new Set(prev).add(lane));
      originalHandler(note, lane);
    };

    input.start();

    const noteManager = noteManagerRef.current!;
    const scoreManager = scoreManagerRef.current!;
    const particleSys = particleRef.current!;
    const effectsMgr = effectsRef.current!;

    const gameLoop = () => {
      const now = performance.now() / 1000;
      const currentTime = now - gameStartTimeRef.current - totalPausedRef.current;
      const deltaTime = Math.min(now - lastFrameTimeRef.current, 0.05);
      lastFrameTimeRef.current = now;

      // Update systems
      noteManager.update(currentTime, FALL_DURATION);
      particleSys.update(deltaTime);
      effectsMgr.update(deltaTime);
      scoreManager.updateCrescendo(deltaTime);

      // Check for missed notes (auto-miss)
      const visible = noteManager.getVisibleNotes();
      for (const n of visible) {
        if (n.missed && !n.hit && n.opacity > 0.95) {
          scoreManager.addMiss();
        }
      }

      // Calculate song progress
      if (currentSong) {
        const lastNoteTime = currentSong.notes[currentSong.notes.length - 1]?.time ?? 0;
        setSongProgress(Math.min(currentTime / (lastNoteTime + 2), 1));
      }

      // Update render state
      setVisibleNotes([...visible]);
      setParticles([...particleSys.getParticles()]);
      setEffects([...effectsMgr.getEffects()]);
      setScore(scoreManager.getScore());
      setCombo(scoreManager.getCombo());
      setMultiplier(scoreManager.getMultiplier());
      setCrescendoMeter(scoreManager.getCrescendoMeter());
      setCrescendoReady(scoreManager.isCrescendoReady());
      setCrescendoActive(scoreManager.isCrescendoActive());
      setCrescendoTime(scoreManager.getCrescendoTimeRemaining());

      // Check if song is complete
      if (noteManager.isComplete(currentTime)) {
        input.stop();
        setGameState('RESULTS');
        return;
      }

      rafRef.current = requestAnimationFrame(gameLoop);
    };

    rafRef.current = requestAnimationFrame(gameLoop);

    return () => {
      cancelAnimationFrame(rafRef.current);
      input.stop();
    };
  }, [gameState, currentSong, handleNotePress]);

  return (
    <div className="fixed inset-0 bg-[#0a0a1a] overflow-hidden select-none">
      {/* Game canvas (always rendered for background) */}
      {(gameState === 'PLAYING' || gameState === 'PAUSED' || gameState === 'COUNTDOWN') && currentSong && (
        <>
          <GameCanvas
            notes={visibleNotes}
            particles={particles}
            effects={effects}
            pressedLanes={pressedLanes}
            crescendoActive={crescendoActive}
            bpm={currentSong.bpm}
            songProgress={songProgress}
          />
          <PianoKeyboard pressedNotes={pressedNotes} hitLanes={hitLanes} />
        </>
      )}

      {/* HUD */}
      {gameState === 'PLAYING' && currentSong && (
        <>
          <HUD
            score={score}
            combo={combo}
            multiplier={multiplier}
            songTitle={currentSong.title}
            crescendoActive={crescendoActive}
          />
          <CrescendoMeter
            meter={crescendoMeter}
            isReady={crescendoReady}
            isActive={crescendoActive}
            timeRemaining={crescendoTime}
          />
        </>
      )}

      {/* State-specific overlays */}
      {gameState === 'MENU' && <Menu onSelectSong={handleSelectSong} />}

      {gameState === 'COUNTDOWN' && <Countdown onComplete={handleCountdownComplete} />}

      {gameState === 'PAUSED' && (
        <PausedOverlay onResume={handleResume} onQuit={handleQuit} />
      )}

      {gameState === 'RESULTS' && currentSong && scoreManagerRef.current && (
        <ResultsScreen
          song={currentSong}
          stats={scoreManagerRef.current.getStats()}
          grade={scoreManagerRef.current.getGrade()}
          onReplay={handleReplay}
          onMenu={handleQuit}
        />
      )}
    </div>
  );
}
