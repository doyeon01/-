import React, { useState } from 'react'
import ButtonRefreshIcon from '../atoms/button/ButtonRefreshIcon'
import CardPlanFav from '../molecules/Card/CardPlanFav'
import KaKaoMap_Plan from '../organisms/KaKaoMap_Plan'
import ModalCalendar from '../organisms/Modal/ModalCalender'
import moment from 'moment'
import PlanDailyTab from '../molecules/Tab/PlanDailyTab'

import MapMarker from '../../assets/statics/MapMarker.png'
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

  const handleCurrentDate = (currentDate:number)=>{
    setCurrentDate(currentDate)
  }

  return (
    <div className='mt-20'>
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
        <div className="flex flex-row items-center justify-center gap-[22px] top-[35px] relative max-h-[calc(100vh-80px)] h-[calc(100vh-150px)]">
          <div
            className="w-full h-full bg-sky-200 relative ml-10">
            <KaKaoMap_Plan />
            <div
              className="absolute right-0 -top-[35px] flex flex-row items-center gap-2">
              <ButtonRefreshIcon />
              <span className="text-[13px]">마지막 업데이트 : X 전</span>
            </div>
          </div>

          <div
            className="w-[400px] h-full bg-white mr-[50px] rounded-[10px] flex-col flex items-center overflow-y-auto scrollbar-thin">
            <span className="text-[21px] font-semibold mt-[15px]">추천 여행지로 여행 계획하기</span>
            <hr className="w-[60%] border-t-[3px] border-black mt-[10px]" />
            <button
              className="w-[260px] h-[70px] bg-[#6F7C60] text-white rounded-[10px] mt-[35px] flex-shrink-0"
              onClick={handleIsmodal}>
              나만의 여행 일정 만들기
            </button>
            <CardPlanFav name="맞춤 여행 추천 1" position="맞춤 여행 위치" />
            <CardPlanFav name="맞춤 여행 추천 1" position="맞춤 여행 위치" />
            <CardPlanFav name="맞춤 여행 추천 1" position="맞춤 여행 위치" />
          </div>
        </div>
      ) : (
        <>
          <div className="flex flex-row justify-center items-center relative divide-x max-h-[calc(100vh-80px)] h-[calc(100vh-80px)] overflow-hidden">
            <div className="h-full bg-white flex flex-col min-w-[60px] text-[13px]">
              <div className='flex-grow'>
              {datesList.map((date, index) => (
                <PlanDailyTab date={date} index={index} onClick={handleCurrentDate} currentDate={currentDate}/>
              ))}
              {datesList.length < 5 && <div className="h-[60px] flex justify-center items-center">
                <button
                  className="rounded-full bg-[#665F59] text-white w-[40px] h-[40px] text-[25px] flex justify-center items-center text-center"
                  onClick={addNextDay}>
                  +
                </button>
              </div>}
              </div>
              <div className='h-[60px] w-full flex justify-center items-center flex-col cursor-pointer bg-[#665F59] text-white'>
                저장
              </div>
            </div>

            <div className="h-full bg-white overflow-y-auto scrollbar-thin min-w-[390px] divide-y overflow-hidden">
              <div className="w-[390px] h-[150px] flex min-h-[150px] justify-around  items-center">
                <div className="flex flex-col justify-start text-[13px] gap-4">
                  <span>관광명소 | 무등산</span>
                  <textarea placeholder="내용추가" className="h-[60px] whitespace-pre-wrap w-[200px] overflow-hidden resize-none" />
                  <div className="flex justify-start items-center gap-1 text-[#645E59]">
                    <img src={MapMarker} className="scale-75" />
                    광주 광역시 동구 증심사길 177
                  </div>
                </div>
                <img src={test1} className="w-[110px] h-[110px] rounded-[13px]" />
              </div>

              {/* 나머지 여행지 정보들 */}
              {/* 추가된 카드 컴포넌트들 */}
            </div>

            <div className="w-full h-full">
              <KaKaoMap_Plan />
            </div>
          </div>
        </>
      )}
    </div>
  )
}
