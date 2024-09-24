import { useNavigate } from 'react-router-dom';
import testImg1 from './../../../assets/statics/test1.jpg';
import { ButtonPersonalInfo } from '../../atoms/button/ButtonPersonalInfo';

// 여행 일정에 대한 내용을 받아와서 요청 보내야 함
interface ModalPhotoCardProps {
  onClose: () => void;
}

interface TestArr {
  title: string;
  image: string;
}

const testArr: TestArr = {
  title: "퇴사 기념 혼자 부산 여행",
  image: testImg1, // 여기에 업로드하신 이미지를 사용할 수 있습니다
};

export const ModalPhotoCard: React.FC<ModalPhotoCardProps> = ({ onClose }) => {
  const nav = useNavigate(); // useNavigate를 컴포넌트 내부에서 호출

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-[#F4F4EE] p-6 rounded-lg shadow-lg relative max-w-lg w-full">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          &times;
        </button>
        <h2 className="text-xl font-bold my-4 text-center">{testArr.title}</h2>

        <div className='flex flex-col justify-center items-center pt-7 '>
          <img src={testArr.image} alt={testArr.title} className="w-full h-64 mb-4 rounded-lg" />
          <ButtonPersonalInfo 
            label='저장하기' 
            px={5} 
            py={2} 
            size={'1g'} 
            onClick={() => { 
              nav('/my', { state: { activeTab: 'tab5' } }); // 페이지 이동
              onClose(); // 모달 창 닫기
            }}
          />
        </div>
      </div>
    </div>
  );
};
