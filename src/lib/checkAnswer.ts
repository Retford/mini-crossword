import type { Word } from '../components/words/words';

export function checkAnswer(word: Word, grid: (string | null)[][]): boolean {
  for (let i = 0; i < word.word.length; i++) {
    const x = word.direction === 'horizontal' ? word.x + i : word.x;
    const y = word.direction === 'vertical' ? word.y + i : word.y;
    if (grid[y][x] !== word.word[i]) return false;
  }
  return true;
}
