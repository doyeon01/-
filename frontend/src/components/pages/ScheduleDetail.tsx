import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { DayPlan } from '../organisms/DayPlan';
import testImg1 from './../../assets/statics/test1.jpg'
import testImg2 from './../../assets/statics/test2.jpg'
import testImg3 from './../../assets/statics/test3.png'
import testImg4 from './../../assets/statics/test4.jpg'
import testImg5 from './../../assets/statics/test5.jpg'
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { ButtonPersonalInfo } from '../atoms/button/ButtonPersonalInfo';
import { PlanDetailApi } from '../../services/api/PlanService';

const dummyData = {
  title: "퇴사 기념 혼자서 부산 여행",
  days: [
    {
      day: "DAY 1",
      schedule: [
        {
          type: "관광지",
          name: "무등산",
          description: "무등산에서 9시에 등산해서 김밥도 먹고 라면도 먹고 경치도 보고 행복한 하루를 보낼꺼야",
          likes: 300,
          image: testImg1
        },
        {
          type: "음식점",
          name: "백숙집",
          description: "한방 백숙으로 유명한 부산의 백숙집입니다. 건강한 맛!",
          likes: 160,
          image: testImg2
        },
        {
          type: "카페",
          name: "엣제리너스",
          description: "분위기 좋은 카페에서 휴식과 함께 커피 한잔의 여유.",
          likes: 120,
          image: testImg3
        },
        {
          type: "숙소",
          name: "로얄룸",
          description: "럭셔리한 분위기의 숙소에서 편안한 하루를 보낼 수 있습니다.",
          likes: 90,
          image: testImg4
        }
      ]
    },
    {
      day: "DAY 2",
      schedule: [
        {
          type: "관광지",
          name: "해운대 해수욕장",
          description: "부산의 대표적인 해수욕장으로 맑은 바다와 아름다운 풍경이 특징입니다.",
          likes: 450,
          image: testImg5
        },
        {
          type: "음식점",
          name: "돼지국밥 맛집",
          description: "부산의 대표 음식인 돼지국밥을 맛볼 수 있는 유명 맛집.",
          likes: 240,
          image: testImg1
        },
        {
          type: "카페",
          name: "바다전망 카페",
          description: "해운대 바다가 한눈에 보이는 카페에서 멋진 시간을 보낼 수 있습니다.",
          likes: 130,
          image: testImg1
        },
        {
          type: "숙소",
          name: "해운대 리조트",
          description: "해변가에 위치한 리조트로 탁 트인 바다 전망이 일품입니다.",
          likes: 100,
          image: testImg3
        }
      ]
    },
    {
      day: "DAY 3",
      schedule: [
        {
          type: "관광지",
          name: "광안리 해변",
          description: "광안리 해변에서 여유로운 시간을 보내세요.",
          likes: 350,
          image: testImg2
        },
        {
          type: "음식점",
          name: "밀면 맛집",
          description: "부산의 대표 음식 밀면을 맛볼 수 있습니다.",
          likes: 180,
          image: testImg3
        },
        {
          type: "카페",
          name: "해변 카페",
          description: "광안리 해변 근처 카페에서 커피 한 잔의 여유.",
          likes: 140,
          image: testImg4
        },
        {
          type: "숙소",
          name: "광안리 호텔",
          description: "광안리 호텔에서 편안한 휴식을 취하세요.",
          likes: 100,
          image: testImg5
        }
      ]
    },
    {
      day: "DAY 4",
      schedule: [
        {
          type: "관광지",
          name: "광안리 해변",
          description: "광안리 해변에서 여유로운 시간을 보내세요.",
          likes: 350,
          image: testImg2
        },
        {
          type: "음식점",
          name: "밀면 맛집",
          description: "부산의 대표 음식 밀면을 맛볼 수 있습니다.",
          likes: 180,
          image: testImg3
        },
        {
          type: "카페",
          name: "해변 카페",
          description: "광안리 해변 근처 카페에서 커피 한 잔의 여유.",
          likes: 140,
          image: testImg4
        },
        {
          type: "숙소",
          name: "광안리 호텔",
          description: "광안리 호텔에서 편안한 휴식을 취하세요.",
          likes: 100,
          image: testImg5
        }
      ]
    },
    {
      day: "DAY 5",
      schedule: [
        {
          type: "관광지",
          name: "광안리 해변",
          description: "광안리 해변에서 여유로운 시간을 보내세요.",
          likes: 350,
          image: testImg2
        },
        {
          type: "음식점",
          name: "밀면 맛집",
          description: "부산의 대표 음식 밀면을 맛볼 수 있습니다.",
          likes: 180,
          image: testImg3
        },
        {
          type: "카페",
          name: "해변 카페",
          description: "광안리 해변 근처 카페에서 커피 한 잔의 여유.",
          likes: 140,
          image: testImg4
        },
        {
          type: "숙소",
          name: "광안리 호텔",
          description: "광안리 호텔에서 편안한 휴식을 취하세요.",
          likes: 100,
          image: testImg5
        }
      ]
    },
    
  ]
};

export const ScheduleDetail = () => {

  useEffect(() => {
    PlanDetailApi()
    .then()
    .catch((error) => {
      console.log(error)
    })

  },[])

  const nav = useNavigate()
  const [currentPage, setCurrentPage] = useState(0);
  const daysPerPage = 3;

  // 현재 페이지에 해당하는 일정만 보여줌
  const displayedDays = dummyData.days.slice(currentPage * daysPerPage, (currentPage + 1) * daysPerPage);

  // 페이지네이션 버튼
  const totalPages = Math.ceil(dummyData.days.length / daysPerPage);

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
        <h1 className="text-4xl font-bold flex justify-center items-center">{dummyData.title}</h1>
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