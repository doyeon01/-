import React, { useState } from 'react';

const ButtonLikeCategory = ({ initialClicked = false, label = 'text' }) => {
  const [isClicked, setIsClicked] = useState(initialClicked);

  const handleClick = () => {
    setIsClicked(!isClicked);
  };

  return (
    <>
      <div
        onClick={handleClick}
        className={`border rounded-full px-4 py-2 inline-block cursor-pointer 
        ${isClicked ? 'bg-[#707C60] text-white' : 'bg-white text-black border-black'}`}
      >
        <span>{label}</span>
      </div>
    </>
  );
}

export default ButtonLikeCategory;
