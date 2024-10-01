import testImg1 from './../../../assets/statics/test1.jpg';
import testImg2 from './../../../assets/statics/test2.jpg';
import testImg3 from './../../../assets/statics/test3.png';
import { PhotoCard } from './PhtotCard';
import { useSearchAndSort } from '../../../hooks/useSearchAndSort';
import PersonalSearch from '../../atoms/input/PersonalSearch'; 

const mockData = [
  {
    id: 1,
    title: '퇴사 기념 혼자 부산 여행',
    image: testImg1,
    address: '부산광역시', 
    createdDate: '2024-09-07',
  },
  {
    id: 2,
    title: '경기도 파주 졸업여행!',
    image: testImg2,
    address: '경기도 파주시', 
    createdDate: '2024-09-06',
  },
  {
    id: 3,
    title: '나홀로 창원 1박 2일',
    image: testImg3,
    address: '경상남도 창원시', // 주소 추가
    createdDate: '2024-09-11',
  },
];

// PersonalPhotoDetail 컴포넌트
export const PersonalPhotoDetail: React.FC = () => {
  const { filteredArr, onSearch, onSortChange, showAllItems } = useSearchAndSort(
    mockData,
    ['title', 'address'], 
    'createdDate' 
  );
  

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
          filteredArr.map((item) => (
            <PhotoCard
              key={item.id} 
              title={item.title}
              address={item.address}
              testimg={item.image}
              showDownLoadButton={true}
            />
          ))
        ) : (
          <p className="text-center col-span-3">포토카드가 없습니다.</p>
        )}
      </div>
    </>
  );
};
