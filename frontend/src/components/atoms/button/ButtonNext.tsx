import React from 'react'
import Vector from '../../../assets/statics/Vector.png'

interface Props {
    OnChange: (e:React.MouseEvent<HTMLButtonElement>) =>void
}

export const ButtonNext:React.FC<Props>=({OnChange})=>{
    return(
        <button className='w-[72px] h-[33px] rounded-[10px] bg-[#707C60] flex justify-center items-center gap-[3px]' onClick={OnChange}>
            <div className='text-[20px] text-white'>
                다음
            </div>
            <img src={Vector} alt="벡터"/>
        </button>
    )
}