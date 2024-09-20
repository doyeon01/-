import React, { useState, useEffect } from 'react';
import ButtonLikeCategory from '../../atoms/button/ButtonLikeCategory';
import { FeedCard } from './FeedCard';
import testImg1 from './../../../assets/statics/test1.jpg';
import testImg2 from './../../../assets/statics/test2.jpg';
import testImg3 from './../../../assets/statics/test3.png';
import testImg4 from './../../../assets/statics/test4.jpg';
import testImg5 from './../../../assets/statics/test5.jpg';

export const PersonalLikeDetail = ({ resetSelectedButton }: { resetSelectedButton: boolean }) => {
  const [selectedButton, setSelectedButton] = useState(0);

  useEffect(() => {
    if (resetSelectedButton) {
      setSelectedButton(0);
    }
  }, [resetSelectedButton]);

  const buttons = [
    {
      label: '전체', content: [
        { title: '서울 전통 테마 여행', content: '눈이 즐거운 하루!', createdDate: '2024-09-18', comment: 6, like: 7, image: testImg1 },
        { title: '서울 전통 테마 여행', content: '눈이 즐거운 하루!', createdDate: '2024-09-18', comment: 6, like: 7, image: testImg2 },
        { title: '서울 전통 테마 여행', content: '눈이 즐거운 하루!', createdDate: '2024-09-18', comment: 6, like: 7, image: testImg3 },
        { title: '서울 전통 테마 여행', content: '눈이 즐거운 하루!', createdDate: '2024-09-18', comment: 6, like: 7, image: testImg4 },
        { title: '서울 전통 테마 여행', content: '눈이 즐거운 하루!', createdDate: '2024-09-18', comment: 6, like: 7, image: testImg5 },
      ]
    },
    {
      label: '명소', content: [
        { title: '서울 전통 테마 여행', content: '눈이 즐거운 하루!', createdDate: '2024-09-18', comment: 6, like: 7, image: testImg1 },
        { title: '서울 전통 테마 여행', content: '눈이 즐거운 하루!', createdDate: '2024-09-18', comment: 6, like: 7, image: testImg2 },
      ]
    },
    {
      label: '숙박', content: [
        { title: '서울 전통 테마 여행', content: '눈이 즐거운 하루!', createdDate: '2024-09-18', comment: 6, like: 7, image: testImg3 },
        { title: '서울 전통 테마 여행', content: '눈이 즐거운 하루!', createdDate: '2024-09-18', comment: 6, like: 7, image: testImg4 },
      ]
    },
    {
      label: '음식점', content: [
        { title: '서울 전통 테마 여행', content: '눈이 즐거운 하루!', createdDate: '2024-09-18', comment: 6, like: 7, image: testImg5 },
      ]
    },
    {
      label: '카페', content: [
        { title: '서울 전통 테마 여행', content: '눈이 즐거운 하루!', createdDate: '2024-09-18', comment: 6, like: 7, image: testImg4 },
      ]
    },
  ];

  return (
    <div>
      <div className='flex justify-center items-center gap-2'>
        {buttons.map((button, index) => (
          <ButtonLikeCategory
            key={index}
            label={button.label}
            initialClicked={selectedButton === index}
            onClick={() => setSelectedButton(index)}
          />
        ))}
      </div>

      <div className='mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {buttons[selectedButton].content.map((card, index) => (
          <FeedCard
            key={index}
            title={card.title}
            content={card.content}
            createdDate={card.createdDate}
            comment={card.comment}
            like={card.like}
            image={card.image}
          />
        ))}
      </div>
    </div>
  );
};
