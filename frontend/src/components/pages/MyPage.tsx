import React from 'react';
import { PersonalInfo } from '../organisms/PersonalInfo';

export const MyPage = () => {
  return (
    <div className="container mx-auto p-5 max-w-4xl bg-white rounded-lg mt-40 mb-20">
      <PersonalInfo />
      <hr className="border-t-10 pb-5 " />

    </div>
  );
}
