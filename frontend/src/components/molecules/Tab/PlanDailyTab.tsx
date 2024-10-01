import React from 'react'
import moment from 'moment'

interface Props {
  date: Date
  index: number
  onClick?: (currentDate: number) => void
  currentDate: number // 현재 선택된 일차
}

const PlanDailyTab: React.FC<Props> = ({ date, index, onClick, currentDate }) => {
  // 클릭 시 onClick 함수 호출
  const handleClick = () => {
    if (onClick) {
      onClick(index + 1) // index를 1부터 시작하도록 전달
    }
  }

  // 조건에 따라 배경색 결정
  const isCurrent = currentDate - 1 === index;
  const backgroundColor = isCurrent ? 'bg-[#B6AFA9] text-white' : 'bg-white text-black';

  return (
    <div
      key={index}
      className={`h-[60px] w-full flex justify-center items-center flex-col cursor-pointer ${backgroundColor}`} // 조건에 따른 배경색
      onClick={handleClick} // 함수로 감싸서 클릭 시 실행
    >
      <span>{index + 1} 일차</span>
      <span>{moment(date).format('MM/DD')}</span>
    </div>
  )
}

export default PlanDailyTab
