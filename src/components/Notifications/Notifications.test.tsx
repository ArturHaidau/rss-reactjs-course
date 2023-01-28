import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { MockToast } from '../../mocks/components';
import { notifications as mockNotifications } from '../../mocks/data';
import Notifications from './Notifications';

const mockDispatch = jest.fn();

jest.mock('../Toast', () => MockToast);
jest.mock('../../state', () => ({
  useStateContext: () => ({ notifications: mockNotifications }),
  useStateDispatch: () => mockDispatch,
}));

describe('Notifications', () => {
  test('should render notifications', () => {
    render(<Notifications />);
    mockNotifications
      .map(({ message }) => message)
      .forEach((s) => expect(screen.getByText(s)).toBeInTheDocument());
  });

  test('should hide notifications', () => {
    render(<Notifications />);
    const notification = mockNotifications[0];
    fireEvent.click(screen.getByText(notification.message));
    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'HIDE_NOTIFICATION',
      payload: { notificationId: notification.id },
    });
  });
});
