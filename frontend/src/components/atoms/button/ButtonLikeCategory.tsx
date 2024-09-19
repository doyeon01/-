import React, { FC } from 'react';

interface ButtonLikeCategoryProps {
  initialClicked?: boolean; // 선택 사항이므로 물음표로 처리
  label: string; // 문자열 타입
  onClick: () => void; // 클릭 이벤트는 반환값이 없는 함수
}

const ButtonLikeCategory: FC<ButtonLikeCategoryProps> = ({ initialClicked = false, label, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`border rounded-full px-4 py-2 inline-block cursor-pointer 
      ${initialClicked ? 'bg-[#707C60] text-white' : 'bg-white text-black border-black'}`}
    >
      <span>{label}</span>
    </div>
  );
};

export default ButtonLikeCategory;
