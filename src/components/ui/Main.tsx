// import { Card } from '../Card';
import { GameCard } from '../GameCard';

export const Main = () => {
  return (
    <main className='container w-screen flex justify-center items-center gap-16'>
      {/* <Card
        desc='Try the Mini puzzle.'
        button='Play'
        img='/images/mini.gif'
        className='px-2'
      />
      <Card
        className='px-4 leading-11'
        desc='Play a new Mini every day.'
        button='Get the App'
        img='/images/mini-2.gif'
      /> */}
      <GameCard />
    </main>
  );
};
