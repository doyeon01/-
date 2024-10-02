import { useState, useEffect, useRef } from 'react';
import ButtonLikeCategory from '../../atoms/button/ButtonLikeCategory';
import { FeedCard } from './FeedCard';
import feedData from '../../../dummydata/profile/FeedList.json'; // 더미 데이터를 가져옴
import { Feed } from '../../../model/MyPageType'; // Feed 타입을 import
// import { LikeFeedList } from '../../../services/api/FeedService'; // 실제 API 요청

export const PersonalLikeDetail = ({ resetSelectedButton }: { resetSelectedButton: boolean }) => {
  const [selectedButton, setSelectedButton] = useState(0);
  const [filteredFeeds, setFilteredFeeds] = useState<Feed[]>([]); // 필터링된 피드 리스트
  const [allFeeds, setAllFeeds] = useState<Feed[]>([]); // 모든 피드 리스트
  const [page, setPage] = useState(0); // 페이지 번호 저장
  const [hasMore, setHasMore] = useState(true); // 더 많은 데이터를 가져올 수 있는지 여부
  const observerRef = useRef<HTMLDivElement | null>(null); // Intersection Observer를 위한 ref
  
  // API 요청 및 더미 데이터 설정
  useEffect(() => {
    const typedFeedData = feedData as { success: boolean; response: { feeds: Feed[] }; error: null };
    if (typedFeedData.success) {
      setAllFeeds(typedFeedData.response.feeds); // 초기 더미 데이터 설정
      setFilteredFeeds(typedFeedData.response.feeds); 
    }

    // // 페이지마다 API 요청을 통해 데이터를 추가(FeedResponse 임포트 할 것)
    // if (hasMore) {
    //   LikeFeedList(page)
    //     .then((res) => {
          // const data: FeedResponse = res.data;
    //       if (data.success) {
    //         if (data.response.feeds.length > 0) {
    //           // 더 많은 데이터가 있다면 추가
    //           setAllFeeds((prevFeeds) => [...prevFeeds, ...data.response.feeds]);
    //           setFilteredFeeds((prevFeeds) => [...prevFeeds, ...data.response.feeds]);
    //           setPage((prevPage) => prevPage + 1); // 페이지 번호 증가
    //         } else {
    //           // 더 이상 데이터가 없으면 hasMore를 false로 설정
              setHasMore(false);
    //         }
    //       } else {
    //         console.error(data.error);
    //       }
    //     })
    //     .catch((error) => {
    //       console.error(error);
    //     });
    // }
  }, [page, hasMore]);

  // 좋아요 탭 클릭 시, 전체 카테고리 선택됨
  useEffect(() => {
    if (resetSelectedButton) {
      setSelectedButton(0);
    }
  }, [resetSelectedButton]);

  // 선택된 버튼에 따라 피드 필터링
  useEffect(() => {
    if (selectedButton === 0) {
      setFilteredFeeds(allFeeds); // '전체' 버튼일 때 모든 피드를 보여줌
    } else {
      const filterMap: { [key: number]: string } = {
        1: '명소',
        2: '숙박',
        3: '음식점',
        4: '카페',
      };
      const placeType = filterMap[selectedButton];
      setFilteredFeeds(allFeeds.filter((feed) => feed.placeType === placeType));
    }
  }, [selectedButton, allFeeds]);

  // 무한 스크롤을 위한 Intersection Observer 설정
  useEffect(() => {
    if (!hasMore) return; // 더 이상 데이터가 없으면 실행하지 않음

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setPage((prevPage) => prevPage + 1); // 페이지 증가
      }
    });

    if (observerRef.current) {
      observer.observe(observerRef.current); // observerRef가 가리키는 요소를 관찰
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current); // 컴포넌트가 언마운트될 때 observer를 해제
      }
    };
  }, [hasMore]);

  const buttons = [
    { label: '전체', id: 0 },
    { label: '명소', id: 1 },
    { label: '숙박', id: 2 },
    { label: '음식점', id: 3 },
    { label: '카페', id: 4 },
  ];

  return (
    <div>
      <div className="flex justify-center items-center gap-2">
        {buttons.map((button) => (
          <ButtonLikeCategory
            key={button.id}
            label={button.label}
            initialClicked={selectedButton === button.id}
            onClick={() => setSelectedButton(button.id)}
          />
        ))}
      </div>

      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredFeeds.map((card, index) => (
          <FeedCard
            key={index}
            title={card.title}
            content={card.content}
            createdDate={card.createdDate}
            comment={card.commentCount}
            like={card.likeCount}
            image={card.imageUrl}
          />
        ))}
      </div>

      {/* 무한 스크롤을 위한 감시 대상 요소 */}
      <div ref={observerRef} className="h-10"></div>
    </div>
  );
};
