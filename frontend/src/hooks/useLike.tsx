import { useState } from 'react';
import { postLike, postUnlike } from '../services/api/FeedService'; 

const useLike = (initialLike: boolean, feedId: number | null) => {
  const [isLike, setIsLike] = useState(initialLike);

  const toggleLike = async () => {
    setIsLike(prev => !prev); 

    try {
      if (feedId !== null) {
        if (isLike) {
          await postUnlike(feedId);
        } else {
          await postLike(feedId);
        }
      } else {
        console.error('feedId가 null입니다.'); 
      }
    } catch (error) {
      console.error('좋아요 처리 중 오류 발생:', error);
    }
  };

  return {
    isLike,
    toggleLike,
  };
};

export default useLike;
