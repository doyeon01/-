import React from 'react'
import Vector from '../../../assets/statics/Vector.png'

export interface Props {
    text: string; 
    onClick?: () => void;
}

export const ButtonNext:React.FC<Props>=({text, onClick})=>{
    return(
        <button className='w-[50px] h-[23px] rounded-[6px] bg-[#707C60] flex justify-center items-center gap-[2px]' onClick={onClick}>
            <div className='text-[12px] text-white'>
                {text}
            </div>
            <img src={Vector} alt="벡터" className='w-[7px] h-[11px]' />
        </button>
    )
}