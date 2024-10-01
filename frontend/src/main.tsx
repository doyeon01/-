// import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RecoilRoot } from 'recoil';
import { CookiesProvider } from 'react-cookie'
import App from './App';
import './index.css';

createRoot(document.getElementById('root')!).render(
  // <StrictMode>
  <CookiesProvider>
    <RecoilRoot>
      <App />
    </RecoilRoot>
  </CookiesProvider>

  // </StrictMode>
);
