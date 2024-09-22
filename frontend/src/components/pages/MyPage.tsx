import React, { useState } from 'react';
import { UserIcon } from '../../assets/icons/svg';
import { ButtonPersonalInfo } from '../atoms/button/ButtonPersonalInfo';
import { PersonalDetailTab } from '../molecules/Tab/PersonalDetailTab';
import { ModalCreateFeed2 } from '../organisms/Modal/ModalCreateFeed2';
import { useNavigate } from 'react-router-dom';

export const MyPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const nav = useNavigate();

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // 글 작성 완료 후 탭을 1번으로 설정하고 모달을 닫음
  const handleCompleteModal = () => {
    setIsModalOpen(false);
    nav('/my', { state: { activeTab: 'tab1' } });
  };

  return (
    <div className="container mx-auto p-5 max-w-4xl bg-white rounded-lg mt-40 mb-20">
      <div className="flex justify-center pb-8">
        <div className="flex justify-center pt-14 gap-8">
          <UserIcon />
          <div>
            <div className="flex items-center gap-4">
              <div className="text-3xl font-bold">닉네임</div>
              <div className="flex justify-center">
                <ButtonPersonalInfo label="프로필 편집" className="mr-2" />
                <ButtonPersonalInfo label="글쓰기" onClick={handleOpenModal} />
                {isModalOpen && (
                  <ModalCreateFeed2 onClose={handleCloseModal} onComplete={handleCompleteModal} />
                )}
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
      <PersonalDetailTab />
    </div>
  );
};
