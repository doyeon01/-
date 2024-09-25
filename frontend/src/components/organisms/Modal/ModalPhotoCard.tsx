import { useNavigate } from 'react-router-dom';
import testImg1 from './../../../assets/statics/test1.jpg';

interface ModalPhotoCardProps {
  onClose: () => void; // 부모 컴포넌트에서 전달된 함수
}

interface TestArr {
  title: string;
  image: string;
}

const testArr: TestArr = {
  title: "퇴사 기념 혼자 부산 여행",
  image: testImg1, 
};

export const ModalPhotoCard: React.FC<ModalPhotoCardProps> = ({ onClose }) => {
  const nav = useNavigate();

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={onClose} // 오버레이 클릭 시 모달 닫기
    >
      {/* 모달 내용: 여기서 클릭해도 onClose가 실행되지 않도록 e.stopPropagation */} 
      <div 
        className="bg-white pb-20 shadow-lg relative max-w-md w-full h-auto z-50"  
        onClick={(e) => e.stopPropagation()} // 이벤트 버블링을 막아 모달 내 클릭 시 오버레이 이벤트가 발생하지 않도록
      >
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 z-50"  
          onClick={onClose}
        >
          &times;
        </button>

        <div className="relative group flex flex-col justify-center items-center pt-7">
          <div className="relative w-95 h-64 mb-4">
            <img src={testArr.image} alt={testArr.title} className="w-full h-full object-cover" />
            
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-opacity duration-300 z-40">
              <button 
                className="text-black opacity-0 bg-opacity-80 hover:bg-opacity-100 py-2 px-3 bg-white rounded-lg transition-opacity duration-300 group-hover:opacity-100 cursor-pointer"
                onClick={() => { 
                  nav('/my', { state: { activeTab: 'tab5' } });
                  onClose(); 
                }}
              >
                저장하기
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
