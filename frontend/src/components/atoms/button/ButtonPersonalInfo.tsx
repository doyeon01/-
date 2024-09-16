import React from 'react';

export interface ButtonPersonalInfoProps {
  label?: string;
  onClick?: () => void;
  className?: string; 
}

export const ButtonPersonalInfo: React.FC<ButtonPersonalInfoProps> = ({ label = '글쓰기', onClick, className }) => {
  return (
    <button
      className={`bg-gray-200 hover:bg-gray-300 text-sm py-2 px-6 rounded-lg font-bold transition-colors duration-200 ${className}`} // className을 추가하여 전달받은 클래스 적용
      onClick={onClick}
    >
      {label}
    </button>
  );
};
