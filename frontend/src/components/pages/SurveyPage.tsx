import React from 'react'

import IMG_BG from '../../assets/statics/survey_background.png'
import IMG_Logo from '../../assets/statics/handam_logo.png'
import VID_start from '../../assets/statics/survey_strart.mp4'



export const SurveyPage: React.FC = () => {
  return (
    <>
      <div data-label='배경이미지[수정필요]'
      style={{ backgroundImage: `url(${IMG_BG})` }}
      className='w-full h-screen bg-contain bg-no-repeat bg-center relative'>
        <div data-label='MBTI레이아웃'
        className='bg-white w-[452px] max-h-full h-[975px] fixed right-1/4 rounded-[15px] top-1/2 transform -translate-y-1/2 overflow-hidden'>
          <video autoPlay loop src={VID_start} className='absolute -z-10 w-full h-full object-cover'/>
          <img src={IMG_Logo} alt="메인로고" className='z-0 right-[33px] top-[22px] w-[70px] h-[70px] absolute'/>
          <span className='absolute top-1/3 left-1/2 transform -translate-x-1/2 text-[50px] whitespace-nowrap'>여행 성향 진단</span>
          <button data-label='시작하기버튼'
          className='absolute w-[280px] h-[78px] bg-black top-3/4 left-1/2 transform -translate-x-1/2 rounded-[15px] flex justify-center items-center text-[40px] text-white'>
          시작하기
          </button>
        </div>
      </div>
    </>
  )
}
