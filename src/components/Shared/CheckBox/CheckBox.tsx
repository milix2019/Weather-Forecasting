import React, { FormEvent } from 'react';
import { FormItemChildProps } from '../types';

interface CheckBoxProps extends FormItemChildProps {
  size?: 'small' | 'medium' | 'large';
  label?: string | number;
  onClick?: (e: React.FormEvent) => void;
  checked?: boolean;
}

export const CheckBox = ({
  label,
  size = 'small',
  name,
  checked = false,
  onChange,
}: CheckBoxProps): JSX.Element => {
  const checkBoxOnChange = (event: FormEvent<HTMLInputElement>): void => {
    const value: boolean = event.currentTarget.checked;

    onChange(name, value);
  };

  return (
    <div aria-hidden="true" className="checkBox">
      <input
        data-testid="checkBox"
        type="checkbox"
        name={name}
        className={`checkBox--${size}`}
        checked={checked}
        onChange={checkBoxOnChange}
      />
      <label data-testid="label" className="checkBox--label" htmlFor="checkbox">
        {label}
      </label>
    </div>
  );
};
