import React, { useEffect, useState } from 'react';
import { ModalFeedDetailTypeProps,FeedDetailType, FeedCommentType } from '../../../model/FeedType';
import useLike from '../../../hooks/useLike';
import { getFeedComment, getFeedDetail, postComment } from '../../../services/api/FeedService';



const ModalFeedDetail: React.FC<ModalFeedDetailTypeProps> = ({selectedId, closeModal}) => {
  const [commentContent, setCommentContent] = useState('');
  const [detailFeed,setDetailFeed] = useState<FeedDetailType|null>(null);
  const [comments,setComments] = useState<FeedCommentType[]|[]>([]);
  const { isLike, toggleLike } = useLike(detailFeed?.isLiked ?? false, detailFeed?.id ?? null);

  useEffect(() => {
    const fetchDetailFeed = async () => {
      
      try {
        const response = await getFeedDetail(selectedId);
        setDetailFeed(response.response);
      } catch (error) {
        console.error('Error fetching recommended feeds:', error);
      }
      console.log(selectedId);
      
    };
    fetchDetailFeed(); 
  }, [isLike]);

  useEffect(() => {
    const fetchDetailFeed = async () => {
      try {
        const response = await getFeedComment(selectedId);
        setComments(response.response.comments);
      } catch (error) {
        console.error('Error fetching recommended comments:', error);
      }
    };

    fetchDetailFeed(); 
  }, [comments]);
  

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCommentContent(e.target.value);
  };

  const handleCommentSubmit = async() => {
    console.log('댓글 내용:', commentContent);

    if (detailFeed !== null){
      await postComment(detailFeed.id,commentContent)
    }

    setCommentContent('');
  };



  
  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div   
      className="relative bg-[#F4F4EE] p-20 rounded-lg w-[800px] h-[650px] mx-auto shadow-lg overflow-y-auto"
      style={{
        msOverflowStyle: 'none',
        scrollbarWidth: 'none', 
      }}> 
        <button
          onClick={closeModal}
          aria-label="Close"
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          >
        &times;
        </button>
        {detailFeed&&(
        <>
          <div className='text-3xl font-bold text-center mb-4'>
          {detailFeed.title}
        </div>

        <hr className="border-gray-300 my-4" />

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <img
              src={detailFeed.profileImageUrl}
              alt={`${detailFeed.username}'s profile`}
              className="w-10 h-10 rounded-full object-cover mr-2"
              />
            <div>
              <h2 className="font-bold">{detailFeed.username}</h2>
            </div>
          </div>
          <button className="bg-[#6F7C60] text-white px-4 py-1 rounded-md">팔로우</button>
        </div>

        <hr className="border-gray-300 my-4" />

        {/* 게시글 내용 */}
        <div className="mb-4">
          <p className="text-sm text-gray-500 text-right">작성일자 : {detailFeed.createdDate}</p>
          <img
            src={detailFeed.feedImageUrl}
            alt="Post"
            className="w-full rounded-lg object-cover max-h-[300px]" 
            />
          <p className="mt-5 text-lg mb-2">{detailFeed.content}</p>
        </div>

        <hr className="border-gray-300 my-4" />

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <button aria-label="Like" onClick={toggleLike}>
              {isLike ? '❤️' : '🤍'} 
            </button>
            <p>{detailFeed.likeCount}</p>
            <h3 className="font-bold ml-3">💬 {comments.length}</h3>
          </div>
        </div>
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
        <div>
          <div className="space-y-4">
            {comments.map((comment, index) => (
              <div key={index} className="flex items-start border-b-2 pb-5 ">
                <img
                  src={comment.userProfileImageUrl}
                  alt={`${comment.username}'s profile`} 
                  className="w-8 h-8 rounded-full object-cover mr-2"
                  />
                <div>
                  <p className="font-semibold">{comment.username}</p>
                  <p>{comment.content}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </>
  );
};

export default ModalFeedDetail;
