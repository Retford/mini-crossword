import { FiDelete } from 'react-icons/fi';
import { Keyboard } from './Keyboard';

interface Props {
  onKeyPress: (key: string) => void;
}

export const KeyboardGrid = ({ onKeyPress }: Props) => {
  const keys = 'QWERTYUIOPASDFGHJKLZXCVBNM'.split('');

  return (
    <div className='bg-[#E6E6E6] flex flex-wrap justify-center items-center p-2 gap-1 pb-4 sm:p-3 sm:pb-6 sm:gap-1.5 rounded-b-lg'>
      {keys.map((letter, index) => (
        <Keyboard
          key={`${index}-${letter}`}
          onKeyPress={onKeyPress}
          letter={letter}
        />
      ))}
      <div
        className='bg-white w-14 h-10 sm:w-[70px] sm:h-12 shadow shadow-gray-400 rounded-lg flex justify-center items-center'
        onClick={() => onKeyPress('')}
      >
        <FiDelete size={24} />
      </div>
    </div>
  );
};
