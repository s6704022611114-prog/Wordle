import React from 'react';

export const ColorLegend: React.FC = () => {
  return (
    <div className="w-full max-w-md mx-auto px-4 py-2 flex items-center justify-center gap-3 sm:gap-6 text-[11px] sm:text-xs text-gray-300 select-none">
      <div className="flex items-center gap-1.5">
        <span className="w-3.5 h-3.5 rounded-xs bg-[#538d4e] flex items-center justify-center text-[9px] font-bold text-white shadow-xs">✓</span>
        <span>ถูกตำแหน่ง</span>
      </div>
      <div className="flex items-center gap-1.5">
        <span className="w-3.5 h-3.5 rounded-xs bg-[#b59f3b] flex items-center justify-center text-[9px] font-bold text-white shadow-xs">~</span>
        <span>สลับตำแหน่ง</span>
      </div>
      <div className="flex items-center gap-1.5">
        <span className="w-3.5 h-3.5 rounded-xs bg-[#3a3a3c] flex items-center justify-center text-[9px] font-bold text-gray-400 shadow-xs">✕</span>
        <span>ไม่มีในคำ</span>
      </div>
    </div>
  );
};
