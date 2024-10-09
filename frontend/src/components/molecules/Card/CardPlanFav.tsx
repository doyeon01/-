import React from 'react'
import { FeedType } from '../../../model/SearchingFeedType';

interface Props {
    name: string;
    position: string;
    feeds : FeedType[];
  }


  const CardPlanFav: React.FC<Props> = ({ name, position, feeds}) => {
  return (
    <div className='flex flex-row items-center justify-center mt-[35px] gap-3 max-w-[250px]'>
        <div className='w-[130px] h-[130px] bg-white grid grid-cols-2'>
          {feeds && feeds.length >0 ?(
            feeds.slice(0,4).map(items=>(
              <div key ={items.id} className='w-[65px] h-[65px]'>
                <img src={items.imageUrl} alt="" className='w-full h-full object-fit'/>
              </div>
            )
          )):'No Feed'}
        </div>
        <div className='flex flex-col items-start justify-start w-[110px] text-left'>
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