import { SetStateAction } from 'react';
import { Cell } from './Cell';

interface Props {
  grid: (string | null)[][];
  selectedCell: [number, number] | null;
  setSelectedCell: React.Dispatch<SetStateAction<[number, number] | null>>;
}

export const CrosswordGrid = ({
  grid,
  selectedCell,
  setSelectedCell,
}: Props) => {
  const isInSelectedRow = (rowIndex: number) =>
    selectedCell ? selectedCell[0] === rowIndex : false;

  return (
    <div className='grid grid-cols-5 justify-center items-center relative'>
      {grid.map((row, rowIndex) =>
        row.map((cell, colIndex) => (
          <Cell
            key={`${rowIndex}-${colIndex}`}
            letter={typeof cell === 'string' ? cell : ''}
            onClick={() => setSelectedCell([rowIndex, colIndex])}
            isBlack={cell === null}
            isSelected={
              selectedCell?.[0] === rowIndex && selectedCell?.[1] === colIndex
            }
            isHighlighted={isInSelectedRow(rowIndex)}
          />
        ))
      )}
      <span className='absolute top-[1%] left-[42%]'>1</span>
      <span className='absolute top-[22%] left-[21%]'>2</span>
      <span className='absolute top-[40%] left-[2%]'>3</span>
      <span className='absolute top-[60%] left-[2%]'>4</span>
      <span className='absolute top-[80%] left-[2%]'>5</span>
    </div>
  );
};
