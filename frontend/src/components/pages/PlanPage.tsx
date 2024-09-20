import React from 'react'
import ButtonRefreshIcon from '../atoms/button/ButtonRefreshIcon'
import CardPlanFav from '../molecules/Card/CardPlanFav'

export const PlanPage:React.FC = () => {
  return (
  <>
  <div className='flex flex-row items-center justify-center gap-[22px] top-[150px] relative'>
    <div //지도 컴포넌트
    className='w-full h-[500px] bg-sky-200 relative ml-10'>
      <div //새로고침 컴포넌트
      className='absolute right-0 -top-[35px] flex flex-row items-center gap-2'>
        <ButtonRefreshIcon/>
        <span className='text-[13px]'>
          마지막 업데이트 : X 전
        </span>
      </div>
    </div>

    <div //우측 컴포넌트 (추천 여행지로 계획하기)
    className='w-[400px] max-h-[500px] h-[500px] bg-white mr-[50px] rounded-[10px] flex-col flex items-center overflow-y-auto'>
      <span className='text-[21px] font-semibold mt-[15px]'>추천 여행지로 여행 계획하기</span>
      <hr className='w-[60%] border-t-[3px] border-black mt-[10px]'/>
      <button className='w-[260px] h-[70px] bg-[#6F7C60] text-white rounded-[10px] mt-[35px] flex-shrink-0'>
        나만의 여행 일정 만들기
      </button>
      <CardPlanFav name="맞춤 여행 추천 1" position="맞춤 여행 위치"/>
      <CardPlanFav name="맞춤 여행 추천 1" position="맞춤 여행 위치"/>
      <CardPlanFav name="맞춤 여행 추천 1" position="맞춤 여행 위치"/>
    </div>
  </div>
  </>  
  )
}
