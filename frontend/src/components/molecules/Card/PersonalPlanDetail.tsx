import { useEffect, useState } from 'react';
import PersonalSearch from '../../atoms/input/PersonalSearch';
import { useSearchAndSort } from '../../../hooks/useSearchAndSort';
import { PhotoCard } from './PhtotCard';
import { PlanListApi } from '../../../services/api/PlanService'
import { PlanListType, PlanListResponseType } from '../../../model/MyPageType'; 

export const PersonalPlanDetail: React.FC = () => {

  const [planList, setPlanList] = useState<PlanListType[]>([])
  const { filteredArr, onSearch, onSortChange, showAllItems } = useSearchAndSort<PlanListType>(
    planList,
    ['title', 'address'], // 검색에 사용할 필드
    'createdDate'         // 정렬에 사용할 날짜 필드
  );

  useEffect(()=>{

    PlanListApi()
    .then((res) => {
      const data: PlanListResponseType = res.data
      if (data.success) {
        setPlanList(data.response)
      } else {
        console.log('fail')
      }
    })
    .catch((error) => {
          console.error(error);
        })
  },[])

  return (
    <>
      <div className="mb-5">
        <PersonalSearch 
          onSearch={onSearch} 
          showAllItems={showAllItems} 
          onSortChange={onSortChange} 
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {filteredArr.length > 0 ? (
          filteredArr.map((item, index) => (
            <PhotoCard
              key={index}
              totalPlanId={item.id}
              title={item.title}
              startDate={item.startDate}
              endDate={item.endDate}
              address={item.address}
              testimg={item.thumbNailImageUrl}
              showButton={true}  
            />
          ))
        ) : (
          <p className="text-center col-span-3">일정이 없습니다.</p>
        )}
      </div>
    </>
  );
};
