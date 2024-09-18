import React from 'react';
import { RedHeartIcon } from '../../../assets/icons/svg'; // 아이콘 경로 확인

export interface CardProps {
  title: string;
  content: string;
  createdDate: string;
  comment: number;
  like: number;
  image: string;
}

export const FeedCard: React.FC<CardProps> = ({ title, content, createdDate, comment, like, image }) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg">
      <img className="w-full h-48 object-cover" src={image} alt={title} />
      <div className="px-6 py-4">
        <div className="font-medium text-xl mb-2">{title}</div>
        <p className="font-normal text-gray-700 text-base mb-2">{content}</p>
        <div className="flex justify-between items-center">
          <span className="flex gap-1">
            <p className="font-normal text-gray-400 text-xs">{createdDate} ·</p>
            <p className="font-normal text-gray-400 text-xs">{comment}개의 댓글</p>
          </span>
          <span className="flex items-center">
            <RedHeartIcon />
            <p className="font-normal text-xs pl-1">{like}</p>
          </span>
        </div>
      </div>
    </div>
  );
};
