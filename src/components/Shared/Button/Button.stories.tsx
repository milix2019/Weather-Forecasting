import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Button } from './Button';
import { TrashIcon, AddIcon } from '../../../assets';

export default {
  title: 'Shared components/Button',
  component: Button,
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args}></Button>;

export const Disabled = Template.bind({});
Disabled.args = { label: 'Save', disabled: true };

export const Primary = Template.bind({});
Primary.args = { label: 'Save', color: 'primary' };

export const PrimaryWithLoading = Template.bind({});
PrimaryWithLoading.args = { label: 'Save', color: 'primary', loading: true };

export const Secondary = Template.bind({});
Secondary.args = { label: 'Cancel', color: 'secondary' };

export const Success = Template.bind({});
Success.args = { label: 'Edit', color: 'success' };

export const Transparent = Template.bind({});
Transparent.args = { label: 'Upload' };

export const SuccessWithIcon = Template.bind({});
SuccessWithIcon.args = { label: 'Add Rate', color: 'success', icon: AddIcon };

export const SecondaryWithIcon = Template.bind({});
SecondaryWithIcon.args = {
  label: 'Delete',
  color: 'secondary',
  icon: TrashIcon,
};

export const TransparentWithIcon = Template.bind({});
TransparentWithIcon.args = {
  label: 'Upload',
  icon: TrashIcon,
};
