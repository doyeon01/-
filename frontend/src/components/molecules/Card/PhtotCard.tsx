import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ModalPhotoCard } from '../../organisms/Modal/ModalPhotoCard';
import { DownLoadIcon } from '../../../assets/icons/svg';

interface PhotoCardProps {
  title: string;
  address?: string; 
  testimg: string;
  showButton?: boolean; // 여행 일정 보기, 포토카드 생성 버튼 보여줄지 여부를 결정하는 속성
  showDownLoadButton?: boolean;
}

export const PhotoCard: React.FC<PhotoCardProps> = ({ title, address, testimg, showButton, showDownLoadButton = false }) => {
  const [showModal, setShowModal] = useState(false); // 모달 상태 관리
  const nav = useNavigate();

  // 모달 열기 함수
  const handleOpenModal = () => {
    setShowModal(true);
  };

  // 모달 닫기 함수
  const handleCloseModal = () => {
    setShowModal(false);
  };

  // 이미지 다운로드 함수
  const handleDownloadImage = () => {
    // a 태그를 이용한 다운로드 구현
    const link = document.createElement('a');
    link.href = testimg;  // 다운로드할 이미지 URL
    link.download = title; // 파일 이름
    document.body.appendChild(link); // 링크를 body에 추가
    link.click(); // 링크 클릭으로 다운로드 실행
    document.body.removeChild(link); // 링크 제거
  };

  return (
    <div>
      <div className="relative overflow-hidden rounded-lg transform transition-transform duration-300 hover:scale-105 shadow-lg group">
        <img
          src={testimg}
          alt={title}
          className="w-full h-72 object-cover rounded-lg"
        />
        
        {/* 클릭할 때 userid, 여행 일정 id를 props로 보내줘야함 */}
        {showButton && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 transition-all duration-300 group-hover:bg-opacity-50">
            <button 
              className="text-black opacity-0 bg-opacity-80 hover:bg-opacity-100 py-2 px-3 bg-white rounded-lg transition-opacity duration-300 group-hover:opacity-100"
              onClick={() => nav('/schedule')}
            >
              여행 일정 보기
            </button>
            <button 
              className="text-black opacity-0 bg-opacity-80 hover:bg-opacity-100 py-2 px-3 bg-white rounded-lg ml-4 transition-opacity duration-300 group-hover:opacity-100"
              onClick={handleOpenModal}
            >
              포토카드 생성
            </button>
          </div>
        )}

        {/* 다운로드 버튼 */}
        {showDownLoadButton && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 transition-all duration-300 group-hover:bg-opacity-50">
            <button 
              className="text-black opacity-0 bg-opacity-80 hover:bg-opacity-100 py-2 px-3 bg-white rounded-lg transition-opacity duration-300 group-hover:opacity-100"
              onClick={handleDownloadImage}
            >
              <DownLoadIcon />
            </button>
          </div>
        )}

        <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black to-transparent text-white">
          <h3 className="text-lg font-bold">{title}</h3>
          {address && <p className="text-sm">{address}</p>}
        </div>
      </div>

      {showModal && <ModalPhotoCard onClose={handleCloseModal} />}
    </div>
  );
};
