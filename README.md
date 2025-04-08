
# Crossword Game

## Features

- **Interactive Grid**: A crossword grid where players can input letters using the keyboard.
- **Clue Display**: The current clue for horizontal or vertical word entries is displayed.
- **Validation**: The game checks if the answers are correct and provides feedback upon completion.
- **Responsive Design**: The UI adjusts based on the screen size.

## Installation

To run the game locally, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/Retford/mini-crossword.git
   cd mini-crossword
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open your browser and go to `http://localhost:5173` to play the game.

## Technologies Used

- **React**: For building the user interface.
- **TypeScript**: For type safety and improved development experience.
- **TailwindCSS**: For styling and layout.
- **React Icons**: For UI components like icons.
- **SweetAlert2**: For user-friendly alerts and notifications.

## Folder Structure

```plaintext
├───public
│   │   mini-crossword.svg
│   │   
│   └───images
│           mini-2.gif
│           mini.gif
│           
└───src
    │   index.css
    │   main.tsx
    │   MiniApp.tsx
    │   vite-env.d.ts
    │   
    ├───components
    │   │   Card.tsx
    │   │   GameCard.tsx
    │   │   
    │   ├───keyboard
    │   │       Keyboard.tsx
    │   │       KeyboardGrid.tsx
    │   │       
    │   ├───table
    │   │       Cell.tsx
    │   │       CrosswordGrid.tsx
    │   │       
    │   ├───ui
    │   │       Main.tsx
    │   │       
    │   └───words
    │           words.ts
    │           
    ├───hooks
    │       useGame.ts
    │       
    └───lib
            checkAnswer.ts
```
