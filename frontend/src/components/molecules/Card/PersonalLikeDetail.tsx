import { useState, useEffect } from 'react';
import ButtonLikeCategory from '../../atoms/button/ButtonLikeCategory';
import { FeedCard } from './FeedCard';
import { FeedType, FeedResponseType } from '../../../model/MyPageType'; 
import { useInView } from 'react-intersection-observer';
import { LikeFeedList } from '../../../services/api/FeedService'; 
import { useRecoilValue } from 'recoil';
import { UserId } from '../../../Recoil/atoms/Auth'; 
import ModalFeedDetail from '../../organisms/Modal/ModalFeedDetail';

export const PersonalLikeDetail = ({ resetSelectedButton }: { resetSelectedButton: boolean }) => {
  
  const [selectedButton, setSelectedButton] = useState(0); 
  const [filteredFeeds, setFilteredFeeds] = useState<FeedType[]>([]); 
  const [allFeeds, setAllFeeds] = useState<FeedType[]>([]); 
  const [page, setPage] = useState(0); 
  const [hasNextPage, setHasNextPage] = useState(true); 
  const [ref, inView] = useInView(); 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFeedId, setSelectedFeedId] = useState<number | null>(null);
  
  const userId = useRecoilValue(UserId); 

  useEffect(() => {
    if (hasNextPage) {
      loadMoreFeeds(); 
    }
  }, [page, hasNextPage]);

  useEffect(() => {
    if (inView && hasNextPage) {
      setPage((prevPage) => prevPage + 1); 
    }
  }, [inView, hasNextPage]);


  const loadMoreFeeds = () => {
    LikeFeedList(userId, page)
      .then((res) => {
        const data: FeedResponseType = res.data;
        if (data.success) {
          const newFeeds = data.response.feeds;
          console.log(data.response.feeds)
          if (newFeeds.length > 0) {
            setAllFeeds((prevFeeds) => [...prevFeeds, ...newFeeds]);
            setFilteredFeeds((prevFeeds) => [...prevFeeds, ...newFeeds]);
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

  const openModal = (feedId: number) => {
    setSelectedFeedId(feedId);  
    setIsModalOpen(true);       
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedFeedId(null);    
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
            onClick={() => openModal(card.id)}  
          />
        ))}
      </div>
      <div ref={ref} className="h-10"></div>

      {/* 모달 컴포넌트 */}
      {isModalOpen && selectedFeedId && (
        <ModalFeedDetail 
          selectedId={selectedFeedId} 
          closeModal={closeModal} 
        />
      )}
    </div>
  );
};
