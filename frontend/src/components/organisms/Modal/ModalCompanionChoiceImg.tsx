import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import testImg1 from '../../../assets/statics/test1.jpg';
import testImg2 from '../../../assets/statics/test2.jpg';
import testImg3 from '../../../assets/statics/test3.png';
import testImg4 from '../../../assets/statics/test4.jpg';
import testImg5 from '../../../assets/statics/test5.jpg';
import testImg6 from '../../../assets/statics/test5.jpg';
import { ModalCompanionWrite } from './ModalCompanionWrite';

const images = [
  { src: testImg1, title: '퇴사 기념 혼자 부산 여행' },
  { src: testImg2, title: '경기도 파주 졸업여행 1' },
  { src: testImg3, title: '나홀로 창원 1박2일' },
  { src: testImg4, title: '제주도 올레길로 1차' },
  { src: testImg5, title: '무릉산원정' },
  { src: testImg6, title: '무릉산원정' }
];

const ModalCompanionChoiceImg: React.FC<{ onClose: () => void }> = ({onClose}) => {
  const [isWriteModalOpen, setIsWriteModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-[#F4F4EE] rounded-lg shadow-lg w-[800px] h-[650px] p-6 relative">
        {/* 모달 닫기 버튼 */}
        <button 
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          onClick={() => onClose()} 
        >
          &times;
        </button>
        
        {/* 상단 텍스트 */}
        <div className="text-center text-lg font-semibold mb-2">
          동행할 일정을 골라주세요
        </div>
        
        {/* 구분선 */}
        <hr className="border-t border-gray-300 mb-4" />
       {/* 캘린더 선택 */}
       <div className="flex justify-end mb-4">
          <DatePicker 
            selected={selectedDate}
            onChange={(date: Date | null) => setSelectedDate(date)}
            dateFormat="yyyy-MM-dd"
            placeholderText="날짜를 선택하세요"
            className="border border-gray-300 rounded px-3 py-2 w-40" // 캘린더 사이즈 조정
          />
        </div>
        {/* 카드 리스트 */}
        <div className="grid grid-cols-3 gap-4">
          {images.map((image, index) => (
            <div 
              key={index} 
              className="relative overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => setIsWriteModalOpen(true)} 
            >
              <img 
                src={image.src} 
                alt={`Image ${index + 1}`} 
                className="w-full h-40 object-cover rounded-lg" 
              />
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2 text-sm text-center">
                {image.title}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Write 모달 컴포넌트 */}
      {isWriteModalOpen && <ModalCompanionWrite onClose={() => setIsWriteModalOpen(false)} />}
    </div>
  );
}

export default ModalCompanionChoiceImg;