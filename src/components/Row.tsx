import React from 'react';
import { Tile } from './Tile';
import { TileStatus } from '../types';

interface RowProps {
  guess?: string;
  statuses?: TileStatus[];
  isCurrentRow?: boolean;
  isRevealing?: boolean;
  isShaking?: boolean;
  isWonRow?: boolean;
}

export const Row: React.FC<RowProps> = ({
  guess = '',
  statuses = [],
  isCurrentRow = false,
  isRevealing = false,
  isShaking = false,
  isWonRow = false,
}) => {
  const letters = guess.split('');
  const emptyCount = 5 - letters.length;
  const emptyTiles = Array(emptyCount > 0 ? emptyCount : 0).fill('');

  return (
    <div
      className={`
        grid grid-cols-5 gap-1.5 sm:gap-2
        ${isShaking ? 'animate-shake' : ''}
      `}
    >
      {letters.map((char, i) => {
        const status = statuses[i] || (isCurrentRow ? 'tbd' : 'empty');
        return (
          <Tile
            key={`filled-${i}`}
            char={char}
            status={status}
            index={i}
            isRevealing={isRevealing}
            isWon={isWonRow}
          />
        );
      })}

      {emptyTiles.map((_, i) => (
        <Tile
          key={`empty-${i}`}
          char=""
          status="empty"
          index={letters.length + i}
        />
      ))}
    </div>
  );
};
