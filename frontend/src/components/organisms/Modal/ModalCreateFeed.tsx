import React, { useState } from 'react';
import { PictureIcon } from '../../../assets/icons/svg';
import ButtonLikeCategory from '../../atoms/button/ButtonLikeCategory';

export const ModalCreateFeed: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  // 카테고리 상태 관리
  const [selectedCategory, setSelectedCategory] = useState<string>('전체');

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedImage(e.target.files[0]);
    }
  };

  // 사진 삭제 함수
  const handleImageRemove = () => {
    setSelectedImage(null); // 사진을 삭제하면 상태를 초기화하여 다시 아이콘을 보여줌
  };

  // 카테고리 클릭 시 상태 변경
  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-[#F4F4EE] rounded-lg shadow-lg w-[850px] h-[600px] p-6 relative overflow-y-auto">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          onClick={() => onClose()}
        >
          &times;
        </button>

        <div className="flex justify-between items-center mb-6">
        <div className="flex-grow text-center text-xl font-semibold pl-20">
          새 게시물 만들기
        </div>
        <button className="bg-[#707C60] text-white px-4 py-2 rounded-lg">
          게시하기
        </button>
      </div>


        <hr className="border-t border-gray-300 mb-7" />

        <div className="flex space-x-6">
          <div className="flex flex-col items-center justify-center w-1/3">
            {selectedImage ? (
              <div className="relative">
                <img
                  src={URL.createObjectURL(selectedImage)}
                  alt="Selected"
                  className="w-60 h-60 object-cover rounded-lg mb-4"
                />
                <button
                  onClick={handleImageRemove}
                  className="absolute top-2 right-2 bg-black text-white rounded-full p-1 text-xs"
                >
                  삭제
                </button>
              </div>
            ) : (
              <PictureIcon />
            )}

            <label
              className="text-white bg-[#707C60] hover:bg-[#4F5843] text-md py-2 px-10 rounded-lg font-base transition-colors duration-200 cursor-pointer mt-4"
            >
              사진 올리기
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
            </label>
          </div>

          <div className="w-[1px] h-[450px] bg-gray-400"></div>

          <div className="flex flex-col w-2/3">
            <div className="mb-4">
              <div className="flex flex-col items-start">
                <textarea
                  className="w-full p-2 border rounded-lg resize-none focus:outline-none"
                  spellCheck="false"
                  placeholder="제목을 입력하세요."
                  rows={1}
                />
                <div className="mt-4 w-full">
                  <hr className="border-gray-300" />
                </div>
              </div>
            </div>

            <textarea
              className="w-full h-[250px] p-4 border rounded-lg resize-none focus:outline-none"
              placeholder="내용을 입력하세요."
            />

            <div className="flex justify-center space-x-2 my-4">
              {/* 카테고리 버튼들 */}
              <ButtonLikeCategory
                label="# 전체"
                initialClicked={selectedCategory === '전체'}
                onClick={() => handleCategoryClick('전체')}
                px={2}
                py={1}
              />
              <ButtonLikeCategory
                label="# 명소"
                initialClicked={selectedCategory === '명소'}
                onClick={() => handleCategoryClick('명소')}
                px={2}
                py={1}
              />
              <ButtonLikeCategory
                label="# 숙박"
                initialClicked={selectedCategory === '숙박'}
                onClick={() => handleCategoryClick('숙박')}
                px={2}
                py={1}
              />
              <ButtonLikeCategory
                label="# 음식점"
                initialClicked={selectedCategory === '음식점'}
                onClick={() => handleCategoryClick('음식점')}
                px={2}
                py={1}
              />
              <ButtonLikeCategory
                label="# 카페"
                initialClicked={selectedCategory === '카페'}
                onClick={() => handleCategoryClick('카페')}
                px={2}
                py={1}
              />
            </div>
            <hr className="border-t border-gray-400 mb-7" />
            
          </div>
        </div>
      </div>
    </div>
  );
};
