import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { notifications } from '../../mocks/data';
import Toast from './Toast';

describe('Toast', () => {
  const mockHandleClick = jest.fn();

  test('should handle clicking on close', () => {
    render(<Toast notification={{ id: '0', ...notifications[0] }} handleClick={mockHandleClick} />);
    fireEvent.click(screen.getByText('×'));
    expect(mockHandleClick).toHaveBeenCalled();
  });

  test('should render different types of toasts', () => {
    ['Success', 'Error', 'Info']
      .map((s, index) => ({ notification: notifications[index], expected: { header: s } }))
      .forEach(({ notification, expected }, index) => {
        render(
          <Toast
            notification={{ id: index.toString(), ...notification }}
            handleClick={mockHandleClick}
          />
        );
        expect(screen.getByText(expected.header)).toBeInTheDocument();
        expect(screen.getByText(notification.message)).toBeInTheDocument();
      });
  });
});
