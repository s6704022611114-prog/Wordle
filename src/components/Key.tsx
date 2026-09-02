import React from 'react';
import { TileStatus } from '../types';

interface KeyProps {
  value: string;
  status?: TileStatus;
  onClick: (value: string) => void;
  width?: 'normal' | 'wide';
  children?: React.ReactNode;
}

export const Key: React.FC<KeyProps> = ({
  value,
  status,
  onClick,
  width = 'normal',
  children,
}) => {
  const getStatusClass = () => {
    switch (status) {
      case 'correct':
        return 'bg-[#538d4e] text-white hover:bg-[#467842] border-[#538d4e]';
      case 'present':
        return 'bg-[#b59f3b] text-white hover:bg-[#9c8932] border-[#b59f3b]';
      case 'absent':
        return 'bg-[#3a3a3c] text-gray-400 border-[#3a3a3c] opacity-60 hover:opacity-80';
      default:
        return 'bg-[#818384] text-white hover:bg-[#929496] border-[#818384]';
    }
  };

  const isWide = width === 'wide';

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onClick(value);
  };

  return (
    <button
      type="button"
      id={`key-${value.toLowerCase()}`}
      onClick={handleClick}
      className={`
        h-12 sm:h-14
        ${isWide ? 'flex-[1.5] px-1 sm:px-2 text-xs sm:text-sm font-bold' : 'flex-1 text-base sm:text-lg font-bold'}
        rounded-[4px] sm:rounded-md
        flex items-center justify-center
        uppercase select-none cursor-pointer
        transition-all duration-150 active:scale-95 shadow-sm
        ${getStatusClass()}
      `}
      aria-label={value}
    >
      {children || value}
    </button>
  );
};
