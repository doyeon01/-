import React, { useState } from 'react';

interface PersonalSearchProps {
  onSearch: (searchTerm: string) => void; 
}

const PersonalSearch: React.FC<PersonalSearchProps> = ({ onSearch }) => {
  const [inputValue, setInputValue] = useState('검색어를 입력하세요.');

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      onSearch(inputValue); 
    }
  };

  return (
    <div className='flex justify-center'>
      <div className="flex items-center border-b-2 border-[#B6AFA9] w-[200px] py-2 text-sm font-normal">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)} // 입력값 변경
          onFocus={() => setInputValue('')} // 포커스되면 placeholder 비움
          onBlur={() => inputValue === '' && setInputValue('검색어를 입력하세요.')} // 입력값이 없을 때 placeholder 복원
          onKeyDown={handleKeyDown} // 엔터 키 입력 감지
          className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none text-center"
        />
      </div>
    </div>
  );
};

export default PersonalSearch;
