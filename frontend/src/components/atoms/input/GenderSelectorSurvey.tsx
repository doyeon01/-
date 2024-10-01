import React from "react";

interface Props {
    Gender:string
    OnGenderChange: (e:React.ChangeEvent<HTMLInputElement>)=>void
}

export const GenderSelector: React.FC<Props> =({Gender, OnGenderChange})=>{
    return(
        <div className='flex justify-center items-center gap-[10px]'>
            <label htmlFor='gender1' className={`w-[120px] h-[50px] rounded-[10px] bg-blue flex flex-row justify-center items-center cursor-pointer ${Gender === 'MALE' ? 'bg-blue-500 text-white' : 'bg-white text-black'}`}>
            <input type='radio' name='gender' id='gender1' className='hidden' value='MALE' onChange={OnGenderChange}/>
            <span>남자</span>
            </label>
            <label htmlFor='gender2' className={`w-[120px] h-[50px] rounded-[10px] bg-blue flex flex-row justify-center items-center cursor-pointer ${Gender === 'FEMALE' ? 'bg-blue-500 text-white' : 'bg-white text-black'}`}>
            <input type='radio' name='gender' id='gender2' className='hidden' value='FEMALE' onChange={OnGenderChange}/>
            <span>여자</span>
            </label>
        </div>
    )
}