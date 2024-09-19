import React, { useState } from 'react';

interface ModalFeedDetailProps {
  username: string;
  profileImg: string;
  postDate: string;
  postContent: string;
  postTitle: string;
  postImage: string;
  likesCount: number;
  comments: { username: string; content: string; profileImg: string }[];
  closeModal: () => void;
}

const ModalFeedDetail: React.FC<ModalFeedDetailProps> = ({
  username,
  profileImg,
  postDate,
  postContent,
  postTitle,
  postImage,
  likesCount,
  comments,
  closeModal,
}) => {
  const [commentContent, setCommentContent] = useState('');

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCommentContent(e.target.value);
  };

  const handleCommentSubmit = () => {
    console.log('댓글 내용:', commentContent);
    setCommentContent('');
  };

  return (
    <div
    onClick={closeModal} 
    className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      {/* 모달 자체에 스크롤 추가 */}
      <div   
      className="relative bg-[#F4F4EE] p-20 rounded-lg w-[800px] h-[650px] mx-auto shadow-lg overflow-y-auto"
      style={{
        msOverflowStyle: 'none',
        scrollbarWidth: 'none', 
      }}> 
        <button
          onClick={closeModal}
          aria-label="Close"
          className="absolute top-0 right-0 m-2 p-2 text-white rounded-full"
        >
          ✖️
        </button>

        <div className='text-3xl font-bold text-center mb-4'>
          {postTitle}
        </div>

        <hr className="border-gray-300 my-4" />

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <img
              src={profileImg}
              alt={`${username}'s profile`}
              className="w-10 h-10 rounded-full object-cover mr-2"
            />
            <div>
              <h2 className="font-bold">{username}</h2>
            </div>
          </div>
          <button className="bg-[#6F7C60] text-white px-4 py-1 rounded-md">팔로우</button>
        </div>

        <hr className="border-gray-300 my-4" />

        {/* 게시글 내용 */}
        <div className="mb-4">
          <p className="text-sm text-gray-500 text-right">작성일자 : {postDate}</p>
          <img
            src={postImage}
            alt="Post"
            className="w-full rounded-lg object-cover max-h-[300px]" 
          />
          <p className="mt-5 text-lg mb-2">{postContent}</p>
        </div>

        <hr className="border-gray-300 my-4" />

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <button aria-label="Like">
              🤍
            </button>
            <p>{likesCount}</p>
            <h3 className="font-bold ml-3">💬 {comments.length}</h3>
          </div>
        </div>


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
                  src={comment.profileImg} 
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
  );
};

export default ModalFeedDetail;
