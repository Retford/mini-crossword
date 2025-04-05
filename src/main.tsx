import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { MiniApp } from './MiniApp.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MiniApp />
  </StrictMode>
);
