import React from 'react'
import { Story } from '@storybook/react'
import {ButtonNext, Props} from './ButtonNext'

export default {
    title:'Components/ButtonNext',
    component: ButtonNext,
    argTypes: {
        text: { control: 'text' }, 
      },
}

const Template: Story<Props> = (args) => <ButtonNext {...args} />;

export const Default = Template.bind({})

Default.args = {
    text: "다음",
    onClick: ()=>console.log('다음페이지')
}