import React, { useState, useRef, useEffect } from 'react'
import ButtonRefreshIcon from '../atoms/button/ButtonRefreshIcon'
import CardPlanFav from '../molecules/Card/CardPlanFav'
import KaKaoMap_Plan from '../organisms/KaKaoMap_Plan'
import ModalCalendar from '../organisms/Modal/ModalCalender'
import moment from 'moment'
import PlanDailyTab from '../molecules/Tab/PlanDailyTab'
import ScheduleRegister from '../atoms/input/ScheduleRegister'

import Mini_Vector from '../../assets/statics/Mini_Vector.png'
import test1 from '../../assets/statics/test1.jpg'
// import test2 from '../../assets/statics/test2.jpg'
// import test3 from '../../assets/statics/test3.png'
// import test4 from '../../assets/statics/test4.jpg'
// import test5 from '../../assets/statics/test5.jpg'

export const PlanPage: React.FC = () => {
  const [Ismodal, setismodal] = useState(false)
  const [IsHide, setIsHide] = useState(true)
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [datesList, setDatesList] = useState<Date[]>([]) // 날짜 목록 관리
  const [currentDate, setCurrentDate] = useState(1)
  const [searchinTab, setSearchingTab] = useState(true)
  const [scheduleData, setScheduleData] = useState<{ [key: number]: any }>({});

  const handleSearchingTab = () => {
    setSearchingTab(searchinTab => !searchinTab)
    } 
  
  // 모달 열고 닫기
  const handleIsmodal = () => {
    setismodal(Ismodal => !Ismodal)
  }

  // 날짜 선택 후 닫기
  const handleIsHide = (choicedDate: Date) => {
    setIsHide(IsHide => !IsHide)
    setismodal(Ismodal => !Ismodal)
    setSelectedDate(choicedDate)
    setDatesList([choicedDate]) // 첫 번째 날짜 설정
  }

  // 다음 날짜 추가
  const addNextDay = () => {
    if (datesList.length === 0 && selectedDate) {
      setDatesList([selectedDate]) // 첫 번째 날짜가 없으면 선택된 날짜 추가
    } else {
      const lastDate = datesList[datesList.length - 1] // 마지막 날짜 가져오기
      const nextDate = moment(lastDate).add(1, 'days').toDate() // 하루 추가
      setDatesList([...datesList, nextDate]) // 날짜 목록에 추가
    }
  }

  const handleCurrentDate = (currentDate: number) => {
    setCurrentDate(currentDate)
  }

  const handleScheduleChange = (date: number, data: any) => {
    setScheduleData((prevData) => ({
      ...prevData,
      [date]: data, // currentDate 기반으로 데이터 저장
    }));
  };

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;

    const handleWheel = (event: WheelEvent) => {
      if (scrollContainer) {
        // prevent the default vertical scroll behavior
        event.preventDefault();
        // assign the vertical scroll delta to horizontal scroll
        scrollContainer.scrollLeft += event.deltaY;
      }
    };

    if (scrollContainer) {
      // Add wheel event listener
      scrollContainer.addEventListener('wheel', handleWheel, { passive: false });
    }

    return () => {
      if (scrollContainer) {
        // Clean up event listener on component unmount
        scrollContainer.removeEventListener('wheel', handleWheel);
      }
    };
  }, []);

  return (
    <div className='relative top-20 overflow-hidden'>
      {/* 모달 창 */}
      {Ismodal === true && (
        <>
          <div className="w-full h-full bg-black opacity-50 fixed z-10" onClick={handleIsmodal} />
          <div className="absolute z-10 top-1/2 transform -translate-y-1/2 left-1/2 -translate-x-1/2 ">
            <ModalCalendar onClick={handleIsHide} />
          </div>
        </>
      )}

      {IsHide === true ? (
        <div className="flex flex-row items-center justify-center gap-[22px] top-[35px] relative h-[calc(100vh-160px)]">
          <div className="w-full h-full bg-sky-200 relative ml-10">
            <KaKaoMap_Plan isSearch={false}/>
            <div className="absolute right-0 -top-[35px] flex flex-row items-center gap-2">
              <ButtonRefreshIcon />
              <span className="text-[13px]">마지막 업데이트 : X 전</span>
            </div>
          </div>

          <div className="w-[400px] h-full bg-white mr-[50px] rounded-[10px] flex-col flex items-center overflow-y-auto scrollbar-thin">
            <span className="text-[21px] font-semibold mt-[15px]">추천 여행지로 여행 계획하기</span>
            <hr className="w-[60%] border-t-[3px] border-black mt-[10px]" />
            <button className="w-[260px] h-[70px] bg-[#6F7C60] text-white rounded-[10px] mt-[35px] flex-shrink-0" onClick={handleIsmodal}>
              나만의 여행 일정 만들기
            </button>
            <CardPlanFav name="맞춤 여행 추천 1" position="맞춤 여행 위치" />
            <CardPlanFav name="맞춤 여행 추천 1" position="맞춤 여행 위치" />
            <CardPlanFav name="맞춤 여행 추천 1" position="맞춤 여행 위치" />
          </div>
        </div>
      ) : (
        <>
        <div className="flex flex-row justify-center items-center relative divide-x h-[calc(100vh-80px)] overflow-hidden">
          <div className="h-full bg-white flex flex-col min-w-[60px] text-[13px]">
            <div className="flex-grow">
              {datesList.map((date, index) => (
                <PlanDailyTab date={date} index={index} onClick={handleCurrentDate} currentDate={currentDate} />
              ))}
              {datesList.length < 5 && (
                <div className="h-[60px] flex justify-center items-center">
                  <button className="rounded-full bg-[#665F59] text-white w-[40px] h-[40px] text-[25px] flex justify-center items-center text-center" onClick={addNextDay}>
                    +
                  </button>
                </div>
              )}
            </div>
            <div className="h-[60px] w-full flex justify-center items-center flex-col cursor-pointer bg-[#665F59] text-white">저장</div>
          </div>
          {currentDate && (
              <ScheduleRegister
                currentDate={currentDate}
                data={scheduleData[currentDate] || {}} // 숫자에 맞는 데이터 전달
                onScheduleChange={handleScheduleChange}
              />
            )}
          

          <div className="w-full h-full z-0">
            <KaKaoMap_Plan isSearch={true}/>
          </div>
        </div>
        <div className="relative z-10">
          <div className={`transition-transform duration-300 ${searchinTab ? 'translate-y-0' : 'translate-y-[350px]'}`}>
            <div 
              id='folding'
              className='w-[23px] h-[45px] bg-white flex justify-center items-center rounded-r-lg absolute z-50 border cursor-pointer -rotate-90 bottom-[338px] left-1/2'
              onClick={handleSearchingTab}
            >
              <img src={Mini_Vector} className={`${searchinTab ? '' : 'transform scale-x-[-1]'}`}/>
            </div>

            <div 
              ref={scrollContainerRef} 
              className='w-full h-[350px] bg-[#E5E2D9] absolute bottom-0 z-40 bg-opacity-80 flex justify-start items-center overflow-x-auto overflow-y-visible'
            >
              <div className="min-w-[300px] w-[300px] h-[300px] flex justify-center items-center overflow-hidden m-5">
                <img src={test1} className="w-full h-full object-cover"/>
              </div>
              <div className="min-w-[300px] w-[300px] h-[300px] flex justify-center items-center overflow-hidden m-5">
                <img src={test1} className="w-full h-full object-cover"/>
              </div>
              <div className="min-w-[300px] w-[300px] h-[300px] flex justify-center items-center overflow-hidden m-5">
                <img src={test1} className="w-full h-full object-cover"/>
              </div>
              <div className="min-w-[300px] w-[300px] h-[300px] flex justify-center items-center overflow-hidden m-5">
                <img src={test1} className="w-full h-full object-cover"/>
              </div>
              <div className="min-w-[300px] w-[300px] h-[300px] flex justify-center items-center overflow-hidden m-5">
                <img src={test1} className="w-full h-full object-cover"/>
              </div>
            </div>
          </div>
        </div>
        </>
      )}
    </div>
  )
}