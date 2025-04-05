interface Props {
  onKeyPress: (key: string) => void;
  letter: string;
}

export const Keyboard = ({ onKeyPress, letter }: Props) => {
  return (
    <kbd
      className='bg-white w-7 h-10 sm:w-8 sm:h-12 shadow shadow-gray-400 rounded-lg flex justify-center items-center font-medium sm:text-2xl select-none cursor-pointer'
      onClick={() => onKeyPress(letter)}
    >
      {letter}
    </kbd>
  );
};
