import { Dispatch, SetStateAction } from 'react';
import { Cell } from './Cell';

interface Props {
  grid: (string | null)[][];
  selectedCell: [number, number];
  setSelectedCell: Dispatch<SetStateAction<[number, number]>>;
  toggle: boolean;
  setToggle: Dispatch<React.SetStateAction<boolean>>;
}

export const CrosswordGrid = ({
  grid,
  selectedCell,
  setSelectedCell,
  toggle,
  setToggle,
}: Props) => {
  const isInSelectedRow = (rowIndex: number) =>
    selectedCell ? selectedCell[0] === rowIndex : false;
  const isInSelectedCol = (colIndex: number) =>
    selectedCell ? selectedCell[1] === colIndex : false;

  return (
    <div className='grid grid-cols-5 justify-center items-center relative'>
      {grid.map((row, rowIndex) =>
        row.map((cell, colIndex) => (
          <Cell
            key={`${rowIndex}-${colIndex}`}
            cell={cell}
            onClick={() => {
              if (
                selectedCell[0] === rowIndex &&
                selectedCell[1] === colIndex
              ) {
                setToggle(!toggle);
              }
              setSelectedCell([rowIndex, colIndex]);
            }}
            isBlack={cell === null}
            isSelected={
              selectedCell?.[0] === rowIndex && selectedCell?.[1] === colIndex
            }
            toggle={toggle}
            isRowHighlighted={isInSelectedRow(rowIndex)}
            isColHighlighted={isInSelectedCol(colIndex)}
          />
        ))
      )}
      <span className='absolute top-[1%] left-[42%]'>1</span>
      <span className='absolute top-[1%] right-[35%]'>2</span>
      <span className='absolute top-[1%] right-[15%]'>3</span>
      <span className='absolute top-[22%] left-[22%]'>4</span>
      <span className='absolute top-[40%] left-[2%]'>5</span>
      <span className='absolute top-[60%] left-[2%]'>6</span>
      <span className='absolute top-[80%] left-[2%]'>7</span>
    </div>
  );
};
