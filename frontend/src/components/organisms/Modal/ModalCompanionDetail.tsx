import React, { useEffect, useState } from 'react';
// import { fetchArticleDetail,createComment,CommentApiResponse } from '../../../services/api/AccompanyBoardAPI';
import { ArticleDetailType,CommentType } from '../../../model/AccompanyBoardType';
import ArticleDetailjson from '../../../dummydata/companion/accompanyBoardsArticlesDetail.json';
import Commentjson from '../../../dummydata/companion/accompanyBoardsComment.json';

interface ModalCompanionDetailProps {
  selectedId: number;
}

const ModalCompanionDetail: React.FC<ModalCompanionDetailProps> = ({ selectedId }) => {
  const [commentContent, setCommentContent] = useState('');
  const [articleDetail, setArticleDetail] = useState<ArticleDetailType | null>(null);
  const [Comment, setComment] = useState<CommentType[] | null>(null);

  // const [error, setError] = useState('');

  useEffect(() => {
    const loadArticles = async () => {
      const data: ArticleDetailType = ArticleDetailjson[0].response; 
      setArticleDetail(data);
      // try {
      //   const data = await CommentApiResponse(selectedId);
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

  useEffect(() => {
    const loadComment = async () => {
      const data: CommentType[] = Commentjson.response.comments; 
      
      setComment(data);
      // try {
      //   const data = await CommentApiResponse(selectedId);
      //   if (data.success) {
      //     setComment(data.response);
      //   } else {
      //     setError('API 요청 중 오류가 발생했습니다.');
      //   }
      // } catch (err) {
      //   console.log('API 요청 중 오류가 발생했습니다.');
      // }
    };
    loadComment();
  }, [selectedId]);

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCommentContent(e.target.value);
  };

  const handleCommentSubmit = async () => {
    console.log('댓글 내용:', commentContent);
  
    // const commentData = {
    //   userId: 1,
    //   accompanyBoardArticleId: selectedId, 
    //   content: commentContent,
    // };
  
    // try {
    //   const response = await createComment(commentData);
    //   if (response.success) {
    //     console.log('댓글 등록 성공:', response.response);
    //     setCommentContent(''); 
    //   } else {
    //     console.log('댓글 등록 실패:', response.error);
    //   }
    // } catch (error) {
    //   console.error('API 요청 중 오류:', error);
    // }
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
          {/* 일정 정보 */}
          <div className='py-4'>
            <div className='mt-[3px] text-center mb-5'>고도연님의 일정</div>
              <div  className='flex items-center mb-4'>
                <div className='flex-grow'>
                  <div className='text-xs'>관광지 | 무등산</div>
                  <div className='text-gray-600 text-sm'>증심사 쪽에서부터 무등산 중머리재까지 쭉! 내려오기</div>
                  <div className='text-gray-500 text-xs flex items-center mt-1'>
                    <span className='mr-1'>📍</span>광주광역시 동구 증심사길 177
                  </div>
                </div>
              {/* <img className='w-16 h-16 rounded-lg object-cover ml-3' /> */}
            </div>
          </div>
      
        {/* 댓글 작성 영역 */}
        <div className="relative mt-4">
          <textarea
          placeholder="댓글을 작성하세요."
          className="w-full border border-gray-300 rounded-lg p-2 mb-6" 
          value={commentContent}
          onChange={handleCommentChange}
          ></textarea>
          <button
          className="absolute bg-[#6F7C60] text-white px-2 py-1 mb-1 rounded-md right-0 bottom-0 text-[10px]"
          onClick={handleCommentSubmit}
          >
            댓글 작성
          </button>
        </div>
 
      {/* 댓글 정보 */}
      {Comment && (
        <div className='border-t border-gray-300 py-2'>
          <div className='font-bold text-lg mb-2'>댓글</div>
          {Comment.map((cmt, index) => (
            <div key={index} className='flex items-start mb-4'>
              <img src={`https://i.pravatar.cc/50?img=1`} alt='user' className='w-8 h-8 rounded-full object-cover mr-2' />
              <div>
                <div className='font-bold text-sm'>{cmt.accompanyBoardArticleId}</div>
                <div className='text-gray-600 text-sm'>{cmt.content}</div>
              </div>
            </div>
          ))}
        </div>
      )}
      <div className='h-10'></div>
      </div>
  </>
  );
};

export default ModalCompanionDetail;
