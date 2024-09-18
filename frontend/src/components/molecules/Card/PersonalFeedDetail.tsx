import React from 'react';
import testImg1 from './../../../assets/statics/test1.jpg';
import testImg2 from './../../../assets/statics/test2.jpg';
import testImg3 from './../../../assets/statics/test3.png';
import testImg4 from './../../../assets/statics/test4.jpg';
import testImg5 from './../../../assets/statics/test5.jpg';
import { FeedCard } from './FeedCard';

export const PersonalFeedDetail: React.FC = () => {
  const feedInfos = [
    {
      title: '서울 전통 테마 여행',
      content: '눈이 즐거운 하루!',
      createdDate: '2024년 9월 18일',
      comment: 6,
      like: 7,
      image: testImg1,
    },
    {
      title: '서울 전통 테마 여행',
      content: '눈이 즐거운 하루!',
      createdDate: '2024년 9월 18일',
      comment: 6,
      like: 7,
      image: testImg2,
    },
    {
      title: '서울 전통 테마 여행',
      content: '눈이 즐거운 하루!',
      createdDate: '2024년 9월 18일',
      comment: 6,
      like: 7,
      image: testImg3,
    },
    {
      title: '서울 전통 테마 여행',
      content: '눈이 즐거운 하루!',
      createdDate: '2024년 9월 18일',
      comment: 6,
      like: 7,
      image: testImg4,
    },
    {
      title: '서울 전통 테마 여행',
      content: '눈이 즐거운 하루!',
      createdDate: '2024년 9월 18일',
      comment: 6,
      like: 7,
      image: testImg5,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {feedInfos.map((feed, index) => (
        <FeedCard
          key={index}
          title={feed.title}
          content={feed.content}
          createdDate={feed.createdDate}
          comment={feed.comment}
          like={feed.like}
          image={feed.image}
        />
      ))}
    </div>
  );
};
