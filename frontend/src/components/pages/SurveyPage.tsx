import React, {useState} from 'react'
import { NavLink } from 'react-router-dom';

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

import { GenderSelector } from '../atoms/input/GenderSelectorSurvey'
import { ButtonNext } from '../atoms/button/ButtonNext'

export const SurveyPage: React.FC = () => {
  const [PageNum, setPageNum] = useState(0)
  const [IsHide,setIsHide] = useState(true)
  const [Gender,setGender] = useState('')
  const [MBTI,setMBTI] = useState('')
  const [Fading,setFading] = useState(false)

  const handlePageNum =()=>{
    setPageNum(PageNum=>PageNum+1)
  }

  const handleIsHide = ()=>{
    setIsHide(IsHide=>!IsHide)
  }

  const handleGender = (e:React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setGender(value);
    console.log('Current Gender : ', value);
  };

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
      <div data-label='배경이미지[수정필요]'
      style={{ backgroundImage: `url(${IMG_BG})` }}
      className='w-full h-screen bg-contain bg-no-repeat bg-center relative'>
        <div data-label='MBTI레이아웃'
        className='bg-white w-[452px] max-h-full h-[975px] fixed right-1/4 rounded-[15px] top-1/2 transform -translate-y-1/2 overflow-hidden leading-tight'>
          <div  className={`w-full h-full absolute bg-black transition-opacity duration-500 ${Fading ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'} z-10`} />
          {PageNum === 0 && (
            //시작페이지
            <>
              <video autoPlay loop muted src={VID_start} className='absolute -z-10 w-full h-full object-cover'/> 
              {IsHide ? (
                <>
                  <img src={IMG_Logo} alt="메인로고" className='z-0 right-[33px] top-[22px] w-[70px] h-[70px] absolute'/>
                  <span className='absolute top-1/3 left-1/2 transform -translate-x-1/2 text-[50px] whitespace-nowrap'>여행 성향 진단</span>
                  <button data-label='시작하기버튼'
                  className='absolute w-[280px] h-[78px] bg-black top-3/4 left-1/2 transform -translate-x-1/2 rounded-[15px] flex justify-center items-center text-[40px] text-white' onClick={handleIsHide}>
                  시작하기
                  </button>
                </>
              ):(
                //정보입력페이지
                <>
                  
                  <div className='right-[10px] top-[11px] absolute'>
                  <ButtonNext OnChange={handlePageNum}/>
                  </div>
                  <span className='block mt-[137px] mb-[47px] text-[30px] whitespace-nowrap text-center'>여행을 떠나기 전에 <br/>간단한 소개를 부탁드려요</span>
                  <div className='gap-6 mb-6 flex flex-col items-center'>
                    <input type='text' id='nickname' className='w-[360px] h-[88px] rounded-[20px] text-center text-[30px] focus:outline-none resize-none' placeholder='닉네임'/>
                    <input type='text' id='birth' className='w-[360px] h-[88px] rounded-[20px] text-center text-[30px] focus:outline-none resize-none' placeholder='생년월일'/>
                    <GenderSelector Gender={Gender} OnGenderChange={handleGender}/>
                    <textarea id='address' className='w-[360px] h-[88px] rounded-[20px] text-center text-[30px] focus:outline-none resize-none' placeholder='거주지'/>
                    <textarea id='introduce' className='w-[360px] h-[176px] rounded-[20px] text-center text-[30px] focus:outline-none resize-none' placeholder='자기소개'/>
                  </div>
                </>
              )}
            </>
          )}
          {PageNum === 1 &&(
            //설문페이지_STEP1
            <>
            <img src={IMG_STEP01} alt="" />
              <span className='text-[20px] top-[9px] left-[8px] absolute text-[#645E59] font-extrabold'>
                {PageNum}/10
              </span>
              <span className='text-[20px] top-[76px] absolute text-center left-1/2 transform -translate-x-1/2 whitespace-nowrap'>
                좋은 아침이에요!<br/>
                창밖을 바라보니 풍경이 너무 좋네요!<br/>
                밖이 어떤 풍경인가요?
              </span>
              <button className='w-[370px] h-[110px] bg-black bg-opacity-30 absolute top-[194px] rounded-[50px] left-1/2 transform -translate-x-1/2 flex justify-center items-center' onClick={handleMBTI} value={'N'}>
                <span className='text-white font-medium text-[20px]'>
                나무가 우거진 숲
                </span>
              </button>
              <button className='w-[370px] h-[110px] bg-black bg-opacity-30 absolute top-[344px] rounded-[50px] left-1/2 transform -translate-x-1/2 flex justify-center items-center' onClick={handleMBTI} value={'C'}>
                <span className='text-white font-medium text-[20px]'>
                세련미가 넘치는 도시
                </span>
              </button>
            </>
          )}
          {PageNum === 2 &&(
            //설문페이지_STEP2
            <>
            <img src={IMG_STEP02} alt="" />
              <span className='text-[20px] top-[9px] left-[8px] absolute text-[#645E59] font-extrabold'>
                {PageNum}/10
              </span>
              <span className='text-[20px] top-[76px] absolute text-center left-1/2 transform -translate-x-1/2 whitespace-nowrap'>
                출근하는 길에<br/>
                문득 예쁜 풍경을 발견한 당신은
              </span>
              <button className='w-[370px] h-[110px] bg-black bg-opacity-30 absolute top-[194px] rounded-[50px] left-1/2 transform -translate-x-1/2 flex justify-center items-center ' onClick={handleMBTI} value={'P'}>
                <span className='text-white font-medium text-[20px]'>
                당장 핸드폰을 들어 사진을 찍는다.
                </span>
              </button>
              <button className='w-[370px] h-[110px] bg-black bg-opacity-30 absolute top-[344px] rounded-[50px] left-1/2 transform -translate-x-1/2 flex justify-center items-center' onClick={handleMBTI} value={'E'}>
                <span className='text-white font-medium text-[20px]'>
                잠시 눈에 담은 뒤 시선을 거둔다.
                </span>
              </button>
            </>
          )}
          {PageNum === 3 &&(
            //설문페이지_STEP3
            <>
            <img src={IMG_STEP03} alt="" />
              <span className='text-[20px] top-[9px] left-[8px] absolute text-[#645E59] font-extrabold'>
                {PageNum}/10
              </span>
              <span className='text-[20px] top-[76px] absolute text-center left-1/2 transform -translate-x-1/2 whitespace-nowrap'>
                새로운 업무가 도착했습니다!<br/>
                어떻게 시작할까요?
              </span>
              <button className='w-[370px] h-[110px] bg-black bg-opacity-30 absolute top-[194px] rounded-[50px] left-1/2 transform -translate-x-1/2 flex justify-center items-center ' onClick={handleMBTI}>
                <span className='text-white font-medium text-[20px]'>
                마스터 플랜은 필수!<br/>
                체계적으로 계획을 세운 후 시작하기
                </span>
              </button>
              <button className='w-[370px] h-[110px] bg-black bg-opacity-30 absolute top-[344px] rounded-[50px] left-1/2 transform -translate-x-1/2 flex justify-center items-center' onClick={handleMBTI}>
                <span className='text-white font-medium text-[20px]'>
                머리 속 가장 먼저 떠오르는<br/>
                아이디어부터 당장 실행해보기
                </span>
              </button>
            </>
          )}
          {PageNum === 4 &&(
            //설문페이지_STEP4
            <>
            <img src={IMG_STEP04} alt="" />
              <span className='text-[20px] top-[9px] left-[8px] absolute text-[#645E59] font-extrabold'>
                {PageNum}/10
              </span>
              <span className='text-[20px] top-[76px] absolute text-center left-1/2 transform -translate-x-1/2 whitespace-nowrap'>
                오후 세시, 졸음이 쏟아지는 시간입니다.<br/>
                잠을 깨기 위해 무엇을 하면 좋을까요?
              </span>
              <button className='w-[370px] h-[110px] bg-black bg-opacity-30 absolute top-[194px] rounded-[50px] left-1/2 transform -translate-x-1/2 flex justify-center items-center ' onClick={handleMBTI}>
                <span className='text-white font-medium text-[20px]'>
                잠깨는데 수다만한게 없죠!<br/>
                동료들과 이야기를 나눠요
                </span>
              </button>
              <button className='w-[370px] h-[110px] bg-black bg-opacity-30 absolute top-[344px] rounded-[50px] left-1/2 transform -translate-x-1/2 flex justify-center items-center' onClick={handleMBTI}>
                <span className='text-white font-medium text-[20px]'>
                잠시 바람을 쐬며<br/>
                혼자 산책을 다녀와요
                </span>
              </button>
            </>
          )}
          {PageNum === 5 &&(
            //설문페이지_STEP5
            <>
            <img src={IMG_STEP05} alt="" />
              <span className='text-[20px] top-[9px] left-[8px] absolute text-[#645E59] font-extrabold'>
                {PageNum}/10
              </span>
              <span className='text-[20px] top-[76px] absolute text-center left-1/2 transform -translate-x-1/2 whitespace-nowrap'>
                야호! 드디어 퇴근입니다.<br/>
                오늘은 왠지 수고한 나를 위해 맛있는<br/>
                저녁식사를 하고 싶어요. 어디서<br/>
                식사를 할까요?
              </span>
              <button className='w-[370px] h-[110px] bg-black bg-opacity-30 absolute top-[194px] rounded-[50px] left-1/2 transform -translate-x-1/2 flex justify-center items-center ' onClick={handleMBTI} value={'K'}>
                <span className='text-white font-medium text-[20px]'>
                평점이 좋은 유명한 식당
                </span>
              </button>
              <button className='w-[370px] h-[110px] bg-black bg-opacity-30 absolute top-[344px] rounded-[50px] left-1/2 transform -translate-x-1/2 flex justify-center items-center' onClick={handleMBTI} value={'U'}>
                <span className='text-white font-medium text-[20px]'>
                친구에게 추천받은 처음듣는 식당
                </span>
              </button>
            </>
          )}
          {PageNum === 6 &&(
            //설문페이지_STEP6
            <>
            <img src={IMG_STEP06} alt="" />
              <span className='text-[20px] top-[9px] left-[8px] absolute text-[#645E59] font-extrabold'>
                {PageNum}/10
              </span>
              <div className='right-[10px] top-[11px] absolute'>
                <ButtonNext OnChange={handlePageNum}/>
              </div>
              <span className='text-[20px] top-[26px] absolute text-center left-1/2 transform -translate-x-1/2 whitespace-nowrap'>
                어떤 음식이 마음에 드시나요?
              </span>
              <span className='text-[20px] top-[127px] absolute text-center left-1/2 transform -translate-x-1/2 whitespace-nowrap text-[#878787]'>
                5개 이상 선택해주세요
              </span>
              <div className='text-[20px] top-[200px] absolute text-center left-1/2 transform -translate-x-1/2 text-[#878787]'>
                사진 들어갈 곳 <br/>애니메이션으로 순차적으로 위로 따다닥 붙게 만들면 멋있지 않을까
              </div>
            </>
          )}
          {PageNum === 7 &&(
            //설문페이지_STEP7
            <>
            <img src={IMG_STEP06} alt="" />
              <span className='text-[20px] top-[9px] left-[8px] absolute text-[#645E59] font-extrabold'>
                {PageNum}/10
              </span>
              <div className='right-[10px] top-[11px] absolute'>
                <ButtonNext OnChange={handlePageNum}/>
              </div>
              <span className='text-[20px] top-[26px] absolute text-center left-1/2 transform -translate-x-1/2 whitespace-nowrap'>
                후식으로는 어떤 게 좋을까요?
              </span>
              <span className='text-[20px] top-[127px] absolute text-center left-1/2 transform -translate-x-1/2 whitespace-nowrap text-[#878787]'>
                5개 이상 선택해주세요
              </span>
              <div className='text-[20px] top-[200px] absolute text-center left-1/2 transform -translate-x-1/2 text-[#878787]'>
                사진 들어갈 곳22 <br/>애니메이션으로 순차적으로 위로 따다닥 붙게 만들면 멋있지 않을까
              </div>
            </>
          )}
          {PageNum === 8 &&(
            //설문페이지_STEP8
            <>
            <img src={IMG_STEP07} alt="" />
              <span className='text-[20px] top-[9px] left-[8px] absolute text-[#645E59] font-extrabold'>
                {PageNum}/10
              </span>
              <div className='right-[10px] top-[11px] absolute'>
                <ButtonNext OnChange={handlePageNum}/>
              </div>
              <span className='text-[20px] top-[26px] absolute text-center left-1/2 transform -translate-x-1/2 whitespace-nowrap'>
                친구에게 연락이 왔어요!<br/>
                어디로 여행을 가는게 좋을까요?
              </span>
              <span className='text-[20px] top-[127px] absolute text-center left-1/2 transform -translate-x-1/2 whitespace-nowrap text-white]'>
                5개 이상 선택해주세요
              </span>
              <div className='text-[20px] top-[200px] absolute text-center left-1/2 transform -translate-x-1/2 '>
                사진 들어갈 곳33 <br/>애니메이션으로 순차적으로 위로 따다닥 붙게 만들면 멋있지 않을까
              </div>
            </>
          )}
          {PageNum === 9 &&(
            //설문페이지_STEP9
            <>
            <img src={IMG_STEP07} alt="" />
              <span className='text-[20px] top-[9px] left-[8px] absolute text-[#645E59] font-extrabold'>
                {PageNum}/10
              </span>
              <div className='right-[10px] top-[11px] absolute'>
                <ButtonNext OnChange={handlePageNum}/>
              </div>
              <span className='text-[20px] top-[26px] absolute text-center left-1/2 transform -translate-x-1/2 whitespace-nowrap'>
                숙소는 어디가 좋을까요?
              </span>
              <span className='text-[20px] top-[127px] absolute text-center left-1/2 transform -translate-x-1/2 whitespace-nowrap text-white]'>
                5개 이상 선택해주세요
              </span>
              <div className='text-[20px] top-[200px] absolute text-center left-1/2 transform -translate-x-1/2 '>
                사진 들어갈 곳44 <br/>애니메이션으로 순차적으로 위로 따다닥 붙게 만들면 멋있지 않을까
              </div>
            </>
          )}
          {PageNum === 10 &&(
            //설문페이지_STEP10
            <>
             <img src={IMG_STEP08} alt="" />
              <span className='text-[20px] top-[9px] left-[8px] absolute text-[#645E59] font-extrabold'>
                {PageNum}/10
              </span>
              <span className='text-[20px] top-[76px] absolute text-center left-1/2 transform -translate-x-1/2 whitespace-nowrap text-white'>
                내일은 신사는 주말이에요!<br/>
                어떻게 보내면 좋을까요?
              </span>
              <button className='w-[370px] h-[110px] bg-[#878787] bg-opacity-30 absolute top-[194px] rounded-[50px] left-1/2 transform -translate-x-1/2 flex justify-center items-center ' onClick={handleMBTI} value={'A'}>
                <span className='text-white font-medium text-[20px]'>
                여기저기 놀러다니며<br/>
                에너지 충전!
                </span>
              </button>
              <button className='w-[370px] h-[110px] bg-[#878787] bg-opacity-30 absolute top-[344px] rounded-[50px] left-1/2 transform -translate-x-1/2 flex justify-center items-center' onClick={handleMBTI} value={'R'}>
                <span className='text-white font-medium text-[20px]'>
                이불밖은 위험해!<br/>
                집안에서!
                </span>
              </button>
            </>
          )}
          {PageNum === 11 &&(
            //설문 결과
            <>
            <img src={IMG_Logo} alt="메인로고" className='z-0 right-[33px] top-[22px] w-[70px] h-[70px] absolute'/>
            <div className='text-[20px] top-[76px] absolute text-center left-1/2 transform -translate-x-1/2 whitespace-nowrap'>
             {MBTI}
            </div>
            <NavLink to="/main" className='absolute w-[280px] h-[78px] bg-[#B8B1AB] top-[214px] left-1/2 transform -translate-x-1/2 rounded-[35px] flex justify-center items-center text-[40px] text-white'>
              여행가기
            </NavLink>
            <div className='text-[20px] top-[400px] absolute text-center left-1/2 transform -translate-x-1/2'>
              텍스트 들어갈 곳 + 이미지 들어갈 곳
            </div>
            </>
          )}
        </div>
      </div>
    </>
  )
}
