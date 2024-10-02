import { useEffect, useState } from 'react';
import { FeedCard } from './FeedCard';
import feedData from '../../../dummydata/profile/FeedList.json'; // 더미 데이터를 가져옴
import { Feed, FeedResponse } from '../../../model/MyPageType';
// import { useRecoilValue } from 'recoil';
// import { UserId } from '../../../Recoil/atoms/Auth';
// import { FeedList } from '../../../services/api/FeedService'; // 실제 API 요청

// 피드 상세 컴포넌트
export const PersonalFeedDetail: React.FC = () => {
  const [feedInfos, setFeedInfos] = useState<Feed[]>([]); // 피드 데이터 저장
  const [page, setPage] = useState(0); // 페이지 번호 저장
  const [loading, setLoading] = useState(false); // 로딩 상태 관리
  const [hasMore, setHasMore] = useState(true); // 더 많은 데이터를 가져올 수 있는지 여부
    // const userId = useRecoilValue(UserId);

  
  // API 요청 및 더미 데이터 설정
  useEffect(() => {
    // 초기 더미 데이터 설정
    const typedFeedData = feedData as FeedResponse;
    if (typedFeedData.success) {
      setFeedInfos(typedFeedData.response.feeds);
    }

    // 페이지마다 API 요청을 통해 데이터를 추가
    if (hasMore) {
      loadMoreFeeds(); // 첫 페이지 데이터 로드
    }
  }, [page, hasMore]);

  // 피드 데이터를 불러오는 함수
  const loadMoreFeeds = () => {
    if (loading || !hasMore) return; // 중복 호출 방지

    setLoading(true);

    // // 실제 API 요청
    // FeedList(page, userId)
    //   .then((res) => {
    //     const data: FeedResponse = res.data;
    //     if (data.success) {
    //       if (data.response.feeds.length > 0) {
    //         // 더 많은 데이터가 있다면 추가
    //         setFeedInfos((prevFeeds) => [...prevFeeds, ...data.response.feeds]);
            setPage((prevPage) => prevPage + 1); // 페이지 번호 증가
    //       } else {
    //         // 더 이상 데이터가 없으면 hasMore를 false로 설정
            setHasMore(false);
    //       }
    //     } else {
    //       console.error(data.error);
    //     }
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //   })
    //   .finally(() => {
    //     setLoading(false); // 로딩 상태 해제
    //   });
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

    </div>
  );
};
