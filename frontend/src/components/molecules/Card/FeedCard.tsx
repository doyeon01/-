import { RealHeartIcon } from '../../../assets/icons/svg'; // 아이콘 경로 확인

export interface CardProps {
  title: string;
  address?: string;
  content: string;
  createdDate: string;
  comment: number;
  like: number;
  image: string;
}

export const FeedCard: React.FC<CardProps> = ({ title, address, content, createdDate, comment, like, image }) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">
      <img className="w-full h-48 object-cover" src={image} alt={title} />
      <div className="px-6 py-4">
        <div className="flex justify-between items-center mb-2">
          <div className="font-medium text-lg">{title}</div>
          {address && (
            <span className="bg-[#b6afa9] text-white text-sm font-normal px-2.5 py-1.5 rounded-full text-center inline-block ">{address}</span>
          )}

        </div>
        <p className="font-normal text-gray-700 text-sm mb-2">{content}</p>
        <div className="flex justify-between items-center">
          <span className="flex gap-1">
            <p className="font-normal text-gray-400 text-xs">{createdDate} ·</p>
            <p className="font-normal text-gray-400 text-xs">{comment}개의 댓글</p>
          </span>
          <span className="flex items-center">
            <RealHeartIcon />
            <p className="font-normal text-xs pl-1">{like}</p>
          </span>
        </div>
      </div>
    </div>
  );
};
