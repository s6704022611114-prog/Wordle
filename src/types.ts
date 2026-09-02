export type TileStatus = 'empty' | 'tbd' | 'correct' | 'present' | 'absent';

export type GameStatus = 'IN_PROGRESS' | 'WON' | 'LOST';

export interface EvaluatedLetter {
  char: string;
  status: TileStatus;
}

export interface WordInfo {
  word: string;
  meaningTh: string;
  pos: string; // Part of speech เช่น คำนาม, คำกริยา, คำคุณศัพท์
  phonetic?: string;
  example?: string;
}

export interface GameStats {
  played: number;
  winCount: number;
  currentStreak: number;
  maxStreak: number;
  guessDistribution: {
    1: number;
    2: number;
    3: number;
    4: number;
    5: number;
    6: number;
  };
  lastPlayedDate?: string;
}

export interface ToastMessage {
  id: string;
  text: string;
  type?: 'default' | 'success' | 'error' | 'info';
  duration?: number;
}

export interface SavedGameState {
  targetWordInfo: WordInfo;
  guesses: string[];
  evaluations: TileStatus[][];
  gameStatus: GameStatus;
  wonRowIndex?: number | null;
  isHintUsed?: boolean;
}
