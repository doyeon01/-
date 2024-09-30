import React, { useEffect, useState } from 'react';
import ArticleDetailjson from '../../../dummydata/companion/accompanyBoardsArticlesDetail.json';
import { fetchArticleDetail } from '../../../services/api/AccompanyBoardAPI';
import { ArticleDetail } from '../../../model/AccompanyBoardType';

interface ModalCompanionDetailProps {
  selectedId: number;
}

const ModalCompanionDetail: React.FC<ModalCompanionDetailProps> = ({ selectedId }) => {
  const [commentContent, setCommentContent] = useState('');
  const [articleDetail, setArticleDetail] = useState<ArticleDetail | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadArticles = async () => {
      const data: ArticleDetail = ArticleDetailjson[0].response; 
      setArticleDetail(data);
      // try {
      //   const data = await fetchArticleDetail(selectedId);
      //   if (data.success) {
      //     setArticleDetail(data.response);
      //   } else {
      //     setError('API 요청 중 오류가 발생했습니다.');
      //   }
      // } catch (err) {
      //   console.log('API 요청 중 오류가 발생했습니다.');
      // }
    };
    loadArticles();
  }, [selectedId]);

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCommentContent(e.target.value);
  };

  const handleCommentSubmit = () => {
    console.log('댓글 내용:', commentContent);
    setCommentContent('');
  };

  return (
    <>
      <div
        className='fixed w-[300px] h-[595px] bg-white p-4 left-[310px] overflow-y-auto rounded-xl shadow-xl top-[85px] border-gray border-2'
        style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }}
      >
        {/* 날짜와 작성자 정보 */}
        {articleDetail && (
          <>
            <div className='flex items-center mb-4'>
              <div className='flex bg-[#B6AFA9] text-white rounded-lg items-center justify-center w-16 h-16 flex-col mr-3'>
                <div className='font-bold text-[21.75px] leading-none'>
                  {articleDetail.accompanyDate.substring(8, 10)}
                </div>
                <div className='font-bold text-[17.4px] leading-none'>
                  {articleDetail.accompanyDate.substring(6, 7)}월
                </div>
              </div>
              <div>
                <div className='font-bold text-sm'>{articleDetail.title}</div>
                <div className='flex flex-row'>
                  <img
                    src={articleDetail.profileImage}
                    alt={articleDetail.title}
                    className='w-6 h-6 rounded-full object-cover mr-1'
                  />
                  <div className='text-gray-600 text-sm mt-[3px]'>{articleDetail.nickname}</div>
                </div>
              </div>
            </div>
            {/* 동행 설명 */}
            <div className='border-b border-gray-300 py-2'>
              <div className='text-sm h-24'>{articleDetail.description}</div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default ModalCompanionDetail;
