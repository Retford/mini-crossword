import { Footer } from './components/ui/Footer';
import { Header } from './components/ui/Header';
import { Main } from './components/ui/Main';

export const MiniApp = () => {
  return (
    <div className='grid place-content-center min-h-screen grid-rows-[auto_1fr_auto]'>
      <Header />
      <Main />
      <Footer />
    </div>
  );
};
