import { useEffect, useState } from 'react';
import { FeedCard } from './FeedCard';
import feedData from '../../../dummydata/profile/FeedList.json'; // 더미 데이터
import { FeedType, FeedResponseType } from '../../../model/MyPageType';
// import { useRecoilValue } from 'recoil';
// import { UserId } from '../../../Recoil/atoms/Auth';
// import { FeedList } from '../../../services/api/FeedService'; // 실제 API 요청
import { useInView } from 'react-intersection-observer';

export const PersonalFeedDetail: React.FC = () => {
  const [feedInfos, setFeedInfos] = useState<FeedType[]>([]); // 피드 데이터 저장
  const [page, setPage] = useState(0); // 페이지 번호 저장
  const [hasNextPage, setHasNextPage] = useState(true); // 다음 페이지 여부
  const [ref, inView] = useInView(); // 무한스크롤 구현을 위한 ref, inView

  // const userId = useRecoilValue(UserId);

  // 첫 페이지 로드 및 페이지가 변경될 때 데이터 로드
  useEffect(() => {
    if (hasNextPage) {
      loadMoreFeeds(); // 페이지 데이터 로드
    }
  }, [page, hasNextPage]); 

  // 스크롤이 하단에 도달할 때 페이지 증가
  useEffect(() => {
    if (inView && hasNextPage) {
      setPage((prevPage) => prevPage + 1); // 페이지 증가
    }
  }, [inView, hasNextPage]);

  // 피드 데이터를 불러오는 함수
  const loadMoreFeeds = () => {
    // 더미 데이터 
    const typedFeedData = feedData as FeedResponseType;
    if (typedFeedData.success) {
      const newFeeds = typedFeedData.response.feeds.slice(page * 10, (page + 1) * 10); // 페이지별 데이터
      if (newFeeds.length > 0) {
        setFeedInfos((prevFeeds) => [...prevFeeds, ...newFeeds]); // 기존 데이터에 추가
        setHasNextPage(typedFeedData.response.hasNextPage); // 다음 페이지 여부를 갱신
      } else {
        setHasNextPage(false); // 더 이상 데이터가 없으면 hasNextPage를 false로 설정
      }
    }

    // 실제 API 요청 부분 (실제 사용 시 여기를 활성화)
    // FeedList(page, userId)
    //   .then((res) => {
    //     const data: FeedResponseType = res.data;
    //     if (data.success) {
    //       if (data.response.feeds.length > 0) {
    //         setFeedInfos((prevFeeds) => [...prevFeeds, ...data.response.feeds]); // 피드 데이터 추가
    //         setHasNextPage(data.response.hasNextPage); // 다음 페이지 여부 갱신
    //       } else {
    //         setHasNextPage(false); // 더 이상 데이터가 없으면 false로 설정
    //       }
    //     }
    //   })
    //   .catch((error) => {
    //     console.error(error);
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

      {/* 무한스크롤 감지를 위한 ref */}
      <div ref={ref} />
    </div>
  );
};
