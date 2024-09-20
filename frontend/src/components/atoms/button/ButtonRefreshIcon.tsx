import React from 'react';

const ButtonRefreshIcon: React.FC = () => {
  return (
    <>
        <button  className=" bg-[#707C60] hover:bg-[#4F5843]  font-medium rounded-lg px-5 py-1 inline-block ">
            <p className='inline-block text-[18px] text-white mr-2 mb-1'>↺</p>
            <p className='inline-block text-[15px] text-white '></p>
        </button>
    </>

  );
};

export default ButtonRefreshIcon;
