import React, { useEffect, useState } from 'react';
import CardSetSearchUser from '../../components/molecules/Card/CardSetSearchUser';
import CardSetSearchPlace from '../../components/molecules/Card/CardSetSearchPlace';
import ModalFeedDetail from '../../components/organisms/Modal/ModalFeedDetail';
// import { fetchFeedRecommend } from '../../services/api/FeedService';
import feedjson from '../../dummydata/feed/feed.json'
import { FeedsType } from '../../model/FeedType';


export const SearchPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchClicked, setSearchClicked] = useState(false);
  const [searchCategory, setSearchCategory] = useState<'user' | 'place'>('user');
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [recommendedFeeds, setRecommendedFeeds] = useState<FeedsType[]>([]); // 추천 피드 데이터를 저장할 상태


  useEffect(() => {
    const fetchRecommendedFeeds = async () => {
      
      setRecommendedFeeds(feedjson.response.feeds)
      
      // try {
      //   const response = await FeedRecommend(1, 10);
      //   setRecommendedFeeds(response.data.response.feeds);
      // } catch (error) {
      //   console.error('Error fetching recommended feeds:', error);
      // }
    };

    fetchRecommendedFeeds(); 
  }, []);

  const handleSearch = () => {
    setSearchClicked(true);
  };

  const handleItemClick = (id: number) => {
    setSelectedId(id);

    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedId(null);
  };

  return (
    <div className="mt-[100px] px-4">
      <div className="mb-6 flex items-center justify-center">
        <input
          type="text"
          placeholder="검색"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-1/2 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
        />
        <button
          onClick={handleSearch}
          className="ml-2 p-2 text-white rounded-lg bg-[#707C60] hover:bg-[#4F5843]"
        >
          검색
        </button>
      </div>

      {searchClicked && (
        <div className="mb-6 flex justify-center">
          <button
            onClick={() => setSearchCategory('user')}
            className={`p-2 rounded-lg ${searchCategory === 'user' ? 'text-black underline' : 'text-gray-500'}`}
            disabled={searchCategory === 'user'}
          >
            사람
          </button>
          <button
            onClick={() => setSearchCategory('place')}
            className={`ml-2 p-2 rounded-lg ${searchCategory === 'place' ? 'text-black underline' : 'text-gray-500'}`}
            disabled={searchCategory === 'place'}
          >
            장소
          </button>
        </div>
      )}

      {searchClicked ? (
        searchCategory === 'user' ? (
          <CardSetSearchUser keyword={searchTerm } />
        ) : (
          <CardSetSearchPlace keyword={searchTerm} onItemClick={handleItemClick} />
        )
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
          {recommendedFeeds.map((recommendedFeed, index) => (
            <div key={index} className="relative group" onClick={() => handleItemClick(recommendedFeed.id)}>
              <img
                src={recommendedFeed.imageUrl}
                alt={recommendedFeed.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition duration-300">
                <div className="absolute bottom-2 left-2 flex items-center space-x-2 text-white opacity-0 group-hover:opacity-100">
                  <img
                    src={recommendedFeed.userProfileImageUrl}
                    alt={recommendedFeed.username}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <p className="text-lg font-bold">{recommendedFeed.username}</p>
                </div>
                <div className="absolute inset-0 flex items-center justify-center text-white opacity-0 group-hover:opacity-100">
                  <p className="text-2xl">❤️</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {isModalOpen && selectedId && (
        <ModalFeedDetail
          selectedId={selectedId}
          closeModal={closeModal} 
        />
      )}
    </div>
  );
};
