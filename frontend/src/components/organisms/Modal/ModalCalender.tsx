import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // 기본 react-calendar 스타일
import './ModalCalender.css'; // 커스텀 CSS 파일
// import moment from 'moment';

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

const ModalCalendar: React.FC = () => {
  const today = new Date();
  const [date, setDate] = useState<Value>(today);
  const [startDate, setStartDate] = useState<Date | null>(new Date());

  const handleDateChange = (newDate: Value) => {
    setDate(newDate);
  };

  // const handleTodayClick = () => {
  //   setStartDate(today); // 오늘 날짜로 돌아가는 버튼 동작
  // };

  return (
    <>
      <div data-label="배경" className='bg-[#F4F4EE] w-[500px] h-[500px] flex justify-center items-center flex-col rounded-[15px] border border-black'>
        <span className='text-[40px]'>
          여행가실 날짜를 골라주세요
        </span>
        <Calendar
          value={date}
          onChange={handleDateChange}
          // formatDay={(locale, date) => moment(date).format('D')}
          // formatYear={(locale, date) => moment(date).format('YYYY')}
          // formatMonthYear={(locale, date) => moment(date).format('YYYY. MM')}
          calendarType="gregory"
          showNeighboringMonth={false}
          next2Label={null}
          prev2Label={null}
          minDetail="month"
          activeStartDate={startDate === null ? undefined : startDate}
          onActiveStartDateChange={({ activeStartDate }) =>
            setStartDate(activeStartDate)
          }
          tileContent={({ date, view }) => {
            const html = [];
            // 오늘 날짜에 "오늘" 텍스트 삽입
            if (
              view === 'month' &&
              date.getMonth() === today.getMonth() &&
              date.getDate() === today.getDate()
            ) {
              html.push(
                <div className="today-text" key="today">
                  오늘
                </div>
              );
            }

            return <>{html}</>;
          }}
        />
        {/* 오늘 버튼 */}
        {/* <div className="today-button" onClick={handleTodayClick}>
          오늘
        </div> */}
        </div>
    </>
  );
};

export default ModalCalendar;
