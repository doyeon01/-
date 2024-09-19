import React from 'react';
import testImg1 from '../../../assets/statics/test1.jpg';
import testImg2 from '../../../assets/statics/test2.jpg';
import testImg3 from '../../../assets/statics/test3.png';
import testImg4 from '../../../assets/statics/test4.jpg';
import testImg5 from '../../../assets/statics/test5.jpg';
import testImg6 from '../../../assets/statics/test5.jpg';

interface ModalCompanionChoiceImgProps {
  onClose: () => void;
}

const ModalCompanionChoiceImg: React.FC<ModalCompanionChoiceImgProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-[#F4F4EE] rounded-lg shadow-lg w-[600px] h-[400px] p-4 relative">
        <button 
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          onClick={onClose} 
        >
          &times;
        </button>
      </div>
    </div>
  );
}

export default ModalCompanionChoiceImg;
