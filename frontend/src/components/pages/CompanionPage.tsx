import React, { useEffect, useState } from 'react';
import { ButtonCompanion } from '../atoms/button/ButtonCompanion';
import ModalCompanionDetail from '../organisms/Modal/ModalCompanionDetail';
import ModalCompanionChoiceImg from '../organisms/Modal/ModalCompanionChoiceImg';
import KakaoMap from '../organisms/KaKaoMap';
import Mini_Vector from '../../assets/statics/Mini_Vector.png'
// import { fetchArticles } from '../../services/api/AccompanyBoardAPI';
import {Article} from '../../model/AccompanyBoardType'
import Articles from '../../dummydata/companion/accompanyboardsarticles.json'


export const CompanionPage: React.FC = () => {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isChoiceModalOpen, setIsChoiceModalOpen] = useState(false);
  const [articles, setArticles] = useState<Article[]>([]);
  // const [error,setError] = useState('')
  
  useEffect(() => {
    const loadArticles = async () => {
      const data:Article[] = Articles.response.articles
      setArticles(data)
    //   try {
    //     const data = await fetchArticles();
    //     if (data.success) {
    //       setArticles(data.response.articles);
    //     } else {
    //       setError('API 요청 중 오류가 발생했습니다.');
    //     }
    //   } catch (err) {
    //     setError('API 요청 중 오류가 발생했습니다.');
    //   }
    };
    loadArticles();

  }, []);


  const handleItemClick = (id:number,index:number) => {
    setSelectedId(id)
    setSelectedIndex(index);
  };

  const closeModal = () =>{
    setSelectedId(null);
  }

  const handleOpenChoiceModal = () => {
    setIsChoiceModalOpen(true);
  };

  const handleCloseChoiceModal = () => {
    setIsChoiceModalOpen(false);
  };

  return (
    <>
      <div className="h-[80px] w-full"/>
      <KakaoMap/>
        <div className='fixed w-[300px] h-full bg-white flex flex-col items-center z-50 border-gray border-r-2'>
          <div className='flex flex-col items-center w-full'>
            <input 
              type="text" 
              placeholder="검색어를 입력하세요" 
              className='border-2 border-[#B8B1AB] rounded-lg p-2 mb-2 w-[260px]' 
            />
            <ButtonCompanion label='내 동행 모집하기' onClick={handleOpenChoiceModal} /> 
          </div>
          {articles.map((article, index) => {
            const isSelected = index === selectedIndex;
            return (
              <div 
                key={index} 
                className={`flex items-center border-b border-gray-300 py-4 w-full cursor-pointer
                  ${isSelected ? 'bg-[#F0F0F3] ' : 'bg-none'}`}
                onClick={() => handleItemClick(article.userId,index)}  
              >
                <div className={`flex  ${isSelected ? 'bg-[#B6AFA9] text-white' : 'bg-[#F0F0F3] text-black'} 
                    rounded-lg items-center justify-center w-16 h-16 flex-col mr-3`}>
                  <div className='font-bold text-[21.75px] leading-none'>{article.accompanyDate.substring(8, 10)}</div>
                  <div className='font-bold text-[17.4px] leading-none'>{article.accompanyDate.substring(6, 7)}월</div>
                </div>  
                <div className='flex-grow'>
                  <div className='font-semibold text-sm'>{article.title}</div>
                  <div className='flex flex-row'>
                    <img 
                      src={article.profileImage} 
                      alt={article.title} 
                      className='w-8 h-8 rounded-full object-cover mr-1' 
                    />
                    <div className={`text-xs  mt-2`}>{article.nickname}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        {selectedId !== null && (
          <div 
          className='w-[23px] h-[45px] bg-white fixed flex justify-center items-center rounded-r-lg top-[400px] left-[609px] border cursor-pointer z-50'
          onClick={closeModal}
          >
            <img src={Mini_Vector}/>
          </div>
        )}
        {selectedId !== null && (
          <ModalCompanionDetail selectedId={selectedId}/>
          
        )}
        {isChoiceModalOpen && (
          <ModalCompanionChoiceImg onClose={handleCloseChoiceModal} />
        )}
    </>
  );
};
