import React from 'react';
import CarouselMain from '../organisms/Carousel/CarouselMain';
import CardSetMainRec from '../molecules/Card/CardSetMainRec';
import ButtonRefresh from '../atoms/button/ButtonRefresh';


const MainPage: React.FC = () => {
    return (
      <>
        <CarouselMain/>
        <div className='mt-20 ml-[100px]'>
          <div className='font-bold text-[25px]'>나만의 맞춤여행지</div>
          <span className='text-[#878787]'>당신의 취향 성향 분석완료! 마음에 쏙 들 여행지를 추천해 드릴께요.</span>
          <ButtonRefresh text='다른장소추천'/>
          <CardSetMainRec/>
        </div>

      </>
    );
  }
  

export default MainPage;
