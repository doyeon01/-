  import React, { useEffect, useState } from 'react';
  import { ButtonCompanion } from '../atoms/button/ButtonCompanion';
  import ModalCompanionDetail from '../organisms/Modal/ModalCompanionDetail';
  import ModalCompanionChoiceImg from '../organisms/Modal/ModalCompanionChoiceImg';
  import KakaoMap from '../organisms/KaKaoMap';
  import Mini_Vector from '../../assets/statics/Mini_Vector.png'
  import { fetchArticles } from '../../services/api/AccompanyBoardAPI';
  import {ArticleType} from '../../model/AccompanyBoardType'


  export const CompanionPage: React.FC = () => {
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    const [isChoiceModalOpen, setIsChoiceModalOpen] = useState(false);
    const [articles, setArticles] = useState<ArticleType[]>([]);
    const [page,_] = useState(0)
    useEffect(() => {
      const loadArticles = async () => {      
          const data = await fetchArticles(page);
          console.log(data);
          
          if (data.success) {
            setArticles(data.response.articles);
          } else { 
            console.log(data.error)
        } 
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
        <div className="h-[80px] w-full relative top-20"/>
        <KakaoMap/>
          <div className='fixed w-[300px] h-[650px] bg-white flex flex-col items-center z-30 border-gray border-r-2 overflow-y-auto'  style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }}>
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
                key={article.id ||index} 
                className={`flex items-center border-b border-gray-300 py-4 w-full cursor-pointer 
                  ${isSelected ? 'bg-[#F0F0F3] ' : 'bg-none'}`}
                  onClick={() => handleItemClick(article.totalPlanId, index)}  
                  >
                <div className={`flex ${isSelected ? 'bg-[#B6AFA9] text-white' : 'bg-[#F0F0F3] text-black'} 
                    rounded-lg items-center justify-center w-16 h-16 flex-col mr-3`}>
                  <div className='font-bold text-[21.75px] leading-none'>
                    {article.createdDate ? article.createdDate.substring(8, 10) : '00'} 
                  </div>
                  <div className='font-bold text-[12.4px] leading-none'>
                    {article.createdDate ? article.createdDate.substring(5, 7) : '00'}월 
                  </div>
                </div>  
                <div className='flex-grow'>
                  <div className='font-semibold text-sm'>{article.title}</div>
                  <div className='flex flex-row'>
                    <img 
                      src={article.profileImageUrl} 
                      alt={article.title} 
                      className='w-8 h-8 rounded-full object-cover mr-1' 
                      />
                    <div className={`text-xs mt-2`}>{article.nickName}</div>
                  </div>
                </div>
              </div>
            );
          })}
          <div className='mb-10 relative'></div>

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
