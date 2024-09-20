import React from 'react'
import Vector from '../../../assets/statics/Vector.png'

interface Props {
    text: string; 
    onClick?: () => void;
}

export const ButtonNext:React.FC<Props>=({text, onClick})=>{
    return(
        <button className='w-[72px] h-[33px] rounded-[10px] bg-[#707C60] flex justify-center items-center gap-[3px]' onClick={onClick}>
            <div className='text-[20px] text-white'>
                {text}
            </div>
            <img src={Vector} alt="벡터"/>
        </button>
    )
}