import { useState, useEffect } from 'react';
import { FeedCard } from './FeedCard';
import { FeedType, FeedResponseType } from '../../../model/MyPageType';
import { useRecoilValue } from 'recoil';  
import { UserId } from '../../../Recoil/atoms/Auth'; 
import { FeedList } from '../../../services/api/FeedService';  
import { useInView } from 'react-intersection-observer'; 

export const PersonalFeedDetail: React.FC<{ reload: boolean }> = ({ reload }) => { // reload prop 추가
  const [feedInfos, setFeedInfos] = useState<FeedType[]>([]); 
  const [page, setPage] = useState(0); 
  const [hasNextPage, setHasNextPage] = useState(true); 
  const [ref, inView] = useInView(); 

  const userId = useRecoilValue(UserId);  

  useEffect(() => {
    if (hasNextPage) {
      loadMoreFeeds();  
    }
  }, [page, hasNextPage]);

  // 새로고침 발생 시 데이터 리로드
  useEffect(() => {
    console.log(reload)
    if (reload) {
      setPage(0); // 페이지 초기화
      setFeedInfos([]); // 피드 초기화
      setHasNextPage(true); // hasNextPage 초기화
    }
  }, []);

  // 스크롤이 하단에 도달했을 때 페이지를 증가시키는 로직
  useEffect(() => {
    if (inView && hasNextPage) {
      setPage((prevPage) => prevPage + 1);  // 페이지를 1씩 증가
    }
  }, [inView, hasNextPage]);

  // 피드 데이터를 더 불러오는 함수
  const loadMoreFeeds = () => {
    FeedList(userId, page)  // API 호출, userId와 페이지 번호를 인자로 전달
      .then((res) => {
        const data: FeedResponseType = res.data;
        if (data.success) {
          if (data.response.feeds.length > 0) {
            setFeedInfos((prevFeeds) => [...prevFeeds, ...data.response.feeds]);  // 피드 데이터 추가
            setHasNextPage(data.response.hasNextPage);  // 다음 페이지 여부 갱신
          } else {
            setHasNextPage(false);  // 더 이상 데이터가 없으면 false로 설정
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
