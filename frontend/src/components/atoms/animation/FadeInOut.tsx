import React, { useState, useEffect } from 'react';

const FadeInOutComponent: React.FC = () => {
  const [visible, setVisible] = useState(false);

  // 버튼을 클릭했을 때 페이드인/페이드아웃을 트리거
  const handleClick = () => {
    setVisible(true); // 페이드인 시작
    setTimeout(() => {
      setVisible(false); // 일정 시간 후 페이드아웃 시작
    }, 3000); // 3초 후 페이드아웃
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen relative">
      <button
        onClick={handleClick}
        className="px-4 py-2 bg-blue-500 text-white rounded z-10"
      >
        Show Message
      </button>

      <div
        className={`transition-opacity duration-500 w-full h-full bg-black absolute top-0 left-0 z-0 ${
          visible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        White
      </div>
    </div>
  );
};

export default FadeInOutComponent;
