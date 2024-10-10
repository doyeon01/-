import React, { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import CardPlanFav from '../molecules/Card/CardPlanFav'
import KaKaoMap_Plan from '../organisms/KaKaoMap_Plan'
import ModalCalendar from '../organisms/Modal/ModalCalender'
import moment from 'moment'
import PlanDailyTab from '../molecules/Tab/PlanDailyTab'
import ScheduleRegister from '../atoms/input/ScheduleRegister'
import { TravelPlan, DayPlan } from '../../model/RegisterPlanType'

import Swal from 'sweetalert2'; 

// import Mini_Vector from '../../assets/statics/Mini_Vector.png'
import Loading_gif from '../../assets/statics/Loading.gif'

import { useRecoilValue } from 'recoil';
import {UserId} from '../../Recoil/atoms/Auth'

import { getFeedClusterByDistance, getFeedCluster, getFeedClusterRefresh, postPlan } from '../../services/api/CreatePlanService'
import { FeedType,FeedClusterType } from '../../model/SearchingFeedType'
export const PlanPage: React.FC = () => {
  const userId = useRecoilValue(UserId)
  // const userId = 2895
  const [isFeedClusterReady, setIsFeedClusterReady] = useState(false);
  const navigate = useNavigate()

  const [Ismodal, setismodal] = useState(false)
  const [IsHide, setIsHide] = useState(true)
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [datesList, setDatesList] = useState<Date[]>([]) // 날짜 목록 관리
  const [currentDate, setCurrentDate] = useState(1)
  const [searchinTab, setSearchingTab] = useState(false)

  const [loading,setLoading] = useState(false)
  const [feedClusterByDistanceData,setFeedClusterByDistanceData] = useState<FeedType[]>([])
  const [feedCluster, setFeedCluster] = useState<FeedClusterType[]>([])
  const [feeds,setFeeds] = useState<FeedType[]>([])||null
  const [lastRefreshTime, setLastRefreshTime] = useState<Date | null>(null); // 마지막 갱신 시간
  const [timeAgo, setTimeAgo] = useState(''); // "몇 분 전" 텍스트 상태
  const [schedule, setSchedule] = useState<TravelPlan>()
  const [latitude, setLatitude] = useState(37.5503)
  const [lotitude, setLotitude] = useState(126.9971)
  const [title,setTitle] = useState('')

  const [_, setDragging] = useState(false);

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, feed:any) => {
    setDragging(true);
    e.dataTransfer.setData('place', JSON.stringify(feed));
  };

  const handleDragEnd = () => {
      setDragging(false);
  };

  const handleRefresh = async () => {
    if (!userId) return; // userID가 없으면 실행하지 않음

    setLoading(true); // 로딩 시작
    setIsFeedClusterReady(false); // 지도 렌더링 일시 중단
    try {
      const data = await getFeedClusterRefresh(userId); // API 호출
      console.log(data);
      setFeedCluster(data.response); // 새로운 데이터로 클러스터 설정
      setLastRefreshTime(new Date()); // 마지막 갱신 시간을 현재 시간으로 설정
    } catch (error) {
      console.error('Error refreshing data:', error);
    } finally {
      setLoading(false); // 로딩 종료
      setIsFeedClusterReady(true); // 지도 다시 렌더링
    }
  };

  // "몇 분 전" 경과 시간 계산
  useEffect(() => {
    if (lastRefreshTime) {
      // 초기 계산: 업데이트 직후 즉시 경과 시간을 계산
      const now = new Date();
      const diffInMinutes = Math.floor((now.getTime() - lastRefreshTime.getTime()) / 1000 / 60);
      setTimeAgo(diffInMinutes === 0 ? '방금 전' : `${diffInMinutes}분 전`);
  
      // 이후 매 1분마다 경과 시간을 갱신하는 interval 설정
      const interval = setInterval(() => {
        const now = new Date();
        const diffInMinutes = Math.floor((now.getTime() - lastRefreshTime.getTime()) / 1000 / 60);
        setTimeAgo(diffInMinutes === 0 ? '방금 전' : `${diffInMinutes}분 전`);
      }, 60000); // 1분마다 업데이트
  
      return () => clearInterval(interval); // 컴포넌트 언마운트 시 인터벌 정리
    } else {
      // lastRefreshTime이 없을 경우, 즉시 '방금 전'으로 초기화
      setTimeAgo('방금 전');
    }
  }, [lastRefreshTime]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getFeedCluster(userId);
        setFeedCluster(data.response);
        setIsFeedClusterReady(true); // 데이터 세팅 완료 후 플래그 설정
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    if (userId) {
      fetchData();
    }
  }, [userId, lastRefreshTime]);

  let distance = 10
  let page = 0
  let size = 20
  useEffect(()=>{
    const fetchData = async()=>{
      try {
        const data = await getFeedClusterByDistance(latitude,lotitude,distance, page, size); // 배열 반환
        setFeedClusterByDistanceData(data.response.feeds); // 상태로 배열을 설정
      } catch (error) {
        console.error('Error fetching feeds:', error);
      }
    }
    fetchData();
  },[latitude,lotitude])


  const handleSearchingTab = () => {
    setSearchingTab(searchinTab => !searchinTab)
    } 
  
  // 모달 열고 닫기
  const handleIsmodal = (feeds:FeedType[], feedCluster?:FeedClusterType) => {
    setFeeds(feeds)
    setismodal(Ismodal => !Ismodal)
    setTitle(getNameBeforeSecondSpace(feeds[0].address1 || feeds[0].address2))
   // feedCluster가 있으면 해당 값을 사용, 없으면 기본값 사용
    if (feedCluster) {
      
      setLatitude(feedCluster.latitude);
      setLotitude(feedCluster.longitude);

      
    } else {
      // feedCluster가 없을 때의 처리 (기본값으로 설정)
      
      setLatitude(37.5503);
      setLotitude(126.9971);
    }
  }


  // 날짜 선택 후 닫기
  const handleIsHide = (choicedDate: Date) => {
    setIsHide(IsHide => !IsHide)
    setismodal(Ismodal => !Ismodal)
    setSelectedDate(choicedDate)
    if(feeds && feeds.length > 0){
      const startData = choicedDate
      const nextData = moment(startData).add(1, 'days').toDate()
      const lastData = moment(startData).add(2, 'days').toDate()
      setDatesList([...datesList, startData,nextData,lastData])
    }
    else{
      setDatesList([choicedDate]) // 첫 번째 날짜 설정
    }
    localStorage.removeItem(`schedule_1`);
    localStorage.removeItem(`schedule_2`);
    localStorage.removeItem(`schedule_3`);
    localStorage.removeItem(`schedule_4`);
    localStorage.removeItem(`schedule_5`);
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

  const handleCurrentDate = (currentDate: number) => {
    setCurrentDate(currentDate)
  }

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;

    const handleWheel = (event: WheelEvent) => {
      if (scrollContainer) {
        // prevent the default vertical scroll behavior
        event.preventDefault();
        // assign the vertical scroll delta to horizontal scroll
        scrollContainer.scrollLeft += event.deltaY;
      }
    };

    if (scrollContainer) {
      // Add wheel event listener
      scrollContainer.addEventListener('wheel', handleWheel, { passive: false });
    }

    return () => {
      if (scrollContainer) {
        // Clean up event listener on component unmount
        scrollContainer.removeEventListener('wheel', handleWheel);
      }
    };
  }, []);

  const inputPlanName = async()=>{
    const { value: getName } = await Swal.fire({
      input: 'text',
      title: '이번 여행의 이름이 뭔가요?',
      inputPlaceholder: title,
    })
    if(getName){
      setTitle(getName)
      handlePost(getName)
    }
    if(getName === ''){
      setTitle(title)
      handlePost(title)
    }
  }

  const handlePost = async (title:string) => {
    // 초기 일정 데이터 업데이트
    const updatedSchedule: TravelPlan = {
      ...schedule,
      title: title,
      startDate: moment(datesList[0]).format('YYYY-MM-DD'),
      endDate: moment(datesList[datesList.length - 1]).format('YYYY-MM-DD'),
      dayPlans: []  // 빈 배열로 초기화
    };

    // localStorage에서 일정 데이터를 가져와서 dayPlans 필드 업데이트
    for (let i = 1; i < 6; i++) {
      const stored = localStorage.getItem(`schedule_${i}`);
      if (stored && stored.length > 0) {
        const parsedStore = JSON.parse(stored)
        for(let j =0; j< parsedStore.length; j++){
          if('imageUrl' in parsedStore[j]){
            parsedStore[j].type = 'feed'
          }
          else{
            parsedStore[j].type = 'place'
          }
        }
        const parsedDayPlan: DayPlan = {
          day:i,
          plans: parsedStore
        }
        updatedSchedule.dayPlans.push(parsedDayPlan);  // dayPlans 배열에 추가
    }
  }
    console.log('최종 업데이트된 데이터:', updatedSchedule);
  
    try {
      // 데이터를 바로 전송
      const data = await postPlan(updatedSchedule);  // 최신 상태 전송
      console.log('등록 성공:', data);
      
      // 상태 업데이트 (필요하다면)
      setSchedule(updatedSchedule);

      Swal.fire({
        icon: 'success',
        title: '여행일정 생성 완료!',
        text: '여행일정이 저장되었습니다.',
        confirmButtonText: '확인',
      }).then(() => {
        navigate('/my', { state: { activeTab: 'tab3' } });
      });

    } catch (error: any) {
      console.error('등록 실패:', error.message);
      Swal.fire({
        icon: 'error',
        title: '여행일정 생성에 실패했습니다.',
        text: '다시 시도해주세요.',
        confirmButtonText: '확인',
      });
    }
  };

  const getNameBeforeSecondSpace = (address: string) => {
    const parts = address.split(' '); // 공백을 기준으로 문자열을 분리
    if (parts.length >= 2) {
      // 첫 번째와 두 번째 부분을 합쳐서 반환
      return parts[1] + ' 여행';
    }
    // 두 번째 공백이 없으면 전체 문자열을 반환
    return address;
  };

  // const blockAccess = ()=>{
  //   Swal.fire({
  //     icon:'error',
  //     title:'여행일정을 생성할 수 없습니다.',
  //     text:'다른 사람의 피드를 확인하고 좋아요를 눌러보세요!',
  //     confirmButtonText: '확인'
  //   }).then(()=>{
  //     navigate('/search');
  //   })
  // }

  // useEffect(() => {
  //   const targetDiv = document.getElementById('NotRender');
  //   if (targetDiv) {
  //     blockAccess()
  //   }
  // }, []); // 빈 배열은 컴포넌트가 처음 렌더링될 때만 실행됨

  return (
    <div className='relative top-20 overflow-hidden'>
      {/* 모달 창 */}
      {Ismodal === true && (
        <>
          <div className="w-full h-full bg-black opacity-50 fixed z-10" onClick={()=>handleIsmodal(feeds)} />
          <div className="absolute z-10 top-1/2 transform -translate-y-1/2 left-1/2 -translate-x-1/2 ">
            <ModalCalendar onClick={handleIsHide} />
          </div>
        </>
      )}
      
      {feedCluster && feedCluster.length > 0 ? (
      IsHide === true ? (
        <div className="flex flex-row items-center justify-center gap-[22px] top-[35px] relative h-[calc(100vh-160px)]">
          {/* 콘텐츠 렌더링 */}
          <div className="w-full h-full bg-sky-200 relative ml-10">
            {isFeedClusterReady ? (
              <KaKaoMap_Plan isSearch={false} clusters={feedCluster} />
            ) : (
              <div className="flex justify-center items-center h-full">
                <img src={Loading_gif} alt="" />
              </div>
            )}
            {/* 업데이트 영역 */}
            <div className="absolute right-0 -top-[35px] flex flex-row items-center gap-2">
              {loading ? (
                <img src={Loading_gif} alt="Loading" className="h-[30px] w-[30px] mr-[50px]" />
              ) : (
                <>
                  <button
                    className="bg-[#707C60] hover:bg-[#4F5843] font-medium rounded-[10px] flex items-center justify-center flex-row w-[30px] h-[30px] text-center"
                    onClick={handleRefresh}
                  >
                    <p className="text-[22px] text-white">↺</p>
                  </button>
                  <span className="text-[13px]">마지막 업데이트 : {timeAgo}</span>
                </>
              )}
            </div>
          </div>

          {/* 추천 여행지 */}
          <div className="relative w-[400px] -top-[15px] h-[calc(100vh-195px)] bg-white mr-[50px] rounded-[10px] flex-col flex items-center overflow-y-auto scrollbar-thin pb-[20px]">
            <span className="text-[21px] font-semibold mt-[15px]">추천 여행지로 여행 계획하기</span>
            <hr className="w-[60%] border-t-[3px] border-black mt-[10px]" />
            <button
              className="w-[260px] h-[70px] bg-[#6F7C60] text-white rounded-[10px] mt-[35px] flex-shrink-0"
              onClick={() => handleIsmodal(feeds)}
            >
              나만의 여행 일정 만들기
            </button>
            {feedCluster && feedCluster.length > 0 && loading === false ? (
              feedCluster.map((items, index) => (
                <button onClick={() => handleIsmodal(items.feeds, items)}>
                  <CardPlanFav
                    key={index}
                    name={getNameBeforeSecondSpace(items.feeds[0].address1 || items.feeds[0].address2)}
                    position={items.feeds[0].address1 || items.feeds[0].address2}
                    feeds={items.feeds}
                  />
                </button>
              ))
            ) : (
              <img src={Loading_gif} alt="Loading" className="h-[50px] w-[50px] m-20" />
            )}
          </div>
        </div>
      ) : (
        <>
          {/* 다른 레이아웃 */}
          <div className="flex flex-row justify-center items-center relative divide-x h-[calc(100vh-80px)] overflow-hidden">
            <div className="h-full bg-white flex flex-col min-w-[60px] text-[13px]">
              <div className="flex-grow">
                {datesList.map((date, index) => (
                  <PlanDailyTab key={index} date={date} index={index} onClick={handleCurrentDate} currentDate={currentDate} />
                ))}
                {datesList.length < 5 && (
                  <div className="h-[60px] flex justify-center items-center">
                    <button
                      className="rounded-full bg-[#665F59] text-white w-[40px] h-[40px] text-[25px] flex justify-center items-center text-center"
                      onClick={addNextDay}
                    >
                      +
                    </button>
                  </div>
                )}
              </div>
              <div
                className="h-[60px] w-full flex justify-center items-center flex-col cursor-pointer bg-[#665F59] text-white"
                onClick={inputPlanName}
              >
                저장
              </div>
            </div>
            <div className="h-full bg-white overflow-y-auto scrollbar-thin min-w-[390px] divide-y overflow-hidden z-10">
              {datesList.map((_, index) => index + 1 === currentDate && (
                <ScheduleRegister
                  key={index}
                  currentDate={currentDate}
                  index={index}
                  feeds={feeds && index < 3 ? feeds.slice(index * 6, (index + 1) * 6) : []}
                />
              ))}
            </div>
            <div className="w-full h-full z-0">
              <KaKaoMap_Plan isSearch={true} clusters={feedCluster} index={currentDate} />
            </div>
          </div>

          {/* 주변 추천 장소 */}
          <div className="relative z-10">
            <div className={`transition-transform duration-300 ${searchinTab ? 'translate-y-0' : 'translate-y-[200px]'}`}>
              <div
                id="folding"
                className="w-[130px] h-[30px] bg-white flex justify-center items-center rounded-t-lg absolute z-50 border cursor-pointer bottom-[200px] left-1/2"
                onClick={handleSearchingTab}
              >
                주변 추천 장소
              </div>
              <div
                ref={scrollContainerRef}
                className="w-full h-[200px] bg-[#E5E2D9] absolute bottom-0 z-40 bg-opacity-80 flex justify-start items-center overflow-x-auto overflow-y-hidden"
              >
                {feedClusterByDistanceData && feedClusterByDistanceData.length > 0 ? (
                  feedClusterByDistanceData.map((feed) => (
                    <div
                      key={feed.id}
                      className="min-w-[150px] w-[150px] h-[150px] flex justify-center items-center overflow-hidden m-5"
                      draggable
                      onDragStart={(e) => handleDragStart(e, feed)}
                      onDragEnd={handleDragEnd}
                    >
                      <img src={feed.imageUrl} className="w-full h-full object-cover" />
                    </div>
                  ))
                ) : (
                  'No feeds available'
                )}
              </div>
            </div>
          </div>
        </>
      )
    ) : (
      <div id='NotRender'>NOT RENDERED</div>
    )}
    </div>
  )
}