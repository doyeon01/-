import React, { useEffect, useState, useRef } from 'react';
import { FeedType } from '../../../model/SearchingFeedType';
import { getFeed } from '../../../services/api/RegisterUser';
import { UserIconMini } from '../../../assets/icons/svg';

interface CardSetSearchPlaceProps {
  keyword: string;
  onItemClick: (id: number) => void;
}

const CardSetSearchPlace: React.FC<CardSetSearchPlaceProps> = ({ keyword, onItemClick }) => {
  const [places, setPlaces] = useState<FeedType[]>([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true); 
  const loaderRef = useRef<HTMLDivElement | null>(null); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getFeed(keyword, page, 10);
        if (response.response.feeds.length === 0) {
          setHasMore(false);
        } else {
          setPlaces([])
          setPlaces((prevPlaces) => [...prevPlaces, ...response.response.feeds]);
        }
      } catch (error) {
        console.error('Error fetching recommended feeds:', error);
      }
    };
    fetchData();
  }, [keyword]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getFeed(keyword, page, 10);
        if (response.response.feeds.length === 0) {
          setHasMore(false);
        } else {
          setPlaces((prevPlaces) => [...prevPlaces, ...response.response.feeds]);
        }
      } catch (error) {
        console.error('Error fetching recommended feeds:', error);
      }
    };
    fetchData();
  }, [page]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1);
        }
      },
      {
        root: null,
        rootMargin: '20px',
        threshold: 1.0,
      }
    );
    
    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };
  }, [hasMore]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
      {places.length > 0 ? (
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
              <div className="absolute bottom-2 left-2 flex items-center space-x-2 text-white opacity-0 group-hover:opacity-100">
                {place.profileImageUrl ? (
                  <img
                    src={place.profileImageUrl}
                    alt={place.nickName}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                ) : (
                  <UserIconMini />
                )}
                <span className="text-lg font-bold">{place.nickName}</span>
              </div>
              <div className="absolute inset-0 flex items-center justify-center text-white opacity-0 group-hover:opacity-100">
                <p className="text-2xl">{place.title}</p>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className='flex items-center justify-center'>검색된 장소가 없습니다.</p>
      )}
      <div ref={loaderRef} className="h-10"></div> 
    </div>
  );
};

export default CardSetSearchPlace;
