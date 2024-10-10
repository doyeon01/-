import React, { useEffect, useState } from 'react';
import { getPlanFeedList } from '../../../services/api/FeedService';
import { PostPhotoCard } from '../../../services/api/PhotoService';
import { FeedImageInfo } from '../../../model/FeedType';
import Swal from 'sweetalert2'; 
import { useRecoilValue } from 'recoil';
import { UserId } from '../../../Recoil/atoms/Auth';
import { useNavigate } from 'react-router-dom';
import { OutIcon } from '../../../assets/icons/svg';


interface ModalSelectFeedProps {
  totalPlanId: number;
  onClose: () => void;
}

export const ModalSelectFeed: React.FC<ModalSelectFeedProps> = ({ totalPlanId, onClose }) => {
  const [feedList, setFeedList] = useState<FeedImageInfo[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const userId = useRecoilValue(UserId); 
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPlanFeedList = async () => {
      try {
        const data = await getPlanFeedList(totalPlanId);
        setFeedList(data.response.feedImageInfo);
      } catch (error) {
        console.log('피드를 불러오는 중 오류가 발생했습니다:', error);
      }
    };

    fetchPlanFeedList();
  }, [totalPlanId]);

  const onHandleCreatePhotoCard = async (feedId: number, feedImageUrl: string) => {
    setIsCreating(true);

    Swal.fire({
      title: '포토카드 생성 중...',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      const postData = {
        userId,
        feedId,
        feedImageUrl,
        totalPlanId,
      };

      const result = await PostPhotoCard(postData);
      if (result.success) {
        Swal.fire({
          icon: 'success',
          title: '포토카드 생성 완료!',
          text: '포토카드가 저장되었습니다.',
          confirmButtonText: '확인',
        }).then(() => {
          navigate('/my', { state: { activeTab: 'tab5' } });
        });
      } else {
        const errorMessage = result.error?.message || '알 수 없는 오류가 발생했습니다.';
        Swal.fire({
          icon: 'error',
          title: '포토카드 생성에 실패했습니다.',
          text: errorMessage,
          confirmButtonText: '확인',
        });
      }
    } catch (error) {
      console.error('포토카드 생성 중 오류 발생:', error);
      Swal.fire({
        icon: 'error',
        title: '포토카드 생성에 실패했습니다.',
        text: '다시 시도해주세요.',
        confirmButtonText: '확인',
      });
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={onClose}
    >
      <div
        className="bg-[#F4F4EE] rounded-lg shadow-lg w-[850px] h-[600px] p-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          onClick={onClose}
          disabled={isCreating} // 로딩 중일 때 닫기 버튼 비활성화
        >
          &times;
        </button>
        <h2 className="text-xl font-bold mb-4 text-center">피드를 선택해주세요</h2>

        <div className="grid grid-cols-3 gap-4">
          {feedList.length > 0 ? (
            feedList.map((feed) => (
              <div
                key={feed.feedId}
                className="relative overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer"
              >
                <img
                  src={feed.feedImageUrl}
                  alt={`Feed ${feed.feedId}`}
                  className={`w-full h-40 object-cover rounded-md ${isCreating ? 'opacity-50 cursor-not-allowed' : ''}`}
                  onClick={() => !isCreating && onHandleCreatePhotoCard(feed.feedId, feed.feedImageUrl)}
                />
              </div>
            ))
          ) : (
            <div
            className="col-span-3 flex justify-center items-center h-80 mt-14 bg-[#e5e2d9] rounded-lg"
            onClick={onClose}>
             <p className="text-[#b6afa9] text-xl pr-2 ">게시물이 존재하지 않습니다.</p> 
             <OutIcon/>
           </div>          
          )}
        </div>
      </div>
    </div>
  );
};
