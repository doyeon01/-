import { useState, useEffect } from 'react';
import { FeedCard } from './FeedCard';
import { FeedType, FeedResponseType } from '../../../model/MyPageType';
import { useRecoilValue } from 'recoil';
import { UserId } from '../../../Recoil/atoms/Auth';
import { FeedList } from '../../../services/api/FeedService';
import { useInView } from 'react-intersection-observer';
import ModalFeedDetail from '../../organisms/Modal/ModalFeedDetail';

export const PersonalFeedDetail: React.FC = () => {
  const [feedInfos, setFeedInfos] = useState<FeedType[]>([]);
  const [page, setPage] = useState(0);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [ref, inView] = useInView();

  // 모달을 위한 상태 추가
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

  
  const openModal = (feedId: number) => {
    setSelectedFeedId(feedId);  
    setIsModalOpen(true);       
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedFeedId(null);    
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        
      {feedInfos.length > 0 ? (
        feedInfos.map((feed) => (
          <FeedCard
            key={feed.id}
            title={feed.title}
            content={feed.content}
            createdDate={feed.createdDate}
            comment={feed.commentCount}
            like={feed.likeCount}
            image={feed.imageUrl}
            onClick={() => openModal(feed.id)} // 클릭 시 해당 피드의 ID를 모달에 넘기기
          />
        ))
      ) : (
        <p className="text-center col-span-3">게시물이 없습니다.</p>
      )}

        <div ref={ref} />
      </div>

      {isModalOpen && selectedFeedId && (
        <ModalFeedDetail 
          selectedId={selectedFeedId}  // 선택된 피드 ID를 모달로 전달
          closeModal={closeModal} 
        />
      )}
    </>
  );
};
