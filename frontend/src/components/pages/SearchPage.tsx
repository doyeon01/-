import React, { useState } from 'react';
import testImg1 from '../../assets/statics/test1.jpg';
import testImg2 from '../../assets/statics/test2.jpg';
import testImg3 from '../../assets/statics/test3.png';
import testImg4 from '../../assets/statics/test4.jpg';
import testImg5 from '../../assets/statics/test5.jpg';
import CardSetSearchUser from '../../components/molecules/Card/CardSetSearchUser';
import CardSetSearchPlace from '../../components/molecules/Card/CardSetSearchPlace';
import ModalFeedDetail from '../../components/organisms/Modal/ModalFeedDetail';

interface TestArr {
  title: string;
  address: string;
  testimg: string;
  user: string;
}


const testArr: TestArr[] = [
  { title: '에스파크', address: '경기도 이천시', testimg: testImg1, user: '고도연짱짱123' },
  { title: '망상해변', address: '강원도 동해시', testimg: testImg2, user: '여행러123' },
  { title: '기백산 용추계곡', address: '경상남도 밀양시', testimg: testImg3, user: '힐링맨' },
  { title: '연천미라클', address: '경기도 연천군', testimg: testImg4, user: '경기러버' },
  { title: '뮤직컴플렉스', address: '서울특별시', testimg: testImg5, user: '서울러버' },
];

export const SearchPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchClicked, setSearchClicked] = useState(false);
  const [searchCategory, setSearchCategory] = useState<'user' | 'place'>('user');
  const [selectedItem, setSelectedItem] = useState<TestArr | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredArr = testArr.filter((item) =>
    (searchCategory === 'user'
      ? item.user.toLowerCase().includes(searchTerm.toLowerCase())
      : item.title.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleSearch = () => {
    setSearchClicked(true);
  };

  const handleItemClick = (item: TestArr) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
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
          <CardSetSearchUser users={filteredArr} onItemClick={handleItemClick} />
        ) : (
          <CardSetSearchPlace places={filteredArr} onItemClick={handleItemClick} />
        )
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
          {testArr.map((item, index) => (
            <div key={index} className="relative group" onClick={() => handleItemClick(item)}>
              <img
                src={item.testimg}
                alt={item.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition duration-300">
                <div className="absolute bottom-2 left-2 flex items-center space-x-2 text-white opacity-0 group-hover:opacity-100">
                  <img
                    src={item.testimg}
                    alt={item.user}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <p className="text-lg font-bold">{item.user}</p>
                </div>
                <div className="absolute inset-0 flex items-center justify-center text-white opacity-0 group-hover:opacity-100">
                  <p className="text-2xl">❤️</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {isModalOpen && selectedItem && (
        <ModalFeedDetail
          username={selectedItem.user}
          profileImg={selectedItem.testimg}
          postTitle={`${selectedItem.title}`}
          postDate="2024-09-16"
          postContent={`${selectedItem.title}에 대한 포스트입니다.`}
          postImage={selectedItem.testimg}
          likesCount={123}
          comments={[
            { username: 'commenter1', content: '좋아요!' },
            { username: 'commenter2', content: '멋지네요!' },
          ]}
          closeModal={closeModal} 
        />
      )}
    </div>
  );
};
