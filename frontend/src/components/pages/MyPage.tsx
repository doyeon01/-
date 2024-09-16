import React from 'react';
import { PersonalInfo } from '../molecules/Card/PersonalInfo';
import { PersonalDetail } from '../molecules/Card/PersonalDetail';
export const MyPage = () => {
  return (
    <div className="container mx-auto p-5 max-w-4xl bg-white rounded-lg mt-40 mb-20">
      <PersonalInfo />
      <hr className='mb-12' />
      <PersonalDetail/>

    </div>
  );
}
