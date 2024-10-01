import React from 'react';
import testImg1 from './../../../assets/statics/test1.jpg';
import testImg2 from './../../../assets/statics/test2.jpg';
import testImg3 from './../../../assets/statics/test3.png';
import testImg4 from './../../../assets/statics/test4.jpg';
import testImg5 from './../../../assets/statics/test5.jpg';
import PersonalSearch from '../../atoms/input/PersonalSearch';
import { useSearchAndSort } from '../../../hooks/useSearchAndSort';
import { PhotoCard } from './PhtotCard';

interface TestArr {
  title: string;
  address: string;
  testimg: string;
  createdDate: string;
}

const testArr: TestArr[] = [
  { title: '퇴사 기념 혼여', address: '경기도 이천시', testimg: testImg1, createdDate: '2024-09-18' },
  { title: '대학교 졸업여행 ', address: '강원도 동해시', testimg: testImg2, createdDate: '2024-09-18' },
  { title: '낯선 도시 탐험해보기', address: '경상남도 밀양시', testimg: testImg3, createdDate: '2024-09-14' },
  { title: '오랫만에 여행!', address: '경기도 연천군', testimg: testImg4, createdDate: '2024-09-13' },
  { title: '문화생활 여행', address: '서울특별시', testimg: testImg5, createdDate: '2024-09-20' },
];

export const PersonalPlanDetail: React.FC = () => {
  const { filteredArr, onSearch, onSortChange, showAllItems } = useSearchAndSort<TestArr>(
    testArr,
    ['title', 'address'], // 검색에 사용할 필드
    'createdDate'         // 정렬에 사용할 날짜 필드
  );

  return (
    <>
      <div className="mb-5">
        <PersonalSearch 
          onSearch={onSearch} 
          showAllItems={showAllItems} 
          onSortChange={onSortChange} 
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {filteredArr.length > 0 ? (
          filteredArr.map((item, index) => (
            <PhotoCard
              key={index}
              title={item.title}
              address={item.address}
              testimg={item.testimg}
              showButton={true}  
            />
          ))
        ) : (
          <p className="text-center col-span-3">일정이 없습니다.</p>
        )}
      </div>
    </>
  );
};
