interface Props {
  cell: string | null;
  onClick: () => void;
  isBlack: boolean;
  isSelected: boolean;
  isRowHighlighted: boolean;
  isColHighlighted: boolean;
  toggle: boolean;
}

export const Cell = ({
  cell,
  onClick,
  isBlack,
  isSelected,
  isRowHighlighted,
  isColHighlighted,
  toggle,
}: Props) => {
  return isBlack ? (
    <div className='w-14 h-14 bg-black border border-gray-400' />
  ) : (
    <div
      className={`relative w-14 h-14 border border-gray-400 flex items-center justify-center cursor-pointer
        ${
          isSelected
            ? 'bg-yellow-300'
            : toggle
            ? isRowHighlighted
              ? 'bg-[#A7D8FF]'
              : ''
            : isColHighlighted
            ? 'bg-[#A7D8FF]'
            : ''
        }`}
      onClick={onClick}
    >
      <span className='font-bold text-2xl'>{cell}</span>
    </div>
  );
};
