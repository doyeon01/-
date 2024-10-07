import React, { useEffect, useState } from 'react';
import { fetchArticleDetail, createComment, fetchArticleComment } from '../../../services/api/AccompanyBoardAPI';
import { ArticleDetailType, CommentType } from '../../../model/AccompanyBoardType';
import { UserId } from '../../../Recoil/atoms/Auth';  
import { useRecoilValue } from 'recoil';
interface ModalCompanionDetailProps {
  selectedId: number;
}

const ModalCompanionDetail: React.FC<ModalCompanionDetailProps> = ({ selectedId }) => {
  const [commentContent, setCommentContent] = useState('');
  const [articleDetail, setArticleDetail] = useState<ArticleDetailType | null>(null);
  const [comment, setComment] = useState<CommentType[] | null>(null);
  const userId = useRecoilValue(UserId); 

  useEffect(() => {
    const loadArticles = async () => {
      const data = await fetchArticleDetail(selectedId);
      if (data.success) {
        setArticleDetail(data.response);
      } else {
        console.log(data.error);
      }
    };
    loadArticles();
  }, [selectedId]);

  useEffect(() => {
    const loadComment = async () => {
      const data = await fetchArticleComment(selectedId);
      if (data.success) {
        setComment(data.response.comments);
      } else {
        console.log(data.error);
      }
    };
    loadComment();
  }, [selectedId]);

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCommentContent(e.target.value);
  };

  const handleCommentSubmit = async () => {
    console.log('댓글 내용:', commentContent);
    const commentData = {
      userId: userId,
      accompanyBoardArticleId: selectedId,
      content: commentContent,
    };
    
    const response = await createComment(commentData);
    if (response.success) {
      console.log('댓글 등록 성공:', response.response);
      setCommentContent(''); 
      const updatedComments = await fetchArticleComment(selectedId);
      if (updatedComments.success) {
        setComment(updatedComments.response.comments);
      }
    } else {
      console.log('댓글 등록 실패:', response.error);
    }
  };

  return (
    <>
      <div className='fixed w-[300px] h-[595px] bg-white p-4 left-[310px] overflow-y-auto rounded-xl shadow-xl top-[85px] border-gray border-2' style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }}>
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
                  <img src={articleDetail.profileImage} alt={articleDetail.title} className='w-6 h-6 rounded-full object-cover mr-1' />
                  <div className='text-gray-600 text-sm mt-[3px]'>{articleDetail.nickname}</div>
                </div>
              </div>
            </div>
            <div className='border-b border-gray-300 py-2'>
              <div className='text-sm h-24'>{articleDetail.description}</div>
            </div>
          </>
        )}

        <div className='py-4'>
          <div className='mt-[3px] text-center mb-5'>고도연님의 일정</div>
          <div className='flex items-center mb-4'>
            <div className='flex-grow'>
              <div className='text-xs'>관광지 | 무등산</div>
              <div className='text-gray-600 text-sm'>증심사 쪽에서부터 무등산 중머리재까지 쭉! 내려오기</div>
              <div className='text-gray-500 text-xs flex items-center mt-1'>
                <span className='mr-1'>📍</span>광주광역시 동구 증심사길 177
              </div>
            </div>
          </div>
        </div>

        <div className="relative mt-4">
          <textarea placeholder="댓글을 작성하세요." className="w-full border border-gray-300 rounded-lg p-2 mb-6" value={commentContent} onChange={handleCommentChange}></textarea>
          <button className="absolute bg-[#6F7C60] text-white px-2 py-1 mb-1 rounded-md right-0 bottom-0 text-[10px]" onClick={handleCommentSubmit}>
            댓글 작성
          </button>
        </div>

        {comment && (
          <div className='border-t border-gray-300 py-2'>
            <div className='font-bold text-lg mb-2'>댓글</div>
            {comment.map((cmt, index) => (
              <div key={index} className='flex items-start mb-4'>
                <img src={cmt.profileImageUrl} alt='user' className='w-8 h-8 rounded-full object-cover mr-2' />
                <div>
                  <div className='font-bold text-sm'>{cmt.nickName}</div>
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
