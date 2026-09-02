import React from 'react';
import { Row } from './Row';
import { TileStatus } from '../types';

interface GridProps {
  guesses: string[];
  evaluations: TileStatus[][];
  currentGuess: string;
  isShaking: boolean;
  isRevealingRow: number | null;
  wonRowIndex: number | null;
}

export const Grid: React.FC<GridProps> = ({
  guesses,
  evaluations,
  currentGuess,
  isShaking,
  isRevealingRow,
  wonRowIndex,
}) => {
  const rows = [];
  const currentRowIndex = guesses.length;

  for (let i = 0; i < 6; i++) {
    if (i < currentRowIndex) {
      // Completed row
      rows.push(
        <Row
          key={i}
          guess={guesses[i]}
          statuses={evaluations[i]}
          isRevealing={isRevealingRow === i}
          isWonRow={wonRowIndex === i}
        />
      );
    } else if (i === currentRowIndex) {
      // Current active row
      rows.push(
        <Row
          key={i}
          guess={currentGuess}
          isCurrentRow={true}
          isShaking={isShaking}
        />
      );
    } else {
      // Future empty row
      rows.push(<Row key={i} />);
    }
  }

  return (
    <div
      id="wordle-grid"
      className="grid grid-rows-6 gap-1.5 sm:gap-2 my-auto max-w-[340px] sm:max-w-[370px] w-full p-2 mx-auto justify-center"
    >
      {rows}
    </div>
  );
};
