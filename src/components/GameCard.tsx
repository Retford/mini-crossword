import { useEffect, useState } from 'react';
import { IoClose } from 'react-icons/io5';
import { KeyboardGrid } from './keyboard/KeyboardGrid';
import { CrosswordGrid } from './table/CrosswordGrid';
import { words } from './words/words';
import Swal from 'sweetalert2';
import { checkAnswer } from '../lib/checkAnswer';

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
  const [selectedCell, setSelectedCell] = useState<[number, number]>([0, 2]);
  const [toggle, setToggle] = useState<boolean>(true);

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
        setSelectedCell([4, 2]);
      }
    } else {
      newGrid[row][col] = key;
      setGrid(newGrid);
      console.log({ row });
      console.log({ col });

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

  // Cambiar el nombre de la pista
  useEffect(() => {
    for (let i = 0; i < words.length; i++) {
      for (let j = 0; j <= i; j++) {
        if (selectedCell?.[0] === i && toggle) {
          setClue(`${words[i][0].clue}`);
        } else if (selectedCell[1] === i && !toggle) {
          setClue(`${words[i][1].clue}`);
        }
      }
    }
  }, [selectedCell, toggle]);

  const validationFullGrid = grid.flat().some((value) => value === '');

  useEffect(() => {
    if (!validationFullGrid) {
      const allCorrect = words.every((group) =>
        group.every((word) => checkAnswer(word, grid))
      );

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
          toggle={toggle}
          setToggle={setToggle}
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
