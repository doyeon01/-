import React from 'react'

interface Props {
    name: string;
    position: string;
  }


  const CardPlanFav: React.FC<Props> = ({ name, position }) => {
  return (
    <div className='flex flex-row items-center justify-center mt-[35px] gap-3'>
        <div className='w-[130px] h-[130px] bg-green-200'/>
          <div className='flex flex-col items-start justify-start'>
            <span className='text-[14px]'>
              {name}
            </span>
            <span className='text-[10px]'>
              {position}
            </span>
          </div>
      </div>
  )
}

export default CardPlanFav