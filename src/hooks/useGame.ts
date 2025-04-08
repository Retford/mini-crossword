import { useState, useEffect } from 'react';
import { checkAnswer } from '../lib/checkAnswer';
import Swal from 'sweetalert2';
import { words } from '../components/words/words';

interface Props {
  initialGrid: (string | null)[][];
  onEnd: () => void;
}

export const useGame = ({ initialGrid, onEnd }: Props) => {
  const [grid, setGrid] = useState<(string | null)[][]>(initialGrid);
  const [selectedCell, setSelectedCell] = useState<[number, number]>([0, 2]);
  const [toggle, setToggle] = useState<boolean>(true);
  const [clues, setClue] = useState<string>('');

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
        let prevCol = col;
        if (toggle) {
          prevCol--;
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
        } else {
          prevRow--;
          while (prevRow >= 0) {
            if (grid[prevRow][prevCol] !== null) {
              newGrid[prevRow][prevCol] = '';
              setGrid(newGrid);
              setSelectedCell([prevRow, prevCol]);
              return;
            }
            prevRow--;
          }

          prevCol--;
          while (prevCol >= 0) {
            prevRow = grid.length - 1;
            while (prevRow >= 0) {
              if (grid[prevRow][prevCol] !== null) {
                newGrid[prevRow][prevCol] = '';
                setGrid(newGrid);
                setSelectedCell([prevRow, prevCol]);
                return;
              }
              prevRow--;
            }
            prevCol--;
          }
        }

        setSelectedCell(toggle ? [4, 2] : [2, 4]);
      }
    } else {
      newGrid[row][col] = key;
      setGrid(newGrid);

      let nextRow = row;
      let nextCol = col;
      const totalRows = grid.length;
      const totalCols = grid[0].length;

      if (toggle) {
        do {
          if (nextCol < totalCols - 1) {
            nextCol++;
          } else {
            nextCol = 0;
            nextRow++;
          }
        } while (nextRow < totalRows && grid[nextRow]?.[nextCol] === null);
      } else {
        do {
          if (nextRow < totalRows - 1) {
            nextRow++;
          } else {
            nextRow = 0;
            nextCol++;
          }
        } while (nextCol < totalCols && grid[nextRow]?.[nextCol] === null);
      }

      if (
        nextRow < totalRows &&
        nextCol < totalCols &&
        grid[nextRow][nextCol] !== null
      ) {
        setSelectedCell([nextRow, nextCol]);
      } else {
        setSelectedCell(toggle ? [0, 2] : [2, 0]);
      }
    }
  };

  // Cambiar el nombre de la pista
  useEffect(() => {
    for (let i = 0; i < words.length; i++) {
      for (let j = 0; j <= i; j++) {
        if (selectedCell?.[0] === i && toggle) {
          setClue(`${words[i][0].clue} ⮕`);
        } else if (selectedCell[1] === i && !toggle) {
          setClue(`${words[i][1].clue} ⬇`);
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
  }, [validationFullGrid, grid, onEnd, initialGrid]);

  return {
    handleKeyPress,
    grid,
    selectedCell,
    setSelectedCell,
    clues,
    setToggle,
    toggle,
  };
};
