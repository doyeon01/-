import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { DayPlan } from '../organisms/DayPlan';
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { ButtonPersonalInfo } from '../atoms/button/ButtonPersonalInfo';
import { PlanDetailApi } from '../../services/api/PlanService';
import { PlanDetailResponseType, DayPlanType } from '../../model/MyPageType';




export const ScheduleDetail = () => {

  useEffect(() => {
    PlanDetailApi(scheduleId)
    .then((res)=>{
      const data: PlanDetailResponseType = res.data
      if(data.success) {
        setScheduleDetailList(data.response)
      } else {
        console.log('response 없음 ㅜㅜ')
      }
    })
    .catch((error) => {
      console.log(error)
    })

  },[])


  const nav = useNavigate()
  const location = useLocation();
  const {scheduleId, title} = location.state || {}; 
  const [currentPage, setCurrentPage] = useState(0);
  const [scheduleDetailList, setScheduleDetailList] = useState<DayPlanType[]>([])
  const daysPerPage = 3;

  // 현재 페이지에 해당하는 일정만 보여줌
  const displayedDays = scheduleDetailList.slice(currentPage * daysPerPage, (currentPage + 1) * daysPerPage);

  // 페이지네이션 버튼
  const totalPages = Math.ceil(scheduleDetailList.length / daysPerPage);

  // 1개일 경우 중앙 배치, 2개 이상일 경우 가로로 나열
  const getGridClass = () => {
    if (displayedDays.length === 1) {
      return "flex justify-center";  // 1개일 때 중앙 배치
    } else if (displayedDays.length === 2) {
      return "grid grid-cols-2 gap-8 px-64";  // 2개일 때 가로로 2개 배치
    } else {
      return "grid grid-cols-3 gap-8 px-32";  // 3개일 때 가로로 3개 배치
    }
  };

  // 페이지 변경 함수
  const handlePageChange = (_event: React.ChangeEvent<unknown>, newPage: number) => {
    setCurrentPage(newPage - 1);  
  };

  return (
    <div className='mt-28'>
      <div className='relative mb-10'>
        <h1 className="text-4xl font-bold flex justify-center items-center">{title}</h1>
        <div className='absolute top-0 right-28'>
          <ButtonPersonalInfo label="수정하기" onClick={() => nav('/plan')} px={4} py={2} size={'lg'}/>
        </div>
      </div>


      <div className={getGridClass()}>
        {displayedDays.map((daySchedule, index) => (
          <DayPlan key={index} daySchedule={daySchedule} />
        ))}
      </div>

      <div className="flex justify-center mb-8">
        <Pagination
          count={totalPages}
          page={currentPage + 1}  
          onChange={handlePageChange}
          renderItem={(item) => (
            <PaginationItem
              components={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
              {...item}
            />
          )}
        />
      </div>
    </div>
  );
};