import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import { ModalPhotoCard } from '../../organisms/Modal/ModalPhotoCard';
import { SearchIcon1 } from '../../../assets/icons/svg'; // DownLoadIcon 추가
// import { PostPhotoCard, GetPhotoCardDetail } from '../../../services/api/PhotoService';
// import { useRecoilValue } from 'recoil';
// import { UserId } from '../../../Recoil/atoms/Auth';
import { ModalSelectFeed } from '../../organisms/Modal/ModalSelectFeed'
// import Swal from 'sweetalert2'; // 알림 라이브러리

interface PhotoCardProps {
  totalPlanId: number;
  title?: string;
  address?: string;
  testimg: string;
  startDate?: string;
  endDate?: string;
  showButton?: boolean;
  showDownLoadButton?: boolean;
}

export const PhotoCard: React.FC<PhotoCardProps> = ({
  title,
  address,
  testimg,
  showButton,
  startDate,
  endDate,
  totalPlanId,
  showDownLoadButton = false,
}) => {
  const [showSelectFeedModal, setShowSelectFeedModal] = useState(false);
  // const [showModal, setShowModal] = useState(false); // 모달 상태 관리
  // const [photoCardUrl, setPhotoCardUrl] = useState(''); 
  const nav = useNavigate();
  // const userId = useRecoilValue(UserId); 
  // const [isCreating, setIsCreating] = useState(false); // 포토카드 생성 중 상태

  // 날짜 형식 변환
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const year = String(date.getFullYear()).slice(2); // 년도를 뒤 두자리만 추출
    const month = String(date.getMonth() + 1).padStart(2, '0'); // 두 자리 수로 변환
    const day = String(date.getDate()).padStart(2, '0'); // 두 자리 수로 변환
    return `${year}.${month}.${day}`;
  };

  // // 모달 열기 함수
  // const handleOpenModal = () => {
  //   setShowModal(true);
  // };

  // // 모달 닫기 함수
  // const handleCloseModal = () => {
  //   setShowModal(false);
  // };


  // ModalSelectFeed 모달 열기/닫기 함수
  const handleOpenSelectFeedModal = () => setShowSelectFeedModal(true);
  const handleCloseSelectFeedModal = () => setShowSelectFeedModal(false);

  // // 이미지 다운로드 함수
  // const handleDownloadImage = () => {
  //   if (!testimg) {
  //     console.error('이미지 URL이 없습니다.');
  //     return; // testimg가 undefined이면 함수를 종료
  //   }

  //   // a 태그를 이용한 다운로드 구현
  //   const link = document.createElement('a');
  //   link.href = testimg; // 다운로드할 이미지 URL
  //   link.download = title || 'default-filename';
  //   document.body.appendChild(link); // 링크를 body에 추가
  //   link.click(); // 링크 클릭으로 다운로드 실행
  //   document.body.removeChild(link); // 링크 제거
  // };

  // 포토카드 생성 함수
  // const handleCreatePhotoCard = async () => {
  //   ModalSelectFeed(totalPlanId)

    // setIsCreating(true); // 로딩 중 표시

    // Swal.fire({
    //   title: '포토카드 생성 중...',
    //   allowOutsideClick: false,
    //   didOpen: () => {
    //     Swal.showLoading();
    //   },
    // });

    // try {
    //   const postData = {
    //     userId: userId,
    //     totalplanId: totalPlanId,
    //   };

    //   // 포토카드 생성 POST 요청
    //   const response = await PostPhotoCard(postData);
    //   setPhotoCardUrl(response.response.photoCardUrl); // 오타 수정
    //   handleOpenModal();
    // } catch (error) {
    //   console.error('포토카드 생성 중 오류 발생:', error); // 세미콜론 제거
    // } finally {
    //   setIsCreating(false); // 로딩 상태 종료
    // }
  // };

  // // 포토카드 조회 함수
  // const handleGetPhotoCard = async () => {
  //   try {
  //     // 포토카드 조회 요청
  //     const data = await GetPhotoCardDetail(totalPlanId);
  //     setPhotoCardUrl(data.photoCardUrl); 
  //     handleOpenModal();
  //   } catch (error) {
  //     console.error('포토카드 조회 중 오류 발생:', error); 
  //   }
  // };

  return (
    <div>
      <div className="relative overflow-hidden rounded-lg transform transition-transform duration-300 hover:scale-105 shadow-lg group">
        <img src={testimg} alt={title} className="w-full h-72 object-cover rounded-lg" />

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
              // disabled={isCreating}
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
              // onClick={handleGetPhotoCard}
            >
              <SearchIcon1/>
            </button>
            {/* <button
              className="text-black opacity-0 bg-opacity-80 hover:bg-opacity-100 py-2 px-3 bg-white rounded-lg ml-4 transition-opacity duration-300 group-hover:opacity-100"
              onClick={handleDownloadImage}
            >
              <DownLoadIcon />
            </button> */}
          </div>
        )}

        <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black to-transparent text-white">
          <h3 className="text-lg font-bold">{title}</h3>
          {startDate && endDate && <p className="text-sm">{formatDate(startDate)} ~ {formatDate(endDate)}</p>}
          {address && <p className="text-sm">{address}</p>}
        </div>
      </div>
      {showSelectFeedModal && (
        <ModalSelectFeed 
          totalPlanId={totalPlanId} 
          onClose={handleCloseSelectFeedModal} 
        />
      )}
      {/* {showModal && <ModalPhotoCard onClose={handleCloseModal} photoCardUrl={photoCardUrl} isCreation={isCreating}/>} */}
    </div>
  );
};
