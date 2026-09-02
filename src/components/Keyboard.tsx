import React from 'react';
import { Delete } from 'lucide-react';
import { Key } from './Key';
import { TileStatus } from '../types';

interface KeyboardProps {
  onChar: (value: string) => void;
  onEnter: () => void;
  onDelete: () => void;
  letterStatuses: Record<string, TileStatus>;
  disabled?: boolean;
}

const ROW_1 = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'];
const ROW_2 = ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'];
const ROW_3 = ['Z', 'X', 'C', 'V', 'B', 'N', 'M'];

export const Keyboard: React.FC<KeyboardProps> = ({
  onChar,
  onEnter,
  onDelete,
  letterStatuses,
  disabled = false,
}) => {
  const handleClick = (value: string) => {
    if (disabled) return;
    if (value === 'ENTER') {
      onEnter();
    } else if (value === 'BACKSPACE') {
      onDelete();
    } else {
      onChar(value);
    }
  };

  return (
    <div id="virtual-keyboard" className="w-full max-w-[500px] mx-auto px-1 sm:px-2 pb-3 select-none">
      {/* Row 1 */}
      <div className="flex gap-1 sm:gap-1.5 mb-1.5 sm:mb-2 justify-center touch-manipulation">
        {ROW_1.map((char) => (
          <Key
            key={char}
            value={char}
            status={letterStatuses[char]}
            onClick={handleClick}
          />
        ))}
      </div>

      {/* Row 2 */}
      <div className="flex gap-1 sm:gap-1.5 mb-1.5 sm:mb-2 justify-center px-2 sm:px-4 touch-manipulation">
        {ROW_2.map((char) => (
          <Key
            key={char}
            value={char}
            status={letterStatuses[char]}
            onClick={handleClick}
          />
        ))}
      </div>

      {/* Row 3 with Enter and Backspace */}
      <div className="flex gap-1 sm:gap-1.5 justify-center touch-manipulation">
        <Key
          value="ENTER"
          width="wide"
          onClick={handleClick}
        >
          <span className="tracking-tighter sm:tracking-normal font-bold">ENTER</span>
        </Key>

        {ROW_3.map((char) => (
          <Key
            key={char}
            value={char}
            status={letterStatuses[char]}
            onClick={handleClick}
          />
        ))}

        <Key
          value="BACKSPACE"
          width="wide"
          onClick={handleClick}
        >
          <Delete className="w-5 h-5 sm:w-6 sm:h-6" />
        </Key>
      </div>
    </div>
  );
};
