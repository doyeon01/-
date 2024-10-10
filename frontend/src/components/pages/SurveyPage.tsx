import React, {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom';
import DaumPostcode from 'react-daum-postcode';

import { getFeed } from '../../services/api/RegisterUser';
import {FeedType} from '../../model/SearchingFeedType'
import { RegisterUser } from '../../services/api/RegisterUser';
import { RegisterUserType } from '../../model/RegisterUserType';

import IMG_BG from '../../assets/statics/survey_background.png'
import IMG_Logo from '../../assets/statics/handam_logo.png'
import IMG_STEP01 from '../../assets/statics/survey_step01.png'
import IMG_STEP02 from '../../assets/statics/survey_step02.png'
import IMG_STEP03 from '../../assets/statics/survey_step03.png'
import IMG_STEP04 from '../../assets/statics/survey_step04.png'
import IMG_STEP05 from '../../assets/statics/survey_step05.png'
import IMG_STEP06 from '../../assets/statics/survey_step06.png'
import IMG_STEP07 from '../../assets/statics/survey_step07.png'
import IMG_STEP08 from '../../assets/statics/survey_step08.png'
import VID_start from '../../assets/statics/survey_strart.mp4'

import { ButtonNext } from '../atoms/button/ButtonNext'
import MBTIRenderer from '../molecules/Tab/MBTIRenderer';

export const SurveyPage: React.FC = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true); // 로딩 상태 추가

  const [PageNum, setPageNum] = useState(0)
  const [IsHide,setIsHide] = useState(true)
  const [MBTI,setMBTI] = useState('')
  const [Fading,setFading] = useState(false)

  const [address, setAddress] = useState(''); // 선택된 주소 상태
  const [openPostcode, setOpenPostcode] = useState(false);

  const [nickname, setNickname] = useState(''); // 닉네임 상태
  const [introduce, setIntroduce] = useState(''); // 자기소개 상태
  const [userData, setUserData] =  useState<RegisterUserType[]>([]); // 최종 저장 상태

  const [feeds, setFeeds] = useState<FeedType[]>([]);
  const [keyword,setkeyword] = useState('RESTAURANT')
  let page = 0
  let size = 15

  useEffect(() => {
    const fetchFeedsData = async () => {
      setLoading(true);
      try {
        const data = await getFeed(keyword, page, size); // 배열 반환
        setFeeds(data.response.feeds); // 상태로 배열을 설정
      } catch (error) {
        console.error('Error fetching feeds:', error);
      }
      finally {
        setLoading(false); // 데이터 가져오기 완료 후 로딩 상태 false
      }
    };
    if (keyword) {
      fetchFeedsData(); // keyword가 설정된 후에 API 호출
    }
  }, [keyword, page, size]);

 // 주소 검색 완료 시 호출되는 함수
 const handleComplete = (data: any) => {
  let fullAddress = data.address;
  let extraAddress = '';

  // 상세 주소를 추가로 확인 (법정동, 건물명 등)
  if (data.addressType === 'R') {
    if (data.bname !== '') {
      extraAddress += data.bname;
    }
    if (data.buildingName !== '') {
      extraAddress += extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
    }
    fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
  }

  setAddress(fullAddress); // 선택한 주소를 상태로 저장
  setOpenPostcode(false); // 주소 선택 후 모달 닫기
};

// 주소 검색 모달 열기
const handleOpenPostcode = () => {
  setOpenPostcode(true);
};
const handlePageNum = () => {
  if (!nickname || !address) {
      alert('닉네임과 주소를 입력해 주세요.');
    } else {
      setUserData((prevState) => ({
        ...prevState,
        nickname: nickname,
        residence: address,
        introduction: introduce,
      }));
    console.log('저장된 userData:', userData); // 저장된 값 확인
    setPageNum(PageNum=>PageNum+1)
    }
}

useEffect(() => {
  // PageNum이 변경될 때 keyword 설정
  if (PageNum === 7) {
    setkeyword('CAFE');
  } else if (PageNum === 8) {
    setkeyword('TOURIST_ATTRACTION');
  } else if (PageNum === 9) {
    setkeyword('ACCOMMODATION');
  }
}, [PageNum]); // PageNum이 변경될 때 keyword를 설정


  const handleIsHide = ()=>{
    setIsHide(IsHide=>!IsHide)
  }

  const handleMBTI = (e:React.MouseEvent<HTMLButtonElement>)=> {
    const value = MBTI + e.currentTarget.value
    setMBTI(value)
    setFading(true)
    setTimeout(()=>{
      setFading(false)
      setPageNum(PageNum=>PageNum+1)
    },500)
  }

  const toggleLike = (id:number) => {
    setFeeds(prevFeeds =>
      prevFeeds.map(feed =>
        feed.id === id ? { ...feed, isLiked: !feed.isLiked } : feed
      )
    );
  };

  const handleRegister = async () => {
    try {
      // 현재 상태를 바탕으로 새로운 객체를 만들어 업데이트
    const updatedUserData = {
      ...userData,
      travelStyl1: MBTI.charAt(0),
      travelStyl2: MBTI.charAt(1),
      travelStyl3: MBTI.charAt(2),
      travelStyl4: MBTI.charAt(3),
    };

    // userData 업데이트
    setUserData(updatedUserData);
    
    
    // 업데이트된 객체를 바로 사용하여 API 호출
    const data = await RegisterUser(updatedUserData);
    console.log('등록 성공:', data);

    // 페이지 이동
    navigate('/main' );
    } catch (error: any) {
      console.error('등록 실패:', error.message);
    }
  };

  return (
    <>
      <div
        data-label="배경이미지[수정필요]"
        style={{ backgroundImage: `url(${IMG_BG})`, backgroundSize: 'cover' }}
        className="w-full h-screen bg-contain bg-no-repeat bg-center relative"
      >
        {/* 검은색 오버레이 추가 */}
        <div className="absolute inset-0 bg-black opacity-40 z-0"></div>

        
        <div
          data-label="MBTI레이아웃"
          className="bg-white w-[330px] h-[680px] max-h-full fixed right-[10%] rounded-[10px] top-1/2 transform -translate-y-1/2 overflow-hidden leading-tight"
        >
          <div  className={`w-full h-full absolute bg-black transition-opacity duration-500 ${Fading ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'} z-10`} />
          {PageNum === 0 && (
            <>
              <video
                autoPlay
                loop
                muted
                src={VID_start}
                className="absolute -z-10 w-full h-full object-cover"
              />
              {IsHide ? (
                <>
                  <img
                    src={IMG_Logo}
                    alt="메인로고"
                    className="z-0 right-[25px] top-[20px] w-[50px] h-[50px] absolute"
                  />
                  <span className="absolute top-[25%] left-1/2 transform -translate-x-1/2 text-4xl whitespace-nowrap font-normal">
                    여행 성향 진단
                  </span>
                  <button
                    data-label="시작하기버튼"
                    className="absolute w-[200px] h-[50px] bg-black top-[65%] left-1/2 transform -translate-x-1/2 rounded-[10px] flex justify-center items-center text-[25px] text-white"
                    onClick={handleIsHide}
                  >
                    시작하기
                  </button>
                </>
              ) : (
                <>
                  <div className="right-[8px] top-[5px] absolute">
                    <ButtonNext text="다음" onClick={handlePageNum} />
                  </div>
                  <span className="block mt-[120px] mb-[20px] text-2xl whitespace-nowrap text-center">
                    개인정보를 입력해주세요
                  </span>
                  <div className="gap-4 mb-4 flex flex-col items-center">
                    <input
                      type="text"
                      id="nickname"
                      value={nickname}
                      onChange={(e) => setNickname(e.target.value)} // 닉네임 변경 시 상태 업데이트
                      className="w-[250px] h-[50px] rounded-[10px] text-center text-md focus:outline-none resize-none"
                      placeholder="닉네임을 입력해주세요"
                      spellCheck='false'
                      maxLength={10}
                    />
                    <div
                      className="flex flex-row justify-center items-center w-64 min-h-12 h-full p-6 bg-white rounded-lg text-center text-md focus:outline-none resize-none border border-gray-300 text-wrap"
                      onClick={handleOpenPostcode} // 클릭 시 모달 열기
                    >
                      {address ? address: 
                      <div className='text-[#9CA3AF]'>주소를 입력해주세요</div>}
                    </div>

                    {/* 주소 검색 모달 */}
                    {openPostcode && (
                      <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
                        <div className="bg-white p-6 rounded-lg shadow-lg relative w-96">
                          <button
                            onClick={() => setOpenPostcode(false)}
                            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                          >
                            &times;
                          </button>
                          <DaumPostcode onComplete={handleComplete} />
                        </div>
                      </div>
                    )}
                    <textarea
                      id="introduce"
                      value={introduce}
                      onChange={(e) => setIntroduce(e.target.value)} // 자기소개 변경 시 상태 업데이트
                      className="w-[250px] min-h-[200px] h-full rounded-[10px] text-center text-md p-6 focus:outline-none resize-none"
                      spellCheck='false'
                      placeholder="자기소개를 입력해주세요"
                    />
                  </div>
                </>
              )}
            </>
          )}
          {PageNum === 1 && (
            <>
              <img src={IMG_STEP01} alt="" className="w-full h-full object-cover"/>
              <span className="text-[15px] top-[5px] left-[8px] absolute text-[#645E59] font-extrabold">
                {PageNum}/10
              </span>
              <span className="text-md top-[50px] absolute text-center left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                좋은 아침이에요!<br />
                창밖을 바라보니 풍경이 너무 좋네요!<br />
                밖이 어떤 풍경인가요?
              </span>
              <button
                className="w-[250px] h-[70px] bg-black bg-opacity-30 absolute top-[150px] rounded-[30px] left-1/2 transform -translate-x-1/2 flex justify-center items-center"
                onClick={handleMBTI}
                value={'N'}
              >
                <span className="text-white font-medium text-[15px]">
                  나무가 우거진 숲
                </span>
              </button>
              <button
                className="w-[250px] h-[70px] bg-black bg-opacity-30 absolute top-[250px] rounded-[30px] left-1/2 transform -translate-x-1/2 flex justify-center items-center"
                onClick={handleMBTI}
                value={'C'}
              >
                <span className="text-white font-medium text-[15px]">
                  세련미가 넘치는 도시
                </span>
              </button>
            </>
          )}
          {PageNum === 2 && (
            <>
              <img src={IMG_STEP02} alt="" className="w-full h-full object-cover" />
              <span className="text-[15px] top-[5px] left-[8px] absolute text-[#645E59] font-extrabold">
                {PageNum}/10
              </span>
              <span className="text-md top-[50px] absolute text-center left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                출근하는 길에<br />
                문득 예쁜 풍경을 발견한 당신은
              </span>
              <button
                className="w-[250px] h-[70px] bg-black bg-opacity-30 absolute top-[150px] rounded-[30px] left-1/2 transform -translate-x-1/2 flex justify-center items-center"
                onClick={handleMBTI}
                value={'P'}
              >
                <span className="text-white font-medium text-[15px]">
                  당장 핸드폰을 들어 사진을 찍는다.
                </span>
              </button>
              <button
                className="w-[250px] h-[70px] bg-black bg-opacity-30 absolute top-[250px] rounded-[30px] left-1/2 transform -translate-x-1/2 flex justify-center items-center"
                onClick={handleMBTI}
                value={'E'}
              >
                <span className="text-white font-medium text-[15px]">
                  잠시 눈에 담은 뒤 시선을 거둔다.
                </span>
              </button>
            </>
          )}
          {PageNum === 3 && (
            <>
              <img src={IMG_STEP03} alt="" className="w-full h-full object-cover" />
              <span className="text-[15px] top-[5px] left-[8px] absolute text-[#645E59] font-extrabold">
                {PageNum}/10
              </span>
              <span className="text-md top-[50px] absolute text-center left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                새로운 업무가 도착했습니다!<br />
                어떻게 시작할까요?
              </span>
              <button
                className="w-[250px] h-[70px] bg-black bg-opacity-30 absolute top-[150px] rounded-[30px] left-1/2 transform -translate-x-1/2 flex justify-center items-center"
                onClick={handleMBTI}
              >
                <span className="text-white font-medium text-[15px]">
                  마스터 플랜은 필수!<br />
                  체계적으로 계획을 세운 후 시작하기
                </span>
              </button>
              <button
                className="w-[250px] h-[70px] bg-black bg-opacity-30 absolute top-[250px] rounded-[30px] left-1/2 transform -translate-x-1/2 flex justify-center items-center"
                onClick={handleMBTI}
              >
                <span className="text-white font-medium text-[15px]">
                  머리 속 가장 먼저 떠오르는<br />
                  아이디어부터 당장 실행해보기
                </span>
              </button>
            </>
          )}
          {PageNum === 4 && (
            <>
              <img src={IMG_STEP04} alt="" className="w-full h-full object-cover" />
              <span className="text-[15px] top-[5px] left-[8px] absolute text-[#645E59] font-extrabold">
                {PageNum}/10
              </span>
              <span className="text-md top-[50px] absolute text-center left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                오후 세시, 졸음이 쏟아지는 시간입니다.<br />
                잠을 깨기 위해 무엇을 하면 좋을까요?
              </span>
              <button
                className="w-[250px] h-[70px] bg-black bg-opacity-30 absolute top-[150px] rounded-[30px] left-1/2 transform -translate-x-1/2 flex justify-center items-center"
                onClick={handleMBTI}
              >
                <span className="text-white font-medium text-[15px]">
                  잠깨는데 수다만한게 없죠!<br />
                  동료들과 이야기를 나눠요
                </span>
              </button>
              <button
                className="w-[250px] h-[70px] bg-black bg-opacity-30 absolute top-[250px] rounded-[30px] left-1/2 transform -translate-x-1/2 flex justify-center items-center"
                onClick={handleMBTI}
              >
                <span className="text-white font-medium text-[15px]">
                  잠시 바람을 쐬며<br />
                  혼자 산책을 다녀와요
                </span>
              </button>
            </>
          )}
          {PageNum === 5 && (
            <>
              <img src={IMG_STEP05} alt="" className="w-full h-full object-cover" />
              <span className="text-[15px] top-[5px] left-[8px] absolute text-[#645E59] font-extrabold">
                {PageNum}/10
              </span>
              <span className="text-md top-[50px] absolute text-center left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                야호! 드디어 퇴근입니다.<br />
                오늘은 왠지 수고한 나를 위해 맛있는<br />
                저녁식사를 하고 싶어요. 어디서<br />
                식사를 할까요?
              </span>
              <button
                className="w-[250px] h-[70px] bg-black bg-opacity-30 absolute top-[150px] rounded-[30px] left-1/2 transform -translate-x-1/2 flex justify-center items-center"
                onClick={handleMBTI}
                value={'K'}
              >
                <span className="text-white font-medium text-[15px]">
                  평점이 좋은 유명한 식당
                </span>
              </button>
              <button
                className="w-[250px] h-[70px] bg-black bg-opacity-30 absolute top-[250px] rounded-[30px] left-1/2 transform -translate-x-1/2 flex justify-center items-center"
                onClick={handleMBTI}
                value={'U'}
              >
                <span className="text-white font-medium text-[15px]">
                  친구에게 추천받은 처음듣는 식당
                </span>
              </button>
            </>
          )}
          {PageNum === 6 && (
            <>
              <img src={IMG_STEP06} alt="" className="w-full h-full object-cover" />
              <span className="text-[15px] top-[5px] left-[8px] absolute text-[#645E59] font-extrabold">
                {PageNum}/10
              </span>
              <div className="right-[8px] top-[5px] absolute">
                <ButtonNext text="다음" onClick={handlePageNum} />
              </div>
              <span className="text-md top-[26px] absolute text-center left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                어떤 음식이 마음에 드시나요?
              </span>
              <span className="text-sm top-[50px] absolute text-center left-1/2 transform -translate-x-1/2 whitespace-nowrap text-[#878787]">
                5개 이상 선택해주세요
              </span>
              <span className="top-[90px] absolute text-center left-1/2 transform -translate-x-1/2 whitespace-nowrap text-[#878787] grid grid-cols-3 w-full">
              {!loading ? (
                  feeds && feeds.length > 0 ? (
                    feeds.map(feed => (
                      <div key={feed.id} className="w-full max-h-[110px] h-[110px] border overflow-hidden relative" onClick={() => toggleLike(feed.id)}>
                        <div className={`absolute inset-0 bg-black ${feed.isLiked ? 'bg-opacity-50' : 'bg-opacity-0'} z-10 flex justify-center items-center text-[20px] text-white`}>
                          {feed.isLiked && '✔'}
                        </div>
                        <img src={feed.imageUrl} className="w-full h-full object-cover" />
                      </div>
                    ))
                  ) : (
                    'No feeds available'
                  )
                ) : (
                  <div>로딩 중입니다...</div> // 로딩 중일 때 표시할 내용
                )}
              </span>
            </>
          )}
          {PageNum === 7 && (
            <>
              <img src={IMG_STEP06} alt="" className="w-full h-full object-cover" />
              <span className="text-[15px] top-[5px] left-[8px] absolute text-[#645E59] font-extrabold">
                {PageNum}/10
              </span>
              <div className="right-[8px] top-[5px] absolute">
                <ButtonNext text="다음" onClick={handlePageNum} />
              </div>
              <span className="text-md top-[26px] absolute text-center left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                후식으로는 어떤 게 좋을까요?
              </span>
              <span className="text-sm top-[50px] absolute text-center left-1/2 transform -translate-x-1/2 whitespace-nowrap text-[#878787]">
                5개 이상 선택해주세요
              </span>
              <span className="top-[90px] absolute text-center left-1/2 transform -translate-x-1/2 whitespace-nowrap text-[#878787] grid grid-cols-3 w-full">
              {!loading ? (
                  feeds && feeds.length > 0 ? (
                    feeds.map(feed => (
                      <div key={feed.id} className="w-full max-h-[110px] h-[110px] border overflow-hidden relative" onClick={() => toggleLike(feed.id)}>
                        <div className={`absolute inset-0 bg-black ${feed.isLiked ? 'bg-opacity-50' : 'bg-opacity-0'} z-10 flex justify-center items-center text-[20px] text-white`}>
                          {feed.isLiked && '✔'}
                        </div>
                        <img src={feed.imageUrl} className="w-full h-full object-cover" />
                      </div>
                    ))
                  ) : (
                    'No feeds available'
                  )
                ) : (
                  <div>로딩 중입니다...</div> // 로딩 중일 때 표시할 내용
                )}
              </span>
            </>
          )}
          {PageNum === 8 && (
            <>
              <img src={IMG_STEP07} alt="" className="w-full h-full object-cover" />
              <span className="text-[15px] top-[5px] left-[8px] absolute text-[#645E59] font-extrabold">
                {PageNum}/10
              </span>
              <div className="right-[8px] top-[5px] absolute">
                <ButtonNext text="다음" onClick={handlePageNum} />
              </div>
              <span className="text-md top-[26px] absolute text-center left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                친구에게 연락이 왔어요!<br />
                어디로 여행을 가는게 좋을까요?
              </span>
              <span className="text-sm mt-2 top-[65px] absolute text-center left-1/2 transform -translate-x-1/2 whitespace-nowrap text-gray-300">
                5개 이상 선택해주세요
              </span>
              <span className="top-[90px] mt-2 absolute text-center left-1/2 transform -translate-x-1/2 whitespace-nowrap text-[#878787] grid grid-cols-3 w-full">
              {!loading ? (
                  feeds && feeds.length > 0 ? (
                    feeds.map(feed => (
                      <div key={feed.id} className="w-full max-h-[110px] h-[110px] border overflow-hidden relative" onClick={() => toggleLike(feed.id)}>
                        <div className={`absolute inset-0 bg-black ${feed.isLiked ? 'bg-opacity-50' : 'bg-opacity-0'} z-10 flex justify-center items-center text-[20px] text-white`}>
                          {feed.isLiked && '✔'}
                        </div>
                        <img src={feed.imageUrl} className="w-full h-full object-cover" />
                      </div>
                    ))
                  ) : (
                    'No feeds available'
                  )
                ) : (
                  <div>로딩 중입니다...</div> // 로딩 중일 때 표시할 내용
                )}
              </span>
            </>
          )}
          {PageNum === 9 && (
            <>
              <img src={IMG_STEP07} alt="" className="w-full h-full object-cover" />
              <span className="text-[15px] top-[5px] left-[8px] absolute text-[#645E59] font-extrabold">
                {PageNum}/10
              </span>
              <div className="right-[8px] top-[5px] absolute">
                <ButtonNext text="다음" onClick={handlePageNum} />
              </div>
              <span className="text-md top-[26px] absolute text-center left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                숙소는 어디가 좋을까요?
              </span>
              <span className="text-sm top-[50px] absolute text-center left-1/2 transform -translate-x-1/2 whitespace-nowrap text-gray-300">
                5개 이상 선택해주세요
              </span>
              <span className="top-[90px] absolute text-center left-1/2 transform -translate-x-1/2 whitespace-nowrap text-[#878787] grid grid-cols-3 w-full">
              {!loading ? (
                  feeds && feeds.length > 0 ? (
                    feeds.map(feed => (
                      <div key={feed.id} className="w-full max-h-[110px] h-[110px] border overflow-hidden relative" onClick={() => toggleLike(feed.id)}>
                        <div className={`absolute inset-0 bg-black ${feed.isLiked ? 'bg-opacity-50' : 'bg-opacity-0'} z-10 flex justify-center items-center text-[20px] text-white`}>
                          {feed.isLiked && '✔'}
                        </div>
                        <img src={feed.imageUrl} className="w-full h-full object-cover" />
                      </div>
                    ))
                  ) : (
                    'No feeds available'
                  )
                ) : (
                  <div>로딩 중입니다...</div> // 로딩 중일 때 표시할 내용
                )}
              </span>
            </>
          )}
          {PageNum === 10 &&(
            //설문페이지_STEP10
            <>
            <img src={IMG_STEP08} alt="" className="w-full h-full object-cover" />
              <span className="text-[15px] top-[5px] left-[8px] absolute text-[#645E59] font-extrabold">
                {PageNum}/10
              </span>
              <span className="text-md text-white top-[50px] absolute text-center left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                내일은 신나는 주말이에요!<br/>
                어떻게 보내면 좋을까요?
              </span>
              <button
                className="w-[250px] h-[70px] bg-black bg-opacity-30 absolute top-[150px] rounded-[30px] left-1/2 transform -translate-x-1/2 flex justify-center items-center"
                onClick={handleMBTI}
                value={'A'}
              >
                <span className="text-white font-medium text-[15px]">
                  여기저기 놀러다니며<br/>
                  에너지 충전!
                </span>
              </button>
              <button
                className="w-[250px] h-[70px] bg-black bg-opacity-30 absolute top-[250px] rounded-[30px] left-1/2 transform -translate-x-1/2 flex justify-center items-center"
                onClick={handleMBTI}
                value={'R'}
              >
                <span className="text-white font-medium text-[15px]">
                  이불밖은 위험해!<br/>
                  집안에서!
                </span>
              </button>
            </>
          )}
          {PageNum === 11 && (
            // 설문 결과 페이지
            <>
              <div className='flex flex-col justify-between items-center gap-3 overflow-auto h-full pt-[20px] pb-[20px]'>
                <div className="flex justify-between flex-row w-full px-6">
                <button
                    className="w-[50px] h-[50px] bg-[#B8B1AB] rounded-[25px] flex justify-center items-center text-[12px] text-white"
                    onClick={handleRegister}
                  >
                    여행가기
                  </button>
                  <img
                    src={IMG_Logo}
                    alt="메인로고"
                    className="w-[50px] h-[50px]"
                  />
                </div>
                <div className ="text-center text-[#597B28] text-[25px] font-bold">
                  나의 여행 성향은
                </div>
                <div className="text-[18px] top-[50px]">
                  <MBTIRenderer mbti={MBTI}/>
                </div>
                <button
                  className="w-[200px] h-[50px] min-h-[50px] bg-[#B8B1AB] bottom-0 rounded-[25px] flex justify-center items-center text-[24px] text-white"
                  onClick={handleRegister}
                >
                  여행가기
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  )
}