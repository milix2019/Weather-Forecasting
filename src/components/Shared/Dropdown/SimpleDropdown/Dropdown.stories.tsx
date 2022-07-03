import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Dropdown, Option } from './Dropdown';

// Dropdown Data
export const dropdownData: Option[] = [
  { value: 'malaysia', label: 'Malaysia', abbr: 'MY' },
  { value: 'indoneasia', label: 'Indoneasia', abbr: 'ID' },
  { value: 'country', label: 'Country', isFixed: true },
  { value: 'iran', label: 'Iran', isDisabled: true, abbr: 'IR' },
  { value: 'usa', label: 'USA', abbr: 'US' },
  { value: 'singapore', label: 'Singapore', isFixed: true, abbr: 'SG' },
];

export default {
  title: 'Shared components/Dropdown',
  component: Dropdown,
} as ComponentMeta<typeof Dropdown>;

const Template: ComponentStory<typeof Dropdown> = (args) => <Dropdown {...args}></Dropdown>;

export const DropdownWithDefaultValue = Template.bind({});
DropdownWithDefaultValue.args = {
  defaultValue: dropdownData[0],
};

export const DropdownWithData = Template.bind({});
DropdownWithData.args = {
  options: dropdownData,
};

export const DropdownMultiple = Template.bind({});
DropdownMultiple.args = {
  options: dropdownData,
  isMulti: true,
};

export const ClearableDropdown = Template.bind({});
ClearableDropdown.args = {
  isClearable: true,
};

export const DisabledDropdown = Template.bind({});
DisabledDropdown.args = {
  isDisabled: true,
};

export const LoadingDropdown = Template.bind({});
LoadingDropdown.args = {
  isLoading: true,
};

export const SearchableDropdown = Template.bind({});
SearchableDropdown.args = {
  isSearchable: true,
};
