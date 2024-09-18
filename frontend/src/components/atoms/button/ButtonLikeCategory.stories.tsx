import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import ButtonLikeCategory from './ButtonLikeCategory'; 

export default {
  title: 'Components/ButtonLikeCategory',
  component: ButtonLikeCategory,
} as Meta<typeof ButtonLikeCategory>;

const Template: StoryFn<typeof ButtonLikeCategory> = (args) => <ButtonLikeCategory {...args} />;

export const Default = Template.bind({});
Default.args = {
  initialClicked: false,  
  label: '카페', 
};

export const Clicked = Template.bind({});
Clicked.args = {
  initialClicked: true, 
  label: '카페',  
};
