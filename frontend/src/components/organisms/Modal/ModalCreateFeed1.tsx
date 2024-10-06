import { useState, useEffect } from 'react';
import { PlanListApi } from '../../../services/api/PlanService'
import { PlanListType, PlanListResponseType } from '../../../model/MyPageType'; 


const ModalCreateFeed1: React.FC<{ onSelectSchedule: (id: number, title: string) => void, onClose: () => void }> = ({ onSelectSchedule, onClose }) => {
  const [planList, setPlanList] = useState<PlanListType[]>([])

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
    <div className="h-full overflow-y-auto p-4 relative">
      <button className="absolute top-0 right-0 text-gray-500 hover:text-gray-700" onClick={onClose}>
        &times;
      </button>

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-center flex-grow">일정을 선택하세요</h2>
        <button className="bg-[#707C60] text-white px-4 py-2 rounded-lg ml-auto" onClick={() => onSelectSchedule(0, '새 게시물 등록')}>
          건너뛰기
        </button>
      </div>
      
      <div className="grid grid-cols-3 gap-4">
        {planList.map((plan) => (
          <div key={plan.id} className="relative overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer" onClick={() => onSelectSchedule(plan.id, plan.title)}>
            <img src={plan.thumbNailImageUrl} alt={plan.title} className="w-full h-40 object-cover rounded-lg" />
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2 text-sm text-center">
              {plan.title}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ModalCreateFeed1;
