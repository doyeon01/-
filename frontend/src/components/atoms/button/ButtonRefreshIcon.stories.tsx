import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import ButtonRefreshIcon from './ButtonRefreshIcon'; // 컴포넌트 경로 확인 필수

// Storybook 메타 정보 설정
export default {
  title: 'Components/ButtonRefreshIcon',
  component: ButtonRefreshIcon,
  argTypes: {
  },
} as Meta;

// Template 생성
const Template: StoryFn = (args) => <ButtonRefreshIcon {...args} />;

// 기본 스토리
export const Default = Template.bind({});
Default.args = {
}
