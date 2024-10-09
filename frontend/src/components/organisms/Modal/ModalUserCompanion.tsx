import React, { useEffect, useState } from 'react';
import { fetchArticleDetail, createComment, fetchArticleComment } from '../../../services/api/AccompanyBoardAPI';
import { ArticleDetailType, CommentType } from '../../../model/AccompanyBoardType';
import { UserId } from '../../../Recoil/atoms/Auth';
import { useRecoilValue } from 'recoil';
import { PlanDetailApi } from '../../../services/api/PlanService';
import { DayPlanType, PlanDetailResponseType } from '../../../model/MyPageType';

interface ModalCompanionDetailProps {
  selectedId: number;
  closeModal: (updatedData?: { commentCount: number }) => void;
}

const ModalUserCompanion: React.FC<ModalCompanionDetailProps> = ({ selectedId, closeModal }) => {
  const [commentContent, setCommentContent] = useState('');
  const [articleDetail, setArticleDetail] = useState<ArticleDetailType | null>(null);
  const [comment, setComment] = useState<CommentType[] | null>(null);
  const [planDetail, setplanDetail] = useState<DayPlanType[] | []>([]);
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

  useEffect(() => {
    if (articleDetail?.totalPlanId !== undefined) {
      PlanDetailApi(articleDetail.totalPlanId)
        .then((res) => {
          const data: PlanDetailResponseType = res.data;
          if (data.success) {
            setplanDetail(data.response);
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

  const handleModalClose = () => {
    closeModal({ commentCount: comment ? comment.length : 0 });
  };
  

  return (
    <>
      {/* 모달 배경 및 크기 설정 */}
      <div
       className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
       onClick={handleModalClose} >
        <div
          className="relative bg-[#F4F4EE] p-20 rounded-lg w-[800px] h-[650px] mx-auto shadow-lg overflow-y-auto"
          style={{
            msOverflowStyle: 'none',
            scrollbarWidth: 'none',
          }}
        >
          {/* 닫기 버튼 */}
          <button
            onClick={handleModalClose} 
            aria-label="Close"
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          >
            &times;
          </button>

          {articleDetail && (
            <>
              {/* 게시글 정보 */}
              <div className="text-3xl font-bold text-center mb-4">
                {articleDetail.title}
              </div>

              <hr className="border-gray-300 my-4" />

              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <img
                    src={articleDetail.profileImageUrl}
                    alt={`${articleDetail.nickName}'s profile`}
                    className="w-10 h-10 rounded-full object-cover mr-2"
                  />
                  <div>
                    <h2 className="font-bold">{articleDetail.nickName}</h2>
                  </div>
                </div>
              </div>

              <hr className="border-gray-300 my-4" />

              {/* 게시글 내용 */}
              <div className="mb-4">
                <p className="text-sm text-gray-500 text-right">
                  작성일자: {articleDetail.createdDate}
                </p>
                <p className="mt-5 text-lg mb-2">{articleDetail.description}</p>
              </div>

              <hr className="border-gray-300 my-4" />

              {/* 일정 정보 추가 */}
              {planDetail.length > 0 && (
                <div className="py-4">
                  <h3 className="text-xl font-bold text-center mb-4">일정</h3>
                  {planDetail.map((dayPlan, index) => (
                    <div key={index} className="mb-6">
                      <div className="text-center text-lg font-semibold mb-2">
                        {dayPlan.day}일차
                      </div>
                      {dayPlan.plans.map((plan) => (
                        <div key={plan.id} className="mb-4">
                          <div className="font-bold text-md">
                            {plan.placeName}
                          </div>
                          <div className="text-gray-600">{plan.details}</div>
                          <div className="text-gray-500 text-sm">
                            📍 {plan.address}
                          </div>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

          {/* 댓글 작성 영역 */}
          <div className="relative mt-4">
            <textarea
              placeholder="댓글을 작성하세요."
              className="w-full border border-gray-300 rounded-lg p-2 mb-10"
              value={commentContent}
              onChange={handleCommentChange}
            ></textarea>
            <button
              className="absolute bg-[#6F7C60] text-white px-4 py-2 mt-2 rounded-md right-0 bottom-0"
              onClick={handleCommentSubmit}
            >
              댓글 작성
            </button>
          </div>

          {/* 댓글 목록 */}
          {comment && (
            <div className="border-t border-gray-300 py-2">
              <div className="font-bold text-lg mb-2">댓글</div>
              {comment.map((cmt, index) => (
                <div key={index} className="flex items-start mb-4">
                  <img
                    src={cmt.profileImageUrl}
                    alt="user"
                    className="w-8 h-8 rounded-full object-cover mr-2"
                  />
                  <div>
                    <div className="font-bold text-sm">{cmt.nickName}</div>
                    <div className="text-gray-600 text-sm">{cmt.content}</div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="h-10"></div>
        </div>
      </div>
    </>
  );
};

export default ModalUserCompanion;
