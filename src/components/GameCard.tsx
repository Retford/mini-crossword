import { useEffect, useState } from 'react';
import { IoClose } from 'react-icons/io5';
import { KeyboardGrid } from './keyboard/KeyboardGrid';
import { CrosswordGrid } from './table/CrosswordGrid';
import { type Word, words } from './words/words';
import Swal from 'sweetalert2';

interface Props {
  onEnd: () => void;
}

const initialGrid: (string | null)[][] = [
  [null, null, '', '', ''],
  [null, '', '', '', ''],
  ['', '', '', '', ''],
  ['', '', '', '', null],
  ['', '', '', null, null],
];

export const GameCard = ({ onEnd }: Props) => {
  const [grid, setGrid] = useState<(string | null)[][]>(initialGrid);
  const [clues, setClue] = useState<string>('');
  const [selectedCell, setSelectedCell] = useState<[number, number] | null>([
    0, 2,
  ]);

  const handleKeyPress = (key: string) => {
    if (!selectedCell) return;

    const [row, col] = selectedCell;

    if (grid[row][col] === null) return;

    const newGrid = [...grid];
    newGrid[row] = [...newGrid[row]];

    if (key === '') {
      if (grid[row][col] !== '') {
        newGrid[row][col] = '';
        setGrid(newGrid);
      } else {
        let prevRow = row;
        let prevCol = col - 1;

        while (prevRow >= 0) {
          if (prevCol >= 0) {
            if (grid[prevRow][prevCol] !== null) {
              newGrid[prevRow][prevCol] = '';
              setGrid(newGrid);
              setSelectedCell([prevRow, prevCol]);
              return;
            }
            prevCol--;
          } else {
            prevRow--;
            if (prevRow >= 0) prevCol = grid[prevRow].length - 1;
          }
        }
      }
    } else {
      newGrid[row][col] = key;
      setGrid(newGrid);

      let nextRow = row;
      let nextCol = col + 1;

      while (nextRow < grid.length) {
        if (nextCol < grid[nextRow].length) {
          if (grid[nextRow][nextCol] !== null) {
            setSelectedCell([nextRow, nextCol]);
            return;
          }
          nextCol++;
        } else {
          nextRow++;
          nextCol = 0;
        }
      }

      setSelectedCell([0, 2]);
    }
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const key = event.key.toUpperCase();
      if (key === 'BACKSPACE') {
        handleKeyPress('');
      }

      if (key.length === 1 && key >= 'A' && key <= 'Z') {
        handleKeyPress(key);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCell, grid]);

  function checkAnswer(word: Word, grid: (string | null)[][]): boolean {
    for (let i = 0; i < word.word.length; i++) {
      const x = word.direction === 'horizontal' ? word.x + i : word.x;
      const y = word.direction === 'vertical' ? word.y + i : word.y;
      if (grid[y][x] !== word.word[i]) return false;
    }
    return true;
  }

  // Cambiar el nombre de la pista
  useEffect(() => {
    for (let i = 0; i < words.length; i++) {
      if (selectedCell?.[0] === i) {
        setClue(`${i + 1}.- ${words[i].clue}`);
      }
    }
  }, [selectedCell]);

  const validationFullGrid = grid.flat().some((value) => value === '');

  useEffect(() => {
    if (!validationFullGrid) {
      const allCorrect = words.every((word) => checkAnswer(word, grid));

      if (allCorrect) {
        Swal.fire({
          text: 'Congratulations, everything is OK',
          icon: 'success',
          confirmButtonText: 'OK',
          preConfirm: () => onEnd(),
          didClose() {
            onEnd();
          },
        });
      } else {
        Swal.fire({
          text: 'Try again!',
          icon: 'error',
          confirmButtonText: 'Cool',
          preConfirm: () => setGrid(initialGrid),
          didClose() {
            setGrid(initialGrid);
          },
        });
      }
    }
  }, [validationFullGrid, grid, onEnd]);

  return (
    <div className='relative w-full h-svh sm:w-[400px] sm:h-[700px] bg-white sm:rounded-lg flex flex-col items-center justify-between font-subtitle gap-8 shadow-xl text-black'>
      <div className='absolute top-2 right-2 text-black'>
        <IoClose size={28} />
      </div>

      <div className='flex flex-col gap-8 justify-center items-center p-9'>
        <a href='' className='underline text-[#5A82B4] font-bold'>
          Get the App
        </a>

        <CrosswordGrid
          grid={grid}
          selectedCell={selectedCell}
          setSelectedCell={setSelectedCell}
        />
      </div>
      <div className='w-full'>
        <div className='px-8 bg-[#A7D8FF] py-6'>
          <p className='w-full h-auto text-base sm:h-6 text-center font-bold sm:text-xl'>
            {clues}
          </p>
        </div>
        <KeyboardGrid onKeyPress={handleKeyPress} />
      </div>
    </div>
  );
};
