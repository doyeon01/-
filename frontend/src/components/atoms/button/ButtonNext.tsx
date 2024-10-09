import React from 'react'
import Vector from '../../../assets/statics/Vector.png'

export interface Props {
    text: string; 
    onClick?: () => void;
}

export const ButtonNext:React.FC<Props>=({text, onClick})=>{
    return(
        <button className='w-[50px] h-[23px] rounded-[6px] bg-white flex justify-center items-center gap-[2px]' onClick={onClick}>
            <div className='text-[12px] text-black'>
                {text}
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-3">
            <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
            </svg>

        </button>
    )
}