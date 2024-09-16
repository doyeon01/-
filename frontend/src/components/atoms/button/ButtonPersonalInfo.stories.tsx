import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { ButtonPersonalInfo, ButtonPersonalInfoProps } from './ButtonPersonalInfo'; // 컴포넌트 경로 확인 필수

// Storybook 메타 정보 설정
export default {
  title: 'Components/ButtonFeedWrite',
  component: ButtonPersonalInfo,
  argTypes: {
    label: { control: 'text' }, // 스토리에서 label prop을 제어 가능하도록 설정
  },
} as Meta<ButtonPersonalInfoProps>;

// Template 생성
const Template: StoryFn<ButtonPersonalInfoProps> = (args) => <ButtonPersonalInfo {...args} />;

// 기본 스토리
export const Default = Template.bind({});
Default.args = {
  label: '글쓰기', // 기본 텍스트
};

// 사용자 정의 텍스트를 사용하는 스토리
export const CustomLabel = Template.bind({});
CustomLabel.args = {
  label: '새 글 작성', // 사용자 정의 텍스트
};
