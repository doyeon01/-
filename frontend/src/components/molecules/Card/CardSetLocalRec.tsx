import React, { useEffect, useState } from 'react';
import { getFeed } from '../../../services/api/RegisterUser';
import { FeedType } from '../../../model/SearchingFeedType';
import { postLike, postUnlike } from '../../../services/api/FeedService';
import { useRecoilState } from 'recoil';
import { UserId as UserIdAtom } from '../../../Recoil/atoms/Auth'; 


const regionsTop = ['전국', '서울', '광주', '대전', '대구', '인천', '부산', '울산', '제주'];
const regionsBottom = ['경기', '충북', '충남', '전북', '전남', '경남', '경북', '강원'];
interface CardSetLocalRecProps {
  onClick: (id: number) => void;
}
const CardSetLocalRec: React.FC<CardSetLocalRecProps> = ({onClick}) => {
  const [selectedRegion, setSelectedRegion] = useState<string >('');
  const [places, setPlaces] = useState<FeedType[] | null>(null);
  const [likeStates, setLikeStates] = useState<{ [key: number]: boolean }>({}); 
  const [userId] = useRecoilState(UserIdAtom);  

  const handleButtonClick = (region: string) => {
    setSelectedRegion(region);
  };

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await getFeed(selectedRegion, 1, 5);          
          setPlaces(response.response.feeds);
        } catch (error) {
          console.error('Error fetching recommended feeds:', error);
        }
      };
      fetchData();
    }, [selectedRegion]);

    const toggleLike = async (id: number) => {
      try {
        const currentLike = likeStates[id]; 
        const response = currentLike ? await postUnlike(userId,id) : await postLike(userId,id);
  
        if (response && response.success) {
          setLikeStates((prev) => ({ ...prev, [id]: !currentLike }));
        }
      } catch (error) {
        console.error('좋아요 처리 중 오류 발생:', error);
      }
    };
  return (
    <div className="flex flex-col items-center p-5">
      <div className="flex flex-wrap justify-center">
        {regionsTop.map(region => (
          <button
            key={region}
            className="m-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 transition"
            onClick={() => handleButtonClick(region)}
          >
            #{region}
          </button>
        ))}
      </div>
      
      <div className="flex flex-wrap justify-center mb-4">
        {regionsBottom.map(region => (
          <button
            key={region}
            className="m-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 transition"
            onClick={() => handleButtonClick(region)}
          >
            #{region}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-5">
        {places&&places.length > 0 ? (
          places.map((place, index) => (
            <div
              key={index}
              className="relative overflow-hidden transform scale-90 transition-transform duration-300 hover:scale-100"
              onClick={() => onClick(place.id)}
            >
              <img
                src={place.imageUrl}
                alt={place.title}
                className="w-full h-72 object-cover"
              />
              <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black to-transparent text-white">
                <h3 className="text-lg font-bold">{place.title}</h3>
                <p className="text-sm">{place.placeName}</p>
              </div>
              <div className="absolute top-2 right-2">
                <button className="bg-white rounded-full p-2 shadow-md"  onClick={(e) => { e.stopPropagation(); toggleLike(place.id); }}>
                  {likeStates[place.id] ? '❤️' : '🤍'}                
                </button>
              </div>
            </div>
          ))
        ) : (
    <p>장소가 없습니다.</p> 
  )}
</div>

    </div>
  );
};

export default CardSetLocalRec;
