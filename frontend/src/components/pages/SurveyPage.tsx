import React, {useEffect, useState} from 'react'
import { NavLink } from 'react-router-dom';
import DaumPostcode from 'react-daum-postcode';

import { GetFeedFood } from '../../services/api/RegisterUser';

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

// import { GenderSelector } from '../atoms/input/GenderSelectorSurvey'
import { ButtonNext } from '../atoms/button/ButtonNext'

export const SurveyPage: React.FC = () => {
  const [PageNum, setPageNum] = useState(0)
  const [IsHide,setIsHide] = useState(true)
  // const [Gender,setGender] = useState('')
  const [MBTI,setMBTI] = useState('')
  const [Fading,setFading] = useState(false)

  const [address, setAddress] = useState(''); // 선택된 주소 상태
  const [openPostcode, setOpenPostcode] = useState(false);

  const [nickname, setNickname] = useState(''); // 닉네임 상태
  const [introduce, setIntroduce] = useState(''); // 자기소개 상태
  const [userData, setUserData] = useState({ nickname: '', address: '', introduce: '' }); // 최종 저장 상태

  const [feeds,setFeeds] = useState<String>('')

  let keyword = ''
  let page = 0
  let size = 0

  useEffect(() => {
    const fetchFeedsData = async () => {
      try {
        const data = await GetFeedFood(keyword, page, size); // 전달받은 인자를 사용
        setFeeds(data); // 데이터 상태 업데이트
      } catch (error) {
        console.error('Error fetching feeds:', error);
      } 
    };

    fetchFeedsData(); // 함수 호출
  }, [keyword, page, size]); // 의존성 배열에 변수를 추가


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
      setUserData({
        nickname: nickname,
        address: address,
        introduce: introduce,
      });
    console.log('저장된 userData:', userData); // 저장된 값 확인
    setPageNum(PageNum=>PageNum+1)
}}

  const handleIsHide = ()=>{
    setIsHide(IsHide=>!IsHide)
  }

  // const handleGender = (e:React.ChangeEvent<HTMLInputElement>) => {
  //   const value = e.target.value;
  //   setGender(value);
  //   console.log('Current Gender : ', value);
  // };

  const handleMBTI = (e:React.MouseEvent<HTMLButtonElement>)=> {
    const value = MBTI + e.currentTarget.value
    setMBTI(value)
    // setPageNum(PageNum=>PageNum+1)
    setFading(true)
    setTimeout(()=>{
      setFading(false)
      setPageNum(PageNum=>PageNum+1)
    },500)
    console.log('Current MBTI : ', value)
  }
  
  

  return (
    <>
      <div
        data-label="배경이미지[수정필요]"
        style={{ backgroundImage: `url(${IMG_BG})` }}
        className="w-full h-screen bg-contain bg-no-repeat bg-center relative"
      >
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
                  <span className="absolute top-[25%] left-1/2 transform -translate-x-1/2 text-[40px] whitespace-nowrap">
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
                  <span className="block mt-[120px] mb-[20px] text-[18px] whitespace-nowrap text-center">
                    여행을 떠나기 전에 <br />
                    간단한 소개를 부탁드려요
                  </span>
                  <div className="gap-4 mb-4 flex flex-col items-center">
                    <input
                      type="text"
                      id="nickname"
                      value={nickname}
                      onChange={(e) => setNickname(e.target.value)} // 닉네임 변경 시 상태 업데이트
                      className="w-[250px] h-[50px] rounded-[10px] text-center text-[18px] focus:outline-none resize-none"
                      placeholder="닉네임"
                      maxLength={10}
                    />
                    {/* <input
                      type="text"
                      id="birth"
                      className="w-[250px] h-[50px] rounded-[10px] text-center text-[18px] focus:outline-none resize-none"
                      placeholder="생년월일"
                    /> */}
                    {/* <GenderSelector Gender={Gender} OnGenderChange={handleGender} /> */}
                    <div
                      className="flex flex-row justify-center items-center w-64 min-h-12 h-full p-6 bg-white rounded-lg text-center text-lg focus:outline-none resize-none border border-gray-300 text-wrap"
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
                      className="w-[250px] min-h-[200px] h-full rounded-[10px] text-center text-[18px] p-6 focus:outline-none resize-none"
                      placeholder="자기소개"
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
              <span className="text-[15px] top-[50px] absolute text-center left-1/2 transform -translate-x-1/2 whitespace-nowrap">
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
              <span className="text-[15px] top-[50px] absolute text-center left-1/2 transform -translate-x-1/2 whitespace-nowrap">
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
              <span className="text-[15px] top-[50px] absolute text-center left-1/2 transform -translate-x-1/2 whitespace-nowrap">
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
              <span className="text-[15px] top-[50px] absolute text-center left-1/2 transform -translate-x-1/2 whitespace-nowrap">
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
              <span className="text-[15px] top-[50px] absolute text-center left-1/2 transform -translate-x-1/2 whitespace-nowrap">
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
              <span className="text-[15px] top-[26px] absolute text-center left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                어떤 음식이 마음에 드시나요?
              </span>
              <span className="text-[15px] top-[90px] absolute text-center left-1/2 transform -translate-x-1/2 whitespace-nowrap text-[#878787]">
                {feeds}
              </span>
              <div className="text-[15px] top-[150px] absolute text-center left-1/2 transform -translate-x-1/2 text-[#878787]">
              
              </div>
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
              <span className="text-[15px] top-[26px] absolute text-center left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                후식으로는 어떤 게 좋을까요?
              </span>
              <span className="text-[15px] top-[90px] absolute text-center left-1/2 transform -translate-x-1/2 whitespace-nowrap text-[#878787]">
                5개 이상 선택해주세요
              </span>
              <div className="text-[15px] top-[150px] absolute text-center left-1/2 transform -translate-x-1/2 text-[#878787]">
                사진 들어갈 곳22 <br />
                애니메이션으로 순차적으로 위로 따다닥 붙게 만들면 멋있지 않을까
              </div>
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
              <span className="text-[15px] top-[26px] absolute text-center left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                친구에게 연락이 왔어요!<br />
                어디로 여행을 가는게 좋을까요?
              </span>
              <span className="text-[15px] top-[90px] absolute text-center left-1/2 transform -translate-x-1/2 whitespace-nowrap text-white">
                5개 이상 선택해주세요
              </span>
              <div className="text-[15px] top-[150px] absolute text-center left-1/2 transform -translate-x-1/2 ">
                사진 들어갈 곳33 <br />
                애니메이션으로 순차적으로 위로 따다닥 붙게 만들면 멋있지 않을까
              </div>
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
              <span className="text-[15px] top-[26px] absolute text-center left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                숙소는 어디가 좋을까요?
              </span>
              <span className="text-[15px] top-[90px] absolute text-center left-1/2 transform -translate-x-1/2 whitespace-nowrap text-white">
                5개 이상 선택해주세요
              </span>
              <div className="text-[15px] top-[150px] absolute text-center left-1/2 transform -translate-x-1/2 ">
              사진 들어갈 곳44 <br/>애니메이션으로 순차적으로 위로 따다닥 붙게 만들면 멋있지 않을까
              </div>
            </>
          )}
          {PageNum === 10 &&(
            //설문페이지_STEP10
            <>
            <img src={IMG_STEP08} alt="" className="w-full h-full object-cover" />
              <span className="text-[15px] top-[5px] left-[8px] absolute text-[#645E59] font-extrabold">
                {PageNum}/10
              </span>
              <span className="text-[15px] top-[50px] absolute text-center left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                내일은 신사는 주말이에요!<br/>
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
              <img
                src={IMG_Logo}
                alt="메인로고"
                className="z-0 right-[25px] top-[20px] w-[50px] h-[50px] absolute"
              />
              <div className="text-[18px] top-[50px] absolute text-center left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                {MBTI}
              </div>
              <NavLink
                to="/main"
                className="absolute w-[200px] h-[50px] bg-[#B8B1AB] top-[150px] left-1/2 transform -translate-x-1/2 rounded-[25px] flex justify-center items-center text-[24px] text-white"
              >
                여행가기
              </NavLink>
              <div className="text-[15px] top-[300px] absolute text-center left-1/2 transform -translate-x-1/2">
                텍스트 들어갈 곳 + 이미지 들어갈 곳
              </div>
            </>
          )}
        </div>
      </div>
    </>
  )
}