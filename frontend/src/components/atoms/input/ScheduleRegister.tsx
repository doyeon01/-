import React, {useState} from 'react'
import MapMarker from '../../../assets/statics/MapMarker.png'
import test1 from '../../../assets/statics/test1.jpg'

interface Props{
    currentDate:number
    data: any; // 현재 날짜에 저장된 데이터
    onScheduleChange: (date: number, data: any) => void; // 데이터 변경 핸들러
}

const ScheduleRegister:React.FC<Props> = ({currentDate, data, onScheduleChange}) => {
    const [localData, setLocalData] = useState(data); // 로컬 상태로 데이터를 관리

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newData = { ...localData, [e.target.name]: e.target.value };
    setLocalData(newData);
    onScheduleChange(currentDate, newData); // 변경된 데이터를 부모로 전달
  };
  return (
    <>
        <div className="h-full bg-white overflow-y-auto scrollbar-thin min-w-[390px] divide-y overflow-hidden z-10">
        <h3>Schedule for {currentDate}</h3>
            <input
                type="text"
                name="scheduleTitle"
                value={localData.scheduleTitle || ''}
                onChange={handleChange}
                placeholder="Enter schedule title"
            />
            <div className="w-[390px] h-[150px] flex min-h-[150px] justify-around items-center">
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
        </div>
    </>
  )
}

export default ScheduleRegister