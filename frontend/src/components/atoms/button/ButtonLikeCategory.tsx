import { FC, ReactNode } from 'react';

interface ButtonLikeCategoryProps {
  initialClicked?: boolean;
  label: string | ReactNode; // label을 문자열 또는 JSX 요소로 받을 수 있음
  onClick: () => void;
  px?: number;
  py?: number;
}

const ButtonLikeCategory: FC<ButtonLikeCategoryProps> = ({ 
  initialClicked = false, 
  label, 
  onClick,
  px = 4,
  py = 2
}) => {
  return (
    <div
      onClick={onClick}
      style={{
        paddingLeft: `${px * 0.25}rem`,
        paddingRight: `${px * 0.25}rem`,
        paddingTop: `${py * 0.25}rem`,
        paddingBottom: `${py * 0.25}rem`,
      }}
      className={`border rounded-full inline-block cursor-pointer transition-colors duration-200
      ${initialClicked ? 'bg-[#707C60] text-white hover:bg-[#5f674d]' : 'bg-white text-black border-black hover:bg-gray-200'}`}
    >
      {typeof label === 'string' ? <span>{label}</span> : label} 
    </div>
  );
};

export default ButtonLikeCategory;
