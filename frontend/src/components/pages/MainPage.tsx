import React from 'react';
import CarouselMain from '../organisms/Carousel/CarouselMain';
import CardSetMainRec from '../molecules/Card/CardSetMainRec';
import ButtonRefresh from '../atoms/button/ButtonRefresh';
import CardSetHotPlace from '../molecules/Card/CardSetHotPlace';


const MainPage: React.FC = () => {
    return (
      <>
        <CarouselMain/>
        <div className='mt-20 ml-[100px]'>
          <div className='font-bold text-[25px]'>나만의 맞춤여행지</div>
          <span className='text-[#878787]'>당신의 취향 성향 분석완료! 마음에 쏙 들 여행지를 추천해 드릴께요.</span>
          <ButtonRefresh text='다른장소추천'/>
          <CardSetMainRec/>
          <div className='font-bold text-[25px]'>핫플 여행지</div>
          <span className='text-[#878787]'>사용자와 비슷한 사람들이 많이 다녀온 여행지를 추천해 드려요.</span>
          <CardSetHotPlace/>
        </div>

      </>
    );
  }
  

export default MainPage;
