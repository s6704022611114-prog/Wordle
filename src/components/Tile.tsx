import React, { useState, useEffect } from 'react';
import { TileStatus } from '../types';

interface TileProps {
  char?: string;
  status: TileStatus;
  index: number;
  isRevealing?: boolean;
  isWon?: boolean;
}

export const Tile: React.FC<TileProps> = ({
  char = '',
  status,
  index,
  isRevealing = false,
  isWon = false,
}) => {
  // If revealing, delay showing the actual evaluated status color until the tile flips halfway (90deg)
  const [displayedStatus, setDisplayedStatus] = useState<TileStatus>(() =>
    isRevealing ? 'tbd' : status
  );

  useEffect(() => {
    if (isRevealing) {
      // Flip animation duration is 500ms, each tile has delay of index * 250ms
      // The flip reaches 90deg (edge-on) at 250ms into its flip animation
      const halfFlipDelay = index * 250 + 250;
      const timer = setTimeout(() => {
        setDisplayedStatus(status);
      }, halfFlipDelay);

      return () => clearTimeout(timer);
    } else {
      setDisplayedStatus(status);
    }
  }, [isRevealing, status, index]);

  // Styles based on displayed status
  const getStatusStyles = () => {
    switch (displayedStatus) {
      case 'correct':
        return 'bg-[#538d4e] border-[#538d4e] text-white';
      case 'present':
        return 'bg-[#b59f3b] border-[#b59f3b] text-white';
      case 'absent':
        return 'bg-[#3a3a3c] border-[#3a3a3c] text-white';
      case 'tbd':
        return 'border-[#565758] bg-transparent text-white border-2 animate-pop';
      case 'empty':
      default:
        return 'border-[#3a3a3c] bg-transparent text-transparent';
    }
  };

  const revealDelayStyle = isRevealing
    ? {
        animationDelay: `${index * 250}ms`,
      }
    : undefined;

  const wonDelayStyle = isWon
    ? {
        animationDelay: `${index * 100}ms`,
      }
    : undefined;

  return (
    <div
      className={`
        w-12 h-12 sm:w-14 sm:h-14 md:w-15 md:h-15
        flex items-center justify-center
        font-black text-2xl sm:text-3xl uppercase tracking-wide
        border-2 select-none rounded-md
        ${getStatusStyles()}
        ${isRevealing ? 'animate-flip' : ''}
        ${isWon ? 'animate-bounce' : ''}
      `}
      style={{ ...revealDelayStyle, ...wonDelayStyle }}
      data-status={displayedStatus}
      data-char={char}
    >
      {char}
    </div>
  );
};

