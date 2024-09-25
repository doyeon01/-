import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // 기본 react-calendar 스타일
import './ModalCalender.css'; // 커스텀 CSS 파일
import moment from 'moment';
import { ButtonPersonalInfo } from '../../atoms/button/ButtonPersonalInfo';

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

interface Props {
  onClick?: (choicedDate: Date) => void;
}

const ModalCalendar: React.FC<Props> = ({onClick}) => {
  const today = new Date();
  const [date, setDate] = useState<Value>(today);
  const [startDate, setStartDate] = useState<Date | null>(new Date());

  const handleDateChange = (newDate: Value) => {
    setDate(newDate);
  };

  const handleConfirmClick = () => {
    if (onClick) {
      if (date instanceof Date) {
        // date가 단일 Date 객체일 경우 그대로 전달
        onClick(date);
      } else if (Array.isArray(date) && date[0] instanceof Date) {
        // date가 배열일 경우 첫 번째 Date 객체 전달
        onClick(date[0]);
      }
  };}

  return (
    <>
      <div data-label="배경" className='bg-[#F4F4EE] w-[600px] h-[548px] flex justify-center items-center flex-col rounded-[15px] border border-black'>
        <span className='text-[35px] mb-[35px]'>
          여행가실 날짜를 선택해주세요
        </span>
        <Calendar
          value={date}
          onChange={handleDateChange}
          formatDay={(locale, date) => moment(date).format('D')}
          formatYear={(locale, date) => moment(date).format('YYYY')}
          formatMonthYear={(locale, date) => moment(date).format('YYYY. MM')}
          calendarType="gregory"
          showNeighboringMonth={false}
          next2Label={null}
          prev2Label={null}
          minDetail="month"
          activeStartDate={startDate === null ? undefined : startDate}
          onActiveStartDateChange={({ activeStartDate }) =>
            setStartDate(activeStartDate)
          }
        />
        <ButtonPersonalInfo label='확인' className='mt-[20px]' onClick={handleConfirmClick}/>
        </div>
    </>
  );
};

export default ModalCalendar;
