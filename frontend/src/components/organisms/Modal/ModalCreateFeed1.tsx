import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PlanListApi } from '../../../services/api/PlanService'
import { PlanListType, PlanListResponseType } from '../../../model/MyPageType'; 
import { OutIcon } from '../../../assets/icons/svg';
export { OutIcon } from '../../../assets/icons/svg'
   

const ModalCreateFeed1: React.FC<{ onSelectSchedule: (id: number, title: string) => void, onClose: () => void }> = ({ onSelectSchedule, onClose }) => {
  const [planList, setPlanList] = useState<PlanListType[]>([])
  const nav = useNavigate()

  useEffect(() => {
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
  }, [])

  return (
    <div className="h-full overflow-y-auto p-4 relative">
      <button className="absolute top-[-5px] right-0 text-gray-500 hover:text-gray-700" onClick={onClose}>
        &times;
      </button>

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-center flex-grow pl-14">일정을 선택하세요</h2>
        <button className="bg-[#707c60] text-white px-4 py-2 rounded-lg ml-auto" onClick={() => onSelectSchedule(0, '새 게시물 등록')}>
          건너뛰기
        </button>
      </div>
      
      <div className="grid grid-cols-3 gap-4">
        {planList.length > 0 ? (
          planList.map((plan) => (
            <div
              key={plan.id}
              className="relative overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => onSelectSchedule(plan.id, plan.title)}
            >
              <img
                src={plan.thumbNailImageUrl}
                alt={plan.title}
                className="w-full h-40 object-cover rounded-lg"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2 text-sm text-center">
                {plan.title}
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-3 flex justify-center items-center h-80 mt-14 bg-[#e5e2d9] rounded-lg">
            <p className="text-[#b6afa9] text-xl pr-2 ">여행일정이 없습니다</p> 
            <OutIcon onClick={() => nav('/plan')}/>
          </div>
        )}
      </div>

    </div>
  );
};

export default ModalCreateFeed1;
