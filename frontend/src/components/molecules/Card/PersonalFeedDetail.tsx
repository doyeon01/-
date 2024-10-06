import { useEffect, useState } from 'react';
import { FeedCard } from './FeedCard';
import { FeedType, FeedResponseType } from '../../../model/MyPageType';
import { useRecoilValue } from 'recoil';  
import { UserId } from '../../../Recoil/atoms/Auth'; 
import { FeedList } from '../../../services/api/FeedService';  
import { useInView } from 'react-intersection-observer'; 

export const PersonalFeedDetail: React.FC<{ reload: boolean }> = ({ reload }) => {
  const [feedInfos, setFeedInfos] = useState<FeedType[]>([]); 
  const [page, setPage] = useState(0); 
  const [hasNextPage, setHasNextPage] = useState(true); 
  const [ref, inView] = useInView(); 

  const userId = useRecoilValue(UserId);  

  useEffect(() => {
    setFeedInfos([]);  // 초기화
    setPage(0);  // 페이지 초기화
    setHasNextPage(true);  // 다음 페이지 여부 초기화
    loadMoreFeeds();  // 새로운 데이터를 로드
  }, [reload]);  // reload prop 변경 시 데이터 다시 로드

  useEffect(() => {
    if (inView && hasNextPage) {
      setPage((prevPage) => prevPage + 1);
    }
  }, [inView, hasNextPage]);

  const loadMoreFeeds = () => {
    FeedList(userId, page)
      .then((res) => {
        const data: FeedResponseType = res.data;
        if (data.success) {
          if (data.response.feeds.length > 0) {
            setFeedInfos((prevFeeds) => [...prevFeeds, ...data.response.feeds]);
            setHasNextPage(data.response.hasNextPage);
          } else {
            setHasNextPage(false);
          }
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {feedInfos.map((feed) => (
        <FeedCard
          key={feed.id}
          title={feed.title}
          content={feed.content}
          createdDate={feed.createdDate}
          comment={feed.commentCount}
          like={feed.likeCount}
          image={feed.imageUrl}
        />
      ))}
      <div ref={ref} /> 
    </div>
  );
};
