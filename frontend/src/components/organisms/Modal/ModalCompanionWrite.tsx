import React from 'react';

export const ModalCompanionWrite: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-[#F4F4EE] rounded-lg shadow-lg w-[800px] h-[650px] p-6 relative">
        {/* 닫기 버튼 */}
        <button 
          className="absolute top-2 left-4 text-gray-500 hover:text-gray-700"
          onClick={onClose} 
        >
          &#8592;
        </button>
        
        {/* 제목 */}
        <div className="text-center text-lg font-semibold ">
          동행 구인글 작성하기
        </div>
        
        {/* 작성하기 버튼 */}
        <button 
          className="absolute top-5 right-4 bg-[#707C60] text-white py-2 px-4 rounded-md hover:bg-[#5d633f]"
          onClick={onClose} 
        >
          작성하기
        </button>

        {/* 제목 입력란 */}
        <input 
          type="text" 
          placeholder="제목을 입력해주세요." 
          className="w-full border rounded-md p-2 mb-6 mt-10 focus:outline-none focus:ring-2 focus:ring-gray-400"
        />
        
        {/* 내용 입력란 */}
        <textarea 
          placeholder="내용을 입력해주세요." 
          className="w-full h-[400px] border rounded-md p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-gray-400 resize-none"
        />
      </div>
    </div>
  );
};
