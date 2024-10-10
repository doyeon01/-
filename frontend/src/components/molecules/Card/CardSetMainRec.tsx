import React, { useEffect, useState } from 'react';
import { FeedsType } from '../../../model/FeedType';
import { postFeedRecommend } from '../../../services/api/FeedService';
import useLike from '../../../hooks/useLike';

interface CardSetMainRecProps {
  page: number;
  onClick: (id: number) => void;

}

const CardSetMainRec: React.FC<CardSetMainRecProps> = ({ page,onClick }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(0);
  const [hoveredItem, setHoveredItem] = useState<FeedsType | null>(null);
  const [recommendedFeeds, setRecommendedFeeds] = useState<FeedsType[]>([]);
  const { isLike, toggleLike } = useLike(hoveredItem?.isLiked ?? false, hoveredItem?.id ?? null);

  useEffect(() => {
    console.log(page);
    
    const fetchRecommendedFeeds = async () => {
      try {
        const response = await postFeedRecommend(page, 10);
        console.log('메인페이지 리스폰:');
        console.log(response.data);
        
        setRecommendedFeeds(response.data.response.feeds.slice(0, 5));
      } catch (error) {
        console.error('Error fetching recommended feeds:', error);
      }
    };

    fetchRecommendedFeeds(); 
  }, [page]);

  return (
    <div className="flex gap-4">
      {recommendedFeeds.map((item, index) => {
        const isHovered = hoveredIndex === index;

        const widthClass = isHovered
          ? 'flex-[3]' 
          : 'flex-[1]'; 

        return (
          <div
            key={index}
            className={`relative transition-all duration-300 ease-in-out ${widthClass} overflow-hidden cursor-pointer`}
            onMouseEnter={() => {
              setHoveredIndex(index);
              setHoveredItem(item); 
            }}
            onClick={() => onClick(item.id)}
            >
            <img
              src={item.imageUrl}
              alt={item.title}
              className="object-cover w-full h-[320px] rounded-lg shadow-lg"
            />
            <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black to-transparent text-white">
              <h3 className="text-lg font-bold">{item.title}</h3>
              <p className="text-sm">{item.placeName}</p>
            </div>
            {isHovered && (
              <div className="absolute top-2 right-2">
                <button className="bg-white rounded-full p-2 shadow-md" onClick={toggleLike}>
                  {isLike ? '❤️' : '🤍'} 
                </button>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default CardSetMainRec;
