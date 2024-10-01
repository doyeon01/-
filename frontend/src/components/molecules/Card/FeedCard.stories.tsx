import { Meta, StoryFn } from '@storybook/react';
import { FeedCard } from './FeedCard';
import { CardProps } from '../../../model/MyPage/MyPageType';

export default {
  title: 'Components/Card',
  component: FeedCard, 
  argTypes: {
    title: { control: 'text' }, 
    content: { control: 'text' }, 
    createdDate: { control: 'text' }, 
    comment: { control: 'number' },
    like: { control: 'number' },
    image: { control: 'text' }, 
  },
} as Meta<CardProps>;


const Template: StoryFn<CardProps> = (args) => <FeedCard {...args} />;

// 기본 스토리
export const Default = Template.bind({});
Default.args = {
  title: '서울 전통 테마 여행',
  content: '눈이 즐거운 하루!',
  createdDate: '2024년 9월 18일',
  comment: 6,
  like: 7,
  image: 'https://via.placeholder.com/150',
};

// 커스텀 라벨 스토리
export const CustomLabel = Template.bind({});
CustomLabel.args = {
  title: '새로운 테마 여행',
  content: '재미있는 하루!',
  createdDate: '2024년 10월 10일',
  comment: 10,
  like: 15,
  image: 'https://via.placeholder.com/150',
};
