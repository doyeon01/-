import React, { useState } from 'react';
import testImg1 from './../../../assets/statics/test1.jpg';
import testImg2 from './../../../assets/statics/test2.jpg';
import testImg3 from './../../../assets/statics/test3.png';
import testImg4 from './../../../assets/statics/test4.jpg';
import testImg5 from './../../../assets/statics/test5.jpg';
import PersonalSearch from '../../atoms/input/PersonalSearch';
import { SearchIcon } from '../../../assets/icons/svg';

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
  // 검색 창 표시 여부를 제어하는 상태 선언
  const [showSearch, setShowSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState(''); // 검색어 상태 관리

  // 아이콘 클릭 시 검색 창을 토글하는 함수
  const handleSearchIconClick = () => {
    setShowSearch(!showSearch);
  };

  // 검색어를 기준으로 필터링된 리스트
  const filteredArr = testArr.filter(
    (item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // 검색어가 없다면 일정이 없다고 표시해줘야 함
  // 다른 탭으로 넘어갔을 때 검색 창 보여주는 상태 false
  // 또한 검색 창에 적은 내용도 날아가야 함
  // 그리고 뒤로 가기 버튼을 토글해서 전체내용을 볼 수 있게 만들기
  
  return (
    <>
      <div className="flex justify-end items-center">
        {showSearch && (
          <div className="mr-2">
            {/* PersonalSearch에 검색어 전달 함수 연결 */}
            <PersonalSearch onSearch={(term) => setSearchTerm(term)} />
          </div>
        )}
        <span onClick={handleSearchIconClick} className="cursor-pointer">
          <SearchIcon />
        </span>
      </div>

      <div className="grid grid-cols-3 gap-1 pt-5">
        {filteredArr.map((item, index) => (
          <div
            key={index}
            className="relative overflow-hidden rounded-[10px] transform scale-90 transition-transform duration-300 hover:scale-100"
          >
            <img
              src={item.testimg}
              alt={item.title}
              className="w-full h-72 object-cover"
            />
            <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black to-transparent text-white">
              <h3 className="text-lg font-bold">{item.title}</h3>
              <p className="text-sm">{item.address}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
