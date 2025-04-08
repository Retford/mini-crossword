import { useEffect } from 'react';
import { IoClose } from 'react-icons/io5';
import { KeyboardGrid } from './keyboard/KeyboardGrid';
import { CrosswordGrid } from './table/CrosswordGrid';
import { useGame } from '../hooks/useGame';

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
  const {
    handleKeyPress,
    grid,
    selectedCell,
    setSelectedCell,
    clues,
    setToggle,
    toggle,
  } = useGame({ initialGrid, onEnd });

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
  }, [selectedCell, grid, handleKeyPress]);

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
