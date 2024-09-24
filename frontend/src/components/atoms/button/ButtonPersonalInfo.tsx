import React from 'react';

export interface ButtonPersonalInfoProps {
  label?: string;
  onClick?: () => void;
  className?: string;
  px?: number; // px 속성 추가
  py?: number; // py 속성 추가
  size?: string
}

export const ButtonPersonalInfo: React.FC<ButtonPersonalInfoProps> = ({
  label = '글쓰기',
  onClick,
  className,
  px = 6, 
  py = 2, 
  size = 'sm'
}) => {
  return (
    <button
      className={`text-white bg-[#707C60] hover:bg-[#4F5843] text-${size} rounded-lg font-base transition-colors duration-200 ${className}`}
      onClick={onClick}
      style={{ paddingLeft: `${px * 0.25}rem`, paddingRight: `${px * 0.25}rem`, paddingTop: `${py * 0.25}rem`, paddingBottom: `${py * 0.25}rem` }} // 인라인 스타일로 패딩 설정
    >
      {label}
    </button>
  );
};
