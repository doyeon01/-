import {PlaceIcon, FoodIcon, CafeIcon, HotelIcon } from '../../assets/icons/svg'; // 아이콘 임포트

interface ScheduleItem {
  type: string;
  name: string;
  description: string;
  likes: number;
  image: string;
}

interface DaySchedule {
  day: string;
  schedule: ScheduleItem[];
}

const ScheduleItemComponent: React.FC<{ item: ScheduleItem; isLast: boolean }> = ({ item, isLast }) => {
  const renderIcon = () => {
    switch (item.type) {
      case '관광지':
        return <PlaceIcon />;
      case '음식점':
        return <FoodIcon />;
      case '카페':
        return <CafeIcon />;
      case '숙소':
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
        <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded-lg" />
        <div>
          <div className='flex gap-2'>
            <h3 className="font-bold text-xl">{item.type} | {item.name}</h3>
          </div>
          <p className="text-sm text-gray-600 pt-2">{item.description}</p>
       
        </div>
      </div>
    </div>
  );
};

// 날짜별 일정 컴포넌트
export const DayPlan: React.FC<{ daySchedule: DaySchedule }> = ({ daySchedule }) => {
  return (
    <div className="my-8">
      <div className="flex justify-center items-center space-x-4 mb-4">
        <div className='flex flex-col gap-2'>
          <h2 className="text-xl font-bold">{daySchedule.day}</h2>
        </div>
      </div>
      <div>
        {daySchedule.schedule.map((item, index) => (
          <ScheduleItemComponent 
            key={index} 
            item={item} 
            isLast={index === daySchedule.schedule.length - 1}  // 마지막 아이템 여부 전달
          />
        ))}
      </div>
    </div>
  );
};
