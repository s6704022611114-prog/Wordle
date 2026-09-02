import React, { useState } from 'react';
import { X, Trophy, Volume2, RotateCcw, Share2, Check, Flame, Award } from 'lucide-react';
import { GameStats, GameStatus, WordInfo, TileStatus } from '../types';

interface StatsModalProps {
  isOpen: boolean;
  onClose: () => void;
  stats: GameStats;
  gameStatus: GameStatus;
  targetWordInfo: WordInfo | null;
  guessesCount: number;
  evaluations: TileStatus[][];
  onNewGame: () => void;
}

export const StatsModal: React.FC<StatsModalProps> = ({
  isOpen,
  onClose,
  stats,
  gameStatus,
  targetWordInfo,
  guessesCount,
  evaluations,
  onNewGame,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const winRate = stats.played > 0 ? Math.round((stats.winCount / stats.played) * 100) : 0;
  const maxDistribution = Math.max(...(Object.values(stats.guessDistribution) as number[]), 1);

  // Play audio pronunciation of the target word using SpeechSynthesis
  const playAudio = () => {
    if (!targetWordInfo?.word || !('speechSynthesis' in window)) return;
    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(targetWordInfo.word);
      utterance.lang = 'en-US';
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    } catch {
      // ignore
    }
  };

  // Generate shareable emoji grid
  const handleShare = () => {
    if (!targetWordInfo) return;
    const emojiMap: Record<TileStatus, string> = {
      correct: '🟩',
      present: '🟨',
      absent: '⬛',
      empty: '⬜',
      tbd: '⬜',
    };

    const gridEmojis = evaluations
      .map((row) => row.map((status) => emojiMap[status] || '⬛').join(''))
      .join('\n');

    const resultText = `Wordle Thai 🔤\nผลลัพธ์: ${gameStatus === 'WON' ? `${guessesCount}/6` : 'X/6'}\n\n${gridEmojis}\n\nเล่นเกมทายคำศัพท์ภาษาอังกฤษ!`;

    if (navigator.clipboard) {
      navigator.clipboard.writeText(resultText).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      });
    }
  };

  const isGameOver = gameStatus === 'WON' || gameStatus === 'LOST';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs animate-fade-in">
      <div
        className="bg-[#1a1a1b] border border-[#2e2e30] rounded-2xl max-w-md w-full p-5 sm:p-6 text-gray-100 shadow-2xl relative max-h-[90vh] overflow-y-auto"
        role="dialog"
        aria-modal="true"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white p-1 rounded-lg hover:bg-[#2e2e30] transition-colors cursor-pointer"
          aria-label="ปิด"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header result if finished */}
        {isGameOver && (
          <div className="text-center mb-5 pb-4 border-b border-[#2e2e30]">
            {gameStatus === 'WON' ? (
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-2 border border-emerald-500/30 animate-bounce">
                  <Trophy className="w-6 h-6" />
                </div>
                <h2 className="text-2xl font-black text-emerald-400">ยินดีด้วย! คุณทายถูก 🎉</h2>
                <p className="text-xs text-gray-400 mt-0.5">ใช้จำนวนรอบ: {guessesCount} / 6</p>
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center mb-2 border border-rose-500/30">
                  <Award className="w-6 h-6" />
                </div>
                <h2 className="text-xl font-bold text-rose-400">หมดโอกาสทายแล้ว!</h2>
                <p className="text-xs text-gray-400 mt-0.5">ไม่เป็นไร ลองใหม่อีกครั้งนะ</p>
              </div>
            )}

            {/* Word details reveal */}
            {targetWordInfo && (
              <div className="mt-4 p-3.5 bg-[#121213] rounded-xl border border-gray-800 text-left">
                <div className="flex items-center justify-between">
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-black tracking-wider text-white uppercase font-sans">
                      {targetWordInfo.word}
                    </span>
                    {targetWordInfo.phonetic && (
                      <span className="text-xs text-gray-400 font-mono">
                        {targetWordInfo.phonetic}
                      </span>
                    )}
                  </div>
                  <button
                    onClick={playAudio}
                    className="p-1.5 text-gray-400 hover:text-emerald-400 hover:bg-[#272729] rounded-lg transition-colors cursor-pointer"
                    title="ฟังเสียงอ่านภาษาอังกฤษ"
                  >
                    <Volume2 className="w-5 h-5" />
                  </button>
                </div>
                <div className="mt-1.5 flex items-center gap-2">
                  <span className="text-xs px-2 py-0.5 bg-emerald-950/60 text-emerald-400 font-semibold rounded border border-emerald-800/50">
                    {targetWordInfo.pos}
                  </span>
                  <span className="text-sm font-bold text-gray-100">
                    {targetWordInfo.meaningTh}
                  </span>
                </div>
                {targetWordInfo.example && (
                  <p className="mt-2 text-xs text-gray-400 italic border-t border-gray-800/80 pt-2">
                    &ldquo;{targetWordInfo.example}&rdquo;
                  </p>
                )}
              </div>
            )}
          </div>
        )}

        {/* Stats Grid */}
        <div className="mb-5">
          <h3 className="text-sm font-bold text-gray-300 uppercase tracking-wider mb-3 text-center">
            สถิติการเล่น
          </h3>
          <div className="grid grid-cols-4 gap-2 text-center">
            <div className="bg-[#121213] p-2.5 rounded-xl border border-gray-800">
              <div className="text-xl sm:text-2xl font-black text-white">{stats.played}</div>
              <div className="text-[10px] text-gray-400">เล่นทั้งหมด</div>
            </div>
            <div className="bg-[#121213] p-2.5 rounded-xl border border-gray-800">
              <div className="text-xl sm:text-2xl font-black text-white">{winRate}%</div>
              <div className="text-[10px] text-gray-400">อัตราชนะ</div>
            </div>
            <div className="bg-[#121213] p-2.5 rounded-xl border border-gray-800">
              <div className="text-xl sm:text-2xl font-black text-emerald-400 flex items-center justify-center gap-0.5">
                <Flame className="w-4 h-4" />
                {stats.currentStreak}
              </div>
              <div className="text-[10px] text-gray-400">ชนะต่อเนื่อง</div>
            </div>
            <div className="bg-[#121213] p-2.5 rounded-xl border border-gray-800">
              <div className="text-xl sm:text-2xl font-black text-amber-400">{stats.maxStreak}</div>
              <div className="text-[10px] text-gray-400">ชนะสูงสุด</div>
            </div>
          </div>
        </div>

        {/* Guess Distribution */}
        <div className="mb-6">
          <h3 className="text-xs font-bold text-gray-300 uppercase tracking-wider mb-2.5">
            สถิติจำนวนรอบที่ทายถูก
          </h3>
          <div className="space-y-1.5 text-xs">
            {([1, 2, 3, 4, 5, 6] as const).map((round) => {
              const count = stats.guessDistribution[round] || 0;
              const percentage = Math.max((count / maxDistribution) * 100, 7);
              const isCurrentRoundWin = gameStatus === 'WON' && guessesCount === round;

              return (
                <div key={round} className="flex items-center gap-2">
                  <span className="w-3 font-bold text-gray-400">{round}</span>
                  <div className="flex-1 bg-gray-900 rounded-sm overflow-hidden h-5">
                    <div
                      className={`h-full flex items-center justify-end px-2 font-bold text-[11px] text-white transition-all duration-500 ${
                        isCurrentRoundWin ? 'bg-emerald-600' : count > 0 ? 'bg-[#3a3a3c]' : 'bg-transparent text-gray-500'
                      }`}
                      style={{ width: `${percentage}%` }}
                    >
                      {count}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2.5">
          {isGameOver && (
            <button
              onClick={handleShare}
              className="flex-1 py-2.5 px-3 bg-[#272729] hover:bg-[#343437] text-white font-bold rounded-xl border border-gray-700 transition-colors flex items-center justify-center gap-2 text-xs sm:text-sm cursor-pointer active:scale-98"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>คัดลอกผลลัพธ์แล้ว!</span>
                </>
              ) : (
                <>
                  <Share2 className="w-4 h-4 text-gray-300" />
                  <span>แชร์ผลการเล่น</span>
                </>
              )}
            </button>
          )}

          <button
            onClick={() => {
              onClose();
              onNewGame();
            }}
            className="flex-1 py-2.5 px-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl transition-colors flex items-center justify-center gap-2 text-xs sm:text-sm cursor-pointer shadow-lg shadow-emerald-950/40 active:scale-98"
          >
            <RotateCcw className="w-4 h-4" />
            <span>เริ่มเกมใหม่</span>
          </button>
        </div>
      </div>
    </div>
  );
};
