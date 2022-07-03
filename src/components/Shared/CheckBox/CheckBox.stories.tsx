import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { CheckBox } from './CheckBox';

export default {
  title: 'Shared components/Checkbox',
  component: CheckBox,
} as ComponentMeta<typeof CheckBox>;

const Template: ComponentStory<typeof CheckBox> = (args) => (
  <CheckBox {...args} />
);

export const Large = Template.bind({});
Large.args = {
  label: 'Checkbox',
  size: 'large',
};

export const Medium = Template.bind({});
Medium.args = {
  ...Large.args,
  size: 'medium',
};

export const Small = Template.bind({});
Small.args = {
  ...Large.args,
  size: 'small',
};
