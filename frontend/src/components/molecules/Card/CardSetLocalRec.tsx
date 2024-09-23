import React, { useState } from 'react';
import testImg1 from '../../../assets/statics/test1.jpg';
import testImg2 from '../../../assets/statics/test2.jpg';
import testImg3 from '../../../assets/statics/test3.png';
import testImg4 from '../../../assets/statics/test4.jpg';
import testImg5 from '../../../assets/statics/test5.jpg';

interface TestArr {
  title: string;
  address: string;
  testimg: string;
}

const testArr: TestArr[] = [
  { title: '에스파크', address: '경기도 이천시', testimg: testImg1 },
  { title: '망상해변', address: '강원도 동해시', testimg: testImg2 },
  { title: '기백산 용추계곡', address: '경상남도 밀양시', testimg: testImg3 },
  { title: '연천미라클', address: '경기도 연천군', testimg: testImg4 },
  { title: '뮤직컴플렉스', address: '서울특별시', testimg: testImg5 },
];

const regionsTop = ['전국', '서울', '광주', '대전', '대구', '인천', '부산', '울산', '제주'];
const regionsBottom = ['경기', '충북', '충남', '전북', '전남', '경남', '경북', '강원'];

const CardSetHotPlace: React.FC = () => {
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);

  const handleButtonClick = (region: string) => {
    setSelectedRegion(region);
  };

  const filteredImages = selectedRegion
    ? testArr.filter(item => item.title.includes(selectedRegion))
    : testArr;

  return (
    <div className="flex flex-col items-center p-5">
      <div className="flex flex-wrap justify-center">
        {regionsTop.map(region => (
          <button
            key={region}
            className="m-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 transition"
            onClick={() => handleButtonClick(region)}
          >
            #{region}
          </button>
        ))}
      </div>
      
      <div className="flex flex-wrap justify-center mb-4">
        {regionsBottom.map(region => (
          <button
            key={region}
            className="m-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 transition"
            onClick={() => handleButtonClick(region)}
          >
            #{region}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-5">
        {filteredImages.map((item, index) => (
          <div
            key={index}
            className="relative overflow-hidden transform scale-90 transition-transform duration-300 hover:scale-100"
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
            <div className="absolute top-2 right-2">
              <button className="bg-white rounded-full p-2 shadow-md">
                ❤️
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardSetHotPlace;
