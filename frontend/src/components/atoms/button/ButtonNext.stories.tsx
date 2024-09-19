import React from 'react'
import { Story } from '@storybook/react'
import {ButtonNext, Props} from './ButtonNext'

export default {
    title:'ButtonNext',
    component: ButtonNext,
    argTypes: {
        OnChange: { control: 'OnChange' }, 
      },
}

const Template: Story<Props> = (args) => <ButtonNext {...args} />;

export const Default = Template.bind({})

Default.args = {
    OnChange: ()=>console.log('다음')
}