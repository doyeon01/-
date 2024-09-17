import React, { useState } from 'react';
import classNames from 'classnames';
import testImg1 from '../../../assets/statics/test1.jpg';
import testImg2 from '../../../assets/statics/test2.jpg';
import testImg3 from '../../../assets/statics/test3.png';
import testImg4 from '../../../assets/statics/test4.jpg';
import testImg5 from '../../../assets/statics/test5.jpg';

interface TestArr {
  title: string;
  address: string;
  testimg: string;
  category: string; 
}

const testArr: TestArr[] = [
  { title: '에스파크', address: '경기도 이천시', testimg: testImg1, category: '부산' },
  { title: '망상해변', address: '강원도 동해시', testimg: testImg2, category: '20대' },
  { title: '기백산 용추계곡', address: '경상남도 밀양시', testimg: testImg3, category: '남자' },
  { title: '연천미라클', address: '경기도 연천군', testimg: testImg4, category: '부산' },
  { title: '뮤직컴플렉스', address: '서울특별시', testimg: testImg5, category: '20대' },
];

const CardSetHotPlace: React.FC = () => {
  const [category, setCategory] = useState<string>('부산');

  const filteredArr = testArr.filter(item => item.category === category);

  return (
    <div className="p-4">
      <div className="flex justify-center space-x-4 mb-4">
        {['부산', '20대', '남자'].map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={classNames(
              'px-4 py-2 rounded border-b-2 transition-all',
              {
                'text-black border-black': category === cat, 
                'text-gray-500 border-transparent': category !== cat, 
              }
            )}
          >
            {cat === '부산' ? '부산에서 뜨는' : cat === '20대' ? '20대가 좋아하는' : '남자가 좋아하는'}
          </button>
        ))}
      </div>

      <div className="relative">
        <div className="carousel-wrapper overflow-hidden">
          <div className="flex">
            {filteredArr.map((item, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-full sm:w-1/2 lg:w-1/4 p-2"
              >
                <div className="relative bg-gray-100 rounded-lg overflow-hidden shadow-md">
                  <img
                    src={item.testimg}
                    alt={item.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black to-transparent p-4 text-white">
                    <h3 className="text-lg font-bold">{item.title}</h3>
                    <p className="text-sm">{item.address}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <button
          className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-gray-700 text-white p-2 rounded-full shadow-md"
          onClick={() => {
            const scrollContainer = document.querySelector('.carousel-wrapper') as HTMLElement;
            scrollContainer.scrollLeft -= scrollContainer.offsetWidth / 2;
          }}
        >
          ‹
        </button>
        <button
          className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-gray-700 text-white p-2 rounded-full shadow-md"
          onClick={() => {
            const scrollContainer = document.querySelector('.carousel-wrapper') as HTMLElement;
            scrollContainer.scrollLeft += scrollContainer.offsetWidth / 2;
          }}
        >
          ›
        </button>
      </div>
    </div>
  );
};

export default CardSetHotPlace;
