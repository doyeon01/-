import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import 'react-datepicker/dist/react-datepicker.css';
import { getFeed } from '../../../services/api/RegisterUser';
import { FeedType } from '../../../model/SearchingFeedType';
import { postLike, postUnlike } from '../../../services/api/FeedService';

interface CardSetHotPlaceProps {
  myAge: string; 
  myResidence: string; 
  myGender: string;
  onClick: (id: number) => void;
}

const CardSetHotPlace: React.FC<CardSetHotPlaceProps> = ({ myAge, myResidence, myGender, onClick }) => {
  const [convertedAge, setConvertedAge] = useState<string>('');
  const [convertedResidence, setConvertedResidence] = useState<string>('');
  const [convertedGender, setConvertedGender] = useState<string>('');
  const [places, setPlaces] = useState<FeedType[]>([]);
  const [category, setCategory] = useState<string>(''); 
  const [likeStates, setLikeStates] = useState<{ [key: number]: boolean }>({}); 

  useEffect(() => {
    const convertAge = (ageRange: string) => {
      const agePrefix = ageRange.split("-")[0];
      return `${agePrefix}대`;
    };
    
    const convertResidence = (residence: string) => {
      return residence.split(" ")[0];
    };

    const convertGender = (gender: string) => {
      return gender === "MALE" ? "남자" : "여자";
    };

    setConvertedAge(convertAge(myAge));
    setConvertedResidence(convertResidence(myResidence));
    setConvertedGender(convertGender(myGender));
  }, [myAge, myResidence, myGender]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let keyword = '';
        if (category === convertedAge) {
          keyword = '카페';
        } else if (category === convertedResidence) {
          keyword = convertedResidence;
        } else if (category === convertedGender) {
          keyword = '베이커리';
        }

        if (keyword) {
          const response = await getFeed(keyword, 1, 3);
          console.log(`${keyword}로 요청:`, response.response.feeds);
          setPlaces(response.response.feeds);
          const initialLikes: { [key: number]: boolean } = {};
          response.response.feeds.forEach((place) => {
            initialLikes[place.id] = place.isLiked; 
          });
          setLikeStates(initialLikes);
        }
      } catch (error) {
        console.error('Error fetching feeds:', error);
      }
    };

    fetchData();
  }, [category, convertedAge, convertedResidence, convertedGender]); 

  const toggleLike = async (id: number) => {
    try {
      const currentLike = likeStates[id]; 
      const response = currentLike ? await postUnlike(id) : await postLike(id); 

      if (response && response.success) {
        setLikeStates((prev) => ({ ...prev, [id]: !currentLike }));
      }
    } catch (error) {
      console.error('좋아요 처리 중 오류 발생:', error);
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-center space-x-4 mb-4">
        {[convertedResidence, convertedAge, convertedGender].map((cat, index) => (
          <button
            key={index}
            onClick={() => setCategory(cat)}
            className={classNames(
              'px-4 py-2 border-b-2 transition-all',
              {
                'text-black border-black': category === cat, 
                'text-gray-500 border-transparent': category !== cat, 
              }
            )}
          >
            {cat === convertedAge 
              ? `${convertedAge}가 좋아하는` 
              : cat === convertedResidence 
                ? `${convertedResidence}에서 뜨는` 
                : convertedGender === "남자" 
                  ? "남자가 좋아하는" 
                  : "여자가 좋아하는"}
          </button>
        ))}
      </div>

      <div className="relative">
        <div className="carousel-wrapper overflow-hidden">
          <div className="flex">
            {places.length > 0 ? (
              places.map((place) => (
                <div
                  key={place.id}
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
                    <button aria-label="Like" className="bg-white rounded-full p-2 shadow-md" onClick={(e) => { e.stopPropagation(); toggleLike(place.id); }}>
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
      </div>
    </div>
  );
};

export default CardSetHotPlace;
