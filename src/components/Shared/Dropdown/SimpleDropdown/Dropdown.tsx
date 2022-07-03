import React from 'react';
import Select from 'react-select';
import { FlagPlaceholder } from '../../../../assets';
import { FormItemChildProps } from '../../types';

export interface Option {
  value?: string;
  label: string;
  isFixed?: boolean;
  isDisabled?: boolean;
  abbr?: string;
  lon?: number;
  lat?: number;
}

export interface GroupedOption {
  label: string;
  options: Option[];
}

interface DropdownProps extends FormItemChildProps {
  isClearable?: boolean;
  isDisabled?: boolean;
  isLoading?: boolean;
  isSearchable?: boolean;
  value?: Option;
  options: Option[];
  isMulti?: boolean;
  formatGroupLabel?: (data: GroupedOption) => JSX.Element;
}

export const Dropdown = ({
  isClearable = true,
  isDisabled,
  isLoading,
  isSearchable = true,
  value,
  options,
  isMulti = false,
  onChange,
  name,
  id,
  formatGroupLabel,
}: DropdownProps): JSX.Element => {
  const handleDropdownOnChange = (newValue: Option) => {
    if (!!onChange) onChange(name, newValue);
  };
  return (
    <Select
      onChange={handleDropdownOnChange}
      className="reactSelectContainer"
      classNamePrefix="select"
      value={value}
      options={options}
      isMulti={isMulti}
      isDisabled={isDisabled}
      isLoading={isLoading}
      isClearable={isClearable}
      isSearchable={isSearchable}
      formatGroupLabel={formatGroupLabel}
      id={id}
      name={name}
      formatOptionLabel={(option: Option) => (
        <div className="countryFlagsContainer">
          {!!option.abbr ? (
            <>
              <img
                alt="FlagPlaceholder"
                src={FlagPlaceholder}
                className={`flag flag-${option.abbr.toLowerCase()}`}
              />
              <span>{option.label}</span>
            </>
          ) : (
            <span>{option.label}</span>
          )}
        </div>
      )}
      theme={(theme) => ({
        ...theme,
        colors: {
          ...theme.colors,
          primary25: '#ecf8ff',
          primary: '#01a2f9',
        },
      })}
    />
  );
};
