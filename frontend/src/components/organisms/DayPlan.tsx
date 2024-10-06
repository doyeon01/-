import {PlaceIcon, FoodIcon, CafeIcon, HotelIcon } from '../../assets/icons/svg'; // 아이콘 임포트
import { PlanDetailType, DayPlanType } from '../../model/MyPageType';


const ScheduleItemComponent: React.FC<{ item: PlanDetailType; isLast: boolean }> = ({ item, isLast }) => {
  const renderIcon = () => {
    switch (item.placeType) {
      case 'TOURIST_ATTRACTION':
        return <PlaceIcon />;
      case 'RESTAURANT':
        return <FoodIcon />;
      case 'ETC':
        return <CafeIcon />;
      case 'ACCOMMODATION':
        return <HotelIcon />;
      default:
        return null;
    }
  };

  return (
    <div className="flex items-center space-x-4 my-6">
      <div className="flex flex-col items-center">
        <div className="w-15 h-15 rounded-full bg-white flex items-center justify-center border-4 border-[#645e59] mb-5">
          {renderIcon()}
        </div>
        {!isLast && <div className="w-[2px] bg-[#645E59] h-16"></div>}
      </div>
      <div className="flex items-center space-x-4">
        <img src={item.imageUrl} alt={item.placeName} className="w-24 h-24 object-cover rounded-lg" />
        <div>
          <div className='flex gap-2'>
            <h3 className="font-bold text-xl">{item.placeType} | {item.placeName}</h3>
          </div>
          <p className="text-sm text-gray-600 pt-2">{item.details}</p>
       
        </div>
      </div>
    </div>
  );
};

// 날짜별 일정 컴포넌트
export const DayPlan: React.FC<{ daySchedule: DayPlanType }> = ({ daySchedule }) => {
  return (
    <div className="my-8">
      <div className="flex justify-center items-center space-x-4 mb-4">
        <div className='flex flex-col gap-2'>
          <h2 className="text-xl font-bold">Day {daySchedule.day}</h2>
        </div>
      </div>
      <div>
        {daySchedule.plans.map((item, index) => (
          <ScheduleItemComponent 
            key={index} 
            item={item} 
            isLast={index === daySchedule.plans.length - 1}  // 마지막 아이템 여부 전달
          />
        ))}
      </div>
    </div>
  );
};
