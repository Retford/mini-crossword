import { useEffect, useState } from 'react';
import { IoClose } from 'react-icons/io5';
import { KeyboardGrid } from './keyboard/KeyboardGrid';
import { CrosswordGrid } from './table/CrosswordGrid';
import { type Word, words } from './words/words';

const initialGrid: (string | null)[][] = [
  [null, null, '', '', ''],
  [null, '', '', '', ''],
  ['', '', '', '', ''],
  ['', '', '', '', null],
  ['', '', '', null, null],
];

export const GameCard = () => {
  const [grid, setGrid] = useState<(string | null)[][]>(initialGrid);
  const [message, setMessage] = useState<string>('');
  const [instructions, setInstructions] = useState('');
  const [selectedCell, setSelectedCell] = useState<[number, number] | null>([
    0, 2,
  ]);

  const handleKeyPress = (key: string) => {
    if (!selectedCell) return;

    const [row, col] = selectedCell;

    if (grid[row][col] === null) return;

    const newGrid = [...grid];
    newGrid[row] = [...newGrid[row]];
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
        setInstructions(`${i + 1}.- ${words[i].clue}`);
      }
    }
  }, [selectedCell]);

  const validationFullGrid = grid.flat().some((value) => value === '');

  useEffect(() => {
    if (!validationFullGrid) {
      const allCorrect = words.every((word) => checkAnswer(word, grid));

      setMessage(
        allCorrect
          ? '¡Todo correcto! 🎉'
          : 'Algunas palabras están incorrectas.'
      );
    }
  }, [validationFullGrid, grid]);

  return (
    <div className='relative w-[400px] h-[700px] bg-white rounded-lg flex flex-col items-center justify-between font-subtitle gap-8 shadow-xl text-black'>
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
          <p className='w-full h-6 text-center font-bold text-xl'>
            {instructions}
          </p>
        </div>
        <KeyboardGrid onKeyPress={handleKeyPress} />

        {message && <p className='mt-2 font-medium'>{message}</p>}
      </div>
    </div>
  );
};
