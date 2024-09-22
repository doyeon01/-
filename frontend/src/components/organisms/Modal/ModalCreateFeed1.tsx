import React from 'react';
import testImg1 from '../../../assets/statics/test1.jpg';
import testImg2 from '../../../assets/statics/test2.jpg';
import testImg3 from '../../../assets/statics/test3.png';
import testImg4 from '../../../assets/statics/test4.jpg';
import testImg5 from '../../../assets/statics/test5.jpg';

const ModalCreateFeed1: React.FC<{ onSelectSchedule: (id: string) => void, onClose: () => void }> = ({ onSelectSchedule, onClose }) => {
  const images = [
    { id: 1, src: testImg1, title: '퇴사 기념 혼자 부산 여행' },
    { id: 2, src: testImg2, title: '경기도 파주 졸업여행 1' },
    { id: 3, src: testImg3, title: '나홀로 창원 1박2일' },
    { id: 4, src: testImg4, title: '제주도 올레길로 1차' },
    { id: 5, src: testImg5, title: '무등산 원정' },
    { id: 6, src: testImg1, title: '퇴사 기념 혼자 부산 여행' },
    { id: 7, src: testImg2, title: '경기도 파주 졸업여행 1' },
    { id: 8, src: testImg3, title: '나홀로 창원 1박2일' },
    { id: 9, src: testImg4, title: '제주도 올레길로 1차' },
    { id: 10, src: testImg5, title: '무등산 원정' },
  ];

  return (
    <div className="h-full overflow-y-auto p-4 relative" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
      <button
        className="absolute top-0 right-0 text-gray-500 hover:text-gray-700"
        onClick={onClose}
      >
        &times;
      </button>

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-center flex-grow pl-24">일정을 선택하세요</h2>
        <button
          className="bg-[#707C60] text-white px-4 py-2 rounded-lg ml-auto" 
          onClick={() => onSelectSchedule('새 게시물 등록')} 
        >
          건너뛰기
        </button>
      </div>
      
      <div className="grid grid-cols-3 gap-4">
        {images.map((image) => (
          <div
            key={image.id}
            className="relative overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => onSelectSchedule(image.title)} 
          >
            <img src={image.src} alt={image.title} className="w-full h-40 object-cover rounded-lg" />
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2 text-sm text-center">
              {image.title}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ModalCreateFeed1;
