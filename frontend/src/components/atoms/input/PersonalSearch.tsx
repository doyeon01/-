import React, { useState, useEffect } from 'react';

interface PersonalSearchProps {
  onSearch: (searchTerm: string) => void;  // 검색 처리 함수
  showAllItems: () => void;                // 모든 항목 보여주기 함수
  onSortChange: (sortOrder: '최신순' | '오래된순') => void; // 정렬 변경 함수
  defaultSearchTerm?: string;              // 기본 검색어
  defaultSortOrder?: '최신순' | '오래된순'; // 기본 정렬 순서
}

const PersonalSearch: React.FC<PersonalSearchProps> = ({
  onSearch,
  showAllItems,
  onSortChange,
  defaultSearchTerm = '',          // 기본 검색어 설정
  defaultSortOrder = '최신순',      // 기본 정렬 순서 설정
}) => {
  const [inputValue, setInputValue] = useState(defaultSearchTerm);
  const [selectedSort, setSelectedSort] = useState<'최신순' | '오래된순'>(defaultSortOrder);

  useEffect(() => {
    if (inputValue === '') {
      showAllItems(); // 입력값이 없으면 모든 아이템을 보여줌
    }
  }, [inputValue, showAllItems]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && inputValue !== '') {
      onSearch(inputValue); // 엔터키를 누르면 검색 수행
    }
  };

  const handleSearchClick = () => {
    if (inputValue !== '') {
      onSearch(inputValue); // 검색 버튼을 클릭하면 검색 수행
    }
  };

  const handleSortChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const sortOrder = event.target.value as '최신순' | '오래된순';
    setSelectedSort(sortOrder); 
    onSortChange(sortOrder);    
  };

  return (
    <div className="flex justify-center items-center space-x-4">
      <div className="flex items-center space-x-2">
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

      <div className="flex items-center border border-[#B6AFA9] rounded-md px-2 py-2">
        <input
          type="text"
          value={inputValue}
          spellCheck='false'
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="검색어를 입력하세요."
          className="appearance-none bg-transparent border-none w-full text-gray-700 focus:outline-none"
        />
      </div>

      <button
        onClick={handleSearchClick}
        className="bg-[#6F755B] text-white px-4 py-2 rounded-md"
      >
        검색
      </button>
    </div>
  );
};

export default PersonalSearch;
