import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { notifications as mockNotifications } from '../../mocks/data';
import Toast from './Toast';

describe('Toast', () => {
  const mockHandleClick = jest.fn();

  test('should handle clicking on close', () => {
    const notification = mockNotifications[0];
    render(<Toast notification={notification} handleClick={mockHandleClick} />);
    fireEvent.click(screen.getByText('×'));
    expect(mockHandleClick).toHaveBeenCalled();
  });

  test('should render different types of toasts', () => {
    ['Success', 'Error', 'Info']
      .map((s, index) => ({ notification: mockNotifications[index], expected: { header: s } }))
      .forEach(({ notification, expected }) => {
        render(<Toast notification={notification} handleClick={mockHandleClick} />);
        expect(screen.getByText(expected.header)).toBeInTheDocument();
        expect(screen.getByText(notification.message)).toBeInTheDocument();
      });
  });
});
