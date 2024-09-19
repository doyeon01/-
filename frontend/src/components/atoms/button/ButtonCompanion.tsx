import React from 'react';

export interface ButtonCompanionInfoProps {
  label?: string;
  onClick?: () => void;
  className?: string; 
}

export const ButtonCompanion: React.FC<ButtonCompanionInfoProps> = ({ label = '글쓰기', onClick, className }) => {
  return (
    <button
      className={`text-white bg-[#B8B1AB] hover:bg-[#a6a09b] text-sm py-2 px-6 rounded-lg font-base transition-colors duration-200 ${className} mb-2 w-[260px]`} 
      onClick={onClick}
    >
      {label}
    </button>
  );
};
