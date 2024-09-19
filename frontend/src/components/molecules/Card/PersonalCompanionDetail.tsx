import React from 'react';
import testImg1 from './../../../assets/statics/test1.jpg';
import testImg2 from './../../../assets/statics/test2.jpg';
import testImg3 from './../../../assets/statics/test3.png';
import testImg4 from './../../../assets/statics/test4.jpg';
import testImg5 from './../../../assets/statics/test5.jpg';
import PersonalSearch from '../../atoms/input/PersonalSearch';
import { useSearchAndSort } from '../../../hooks/useSearchAndSort';
import { RedHeartIcon } from './../../../assets/icons/svg' // Assuming you have this component for the heart icon

interface TravelPlans {
  title: string;
  address: string;
  description: string;
  createdDate: string;
  comments: number;
  likes: number;
  image: string;
}

const travelPlans: TravelPlans[] = [
  {
    title: '퇴사 기념 혼자 여행',
    address: '부산',
    description: '해운대 야경 같이 보실 분 구해요',
    createdDate: '2024-09-07',
    comments: 6,
    likes: 12,
    image: testImg1,
  },
  {
    title: '경기도 즉석 여행',
    address: '파주',
    description: '돛단배 같이 타실 분 2명 구해요',
    createdDate: '2024-09-06',
    comments: 8,
    likes: 20,
    image: testImg2,
  },
  {
    title: '나홀로 창원 1박 2일',
    address: '창원',
    description: '맛집 탐방하실 분 구해요',
    createdDate: '2024-09-11',
    comments: 5,
    likes: 18,
    image: testImg3,
  },
  {
    title: '나홀로 창원 1박 2일',
    address: '창원',
    description: '맛집 탐방하실 분 구해요',
    createdDate: '2024-09-20',
    comments: 5,
    likes: 17,
    image: testImg4,
  },
  {
    title: '나홀로 창원 1박 2일',
    address: '창원',
    description: '맛집 탐방하실 분 구해요',
    createdDate: '2024-09-18',
    comments: 5,
    likes: 19,
    image: testImg5,
  },
];

export const PersonalCompanionDetail: React.FC = () => {
  const { filteredArr, onSearch, onSortChange, showAllItems } = useSearchAndSort<TravelPlans>(
    travelPlans,
    ['title', 'address', 'description'], // 검색에 사용할 필드 배열
    'createdDate' // 정렬에 사용할 날짜 필드
  );

  return (
    <>
      <div className="flex justify-end items-center mb-5">
        <PersonalSearch onSearch={onSearch} showAllItems={showAllItems} onSortChange={onSortChange} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {filteredArr.length > 0 ? (
          filteredArr.map((plan, index) => (
            <div key={index} className="max-w-sm rounded overflow-hidden shadow-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">
              <img className="w-full h-48 object-cover" src={plan.image} alt={plan.title} />
              <div className="px-6 py-4">
              <div className="flex justify-between items-center mb-2">
                <div className="font-medium text-lg">{plan.title}</div>
                <p className="bg-[#6F755B] text-white px-2 py-1 rounded-md text-right">{plan.address}</p>
              </div>

                <p className="font-normal text-gray-700 text-sm mb-2">{plan.description}</p>
                <div className="flex justify-between items-center">
                  <span className="flex gap-1">
                    <p className="font-normal text-gray-400 text-xs">{plan.createdDate} ·</p>
                    <p className="font-normal text-gray-400 text-xs">{plan.comments}개의 댓글</p>
                  </span>
                  <span className="flex items-center">
                    <RedHeartIcon /> 
                    <p className="font-normal text-xs pl-1">{plan.likes}</p>
                  </span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center col-span-3">일정이 없습니다.</p>
        )}
      </div>
    </>
  );
};
