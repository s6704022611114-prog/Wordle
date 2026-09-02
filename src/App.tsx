/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Header } from './components/Header';
import { Grid } from './components/Grid';
import { Keyboard } from './components/Keyboard';
import { ColorLegend } from './components/ColorLegend';
import { HelpModal } from './components/HelpModal';
import { StatsModal } from './components/StatsModal';
import { Toast } from './components/Toast';
import {
  getRandomTargetWord,
  isValidWord,
  evaluateGuess,
  checkWordValidity,
} from './words';
import {
  GameStatus,
  TileStatus,
  WordInfo,
  GameStats,
  ToastMessage,
  SavedGameState,
} from './types';

const STATS_STORAGE_KEY = 'wordle_thai_stats_v1';
const GAME_STATE_STORAGE_KEY = 'wordle_thai_game_state_v1';

const DEFAULT_STATS: GameStats = {
  played: 0,
  winCount: 0,
  currentStreak: 0,
  maxStreak: 0,
  guessDistribution: {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
  },
};

const WIN_MESSAGES = [
  'อัจฉริยะมาก! 🎉 (Genius)',
  'ยอดเยี่ยมเหลือเชื่อ! 🌟 (Magnificent)',
  'เก่งมากๆ! ✨ (Impressive)',
  'เยี่ยมไปเลย! 👏 (Splendid)',
  'ดีมาก! 👍 (Great)',
  'เฉียดฉิว! รอดมาได้ 😅 (Phew)',
];

// Helper to compute keyboard letter statuses from a list of guesses and evaluations
function computeKeyboardStatuses(
  guesses: string[],
  evaluations: TileStatus[][]
): Record<string, TileStatus> {
  const statuses: Record<string, TileStatus> = {};
  for (let r = 0; r < guesses.length; r++) {
    const guess = guesses[r];
    const rowEvals = evaluations[r] || [];
    for (let c = 0; c < guess.length; c++) {
      const char = guess[c];
      const status = rowEvals[c];
      const current = statuses[char];

      if (status === 'correct') {
        statuses[char] = 'correct';
      } else if (status === 'present' && current !== 'correct') {
        statuses[char] = 'present';
      } else if (status === 'absent' && !current) {
        statuses[char] = 'absent';
      }
    }
  }
  return statuses;
}

// Helper to load initial saved game state safely
function loadSavedGameState(): SavedGameState | null {
  try {
    const saved = localStorage.getItem(GAME_STATE_STORAGE_KEY);
    if (saved) {
      const parsed: SavedGameState = JSON.parse(saved);
      if (
        parsed &&
        parsed.targetWordInfo &&
        typeof parsed.targetWordInfo.word === 'string' &&
        Array.isArray(parsed.guesses) &&
        Array.isArray(parsed.evaluations)
      ) {
        return parsed;
      }
    }
  } catch {
    // ignore
  }
  return null;
}

export default function App() {
  const initialSavedState = useRef<SavedGameState | null>(loadSavedGameState());

  const [targetWordInfo, setTargetWordInfo] = useState<WordInfo>(() => {
    return initialSavedState.current?.targetWordInfo || getRandomTargetWord();
  });
  const [guesses, setGuesses] = useState<string[]>(() => {
    return initialSavedState.current?.guesses || [];
  });
  const [evaluations, setEvaluations] = useState<TileStatus[][]>(() => {
    return initialSavedState.current?.evaluations || [];
  });
  const [currentGuess, setCurrentGuess] = useState<string>('');
  const [gameStatus, setGameStatus] = useState<GameStatus>(() => {
    return initialSavedState.current?.gameStatus || 'IN_PROGRESS';
  });
  const [letterStatuses, setLetterStatuses] = useState<Record<string, TileStatus>>(() => {
    if (initialSavedState.current) {
      return computeKeyboardStatuses(
        initialSavedState.current.guesses,
        initialSavedState.current.evaluations
      );
    }
    return {};
  });
  
  // Animation states
  const [isShaking, setIsShaking] = useState(false);
  const [isValidating, setIsValidating] = useState(false);
  const [isRevealingRow, setIsRevealingRow] = useState<number | null>(null);
  const [wonRowIndex, setWonRowIndex] = useState<number | null>(() => {
    if (initialSavedState.current?.gameStatus === 'WON') {
      return initialSavedState.current.wonRowIndex ?? (initialSavedState.current.guesses.length - 1);
    }
    return null;
  });

  // Modals & Notifications
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [isStatsOpen, setIsStatsOpen] = useState(false);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Statistics
  const [stats, setStats] = useState<GameStats>(() => {
    try {
      const saved = localStorage.getItem(STATS_STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // ignore
    }
    return DEFAULT_STATS;
  });

  // Ref to prevent stale closures in keyboard listener
  const stateRef = useRef({
    currentGuess,
    guesses,
    gameStatus,
    targetWordInfo,
    isRevealingRow,
    isValidating,
    isHelpOpen,
    isStatsOpen,
  });

  useEffect(() => {
    stateRef.current = {
      currentGuess,
      guesses,
      gameStatus,
      targetWordInfo,
      isRevealingRow,
      isValidating,
      isHelpOpen,
      isStatsOpen,
    };
  }, [currentGuess, guesses, gameStatus, targetWordInfo, isRevealingRow, isValidating, isHelpOpen, isStatsOpen]);

  // Show Toast helper
  const showToast = useCallback(
    (text: string, type: ToastMessage['type'] = 'default', duration = 2000) => {
      const id = Date.now().toString() + Math.random().toString(36).substring(2, 5);
      const newToast: ToastMessage = { id, text, type, duration };
      setToasts((prev) => [...prev, newToast]);

      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, duration);
    },
    []
  );

  // Save game state to localStorage
  const saveGameState = useCallback((state: SavedGameState) => {
    try {
      localStorage.setItem(GAME_STATE_STORAGE_KEY, JSON.stringify(state));
    } catch {
      // ignore
    }
  }, []);

  // Save stats to localStorage
  const updateStats = useCallback((hasWon: boolean, roundIndex: number) => {
    setStats((prev) => {
      const played = prev.played + 1;
      const winCount = hasWon ? prev.winCount + 1 : prev.winCount;
      const currentStreak = hasWon ? prev.currentStreak + 1 : 0;
      const maxStreak = Math.max(prev.maxStreak, currentStreak);
      const guessDistribution = { ...prev.guessDistribution };

      if (hasWon && roundIndex >= 1 && roundIndex <= 6) {
        guessDistribution[roundIndex as 1 | 2 | 3 | 4 | 5 | 6] =
          (guessDistribution[roundIndex as 1 | 2 | 3 | 4 | 5 | 6] || 0) + 1;
      }

      const newStats: GameStats = {
        played,
        winCount,
        currentStreak,
        maxStreak,
        guessDistribution,
        lastPlayedDate: new Date().toISOString(),
      };

      try {
        localStorage.setItem(STATS_STORAGE_KEY, JSON.stringify(newStats));
      } catch {
        // ignore
      }

      return newStats;
    });
  }, []);

  // Submit Current Guess
  const handleEnter = useCallback(async () => {
    const {
      currentGuess: guess,
      guesses: currentGuesses,
      gameStatus: status,
      targetWordInfo: target,
      isRevealingRow: revealing,
      isValidating: validating,
    } = stateRef.current;

    if (status !== 'IN_PROGRESS' || revealing !== null || validating) {
      return;
    }

    // Require all 5 letters
    if (guess.length < 5) {
      showToast('Not enough letters', 'error', 2000);
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
      return;
    }

    // Check word validity against Dictionary API and cached word lists
    setIsValidating(true);
    const isValid = await checkWordValidity(guess);
    setIsValidating(false);

    // If word is invalid / not found: block submit, shake current row, show toast for 2s
    if (!isValid) {
      showToast('Not in word list', 'error', 2000);
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
      return;
    }

    // Evaluate
    const evalResult = evaluateGuess(guess, target.word);
    const newGuesses = [...currentGuesses, guess];
    const newEvaluations = [...evaluations, evalResult];
    const rowIndex = currentGuesses.length;

    setIsRevealingRow(rowIndex);
    setGuesses(newGuesses);
    setEvaluations(newEvaluations);
    setCurrentGuess('');

    // Update each keyboard letter gradually as its corresponding tile finishes flipping
    // Tile i finishes flip at: (i * 250) + 500 ms
    for (let i = 0; i < 5; i++) {
      const char = guess[i];
      const letterEval = evalResult[i];
      setTimeout(() => {
        setLetterStatuses((prev) => {
          const next = { ...prev };
          const currentStatus = next[char];
          if (letterEval === 'correct') {
            next[char] = 'correct';
          } else if (letterEval === 'present' && currentStatus !== 'correct') {
            next[char] = 'present';
          } else if (letterEval === 'absent' && !currentStatus) {
            next[char] = 'absent';
          }
          return next;
        });
      }, i * 250 + 400);
    }

    // Wait until tile 5 is completely finished flipping (1550ms) before re-enabling input or finishing game
    const totalFlipDuration = 4 * 250 + 550; // 1550ms

    setTimeout(() => {
      setIsRevealingRow(null);

      let nextGameStatus: GameStatus = 'IN_PROGRESS';
      let nextWonIndex: number | null = null;

      // Check WIN
      if (guess.toUpperCase() === target.word.toUpperCase()) {
        nextGameStatus = 'WON';
        nextWonIndex = rowIndex;
        setGameStatus('WON');
        setWonRowIndex(rowIndex);
        updateStats(true, newGuesses.length);
        showToast(WIN_MESSAGES[rowIndex] || 'ยินดีด้วย! คุณทายถูก 🎉', 'success', 3000);
        setTimeout(() => {
          setIsStatsOpen(true);
        }, 1600);
      } else if (newGuesses.length >= 6) {
        // Check LOSS
        nextGameStatus = 'LOST';
        setGameStatus('LOST');
        updateStats(false, 0);
        showToast(`เฉลย: ${target.word} (${target.meaningTh})`, 'info', 4000);
        setTimeout(() => {
          setIsStatsOpen(true);
        }, 1800);
      }

      // Persist latest state to localStorage
      saveGameState({
        targetWordInfo: target,
        guesses: newGuesses,
        evaluations: newEvaluations,
        gameStatus: nextGameStatus,
        wonRowIndex: nextWonIndex,
      });
    }, totalFlipDuration);
  }, [evaluations, saveGameState, showToast, updateStats]);

  // Add Character
  const handleChar = useCallback((char: string) => {
    const { currentGuess: guess, gameStatus: status, isRevealingRow: revealing, isValidating: validating } = stateRef.current;
    if (status !== 'IN_PROGRESS' || revealing !== null || validating) return;
    if (guess.length >= 5) return;

    setCurrentGuess((prev) => (prev.length < 5 ? prev + char.toUpperCase() : prev));
  }, []);

  // Delete Character
  const handleDelete = useCallback(() => {
    const { gameStatus: status, isRevealingRow: revealing, isValidating: validating } = stateRef.current;
    if (status !== 'IN_PROGRESS' || revealing !== null || validating) return;

    setCurrentGuess((prev) => prev.slice(0, -1));
  }, []);

  // Physical Keyboard listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if modals are open or modifier keys pressed
      if (stateRef.current.isHelpOpen || stateRef.current.isStatsOpen) {
        if (e.key === 'Escape') {
          setIsHelpOpen(false);
          setIsStatsOpen(false);
        }
        return;
      }

      if (e.ctrlKey || e.metaKey || e.altKey) return;

      if (e.key === 'Enter') {
        e.preventDefault();
        handleEnter();
      } else if (e.key === 'Backspace' || e.key === 'Delete') {
        e.preventDefault();
        handleDelete();
      } else if (/^[a-zA-Z]$/.test(e.key)) {
        e.preventDefault();
        handleChar(e.key.toUpperCase());
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleEnter, handleDelete, handleChar]);

  // Start New Game (Clears saved round from localStorage)
  const handleNewGame = useCallback(() => {
    try {
      localStorage.removeItem(GAME_STATE_STORAGE_KEY);
    } catch {
      // ignore
    }

    let nextWord = getRandomTargetWord();
    // Ensure different word if possible
    if (nextWord.word === targetWordInfo.word) {
      nextWord = getRandomTargetWord();
    }

    setTargetWordInfo(nextWord);
    setGuesses([]);
    setEvaluations([]);
    setCurrentGuess('');
    setGameStatus('IN_PROGRESS');
    setLetterStatuses({});
    setWonRowIndex(null);
    setIsRevealingRow(null);
    setIsStatsOpen(false);
    showToast('เริ่มเกมใหม่แล้ว! ทายคำ 5 ตัวอักษร', 'info', 2000);
  }, [targetWordInfo.word, showToast]);

  return (
    <div className="flex flex-col min-h-screen bg-[#121213] text-gray-100 justify-between selection:bg-emerald-500 selection:text-white">
      {/* Toast Notification Container */}
      <Toast toasts={toasts} />

      {/* Top Navigation / App Header */}
      <Header
        onNewGame={handleNewGame}
        onOpenHelp={() => setIsHelpOpen(true)}
        onOpenStats={() => setIsStatsOpen(true)}
      />

      {/* Main Game Center Area */}
      <main className="flex-1 flex flex-col items-center justify-center w-full px-2 py-1 max-w-lg mx-auto">
        <Grid
          guesses={guesses}
          evaluations={evaluations}
          currentGuess={currentGuess}
          isShaking={isShaking}
          isRevealingRow={isRevealingRow}
          wonRowIndex={wonRowIndex}
        />

        {/* Color Legend for quick reference */}
        <ColorLegend />
      </main>

      {/* Virtual On-screen Keyboard */}
      <footer className="w-full max-w-lg mx-auto mt-auto">
        <Keyboard
          onChar={handleChar}
          onEnter={handleEnter}
          onDelete={handleDelete}
          letterStatuses={letterStatuses}
          disabled={gameStatus !== 'IN_PROGRESS' || isRevealingRow !== null || isValidating}
        />
      </footer>

      {/* Help / Rules Modal */}
      <HelpModal
        isOpen={isHelpOpen}
        onClose={() => setIsHelpOpen(false)}
      />

      {/* Statistics & Reveal Modal */}
      <StatsModal
        isOpen={isStatsOpen}
        onClose={() => setIsStatsOpen(false)}
        stats={stats}
        gameStatus={gameStatus}
        targetWordInfo={targetWordInfo}
        guessesCount={guesses.length}
        evaluations={evaluations}
        onNewGame={handleNewGame}
      />
    </div>
  );
}
