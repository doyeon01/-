import { useState } from 'react';
import { postLike, postUnlike } from '../services/api/FeedService'; 

const useLike = (initialLike: boolean, feedId: number | null) => {
  const [isLike, setIsLike] = useState(initialLike);
  const [likeCount, setLikeCount] = useState(0); // likeCount 상태 추가

  const toggleLike = async () => {
    setIsLike(prev => !prev); 

    try {
      if (feedId !== null) {
        let response;

        if (isLike) {
          response = await postUnlike(feedId);
        } else {
          response = await postLike(feedId);
        }
        if (response && response.success && response.response) {
          setLikeCount(response.response.likeCount);
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
    likeCount, 
    toggleLike,
  };
};

export default useLike;
