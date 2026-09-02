import React from 'react';
import { HelpCircle, BarChart2, RotateCcw, Sparkles } from 'lucide-react';

interface HeaderProps {
  onNewGame: () => void;
  onOpenHelp: () => void;
  onOpenStats: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onNewGame, onOpenHelp, onOpenStats }) => {
  return (
    <header className="w-full max-w-lg mx-auto flex items-center justify-between py-3 px-4 border-b border-[#272729]">
      <div className="flex items-center gap-1.5">
        <button
          id="help-btn"
          onClick={onOpenHelp}
          aria-label="กติกาและวิธีเล่น"
          className="p-2 text-gray-400 hover:text-white hover:bg-[#272729] rounded-lg transition-colors duration-150 flex items-center justify-center cursor-pointer"
          title="วิธีเล่นและกติกา"
        >
          <HelpCircle className="w-5 h-5" />
        </button>
        <button
          id="stats-btn"
          onClick={onOpenStats}
          aria-label="สถิติการเล่น"
          className="p-2 text-gray-400 hover:text-white hover:bg-[#272729] rounded-lg transition-colors duration-150 flex items-center justify-center cursor-pointer"
          title="สถิติการเล่น"
        >
          <BarChart2 className="w-5 h-5" />
        </button>
      </div>

      <div className="flex flex-col items-center">
        <div className="flex items-center gap-1.5">
          <Sparkles className="w-4 h-4 text-emerald-400" />
          <h1 className="text-xl sm:text-2xl font-black tracking-widest text-white uppercase font-sans">
            WORDLE
          </h1>
          <span className="text-[10px] uppercase font-bold bg-emerald-500/20 text-emerald-400 px-1.5 py-0.5 rounded border border-emerald-500/30">
            THAI
          </span>
        </div>
        <p className="text-[11px] text-gray-400 tracking-wide">เกมทายคำศัพท์ภาษาอังกฤษ 5 ตัวอักษร</p>
      </div>

      <div className="flex items-center gap-1">
        <button
          id="new-game-btn"
          onClick={onNewGame}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-[#272729] hover:bg-emerald-600 active:scale-95 text-xs font-semibold text-gray-200 hover:text-white rounded-lg border border-gray-700/60 hover:border-emerald-500 transition-all duration-150 cursor-pointer shadow-sm"
          title="เริ่มเล่นเกมใหม่"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>เริ่มใหม่</span>
        </button>
      </div>
    </header>
  );
};
