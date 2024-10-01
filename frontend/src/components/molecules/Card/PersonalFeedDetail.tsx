import { useEffect, useState } from 'react';
import { FeedCard } from './FeedCard';
import feedData from '../../../dummydata/profile/FeedList.json'
import { Feed, FeedResponse } from '../../../model/MyPage/MyPageType';
// import { FeedList } from '../../../services/api/FeedService';




// 피드 상세 컴포넌트
export const PersonalFeedDetail: React.FC = () => {
  const [feedInfos, setFeedInfos] = useState<Feed[]>([]); // 피드 데이터 저장
  // const [page, setPage] = useState(0); // 페이지 번호 저장
  const [loading, setLoading] = useState(false); // 로딩 상태 관리
  
  // 무한 스크롤 핸들러
  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.offsetHeight - 100
    ) {
      loadMoreFeeds();
    }
  };
  
  // 컴포넌트가 처음 마운트될 때 첫 번째 페이지 로드 및 스크롤 이벤트 등록
  useEffect(() => {
    loadMoreFeeds(); // 첫 페이지 데이터 로드
    window.addEventListener('scroll', handleScroll); // 스크롤 이벤트 등록
  
    return () => window.removeEventListener('scroll', handleScroll); // 언마운트 시 스크롤 이벤트 해제
  }, []);


  // 피드 데이터를 불러오는 함수
  const loadMoreFeeds = () => {
    if (loading) return; // 중복 호출 방지
    setLoading(true);


    // 이 블록 더미데이터임...
    const typedFeedData = feedData as FeedResponse;
    setFeedInfos((prevFeeds) => [...prevFeeds, ...typedFeedData.response.feeds]);

    setLoading(false); 
  };

  //   FeedList(page)
  //     .then((res) => {
          // const data: FeedResponse = res.data;
  //       if (data.success) {
  //         setFeedInfos((prevFeeds) => [...prevFeeds, ...data.response.feeds]);
  //         setPage((prevPage) => prevPage + 1); // 페이지 번호 증가
  //       } else {
  //         console.error(res.data.error);
  //       }
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     })
  //     .finally(() => {
  //       setLoading(false);
  //     });
  // };


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
