import { useState } from 'react';
import { ModalLogin } from '../organisms/Modal/ModalLogin';
import logo from '../../assets/statics/logo.png';
import travel from '../../assets/statics/travel.png';

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
      <nav className='fixed top-0 left-0 w-full flex items-center justify-between p-4 mb-12'>
        <img src={logo} className="h-10 w-42" alt="logo" />
      </nav>

      <div className="relative w-full h-screen">
        <div className="absolute z-10 top-1/2 left-1/4 transform -translate-x-[40%] -translate-y-1/2">
          <div className="text-5xl font-normal">여행의 시작부터 끝까지</div>
          <div className="text-2xl mt-4">당신만을 위한 여정을 함께합니다</div>
          <button
            onClick={handleOpenModal}
            className='cursor-pointer mt-6 px-8 py-4 bg-[#665F59] text-white text-lg font-normal rounded-lg hover:bg-[#4F4945] transition duration-200'>
            여행한담 시작하기
          </button>
        </div>

        <img src={travel} className="h-full w-full object-cover pl-20 pt-10" alt="travel" />
      </div>

      {isModalOpen && <ModalLogin onClose={handleCloseModal} />}
    </>
  );
};
