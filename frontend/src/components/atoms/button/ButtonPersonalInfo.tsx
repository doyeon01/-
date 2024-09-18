import React from 'react';

export interface ButtonPersonalInfoProps {
  label?: string;
  onClick?: () => void;
  className?: string; 
}

export const ButtonPersonalInfo: React.FC<ButtonPersonalInfoProps> = ({ label = '글쓰기', onClick, className }) => {
  return (
    <button
      className={`text-white bg-[#707C60] hover:bg-[#4F5843] text-sm py-2 px-6 rounded-lg font-base transition-colors duration-200 ${className}`} 
      onClick={onClick}
    >
      {label}
    </button>
  );
};
