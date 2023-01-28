import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { NotificationType } from '../../types/notification';
import Toast from './Toast';

describe('Toast', () => {
  const mockHandleClick = jest.fn();

  test('should handle clicking on close', () => {
    render(
      <Toast
        notification={{ id: 'id', type: 'success', message: 'message' }}
        handleClick={mockHandleClick}
      />
    );
    fireEvent.click(screen.getByText('×'));
    expect(mockHandleClick).toHaveBeenCalledWith('id');
  });

  test('should render different types of toasts', () => {
    [
      {
        notification: { id: 'id1', type: 'success' as NotificationType, message: 'message1' },
        expected: {
          header: 'Success',
        },
      },
      {
        notification: { id: 'id2', type: 'error' as NotificationType, message: 'message2' },
        expected: {
          header: 'Error',
        },
      },
      {
        notification: { id: 'id3', type: 'info' as NotificationType, message: 'message3' },
        expected: {
          header: 'Info',
        },
      },
    ].forEach(({ notification, expected }) => {
      render(<Toast notification={notification} handleClick={mockHandleClick} />);
      expect(screen.getByText(expected.header)).toBeInTheDocument();
      expect(screen.getByText(notification.message)).toBeInTheDocument();
    });
  });
});
