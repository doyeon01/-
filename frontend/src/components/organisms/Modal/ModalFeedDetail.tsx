import React, { useEffect, useState } from 'react';
import { ModalFeedDetailTypeProps, FeedDetailType, FeedCommentType } from '../../../model/FeedType';
import useLike from '../../../hooks/useLike';
import useFollow from '../../../hooks/useFollow'; 
import { getFeedComment, getFeedDetail, postComment } from '../../../services/api/FeedService';
import { UserIconMini3 } from '../../../assets/icons/svg';
import { getYourInfo } from '../../../services/api/UserService';
import { UserId as UserIdAtom } from '../../../Recoil/atoms/Auth'; 
import { useRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';

const ModalFeedDetail: React.FC<ModalFeedDetailTypeProps> = ({ selectedId, closeModal }) => {
  const [commentContent, setCommentContent] = useState('');
  const [detailFeed, setDetailFeed] = useState<FeedDetailType | null>(null);
  const [comments, setComments] = useState<FeedCommentType[]>([]);
  const { isLike, toggleLike, likeCount } = useLike(detailFeed?.isLiked ?? false, detailFeed?.id ?? null);
  const { isFollowed, toggleFollow,setIsFollowed } = useFollow();
  const [likeCnt, setLikeCnt] = useState(0);
  const [userId] = useRecoilState(UserIdAtom);  
  const navigate = useNavigate();  

  useEffect(() => {
    const fetchDetailFeed = async () => {
      try {
        const response = await getFeedDetail(selectedId);                
        setLikeCnt(response.data.response.likeCount);
        setDetailFeed(response.data.response)
        const followResponse = await getYourInfo(response.data.response.id)
        const userId = response.data.response.id; 
        const isFollowed = followResponse.response.isFollowed; 

        setIsFollowed(prevState => ({
          ...prevState,
          [userId]: isFollowed 
        }));
      } catch (error) {
        console.error('Error fetching recommended feeds:', error);
      }
    };
    fetchDetailFeed();
  }, [selectedId,likeCnt]);

  const fetchComments = async () => {
    try {
      const response = await getFeedComment(selectedId);
      setComments(response.data.response.comments);
    } catch (error) {
      console.error('Error fetching recommended comments:', error);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [selectedId]);

  useEffect(() => {
    setLikeCnt(likeCount)
  }, [likeCount,isLike]);

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCommentContent(e.target.value);
  };

  const handleCommentSubmit = async () => {
    if (detailFeed !== null) {
      const response = await postComment(userId,detailFeed.id, commentContent);
      if (response.success === true){
        setCommentContent('');
        fetchComments();
      }
    }
  };

  const handleProfileClick = (userId: number) => {
    navigate(`/your/${userId}`);
  };

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center z-40 bg-black bg-opacity-50" onClick={closeModal}/>
        <div className="fixed bg-[#F4F4EE] top-[50px] right-[380px] z-50 p-20 rounded-lg w-[800px] h-[650px] mx-auto shadow-lg overflow-y-auto" style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }}>
          <button onClick={closeModal} aria-label="Close" className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
            &times;
          </button>
          {detailFeed && (
            <>
              <div className='text-3xl font-bold text-center mb-4'>{detailFeed.title}</div>
              <hr className="border-gray-300 my-4" />
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center cursor-pointer" onClick={() => handleProfileClick(detailFeed.userId)}> 
                  {detailFeed.profileImageUrl ? (
                    <img
                      src={detailFeed.profileImageUrl}
                      alt={`${detailFeed.nickName}'s profile`}
                      className="w-10 h-10 rounded-full object-cover mr-2"
                    />
                  ) : (
                    <UserIconMini3 />
                  )}
                  <div>
                    <h2 className="font-bold">{detailFeed.nickName}</h2>
                  </div>
                </div>
                <button
                  className={`bg-[#6F7C60] hover:bg-[#4F5843] text-white px-4 py-1 rounded-md`}
                  onClick={() => toggleFollow(detailFeed.userId, isFollowed[detailFeed.userId])} 
                >
                  {isFollowed[detailFeed.userId] ? '언팔로우' : '팔로우'}
                </button>
              </div>
              <hr className="border-gray-300 my-4" />
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
                    {detailFeed.isLiked ? '❤️' : '🤍'}
                  </button>
                  <p>{likeCnt}</p>
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
            />
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
                <div key={index} className="flex items-start border-b-2 pb-5">
                  <img
                    src={comment.profileImageUrl}
                    alt={`${comment.nickName}'s profile`}
                    className="w-8 h-8 rounded-full object-cover mr-2"
                  />
                  <div>
                    <p className="font-semibold">{comment.nickName}</p>
                    <p>{comment.content}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </>
  );
};

export default ModalFeedDetail;
