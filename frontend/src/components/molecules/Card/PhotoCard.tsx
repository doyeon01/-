import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ModalPhotoCard } from '../../organisms/Modal/ModalPhotoCard';
import { SearchIcon1 } from '../../../assets/icons/svg';
import { ModalSelectFeed } from '../../organisms/Modal/ModalSelectFeed';

interface PhotoCardProps {
  totalPlanId: number;
  title?: string;
  address?: string;
  testimg: string;
  startDate?: string;
  endDate?: string;
  showButton?: boolean;
  showDetailButton?: boolean;
}

export const PhotoCard: React.FC<PhotoCardProps> = ({
  title,
  address,
  testimg,
  showButton,
  startDate,
  endDate,
  totalPlanId,
  showDetailButton = false,
}) => {
  const [showSelectFeedModal, setShowSelectFeedModal] = useState(false);
  const [showPhotoCardModal, setShowPhotoCardModal] = useState(false);
  const nav = useNavigate();

  // 날짜 형식 변환 함수
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const year = String(date.getFullYear()).slice(2);
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}.${month}.${day}`;
  };

  // ModalSelectFeed 모달 열기/닫기 함수
  const handleOpenSelectFeedModal = () => setShowSelectFeedModal(true);
  const handleCloseSelectFeedModal = () => setShowSelectFeedModal(false);

  // ModalPhotoCard 모달 열기/닫기 함수
  const handleOpenPhotoCardModal = () => setShowPhotoCardModal(true);
  const handleClosePhotoCardModal = () => setShowPhotoCardModal(false);

  return (
    <div>
      <div className="relative overflow-hidden rounded-lg transform transition-transform duration-300 hover:scale-105 shadow-lg group">
        <img src={testimg} alt={title} className="w-full h-72 object-cover rounded-lg" />

        {/* 여행 일정 보기와 포토카드 생성 버튼 */}
        {showButton && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 transition-all duration-300 group-hover:bg-opacity-50">
            <button
              className="text-black opacity-0 bg-opacity-80 hover:bg-opacity-100 py-2 px-3 bg-white rounded-lg transition-opacity duration-300 group-hover:opacity-100"
              onClick={() => nav('/schedule', { state: { totalPlanId, title } })}
            >
              여행 일정 보기
            </button>
            <button
              className="text-black opacity-0 bg-opacity-80 hover:bg-opacity-100 py-2 px-3 bg-white rounded-lg ml-4 transition-opacity duration-300 group-hover:opacity-100"
              onClick={handleOpenSelectFeedModal}
            >
              포토카드 생성
            </button>
          </div>
        )}

        {/* 상세보기 버튼 */}
        {showDetailButton && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 transition-all duration-300 group-hover:bg-opacity-50">
            <button
              className="text-black opacity-0 bg-opacity-80 hover:bg-opacity-100 py-2 px-3 bg-white rounded-lg transition-opacity duration-300 group-hover:opacity-100"
              onClick={handleOpenPhotoCardModal}
            >
              <SearchIcon1 />
            </button>
          </div>
        )}

        {/* 카드 하단 정보 (타이틀, 날짜, 주소) */}
        <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black to-transparent text-white">
          <h3 className="text-lg font-bold">{title}</h3>
          {startDate && endDate && <p className="text-sm">{formatDate(startDate)} ~ {formatDate(endDate)}</p>}
          {address && <p className="text-sm">{address}</p>}
        </div>
      </div>

      {/* ModalSelectFeed 모달 */}
      {showSelectFeedModal && (
        <ModalSelectFeed 
          totalPlanId={totalPlanId} 
          onClose={handleCloseSelectFeedModal} 
        />
      )}

      {/* ModalPhotoCard 모달 */}
      {showPhotoCardModal && (
        <ModalPhotoCard 
          onClose={handleClosePhotoCardModal} 
          photoCardUrl={testimg} 
        />
      )}
    </div>
  );
};
