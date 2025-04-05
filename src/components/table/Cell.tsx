interface Props {
  letter: string;
  onClick: () => void;
  isBlack: boolean;
  isSelected: boolean;
}

export const Cell = ({ letter, onClick, isBlack, isSelected }: Props) => {
  return isBlack ? (
    <div className='w-14 h-14 bg-black border border-gray-400'></div>
  ) : (
    <div
      className={`relative w-14 h-14 border border-gray-400 flex items-center justify-center cursor-pointer ${
        isSelected ? 'bg-yellow-300' : ''
      }`}
      onClick={onClick}
    >
      <span className='font-bold text-2xl'>{letter}</span>
    </div>
  );
};
