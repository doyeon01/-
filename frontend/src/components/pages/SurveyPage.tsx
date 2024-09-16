import React, {useState} from 'react'

import IMG_BG from '../../assets/statics/survey_background.png'
import IMG_Logo from '../../assets/statics/handam_logo.png'
import IMG_STEP01 from '../../assets/statics/survey_step01.png'
import IMG_STEP02 from '../../assets/statics/survey_step02.png'
import VID_start from '../../assets/statics/survey_strart.mp4'

import { GenderSelector } from '../atoms/input/GenderSelectorSurvey'
import { ButtonNext } from '../atoms/button/ButtonNext'

export const SurveyPage: React.FC = () => {
  const [PageNum, setPageNum] = useState(0)
  const [IsHide,setIsHide] = useState(true)
  const [Gender,setGender] = useState('')
  const [MBTI,setMBTI] = useState('')

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
    setPageNum(PageNum=>PageNum+1)
    console.log('Current MBTI : ', value)
  }

  return (
    <>
      <div data-label='배경이미지[수정필요]'
      style={{ backgroundImage: `url(${IMG_BG})` }}
      className='w-full h-screen bg-contain bg-no-repeat bg-center relative'>
        <div data-label='MBTI레이아웃'
        className='bg-white w-[452px] max-h-full h-[975px] fixed right-1/4 rounded-[15px] top-1/2 transform -translate-y-1/2 overflow-hidden leading-tight'>
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
                  <div className='text-[20px] top-[9px] left-[8px] absolute text-[#645E59] font-extrabold'>
                    {PageNum+1}/11
                  </div>
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
                {PageNum+1}/11
              </span>
              <span className='text-[20px] top-[136px] absolute text-center left-1/2 transform -translate-x-1/2 whitespace-nowrap'>
                좋은 아침이에요!<br/>
                창밖을 바라보니 풍경이 너무 좋네요!<br/>
                밖이 어떤 풍경인가요?
              </span>
              <button className='w-[370px] h-[110px] bg-black bg-opacity-30 absolute top-[254px] rounded-[50px] left-1/2 transform -translate-x-1/2 flex justify-center items-center ' onClick={handleMBTI} value={'N'}>
                <span className='text-white font-medium text-[20px]'>
                나무가 우거진 숲
                </span>
              </button>
              <button className='w-[370px] h-[110px] bg-black bg-opacity-30 absolute top-[404px] rounded-[50px] left-1/2 transform -translate-x-1/2 flex justify-center items-center' onClick={handleMBTI} value={'C'}>
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
                {PageNum+1}/11
              </span>
              <span className='text-[20px] top-[136px] absolute text-center left-1/2 transform -translate-x-1/2 whitespace-nowrap'>
                출근하는 길에<br/>
                문득 예쁜 풍경을 발견한 당신은
              </span>
              <button className='w-[370px] h-[110px] bg-black bg-opacity-30 absolute top-[254px] rounded-[50px] left-1/2 transform -translate-x-1/2 flex justify-center items-center ' onClick={handleMBTI} value={'K'}>
                <span className='text-white font-medium text-[20px]'>
                당장 핸드폰을 들어 사진을 찍는다.
                </span>
              </button>
              <button className='w-[370px] h-[110px] bg-black bg-opacity-30 absolute top-[404px] rounded-[50px] left-1/2 transform -translate-x-1/2 flex justify-center items-center' onClick={handleMBTI} value={'U'}>
                <span className='text-white font-medium text-[20px]'>
                잠시 눈에 담은 뒤 시선을 거둔다.
                </span>
              </button>
            </>
          )}
          {PageNum === 3 &&(
            <>
            
            </>
          )}
        </div>
      </div>
    </>
  )
}
