export interface Word {
  word: string;
  x: number;
  y: number;
  direction: 'horizontal' | 'vertical';
  clue: string;
}

export const words: Word[] = [
  { word: 'CAT', x: 2, y: 0, direction: 'horizontal', clue: 'A small feline.' },
  {
    word: 'LION',
    x: 1,
    y: 1,
    direction: 'horizontal',
    clue: 'King of the jungle.',
  },
  {
    word: 'SHEEP',
    x: 0,
    y: 2,
    direction: 'horizontal',
    clue: 'An animal that says mee.',
  },
  {
    word: 'FISH',
    x: 0,
    y: 3,
    direction: 'horizontal',
    clue: 'Lives in water.',
  },
  { word: 'DOG', x: 0, y: 4, direction: 'horizontal', clue: 'A loyal pet.' },
];
