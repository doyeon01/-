import React from 'react';
import CarouselMain from '../organisms/Carousel/CarouselMain';
import CardSetMainRec from '../molecules/Card/CardSetMainRec';
import ButtonRefresh from '../atoms/button/ButtonRefresh';
import CardSetLocalRec from '../molecules/Card/CardSetLocalRec';
import CardSetHotPlace from '../molecules/Card/CardSetHotPlace';
import CardSetFestivalRec from '../molecules/Card/CardSetFestivalRec';

const MainPage: React.FC = () => {
  return (
    <>
      <CarouselMain/>
      <div className='mt-20 mx-auto max-w-[1200px] px-4 '> 
        <div className='relative'>
          <div className='font-bold text-[25px] flex items-center justify-center'>나만의 맞춤여행지</div>
          <span className='text-[#878787] flex items-center justify-center mb-5'>당신의 취향 성향 분석완료! 마음에 쏙 들 여행지를 추천해 드릴께요.</span>
          <ButtonRefresh text='다른 장소 추천'/>
          <CardSetMainRec/>
        </div>
        
        <div className='font-bold text-[25px] flex items-center justify-center mt-10'>핫플 여행지</div>
        <span className='text-[#878787] flex items-center justify-center'>사용자와 비슷한 사람들이 많이 다녀온 여행지를 추천해 드려요.</span>
        <CardSetHotPlace/>
        
        <div className='font-bold text-[25px] text-center mt-3'>여행한담의 빅데이터 정보로 분석한 지역별 핫한 여행지와 맛집을 소개합니다.</div>
        <CardSetLocalRec/>

        <div className='relative'>
          <div className='font-bold text-[25px] flex items-center justify-center'>지금 뜨는 축제</div>
          <span className='text-[#878787] flex items-center justify-center mb-4'>핫한 축제를 추천해 드려요</span>
          <CardSetFestivalRec/>
        </div>
      </div>
    </>
  );
}

export default MainPage;
