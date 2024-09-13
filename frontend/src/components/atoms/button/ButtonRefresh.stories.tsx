import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import ButtonRefresh, { ButtonRefreshProps } from './ButtonRefresh'; // 컴포넌트 경로 확인 필수

// Storybook 메타 정보 설정
export default {
  title: 'Components/ButtonRefresh',
  component: ButtonRefresh,
  argTypes: {
    text: { control: 'text' }, // 스토리에서 text prop을 제어 가능하도록 설정
  },
} as Meta;

// Template 생성
const Template: StoryFn<ButtonRefreshProps> = (args) => <ButtonRefresh {...args} />;

// 기본 스토리
export const Default = Template.bind({});
Default.args = {
  text: '다른 장소 추천', // 기본 텍스트
};

// 다른 스토리 (필요에 따라 추가 가능)
export const CustomText = Template.bind({});
CustomText.args = {
  text: '새로운 장소 추천', // 사용자 정의 텍스트
};
