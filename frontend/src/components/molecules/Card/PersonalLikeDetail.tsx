import { useState, useEffect } from 'react';
import ButtonLikeCategory from '../../atoms/button/ButtonLikeCategory';
import { FeedCard } from './FeedCard';
import feedData from '../../../dummydata/profile/FeedList.json'; // 더미 데이터를 가져옴
import { Feed, FeedResponse } from '../../../model/MyPageType'; // Feed 타입을 import
import { useInView } from 'react-intersection-observer';
// import { LikeFeedList } from '../../../services/api/FeedService'; // 실제 API 요청 import
// import { useRecoilValue } from 'recoil';
// import { UserId } from '../../../Recoil/atoms/Auth'; // Recoil을 통한 userId 가져오기

export const PersonalLikeDetail = ({ resetSelectedButton }: { resetSelectedButton: boolean }) => {
  const [selectedButton, setSelectedButton] = useState(0); // 선택된 버튼 상태
  const [filteredFeeds, setFilteredFeeds] = useState<Feed[]>([]); // 필터링된 피드 리스트
  const [allFeeds, setAllFeeds] = useState<Feed[]>([]); // 모든 피드 리스트
  const [page, setPage] = useState(0); // 페이지 번호 저장
  const [hasNextPage, setHasNextPage] = useState(true); // 다음 페이지 여부 저장
  const [ref, inView] = useInView(); // 무한 스크롤을 감지하기 위한 ref, inView
  // const userId = useRecoilValue(UserId); // Recoil을 통한 userId 가져오기

  useEffect(() => {
    if (hasNextPage) {
      loadMoreFeeds(); // 페이지 변경 시 데이터를 추가로 로드
    }
  }, [page, hasNextPage]);

  useEffect(() => {
    if (inView && hasNextPage) {
      setPage((prevPage) => prevPage + 1); // 페이지 증가
    }
  }, [inView, hasNextPage]);


  const loadMoreFeeds = () => {
    const typedFeedData = feedData as FeedResponse; // 더미 데이터를 사용
    const newFeeds = typedFeedData.response.feeds.slice(page * 10, (page + 1) * 10); // 페이지별 데이터

    if (newFeeds.length > 0) {
      setAllFeeds((prevFeeds) => [...prevFeeds, ...newFeeds]); // 기존 데이터에 새 데이터 추가
      setFilteredFeeds((prevFeeds) => [...prevFeeds, ...newFeeds]); // 필터링된 데이터에도 추가
      setHasNextPage(typedFeedData.response.hasNextPage); // 다음 페이지 여부 갱신
    } else {
      setHasNextPage(false); // 더 이상 데이터가 없을 경우
    }

    // 실제 API 요청 (필요시 사용)
    // LikeFeedList(userId, page)
    //   .then((res) => {
    //     const data: FeedResponse = res.data;
    //     if (data.success) {
    //       const newFeeds = data.response.feeds;
    //       if (newFeeds.length > 0) {
    //         setAllFeeds((prevFeeds) => [...prevFeeds, ...newFeeds]);
    //         setFilteredFeeds((prevFeeds) => [...prevFeeds, ...newFeeds]);
    //         setHasNextPage(data.response.hasNextPage);
    //       } else {
    //         setHasNextPage(false);
    //       }
    //     }
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //   });
  };

  // 좋아요 탭에서 전체 카테고리 선택 시 '전체' 버튼으로 리셋
  useEffect(() => {
    if (resetSelectedButton) {
      setSelectedButton(0); // '전체' 버튼으로 초기화
    }
  }, [resetSelectedButton]);

  // 선택된 카테고리에 따라 피드를 필터링
  useEffect(() => {
    if (selectedButton === 0) {
      setFilteredFeeds(allFeeds); // '전체' 버튼일 때 모든 피드를 보여줌
    } else {
      const filterMap: { [key: number]: string } = {
        1: 'TOURIST_ATTRACTION',
        2: 'ACCOMMODATION',
        3: 'RESTAURANT',
        4: 'ETC',
      };
      const placeType = filterMap[selectedButton];
      setFilteredFeeds(allFeeds.filter((feed) => feed.placeType === placeType)); // 선택된 카테고리의 피드만 필터링
    }
  }, [selectedButton, allFeeds]);

  // 카테고리 버튼 목록
  const buttons = [
    { label: '전체', id: 0 },
    { label: '명소', id: 1 },
    { label: '숙박', id: 2 },
    { label: '음식점', id: 3 },
    { label: '기타', id: 4 },
  ];

  return (
    <div>
      {/* 카테고리 버튼 렌더링 */}
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

      {/* 피드 카드 목록 */}
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

      {/* 무한 스크롤 감지를 위한 요소 */}
      <div ref={ref} className="h-10"></div>
    </div>
  );
};
