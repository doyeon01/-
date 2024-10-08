import React, { useState, useEffect } from 'react';
import MapMarker from '../../../assets/statics/MapMarker.png';
import test1 from '../../../assets/statics/Duli.png';
import DrageAndDrop from '../../../assets/statics/DragAndDropIcon.png'

interface Props {
  currentDate: number;
  index: number;
}

const ScheduleRegister: React.FC<Props> = ({ currentDate, index }) => {
  const [schedule, setSchedule] = useState<any[]>([]); // 입력 값 상태로 관리
  const [draggedItemIndex, setDraggedItemIndex] = useState<number | null>(null); // 드래그된 항목의 인덱스 저장
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null); // 드래그 오버된 항목 인덱스
  const [isDragging, setIsDragging] = useState(false); // 드래그 오버 상태 관리

  // Dropping 데이터를 schedule에 추가
  const handleDropData = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();

    // 드롭된 데이터 가져오기
    const data = e.dataTransfer.getData('place');

    // JSON 파싱 전에 데이터가 유효한지 확인
    if (data) {
      try {
        const parsedData = JSON.parse(data); // JSON 파싱
        setSchedule((prevSchedule) => [...prevSchedule, { ...parsedData, notes: '' }]); // 데이터 추가
      } catch (error) {
        console.error('JSON parsing error:', error); // JSON 파싱 오류 처리
      }
    } else {
      // console.error('No data found in drop event'); // 드롭된 데이터가 없을 때 처리
    }
    setIsDragging(false);
    setHoveredIndex(null)
  };

  const handleDragStart = (index: number) => {
    setDraggedItemIndex(index); // 드래그 시작 시 인덱스 저장
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>, index: number) => {
    e.preventDefault();
    setHoveredIndex(index); // 드래그 오버 중인 인덱스를 저장
  };

  const handleDragLeave = () => {
    setHoveredIndex(null); // 드래그 오버 해제 시 초기화
    setIsDragging(false)
  };

  const handleDropOrder = () => {
    if (draggedItemIndex === null || hoveredIndex === null) return;

    const updatedSchedule = [...schedule];
    const [draggedItem] = updatedSchedule.splice(draggedItemIndex, 1); // 드래그된 항목 삭제
    updatedSchedule.splice(hoveredIndex, 0, draggedItem); // 새로운 위치에 삽입

    setSchedule(updatedSchedule); // 최종 배열 업데이트
    setDraggedItemIndex(null); // 드래그 완료 후 초기화
    setHoveredIndex(null); // 드래그 오버 상태 초기화
  };

  // schedule이 변경될 때마다 localStorage에 저장
  useEffect(() => {
    if (schedule.length > 0) { // 빈 배열을 저장하지 않음
      localStorage.setItem(`schedule_${currentDate}`, JSON.stringify(schedule));
    }
  }, [schedule, currentDate]);

  // currentDate가 변경될 때 해당 날짜의 저장된 값을 불러오는 useEffect
  useEffect(() => {
    const storedSchedule = localStorage.getItem(`schedule_${currentDate}`);
    if (storedSchedule && storedSchedule !== '[]') {
      const userResponse = confirm('저장된 데이터를 불러오시겠습니까?');
      if (userResponse) {
        setSchedule(JSON.parse(storedSchedule)); // 저장된 값이 있으면 로드
      } else {
        setSchedule([]);
        localStorage.removeItem(`schedule_${currentDate}`)
      }
    } else {
      setSchedule([]); // 저장된 값이 없으면 빈 배열로 초기화
    }
  }, [currentDate]);

  // TextArea 변경 시 schedule 상태 업데이트
  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>, index: number) => {
    const newSchedule = [...schedule];
    newSchedule[index].notes = e.target.value; // notes 필드를 업데이트
    setSchedule(newSchedule); // 상태 업데이트
  };

  // 드래그 중일 때 미리보기를 제공하는 함수
  const getTemporarySchedule = () => {
    if (draggedItemIndex === null || hoveredIndex === null) return schedule;

    const tempSchedule = [...schedule];
    const [draggedItem] = tempSchedule.splice(draggedItemIndex, 1); // 드래그된 항목 제거
    tempSchedule.splice(hoveredIndex, 0, draggedItem); // 드래그 오버 중인 위치에 삽입

    return tempSchedule;
  };

  return (
    <div key={index} className='relative h-full w-full'
        onDrop={handleDropData} // 기존 데이터 추가를 위한 드롭 이벤트
        onDragOver={(e) => {e.preventDefault()
          setIsDragging(true);}} // 드롭을 허용
        onDragLeave={handleDragLeave}
        >
      <div className={`w-full h-full absolute -z-10 justify-center items-center flex flex-col gap-6 ${isDragging ? 'bg-gray-200': ''}`}>
        {schedule.length === 0 && 
        <>
        <img src={DrageAndDrop} alt="" className='size-16'/>
        일정을 끌어 옮겨주세요
        </>}
        

      </div>
      <div
        id='container'
        className="w-[390px] h-full flex flex-col min-h-[150px] justify-start items-center divide-y"
        // onDrop={handleDropData} // 기존 데이터 추가를 위한 드롭 이벤트
        // onDragOver={(e) => e.preventDefault()} // 드롭을 허용
      >
        {getTemporarySchedule().map((item, indexx) => (
          <div id='elem'
            className={`flex justify-between w-full p-3 ${
              hoveredIndex === indexx ? 'box-border bg-gray-200' : 'bg-white'
            }` } // 드래그 오버 시 스타일 적용
            key={indexx}
            draggable
            onDragStart={() => handleDragStart(indexx)} // 드래그 시작
            onDragOver={(e) => handleDragOver(e, indexx)} // 드래그 오버
            onDragLeave={handleDragLeave} // 드래그 오버 해제
            onDrop={handleDropOrder} // 순서 변경 드롭 이벤트
          >
            <div className="flex flex-col justify-start text-[13px] gap-4">
              <span>
                {(() => {
                  if (item) {
                    let category = item.category_group_name || item.placeType;
                    let placeName = item.place_name || item.placeName;

                    if (category === 'TOURIST_ATTRACTION' || category === '관광명소' || category === '문화시설') {
                      category = '관광명소';
                    } else if (category === 'ACCOMMODATION' || category === '숙박') {
                      category = '숙박';
                    } else if (category === 'CAFE' || category === '카페') {
                      category = '카페';
                    } else if (category === 'RESTAURANT' || category === '음식점') {
                      category = '음식점';
                    } else {
                      category = '기타';
                    }

                    return (
                      <>
                        {category} | {placeName}
                      </>
                    );
                  } else {
                    return <>여기에 드롭</>;
                  }
                })()}
              </span>
              <textarea
                value={item.notes} // notes 값을 textarea에 연결
                onChange={(e) => handleTextChange(e, indexx)} // notes가 변경될 때 handleTextChange 호출
                placeholder="내용추가"
                className="h-[60px] whitespace-pre-wrap w-[200px] overflow-hidden resize-none"
              />
              <div className="flex justify-start items-center gap-1 text-[#645E59]">
                <img src={MapMarker} className="scale-75" />
                {item.road_address_name || item.address1 ? (
                  <>{item.road_address_name || item.address1}</>
                ) : (
                  <>{item.address_name || item.address2}</>
                )}
              </div>
            </div>
            <img src={item.imageUrl ? item.imageUrl : test1} className="w-[110px] h-[110px] rounded-[13px]" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScheduleRegister;
