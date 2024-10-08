import React, { useEffect, useState } from 'react';
import { fetchArticleDetail, createComment, fetchArticleComment } from '../../../services/api/AccompanyBoardAPI';
import { ArticleDetailType, CommentType } from '../../../model/AccompanyBoardType';
import { UserId } from '../../../Recoil/atoms/Auth';  
import { useRecoilValue } from 'recoil';
import { PlanDetailApi } from '../../../services/api/PlanService';
import { DayPlanType, PlanDetailResponseType } from '../../../model/MyPageType';
import { UserIconMini3 } from '../../../assets/icons/svg';
import { useNavigate } from 'react-router-dom'; 

interface ModalCompanionDetailProps {
  selectedId: number;
}

const ModalCompanionDetail: React.FC<ModalCompanionDetailProps> = ({ selectedId }) => {
  const [commentContent, setCommentContent] = useState('');
  const [articleDetail, setArticleDetail] = useState<ArticleDetailType | null>(null);
  const [comment, setComment] = useState<CommentType[] | null>(null);
  const [planDetatil, setplanDetatil] = useState<DayPlanType[]| []>([]);
  const userId = useRecoilValue(UserId); 
  const navigate = useNavigate(); 

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

  useEffect(() => {
    if (articleDetail?.totalPlanId !== undefined) {
      PlanDetailApi(articleDetail.totalPlanId)
        .then((res) => {
          const data: PlanDetailResponseType = res.data;          
          if (data.success) {
            setplanDetatil(data.response);
          } else {
            console.log('response 없음 ㅜㅜ');
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      console.log('scheduleId가 존재하지 않음');
    }
  }, [articleDetail]); 
  
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

  const handleProfileClick = () => {
    if (articleDetail?.userId) {
      navigate(`/your/${articleDetail.userId}`);
    }
  };

  return (
    <>
      <div className='fixed w-[300px] h-[595px] bg-white p-4 left-[310px] overflow-y-auto rounded-xl shadow-xl top-[85px] border-gray border-2' style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }}>
      {articleDetail && (
        <>
          <div className='flex items-center mb-4'>
            <div className='flex bg-[#B6AFA9] text-white rounded-lg items-center justify-center w-16 h-16 flex-col mr-3'>
              {articleDetail.createdDate && typeof articleDetail.createdDate === 'string' ? (
                <>
                  <div className='font-bold text-[21.75px] leading-none'>
                    {articleDetail.createdDate.substring(8, 10)}
                  </div>
                  <div className='font-bold text-[12.4px] leading-none'>
                    {articleDetail.createdDate.substring(5, 7)}월
                  </div>
                </>
              ) : (
                <div className='font-bold text-[21.75px] leading-none'>날짜 없음</div> 
              )}
            </div>
            <div>
              <div className='font-bold text-sm'>{articleDetail.title}</div>
              <div className='flex flex-row cursor-pointer' onClick={handleProfileClick}> 
                {articleDetail.profileImageUrl ? (
                  <img 
                    src={articleDetail.profileImageUrl} 
                    alt={articleDetail.title} 
                    className='w-6 h-6 rounded-full object-cover mr-1' 
                  />
                ) : (
                  <UserIconMini3 />
                )}
                <div className='text-gray-600 text-sm mt-[5px]'>{articleDetail.nickName}</div>
              </div>
            </div>
          </div>
          <div className='border-b border-gray-300 py-2'>
            <div className='text-sm h-24'>{articleDetail.description}</div>
          </div>
        </>
      )}

        <div className='py-4'>
        {planDetatil.map((dayPlan, index) => (
          <div key={index}>
            {dayPlan.plans.map((plan) => (
              <div key={plan.id} className='flex items-center mb-4 justify-between'>
                <div className='flex-grow'>
                  <div className='text-xs'>관광지 | {plan.placeName}</div>
                  <div className='text-gray-600 text-sm'>{plan.details}</div>
                  <div className='text-gray-500 text-xs flex items-center mt-1'>
                    <span className='mr-1'>📍</span>{plan.address}
                  </div>
                </div>
                <img 
                  src={plan.imageUrl} 
                  className='w-14 h-14  object-cover ml-2' 
                />
              </div>
            ))}
          </div>
        ))}
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
            {cmt.profileImageUrl ? (
              <img 
                src={cmt.profileImageUrl} 
                alt='user' 
                className='w-8 h-8 rounded-full object-cover mr-2' 
              />
            ) : (
              <UserIconMini3 />
            )}
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
