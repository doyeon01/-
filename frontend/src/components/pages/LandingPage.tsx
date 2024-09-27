import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ModalLogin } from '../organisms/Modal/ModalLogin';
import Test from './Test';

export const LandingPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);  
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); 
  };

  const nav = useNavigate()

  return (
    <>
      <div>LandingPage</div>
      <button onClick={handleOpenModal} className='border border-gray-700'>로그인 </button>
      {isModalOpen && <ModalLogin onClose={handleCloseModal} />}
      <button onClick={()=>{nav('/main')}} className='border border-gray-700'>
        메인페이지
      </button>
      <Test></Test>
    </>
  );
};


