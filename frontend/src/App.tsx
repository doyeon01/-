import React from 'react';
import { Survey } from './components/pages/Survey.tsx';

const App: React.FC = () => {
  return (
    <>
      <div className='w-screen h-screen bg-[#F4F4EE]'>
        <Survey />
      </div>
    </>
  );
}

export default App;
