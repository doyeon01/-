import { useNavigate } from 'react-router-dom';

interface ModalPhotoCardProps {
  onClose: () => void; // 부모 컴포넌트에서 전달된 함수
  photoCardUrl: string;
  isCreation: boolean; 
}

export const ModalPhotoCard: React.FC<ModalPhotoCardProps> = ({ onClose, photoCardUrl, isCreation }) => {
  const nav = useNavigate();

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80" 
      onClick={onClose} // 오버레이 클릭 시 모달 닫기
    >
      {/* 모달 내용: 이미지가 화면 전체를 차지하도록 설정 */}
      <div
        className="relative w-full h-full flex justify-center items-center"
        onClick={(e) => e.stopPropagation()} // 이벤트 버블링을 막아 모달 내 클릭 시 오버레이 이벤트가 발생하지 않도록
      >
        <img src={photoCardUrl} className="w-full h-full object-contain" alt="Photo Card" />
        
        <button
          className="absolute top-4 right-4 text-white text-3xl z-50"
          onClick={onClose}
        >
          &times;
        </button>

        {isCreation && (
          <button
            className="absolute bottom-4 px-6 py-3 bg-white text-black rounded-lg z-50"
            onClick={() => {
              nav('/my', { state: { activeTab: 'tab5' } });
              onClose();
            }}
          >
            저장하기
          </button>
        )} 
      </div>
    </div>
  );
};
