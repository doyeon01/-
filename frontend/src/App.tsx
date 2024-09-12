import React from 'react';
import { SurveyPage } from './components/pages/SurveyPage.tsx';
import MainPage from './components/pages/MainPage.tsx';

const App: React.FC = () => {
  return (
    <>
      <div className='w-full h-full bg-[#F4F4EE] font-TheJamsil'>
        <SurveyPage />
      </div>
    </>
  );
}

export default App;
