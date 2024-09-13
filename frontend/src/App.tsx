import React from 'react';
import { Survey } from './components/pages/Survey.tsx';
import MainPage from './components/pages/MainPage.tsx';

const App: React.FC = () => {
  return (
    <>
      <div className='w-full h-full bg-[#F4F4EE]'>
        <MainPage />
      </div>
    </>
  );
}

export default App;
