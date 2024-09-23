import React, { useEffect, useState } from 'react';
import testImg1 from '../../../assets/statics/test1.jpg';
import testImg2 from '../../../assets/statics/test2.jpg';
import testImg3 from '../../../assets/statics/test3.png';
import testImg4 from '../../../assets/statics/test4.jpg';
import testImg5 from '../../../assets/statics/test5.jpg';
import CardSetMainRec from './CardSetMainRec';
import ButtonRefresh from '../../atoms/button/ButtonRefresh';
import { useRecoilValueLoadable } from 'recoil';
import { festivalDataState } from '../../../Recoil/atoms/api';

const FestivalCard: React.FC<{ festival: any }> = ({ festival }) => (
  <div className="max-w-sm rounded overflow-hidden shadow-lg">
    <img
      className="w-full h-48 object-cover"
      src={festival.firstimage || testImg1} // 기본 이미지 설정
      alt={festival.title}
    />
    <div className="px-6 py-4">
      <div className="font-bold text-xl mb-2">{festival.title}</div>
      <p className="text-gray-700 text-base">{festival.eventstartdate} ~ {festival.eventenddate}</p>
      <p className="text-gray-700 text-base">{festival.addr1}</p>
    </div>
  </div>
);

const CardSetFestivalRec: React.FC = () => {
  const festivalDataLoadable = useRecoilValueLoadable(festivalDataState);
  const [festivals, setFestivals] = useState<any[]>([]); // 상태로 데이터 저장

  useEffect(() => {
    if (festivalDataLoadable.state === 'hasValue') {
      setFestivals(festivalDataLoadable.contents);
    } else if (festivalDataLoadable.state === 'hasError') {
      console.error('Error loading festival data:', festivalDataLoadable.contents);
    }
  }, [festivalDataLoadable]);

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
