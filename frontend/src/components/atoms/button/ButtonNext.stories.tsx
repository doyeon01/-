import { Meta, StoryFn } from '@storybook/react'
import {ButtonNext, Props} from './ButtonNext'

export default {
    title:'Components/ButtonNext',
    component: ButtonNext,
    argTypes: {
        text: { control: 'text' }, 
      },
} as Meta<Props>

const Template: StoryFn<Props> = (args: Props) => <ButtonNext {...args} />;

export const Default = Template.bind({})

Default.args = {
    text: "다음",
    onClick: ()=>console.log('다음페이지')
}