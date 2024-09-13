import React, {useState} from 'react'

import IMG_BG from '../../assets/statics/survey_background.png'
import IMG_Logo from '../../assets/statics/handam_logo.png'
import VID_start from '../../assets/statics/survey_strart.mp4'



export const SurveyPage: React.FC = () => {
  const [PageNum, setPageNum] = useState(0)
  const [IsHide,setIsHide] = useState(true)

  const handlePageNum =()=>{
    setPageNum(PageNum=>PageNum+1)
  }

  const handleIsHide = ()=>{
    setIsHide(IsHide=>!IsHide)
  }

  return (
    <>
      <div data-label='배경이미지[수정필요]'
      style={{ backgroundImage: `url(${IMG_BG})` }}
      className='w-full h-screen bg-contain bg-no-repeat bg-center relative'>
        <div data-label='MBTI레이아웃'
        className='bg-white w-[452px] max-h-full h-[975px] fixed right-1/4 rounded-[15px] top-1/2 transform -translate-y-1/2 overflow-hidden'>
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
                <>
                  <div className='gap-6 mb-6 flex flex-col items-center'>
                    <textarea id='nickname' className='w-[360px] h-[88px] rounded-[20px] text-center text-[30px] focus:outline-none resize-none' placeholder='닉네임'/>
                    <textarea id='birth' className='w-[360px] h-[88px] rounded-[20px] text-center text-[30px] focus:outline-none resize-none' placeholder='생년월일'/>
                    <div className='flex justify-center items-center gap-[10px]'>
                      <label htmlFor='gender1' className='w-[175px] h-[88px] rounded-[20px] bg-white flex flex-row justify-center items-center cursor-pointer'>
                        <input type='radio' id='gender1' className='hidden' value='MALE'/>
                        <span>옵1</span>
                      </label>
                      <label htmlFor='gender2' className='w-[175px] h-[88px] rounded-[20px] bg-white flex flex-row justify-center items-center cursor-pointer'>
                        <input type='radio' id='gender2' className='hidden' value='FEMALE'/>
                        <span>옵2</span>
                      </label>
                    </div>
                    <textarea id='address' className='w-[360px] h-[88px] rounded-[20px] text-center text-[30px] focus:outline-none resize-none' placeholder='거주지'/>
                    <textarea id='introduce' className='w-[360px] h-[176px] rounded-[20px] text-center text-[30px] focus:outline-none resize-none' placeholder='자기소개'/>
                  </div>
                </>
              )}
              
            </>
          )}
          {PageNum === 1 &&(
            //인적사항
            <>
            
            </>
          )}
        </div>
      </div>
    </>
  )
}
