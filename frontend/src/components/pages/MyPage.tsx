import React, {useState} from 'react';
import { UserIcon } from '../../assets/icons/svg';
import { ButtonPersonalInfo } from '../atoms/button/ButtonPersonalInfo';
import { PersonalDetailTab } from '../molecules/Tab/PersonalDetailTab';
import { ModalCreateFeed } from '../organisms/Modal/ModalCreateFeed';

export const MyPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);  
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); 
  };


  return (
    <div className="container mx-auto p-5 max-w-4xl bg-white rounded-lg mt-40 mb-20">
    <div className='flex justify-center pb-8'>
      <div className='flex justify-center pt-14 gap-8'>
        <UserIcon />
        <div>
          <div className='flex items-center gap-4'>
            <div className="text-3xl font-bold">닉네임</div>
            <div className="flex justify-center">
              <ButtonPersonalInfo label="프로필 편집" className="mr-2" />
              <ButtonPersonalInfo label="글쓰기"  onClick={handleOpenModal}/>
              {isModalOpen && <ModalCreateFeed onClose={handleCloseModal} />}
            </div>
          </div>
          <div className="text-base text-gray-500 pt-4 font-semibold">자기소개</div>
          <div className="mt-4">
            <span className="text-base font-light mr-1">동행온도 </span><span className="font-bold mr-6">36.5</span>
            <span className="text-base font-light mr-1">팔로워 </span><span className="font-bold mr-6">200</span>
            <span className="text-base font-light mr-1">팔로잉 </span><span className="font-bold mr-6">200</span>
          </div>
        </div>
      </div>
    </div>
    <hr />
    <PersonalDetailTab/>
  </div>
  );
}
