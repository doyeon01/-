import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil'; // Recoil 훅
import { PlanInputState, PlanSortState } from '../../../Recoil/atoms/MyPage';
import { SearchIcon } from '../../../assets/icons/svg'; // 아이콘 경로 확인

interface PersonalSearchProps {
  onSearch: (searchTerm: string) => void; // 검색 처리 함수
  showAllItems: () => void; // 모든 항목 보여주기 함수
  onSortChange: (sortOrder: '최신순' | '오래된순') => void; // 정렬 변경 함수
}

const PersonalSearch: React.FC<PersonalSearchProps> = ({
  onSearch,
  showAllItems,
  onSortChange,
}) => {
  const [inputValue, setInputValue] = useRecoilState(PlanInputState);
  const [selectedSort, setSelectedSort] = useRecoilState(PlanSortState);

  useEffect(() => {
    if (inputValue === '') {
      showAllItems();
    }
  }, [inputValue, showAllItems]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && inputValue !== '') {
      onSearch(inputValue);
    }
  };

  const handleSortChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const sortOrder = event.target.value as '최신순' | '오래된순';
    setSelectedSort(sortOrder);
    onSortChange(sortOrder);
  };

  return (
    <div className="w-full flex items-center">
      <div style={{ paddingLeft: '280px' }}>
        <div className="flex items-center border border-[#B6AFA9] rounded-full px-4 py-2 w-[300px] shadow-sm">
          <SearchIcon/>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="검색어를 입력해주세요."
            className="appearance-none bg-transparent border-none w-full text-gray-700 focus:outline-none ml-2"
          />
        </div>
      </div>

      <div className="ml-auto flex space-x-4">
        <label className="flex items-center space-x-1">
          <input
            type="radio"
            value="최신순"
            checked={selectedSort === '최신순'}
            onChange={handleSortChange}
            className="appearance-none w-4 h-4 border border-gray-400 rounded-full checked:bg-[#6F755B] checked:border-transparent focus:outline-none"
          />
          <span>최신순</span>
        </label>
        <label className="flex items-center space-x-1">
          <input
            type="radio"
            value="오래된순"
            checked={selectedSort === '오래된순'}
            onChange={handleSortChange}
            className="appearance-none w-4 h-4 border border-gray-400 rounded-full checked:bg-[#6F755B] checked:border-transparent focus:outline-none"
          />
          <span>오래된 순</span>
        </label>
      </div>
    </div>
  );
};

export default PersonalSearch;
