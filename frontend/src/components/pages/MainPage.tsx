import { useRecoilState } from 'recoil';
import { UserId as UserIdAtom } from '../../Recoil/atoms/Auth'; 
import { UserInfo } from '../../services/api/UserService';
import { UserInfoType, UserInfoResponseType } from '../../model/MyPageType';
import React, { useEffect, useState } from 'react';
import CarouselMain from '../organisms/Carousel/CarouselMain';
import CardSetMainRec from '../molecules/Card/CardSetMainRec';
import ButtonRefresh from '../atoms/button/ButtonRefresh';
import CardSetLocalRec from '../molecules/Card/CardSetLocalRec';
import CardSetHotPlace from '../molecules/Card/CardSetHotPlace';
import CardSetFestivalRec from '../molecules/Card/CardSetFestivalRec';
import styles from './MainPage.module.css';
import ModalFeedDetail from '../organisms/Modal/ModalFeedDetail';

const MainPage: React.FC = () => {
  const [currentSection, setCurrentSection] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const sections = ['carousel', 'section1', 'section2', 'section3', 'section4'];
  const [page,setPage] = useState(1)
  const [userId, setUserId] = useRecoilState(UserIdAtom);  
  const [myAge,setMyAge] = useState('')
  const [myResidence,setMyResidence] = useState('')
  const [myGender,setMyGender] = useState('')
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // userId 가져오기 및 저장 로직
  useEffect(() => {
    const fetchUserInfo = async () => {
      const res = await UserInfo(); 
      const data: UserInfoResponseType = res.data;
      if (data.success) {
        const info: UserInfoType = data.response;
        if (info.id !== userId) { 
          setUserId(info.id); 
        }
        setMyAge(data.response.age)
        setMyResidence(data.response.residence)
        setMyGender(data.response.gender)
      }
    };
  
    fetchUserInfo();  
  }, [userId]);  
  
  // 스크롤 핸들링 로직
  const handleScroll = (event: WheelEvent) => {
    event.preventDefault();

    if (isScrolling || isModalOpen) return; // 모달이 열려 있으면 스크롤을 처리하지 않음
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
    if (!isModalOpen) {
      window.addEventListener('wheel', handleScroll, { passive: false });
    }

    return () => {
      window.removeEventListener('wheel', handleScroll);
    };
  }, [isScrolling, isModalOpen]); 

  useEffect(() => {
    const targetSection = document.getElementById(sections[currentSection]);
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: 'smooth' });
    }
  }, [currentSection]);
  
  const handleItemClick = (id: number) => {
    setSelectedId(id);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedId(null);
  };
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
          <ButtonRefresh text="다른 장소 추천" onClick={() => {setPage(prevPage => prevPage + 1);}}/>
          <CardSetMainRec page={page}/>
        </div>

        {/* 3번째 섹션 */}
        <div id="section2" className={`${styles.section} ${currentSection === 2 ? styles.visible : styles.hidden} pt-[150px]`}>
          <div className='text-[25px] flex items-center justify-center'>핫플 여행지</div>
          <div className="text-[#878787] flex items-center justify-center">사용자와 비슷한 사람들이 많이 다녀온 여행지를 추천해 드려요.</div>
          <CardSetHotPlace myAge={myAge} myResidence={myResidence} myGender={myGender}  onClick ={handleItemClick}/>
        </div>

        {/* 4번째 섹션 */}
        <div id="section3" className={`${styles.section} ${currentSection === 3 ? styles.visible : styles.hidden} pt-[50px]`}>
          <div className='text-[25px] text-center mt-28'>여행한담의 빅데이터 정보로 분석한 지역별 핫한 여행지와 맛집을 소개합니다.</div>
          <CardSetLocalRec onClick ={handleItemClick} />
        </div>

        {/* 5번째 섹션 */}
        <div id="section4" className={`${styles.section} ${currentSection === 4 ? styles.visible : styles.hidden} relative pt-1`}>
          <div className="text-[25px] ml-3 mt-28 mb-1">지금 뜨는 축제</div>
          <span className="text-[#878787] ml-3 ">핫한 축제를 추천해 드려요</span>
          <CardSetFestivalRec />
        </div>
      </div>
      {isModalOpen && selectedId && (
        <ModalFeedDetail
          selectedId={selectedId}
          closeModal={closeModal} 
        />
      )}
    </>
  );
};

export default MainPage;
