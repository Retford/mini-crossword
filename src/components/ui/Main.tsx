import { Card } from '../Card';
import { useState } from 'react';
import { GameCard } from '../GameCard';

export const Main = () => {
  const [step, setStep] = useState<'home' | 'game' | 'end'>('home');

  const goToHome = () => setStep('game');
  const goToGame = () => setStep('end');
  const goToEnd = () => setStep('home');

  return (
    <main className='container w-screen flex justify-center items-center gap-16'>
      {step === 'home' && (
        <Card
          desc='Try the Mini puzzle.'
          button='Play'
          img='/images/mini.gif'
          className='px-2'
          onStart={goToHome}
        />
      )}
      {step === 'game' && <GameCard onEnd={goToGame} />}
      {step === 'end' && (
        <Card
          className='px-4 leading-11'
          desc='Play a new Mini every day.'
          button='Get the App'
          img='/images/mini-2.gif'
          onRestart={goToEnd}
        />
      )}
    </main>
  );
};
