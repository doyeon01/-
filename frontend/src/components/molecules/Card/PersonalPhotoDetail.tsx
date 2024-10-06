import { useEffect, useState } from 'react';
import { PhotoCard } from './PhtotCard';
import { useSearchAndSort } from '../../../hooks/useSearchAndSort';
import PersonalSearch from '../../atoms/input/PersonalSearch'; 
import { GetPhotoCardList } from '../../../services/api/PhotoService';
import { PhotoCardResponseType, PhotoCardType } from '../../../model/MyPageType';
import { useRecoilValue } from 'recoil';
import { UserId } from '../../../Recoil/atoms/Auth'; 
import { useInView } from 'react-intersection-observer';

// PersonalPhotoDetail 컴포넌트
export const PersonalPhotoDetail: React.FC = () => {
  const [photoCards, setPhotoCards] = useState<PhotoCardType[]>([]); 
  const [page, setPage] = useState(0); 
  const [hasNextPage, setHasNextPage] = useState(true); 
  const [ref, inView] = useInView(); 
  const userId = useRecoilValue(UserId); 

  // 검색과 정렬을 위한 커스텀 훅
  const { filteredArr, onSearch, onSortChange, showAllItems } = useSearchAndSort(
    photoCards,
    ['feedId'], // 저거 대신 PlanTitle... 있어야 함. 검색 검색 검색할 거 
    'createdDate' 
  );

  // 포토카드 목록을 가져오는 함수
  const fetchPhotoCards = async () => {
    try {
      const data: PhotoCardResponseType = await GetPhotoCardList(userId, page);
      if (data.response.photoCards.length > 0) {
        setPhotoCards((prevCards) => [...prevCards, ...data.response.photoCards]);
        setHasNextPage(data.response.hasNextPage);
      } else {
        setHasNextPage(false); 
      }
    } catch (error) {
      console.error('포토카드 목록 가져오기 실패:', error);
    }
  };

  useEffect(() => {
    if (hasNextPage) {
      fetchPhotoCards();
    }
  }, [page, hasNextPage]);

  useEffect(() => {
    if (inView && hasNextPage) {
      setPage((prevPage) => prevPage + 1); 
    }
  }, [inView, hasNextPage]);

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
          filteredArr.map((item: PhotoCardType) => ( 
            <PhotoCard
              key={item.id} 
              // title={item.PlanTitle}
              testimg={item.photoCardUrl} 
              showDownLoadButton={true}
            />
          ))
        ) : (
          <p className="text-center col-span-3">포토카드가 없습니다.</p>
        )}
      </div>

      <div ref={ref} className="h-10" />
    </>
  );
};
