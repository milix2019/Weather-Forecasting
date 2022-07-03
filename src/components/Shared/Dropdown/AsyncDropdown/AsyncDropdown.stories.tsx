import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Option } from '../SimpleDropdown/Dropdown';
import { AsyncDropdown } from './AsyncDropdown';

// Dropdown Data
const dropdownData: Option[] = [
  { value: 'malaysia', label: 'Malaysia', abbr: 'MY', lat: 33.44, lon: -94.04 },
  { value: 'indoneasia', label: 'Indoneasia', abbr: 'ID' },
  { value: 'country', label: 'Country', isFixed: true },
  { value: 'iran', label: 'Iran', isDisabled: true, abbr: 'IR' },
  { value: 'usa', label: 'USA', abbr: 'US' },
  { value: 'singapore', label: 'Singapore', isFixed: true, abbr: 'SG' },
];

const filterColors = (inputValue: string) => {
  return dropdownData.filter((i) => i.label.toLowerCase().includes(inputValue.toLowerCase()));
};

export const promiseOptions = (inputValue: string) =>
  new Promise<Option[]>((resolve) => {
    setTimeout(() => {
      resolve(filterColors(inputValue));
    }, 1000);
  });

export default {
  title: 'Shared components/AsyncDropdown',
  component: AsyncDropdown,
} as ComponentMeta<typeof AsyncDropdown>;

const Template: ComponentStory<typeof AsyncDropdown> = (args) => (
  <AsyncDropdown {...args}></AsyncDropdown>
);

export const DropdownWithData = Template.bind({});
DropdownWithData.args = {
  promiseOptions: promiseOptions,
};

export const DropdownWithDefaultValue = Template.bind({});
DropdownWithDefaultValue.args = {
  promiseOptions: promiseOptions,
  defaultOptions: true,
};

export const DropdownMultiple = Template.bind({});
DropdownMultiple.args = {
  promiseOptions: promiseOptions,
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
