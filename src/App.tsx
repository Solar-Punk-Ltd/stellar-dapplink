import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { Auth } from './pages/Auth';

import '@/styles/globals.scss';
import '@stellar/design-system/build/styles.min.css';

const root = createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <StrictMode>
    <Auth />
  </StrictMode>,
);
