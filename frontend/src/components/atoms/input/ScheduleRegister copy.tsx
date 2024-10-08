import React, { useState, useEffect } from 'react';
import MapMarker from '../../../assets/statics/MapMarker.png';
import test1 from '../../../assets/statics/Duli.png';

interface Props {
  currentDate: number;
  index: number;
}

const ScheduleRegister: React.FC<Props> = ({ currentDate, index }) => {
  const [schedule, setSchedule] = useState<any[]>([]); // 입력 값 상태로 관리
  const [draggedItemIndex, setDraggedItemIndex] = useState<number | null>(null); // 드래그된 항목의 인덱스 저장

  const handleDragStart = (index: number) => {
    setDraggedItemIndex(index); // 드래그 시작 시 인덱스 저장
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault(); // 드래그 오버 시 기본 동작 방지
  };

  const handleDrop = (index: number) => {
    if (draggedItemIndex === null) return;
    
    // 드래그된 항목을 새로운 위치로 이동
    const updatedSchedule = [...schedule];
    const [draggedItem] = updatedSchedule.splice(draggedItemIndex, 1); // 드래그된 항목 삭제
    updatedSchedule.splice(index, 0, draggedItem); // 새로운 위치에 삽입
    
    setSchedule(updatedSchedule);
    setDraggedItemIndex(null); // 드래그 완료 후 초기화
  };

  // schedule이 변경될 때마다 localStorage에 저장
  useEffect(() => {
    localStorage.setItem(`schedule_${currentDate}`, JSON.stringify(schedule));
  }, [schedule, currentDate]);

  // TextArea 변경 시 schedule 상태 업데이트
  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>, index: number) => {
    const newSchedule = [...schedule];
    newSchedule[index].notes = e.target.value; // notes 필드를 업데이트
    setSchedule(newSchedule); // 상태 업데이트
  };

  return (
    <div key={index}>
      <div id='container' className="w-[390px] h-full flex flex-col min-h-[150px] justify-start items-center divide-y">
        {schedule.map((item, indexx) => (
          <div
            className='flex justify-between w-full p-3'
            key={indexx}
            draggable
            onDragStart={() => handleDragStart(indexx)}
            onDragOver={handleDragOver}
            onDrop={() => handleDrop(indexx)}
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
