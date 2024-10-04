import React, { useEffect, useState } from 'react';
import { Feed } from '../../../model/SearchingFeedType';
import feedFillter from '../../../dummydata/feed/feedFillter.json';
// import { getFeed } from '../../../services/api/RegisterUser';

interface CardSetSearchPlaceProps {
  keyword: string;
  onItemClick: (id: number) => void;
}

const CardSetSearchPlace: React.FC<CardSetSearchPlaceProps> = ({ keyword, onItemClick }) => {
  const [places, setPlaces] = useState<Feed[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setPlaces(feedFillter.response.feeds);
      // try {
      //   const response = await getFeed(keyword, 1, 10);
      //   setPlaces(response.response.feeds);
      // } catch (error) {
      //   console.error('Error fetching recommended feeds:', error);
      // }
    };
    fetchData();
  }, [keyword]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
      {places ? (
        places.map((place, index) => (
          <div
            key={index}
            className="relative group"
            onClick={() => onItemClick(place.id)}
          >
            <img
              src={place.imageUrl}
              alt={place.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition duration-300">
              <div className="absolute bottom-2 left-2 text-white opacity-0 group-hover:opacity-100">
                <p className="text-lg font-bold">{place.username}</p>
              </div>
              <div className="absolute inset-0 flex items-center justify-center text-white opacity-0 group-hover:opacity-100">
                <p className="text-2xl">❤️</p>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>검색된 장소가 없습니다.</p>
      )}
    </div>
  );
};

export default CardSetSearchPlace;
