import { useState } from 'react';
import { ModalLogin } from '../organisms/Modal/ModalLogin';

export const LandingPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);  
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); 
  };

  return (
    <>
      <div>LandingPage</div>
      <button onClick={handleOpenModal} className='border border-gray-700'>로그인 </button>
      {isModalOpen && <ModalLogin onClose={handleCloseModal} />}
    </>
  );
};
