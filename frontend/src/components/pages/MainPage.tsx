import React, { useEffect, useState } from 'react';
import CarouselMain from '../organisms/Carousel/CarouselMain';
import CardSetMainRec from '../molecules/Card/CardSetMainRec';
import ButtonRefresh from '../atoms/button/ButtonRefresh';
import CardSetLocalRec from '../molecules/Card/CardSetLocalRec';
import CardSetHotPlace from '../molecules/Card/CardSetHotPlace';
import CardSetFestivalRec from '../molecules/Card/CardSetFestivalRec';
import styles from './MainPage.module.css';

const MainPage: React.FC = () => {
  const [currentSection, setCurrentSection] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const sections = ['carousel', 'section1', 'section2', 'section3', 'section4'];


  const handleScroll = (event: WheelEvent) => {
    
      event.preventDefault();

    if (isScrolling) return; 
    setIsScrolling(true); 
    if (event.deltaY > 0) {
      setCurrentSection(prev => Math.min(prev + 1, sections.length - 1)); 
    } else if (event.deltaY < 0) {
      setCurrentSection(prev => Math.max(prev - 1, 0)); 
    }

    setTimeout(() => {
      setIsScrolling(false); 
    }, 500); 
  };


  useEffect(() => {
    window.addEventListener('wheel', handleScroll, { passive: false });
    return () => {
      window.removeEventListener('wheel', handleScroll);
    };
  }, [isScrolling]);


  useEffect(() => {
    const targetSection = document.getElementById(sections[currentSection]);
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: 'smooth' });
    }
  }, [currentSection]);

  return (
    <>
      {/* 1번째 섹션 */}
      <div id="carousel" className={`${styles.section} ${currentSection === 0 ? styles.visible : styles.hidden}`}>
        <CarouselMain />
      </div>
      <div className=' mt-20 mx-auto max-w-[1200px] px-4'>

        {/* 2번째 섹션 */}
        <div id="section1" className={`${styles.section} ${currentSection === 1 ? styles.visible : styles.hidden} relative mt-28 pt-[180px]`}>
          <div className="text-[25px] ml-2">나만의 맞춤여행지</div>
          <span className="text-[#878787] ml-2">당신의 취향 성향 분석완료! 마음에 쏙 들 여행지를 추천해 드릴께요.</span>
          <ButtonRefresh text="다른 장소 추천" />
          <CardSetMainRec />
        </div>

        {/* 3번째 섹션 */}
        <div id="section2" className={`${styles.section} ${currentSection === 2 ? styles.visible : styles.hidden} pt-[150px]`}>
          <div  className='text-[25px] flex items-center justify-center'>핫플 여행지</div>
          <div className="text-[#878787] flex items-center justify-center">사용자와 비슷한 사람들이 많이 다녀온 여행지를 추천해 드려요.</div>
          <CardSetHotPlace />
        </div>

        {/* 4번째 섹션 */}
        <div id="section3" className={`${styles.section} ${currentSection === 3 ? styles.visible : styles.hidden} pt-[50px]`}>
          <div className='text-[25px] text-center mt-28'>여행한담의 빅데이터 정보로 분석한 지역별 핫한 여행지와 맛집을 소개합니다.</div>
          <CardSetLocalRec />
        </div>

        {/* 5번째 섹션 */}
        <div id="section4" className={`${styles.section} ${currentSection === 4 ? styles.visible : styles.hidden} relative pt-1`}>
          <div className="text-[25px] ml-3 mt-28 mb-1">지금 뜨는 축제</div>
          <span className="text-[#878787] ml-3 ">핫한 축제를 추천해 드려요</span>
          <CardSetFestivalRec />
        </div>
      </div>
    </>
  );
};

export default MainPage;
