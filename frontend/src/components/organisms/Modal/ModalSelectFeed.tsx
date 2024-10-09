import React, { useEffect, useState } from 'react';
import { getPlanFeedList } from '../../../services/api/FeedService';

interface ModalSelectFeedProps {
  totalPlanId: number;
  onClose: () => void;
}

export const ModalSelectFeed: React.FC<ModalSelectFeedProps> = ({ totalPlanId, onClose }) => {
  const [feedList, setFeedList] = useState<string[]>([]);

  useEffect(() => {
    const fetchPlanFeedList = async () => {
      try {
        const data = await getPlanFeedList(totalPlanId);
        setFeedList(data.response.feedImageUrls);
      } catch (error) {
        console.log('피드를 불러오는 중 오류가 발생했습니다:', error);
      }
    };

    fetchPlanFeedList();
  }, [totalPlanId]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={onClose} // 오버레이 클릭 시 모달 닫기
    >
      <div
        className="bg-[#F4F4EE] rounded-lg shadow-lg w-[850px] h-[600px] p-6 relative"
        onClick={(e) => e.stopPropagation()} // 모달 내부 클릭 시 오버레이 닫히지 않도록 설정
      >
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          &times;
        </button>
        <h2 className="text-xl font-bold mb-4">Plan Feed List for Plan ID: {totalPlanId}</h2>

        {feedList.length > 0 ? (
          <ul className="space-y-2">
            {feedList.map((feed, index) => (
              <li key={index} className="bg-gray-100 p-2 rounded-md">
                <img src={feed} alt={`Feed ${index}`} className="w-full h-auto rounded-md" />
              </li>
            ))}
          </ul>
        ) : (
          <p>해당 계획에 대한 피드가 없습니다.</p>
        )}
      </div>
    </div>
  );
};
