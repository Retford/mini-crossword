import { FiDelete } from 'react-icons/fi';
import { Keyboard } from './Keyboard';

interface Props {
  onKeyPress: (key: string) => void;
}

export const KeyboardGrid = ({ onKeyPress }: Props) => {
  const keys = 'QWERTYUIOPASDFGHJKLÑZXCVBNM'.split('');

  return (
    <div className='bg-[#E6E6E6] flex flex-wrap justify-center items-center p-3 pb-6 gap-[6px] rounded-b-lg'>
      {keys.map((letter, index) => (
        <Keyboard
          key={`${index}-${letter}`}
          onKeyPress={onKeyPress}
          letter={letter}
        />
      ))}
      <div
        className='bg-white w-[70px] h-12 shadow shadow-gray-400 rounded-lg flex justify-center items-center'
        onClick={() => onKeyPress('')}
      >
        <FiDelete size={24} />
      </div>
    </div>
  );
};
