import React from 'react';
import AsyncSelect from 'react-select/async';
import { FlagPlaceholder } from '../../../../assets';
import { Option } from '../SimpleDropdown/Dropdown';
import { FormItemChildProps } from '../../types';

interface AsyncDropdownProps extends FormItemChildProps {
  isClearable?: boolean;
  isDisabled?: boolean;
  isLoading?: boolean;
  isSearchable?: boolean;
  defaultOptions?: boolean;
  isMulti: boolean;
  promiseOptions?: (newValue: string) => void | Promise<Option[]>;
  value?: Option;
}
export const AsyncDropdown = ({
  isClearable,
  isDisabled,
  isLoading,
  isSearchable = true,
  isMulti = false,
  defaultOptions = true,
  value,
  onChange,
  promiseOptions,
  name,
  id,
}: AsyncDropdownProps): JSX.Element => {
  const handleDropdownOnChange = (newValue: Option) => {
    if (!!onChange) onChange(name, newValue);
  };

  return (
    <AsyncSelect
      cacheOptions
      value={value}
      defaultOptions={defaultOptions}
      loadOptions={promiseOptions}
      onChange={handleDropdownOnChange}
      className="reactSelectContainer"
      classNamePrefix="select"
      isMulti={isMulti}
      isDisabled={isDisabled}
      isLoading={isLoading}
      isClearable={isClearable}
      isSearchable={isSearchable}
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
