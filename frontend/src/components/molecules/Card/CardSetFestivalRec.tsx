import React from 'react';
import testImg1 from '../../../assets/statics/test1.jpg';
import testImg2 from '../../../assets/statics/test2.jpg';
import testImg3 from '../../../assets/statics/test3.png';
import testImg4 from '../../../assets/statics/test4.jpg';
import testImg5 from '../../../assets/statics/test5.jpg';
import CardSetMainRec from './CardSetMainRec';
import ButtonRefresh from '../../atoms/button/ButtonRefresh';

const festivals = [
  {
    title: '경북궁 별빛야행',
    date: '2024.09.11 ~ 2024.10.06',
    location: '서울 종로구',
    image: testImg1,
  },
  {
    title: '부산 해운대 불꽃축제',
    date: '2024.10.01',
    location: '부산 해운대구',
    image: testImg2,
  },
  {
    title: '제주 유채꽃 축제',
    date: '2024.03.01 ~ 2024.04.30',
    location: '제주 서귀포시',
    image: testImg3,
  },
  {
    title: '서울 세계 불꽃놀이',
    date: '2024.09.30',
    location: '서울 여의도',
    image: testImg4,
  },
  {
    title: '인천 송도 불꽃축제',
    date: '2024.08.15',
    location: '인천 송도',
    image: testImg5,
  },
];

const FestivalCard: React.FC<{ festival: typeof festivals[0] }> = ({ festival }) => (
  <div className="max-w-sm rounded overflow-hidden shadow-lg">
    <img
      className="w-full h-48 object-cover"
      src={festival.image}
      alt={festival.title}
    />
    <div className="px-6 py-4">
      <div className="font-bold text-xl mb-2">{festival.title}</div>
      <p className="text-gray-700 text-base">{festival.date}</p>
      <p className="text-gray-700 text-base">{festival.location}</p>
    </div>
  </div>
);

const CardSetFestivalRec: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-wrap -mx-2 mb-4">
        <CardSetMainRec />
      </div>
      <div className="flex justify-between mb-4">
        <input type="date" className="border rounded p-2" />
        <input type="text" placeholder="지역" className="border rounded p-2 ml-2" />
        <ButtonRefresh text="다른장소추천" />
      </div>
      <h2 className="text-2xl font-bold mb-4">다른 축제 추천</h2>
      <div className="flex flex-wrap -mx-2">
        {festivals.map((festival, index) => (
          <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/5 px-2 mb-4" key={index}>
            <FestivalCard festival={festival} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardSetFestivalRec;
