import { createRoot } from 'react-dom/client';
import { RecoilRoot } from 'recoil';
import axios from 'axios';
import App from './App';
import './index.css';

// axios 전역 설정
axios.defaults.withCredentials = true; // withCredentials 전역 설정

createRoot(document.getElementById('root')!).render(
  <RecoilRoot>
    <App />
  </RecoilRoot>
);
