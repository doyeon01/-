import React from 'react';

interface ModalPhotoCardProps {
  onClose: () => void; // 모달 닫기 함수
}


export const ModalPhotoCard: React.FC<ModalPhotoCardProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg relative">
        <button 
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          &times;
        </button>
        <h2 className="text-xl font-bold mb-4">포토카드</h2>
        <p></p>
      </div>
    </div>
  );
};
