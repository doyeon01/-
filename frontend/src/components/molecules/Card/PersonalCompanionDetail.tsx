import React from 'react';
import testImg1 from './../../../assets/statics/test1.jpg';
import testImg2 from './../../../assets/statics/test2.jpg';
import testImg3 from './../../../assets/statics/test3.png';
import testImg4 from './../../../assets/statics/test4.jpg';
import testImg5 from './../../../assets/statics/test5.jpg';
import PersonalSearch from '../../atoms/input/PersonalSearch';
import { useSearchAndSort } from '../../../hooks/useSearchAndSort';
import { FeedCard } from './FeedCard';

interface TravelPlans {
  title: string;
  address: string;
  description: string;
  createdDate: string;
  comment: number;
  like: number;
  image: string;
}

const travelPlans: TravelPlans[] = [
  {
    title: '퇴사 기념 혼자 여행',
    address: '부산',
    description: '해운대 야경 같이 보실 분 구해요',
    createdDate: '2024-09-07',
    comment: 6,
    like: 12,
    image: testImg1,
  },
  {
    title: '경기도 즉석 여행',
    address: '파주',
    description: '돛단배 같이 타실 분 2명 구해요',
    createdDate: '2024-09-06',
    comment: 8,
    like: 20,
    image: testImg2,
  },
  {
    title: '나홀로 창원 1박 2일',
    address: '창원',
    description: '맛집 탐방하실 분 구해요',
    createdDate: '2024-09-11',
    comment: 5,
    like: 18,
    image: testImg3,
  },
  {
    title: '나홀로 창원 1박 2일',
    address: '창원',
    description: '맛집 탐방하실 분 구해요',
    createdDate: '2024-09-20',
    comment: 5,
    like: 17,
    image: testImg4,
  },
  {
    title: '나홀로 창원 1박 2일',
    address: '창원',
    description: '맛집 탐방하실 분 구해요',
    createdDate: '2024-09-18',
    comment: 5,
    like: 19,
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
      <div className="mb-5">
        <PersonalSearch onSearch={onSearch} showAllItems={showAllItems} onSortChange={onSortChange} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {filteredArr.length > 0 ? (
          filteredArr.map((plan, index) => (
            <div key={index}>
              <FeedCard
              key={index}
              title={plan.title}
              address={plan.address}
              content={plan.description}
              createdDate={plan.createdDate}
              comment={plan.comment}
              like={plan.like}
              image={plan.image}
             
              />
            </div>
          ))
        ) : (
          <p className="text-center col-span-3">일정이 없습니다.</p>
        )}
      </div>
    </>
  );
};
