import React from 'react';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { Button } from './Button';

afterEach(() => cleanup);

describe('Button tests', () => {
  test('button should show test text as a button label', async () => {
    render(<Button label="test" />);

    expect(screen.getByRole('button')).toHaveTextContent('test');
  });

  test('disabled button should have button--disabled class and should have disabled attribute', async () => {
    render(<Button label="test" disabled />);

    expect(screen.getByRole('button')).toHaveClass('button--disabled');
    expect(screen.getByRole('button')).toHaveAttribute('disabled');
  });

  test('loading button should show span with spinner-border class', async () => {
    const { container } = render(<Button label="test" loading />);

    expect(container.getElementsByClassName('spinner-border')[0]).toBeTruthy();
  });

  test('button should have button--transparent class when the color props is undefined', async () => {
    render(<Button label="test" />);

    expect(screen.getByRole('button')).toHaveClass('button--transparent');
  });

  test.each`
    color            | expected
    ${'primary'}     | ${'button--primary'}
    ${'secondary'}   | ${'button--secondary'}
    ${'success'}     | ${'button--success'}
    ${'transparent'} | ${'button--transparent'}
  `(
    'button should have $expected class when the color props is $color',
    ({ color, expected }) => {
      render(<Button color={color} label="test" />);

      expect(screen.getByRole('button')).toHaveClass(expected);
    }
  );

  test('button should be render & called one time', async () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick} label="test" />);
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('disabled button should not call the handleClick', async () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick} label="test" disabled />);
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(0);
  });
});
