import { useState, useEffect } from 'react';
import { PersonalDetailTab } from '../molecules/Tab/PersonalDetailTab';
import { ModalCreateFeed2 } from '../organisms/Modal/ModalCreateFeed2';
import { ButtonPersonalInfo } from '../atoms/button/ButtonPersonalInfo';
import { useNavigate } from 'react-router-dom';
import { UserInfo } from '../../services/api/UserService';
import { UserInfoType, UserInfoResponseType } from '../../model/MyPageType';
import { UserIcon } from '../../assets/icons/svg'; // UserIcon import

export const MyPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reloadFeed, setReloadFeed] = useState(false); // 피드 리로드 트리거 상태 추가
  const nav = useNavigate();
  const [image, setImage] = useState<string | null>(null); // 초기값을 null로 변경
  const [nickName, setNickName] = useState<string | null>(''); // string | null 허용
  const [introduce, setIntroduce] = useState<string | null>(''); // string | null 허용
  const [accompanyTemperature, setAccompanyTemperature] = useState<number>(0); // 초기값 설정

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // 글 작성 완료 후 탭을 1번으로 설정하고 모달을 닫음 + 피드 리로드
  const handleCompleteModal = () => {
    setIsModalOpen(false);
    setReloadFeed(prev => !prev); // 피드를 리로드하도록 상태 변경
    nav('/my', { state: { activeTab: 'tab1' } });
  };

  useEffect(() => {
    UserInfo()
      .then((res) => {
        const data: UserInfoResponseType = res.data;
        if (data.success) {
          const info: UserInfoType = data.response;
          setImage(info.profileImage);
          setNickName(info.name);
          setIntroduce(info.introduction);
          setAccompanyTemperature(info.accompanyTemperature);
        }
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className="container mx-auto p-5 max-w-4xl bg-white rounded-lg mt-24 mb-20">
      <div className="flex justify-center pb-8">
        <div className="flex justify-center pt-14 gap-8">
          {image ? (
            <img src={image} alt="프로필 사진" className="w-[150px] h-[150px] rounded-full object-cover" />
          ) : (
            <UserIcon /> 
          )}
          <div>
            <div className="flex items-center gap-4">
              <div className="text-3xl font-bold">{nickName || '코딩왕'}</div>
              <div className="flex justify-center">
                <ButtonPersonalInfo label="프로필 편집" className="mr-2" />
                <ButtonPersonalInfo label="글쓰기" onClick={handleOpenModal} />
                {isModalOpen && (
                  <ModalCreateFeed2 onClose={handleCloseModal} onComplete={handleCompleteModal} />
                )}
              </div>
            </div>
            <div className="text-base text-gray-500 pt-4 font-semibold">
              {introduce || '포기란 없다'}
            </div>
            <div className="mt-4">
              <span className="text-base font-light mr-1">동행온도 </span>
              <span className="font-bold mr-6">{accompanyTemperature.toFixed(1)}</span>
              <span className="text-base font-light mr-1">팔로워 </span>
              <span className="font-bold mr-6">200</span>
              <span className="text-base font-light mr-1">팔로잉 </span>
              <span className="font-bold mr-6">200</span>
            </div>
          </div>
        </div>
      </div>
      <hr />
      <PersonalDetailTab reloadFeed={reloadFeed} /> {/* reloadFeed prop 추가 */}
    </div>
  );
};
