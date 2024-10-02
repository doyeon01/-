import { RealHeartIcon } from '../../../assets/icons/svg'; // 아이콘 경로 확인
import { CardProps } from '../../../model/MyPageType';

export const FeedCard: React.FC<CardProps> = ({ title, address, content, createdDate, comment, like, image }) => {
  
  // 제목이 9글자 이상일 경우 자르고 '...' 추가
  const truncatedTitle = title.length > 9 ? title.substring(0, 9) + "..." : title;

  // 본문 내용이 64글자 이상일 경우 자르고 '...' 추가
  const truncatedContent = content.length > 64 ? content.substring(0, 64) + "..." : content;

  // 날짜 형식 변환
  const formatDate = (dateString: string) => {
    const date = new Date(dateString); 
    const year = date.getFullYear();
    const month = date.getMonth() + 1; 
    const day = date.getDate();
    return `${year}년 ${month}월 ${day}일`;
  };

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">
      <img className="w-full h-48 object-cover" src={image} alt={title} />
      <div className="px-6 py-4">
        <div className="flex justify-between items-center mb-2">
          <div className="font-medium text-lg">{address ? truncatedTitle : title}</div>
          {address && (
            <span className="bg-[#b6afa9] text-white text-sm font-normal px-2.5 py-1.5 rounded-full text-center inline-block">
              {address}
            </span>
          )}
        </div>
        <p className="font-normal text-gray-700 text-sm mb-2">{truncatedContent}</p>
        <div className="flex justify-between items-center">
          <span className="flex gap-1">
            <p className="font-normal text-gray-400 text-xs">{formatDate(createdDate)} ·</p>
            <p className="font-normal text-gray-400 text-xs">{comment}개의 댓글</p>
          </span>
          <span className="flex items-center">
            {!address && <RealHeartIcon />}
            <p className="font-normal text-xs pl-1">{like}</p>
          </span>
        </div>
      </div>
    </div>
  );
};
