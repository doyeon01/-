import React, { useState } from 'react';

interface ScheduleItem {
  type: string;
  place: string;
  description: string;
  address: string;
  image: string;
}

interface Comment {
  author: string;
  content: string;
}

interface Details {
  description: string;
  schedule: ScheduleItem[];
  comments: Comment[];
}

interface CompanionData {
  date: string;
  title: string;
  author: string;
  img: string; 
  details: Details;
}

interface ModalCompanionDetailProps {
  data: CompanionData; 
}

const ModalCompanionDetail: React.FC<ModalCompanionDetailProps> = ({ data }) => {
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
      className='fixed w-[300px] h-[595px] bg-white  p-4 left-[310px] overflow-y-auto rounded-xl shadow-xl top-[85px] border-gray border-2'
      style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }}
    >
      {/* 날짜와 작성자 정보 */}
      <div className='flex items-center mb-4'>
        <div className='flex bg-[#B6AFA9] text-white rounded-lg items-center justify-center w-16 h-16 flex-col mr-3'>
          <div className='font-bold text-[21.75px] leading-none'>{data.date.substring(8,10)}</div>
          <div className='font-bold text-[17.4px] leading-none'>{data.date.substring(6,7)}월</div>
        </div>
        <div>
          <div className='font-bold text-sm'>{data.title}</div>
          <div className='flex flex-row'>
            <img 
              src={data.img} 
              alt={data.title} 
              className='w-6 h-6 rounded-full object-cover mr-1' 
            />
            <div className='text-gray-600 text-sm  mt-[3px]'>{data.author}</div>
          </div>
        </div>
      </div>

      {/* 동행 설명 */}
      <div className='border-b border-gray-300 py-2'>
        <div className='text-sm h-24'>{data.details.description}</div>
      </div>
    
      {/* 일정 정보 */}
      <div className='py-4'>
      <div className='mt-[3px] text-center mb-5'>{data.author}님의 일정</div>
      {data.details.schedule.map((item, index) => (
          <div key={index} className='flex items-center mb-4'>
            <div className='flex-grow'>
              <div className='text-xs'>{item.type} | {item.place}</div>
              <div className='text-gray-600 text-sm'>{item.description}</div>
              <div className='text-gray-500 text-xs flex items-center mt-1'>
                <span className='mr-1'>📍</span>{item.address}
              </div>
            </div>
            <img src={item.image} alt={item.place} className='w-16 h-16 rounded-lg object-cover ml-3' />
          </div>
        ))}
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
      <div className='border-t border-gray-300 py-2'>
        <div className='font-bold text-lg mb-2'>댓글</div>
        {data.details.comments.map((comment, index) => (
          <div key={index} className='flex items-start mb-4'>
            <img src={`https://i.pravatar.cc/50?img=1`} alt='user' className='w-8 h-8 rounded-full object-cover mr-2' />
            <div>
              <div className='font-bold text-sm'>{comment.author}</div>
              <div className='text-gray-600 text-sm'>{comment.content}</div>
            </div>
          </div>
        ))}
      </div>

      <div className='h-10'></div>
    </div>
  );
};

export default ModalCompanionDetail;
