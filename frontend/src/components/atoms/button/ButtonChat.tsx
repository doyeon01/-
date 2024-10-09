import React, { useState } from 'react';
import buttonChat from '../../../assets/statics/ButtonChat.png';
import { useDrag } from 'react-use-gesture';
import { useSpring, animated } from 'react-spring';
import ModalChat from '../../organisms/Modal/ModalChat';
import { useRecoilState } from 'recoil';
import { chatState } from '../../../Recoil/atoms/chatState'; 

const ButtonChat: React.FC = () => {
  const [{ x, y }, setLogoPos] = useSpring(() => ({ x: 0, y: 0 }));
  const [isChatOpen, setIsChatOpen] = useRecoilState(chatState);
  const [prevPos, setPrevPos] = useState({ x: 0, y: 0 });

  const closeChat = () => {
    setLogoPos(prevPos);
    setIsChatOpen(false);
  };

  const bindLogoPos = useDrag((params) => {
    setLogoPos({ x: params.offset[0], y: params.offset[1] });
  });

  const handleDoubleClick = () => {
    setPrevPos({ x: x.get(), y: y.get() });
    setLogoPos({ x: 0, y: 0 });
    setIsChatOpen(true);
  };

  return (
    <>
      <animated.div
        {...bindLogoPos()}
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          x,
          y,
          zIndex: 1000,
          userSelect: 'none',
          touchAction: 'none',
          cursor: 'pointer'
        }}
        onDoubleClick={handleDoubleClick}
        draggable={false}
      >
        <img className='w-16 h-16' style={{ pointerEvents: 'none' }} src={buttonChat} alt="logo" />
      </animated.div>
      {isChatOpen && (
        <ModalChat onClose={closeChat} />
      )}
    </>
  );
}

export default ButtonChat;
