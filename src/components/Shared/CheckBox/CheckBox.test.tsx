import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import { CheckBox } from './CheckBox';

afterEach(() => cleanup);

describe('Checkbox tests', () => {
  test('Checkbox should render with a desired label', async () => {
    render(<CheckBox label="test" />);
    const label = screen.getByTestId('label');
    expect(label).toHaveTextContent('test');
  });

  test('Checkbox should have small class', async () => {
    render(<CheckBox size="small" />);
    const checkBox = screen.getByTestId('checkBox');
    expect(checkBox).toHaveClass('checkBox--small');
  });

  test('Checkbox should have large class', async () => {
    render(<CheckBox size="large" />);
    const checkBox = screen.getByTestId('checkBox');
    expect(checkBox).toHaveClass('checkBox--large');
  });

  test('Checkbox should render unchecked initially', async () => {
    render(<CheckBox />);
    const checkBox = screen.getByTestId('checkBox');
    expect(checkBox).toBeInTheDocument();
    expect(checkBox).not.toBeChecked();
  });

  test('Checkbox should checked by checked props', async () => {
    render(<CheckBox checked={true} />);
    const checkBox = screen.getByTestId('checkBox');

    expect(checkBox).toBeChecked();
  });
});
