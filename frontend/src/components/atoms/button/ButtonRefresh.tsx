import React from 'react';

export interface ButtonRefreshProps {
  text: string;
  onClick: () => void;
}

const ButtonRefresh: React.FC<ButtonRefreshProps> = ({ text }) => {
  return (
    <div className=" absolute right-0 top-[190px]"> 
      <button className="bg-[#707C60] hover:bg-[#4F5843] font-medium rounded-lg px-5 py-1 inline-block">
        <p className="inline-block text-[18px] text-white mr-2 mb-1">↺</p>
        <p className="inline-block text-[15px] text-white">{text}</p>
      </button>
    </div>
  );
};

export default ButtonRefresh;
