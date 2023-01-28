import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { MockToast } from '../../mocks/components';
import { notifications } from '../../mocks/data';
import store from '../../store';
import { showNotification } from '../../store/slices/notifications';
import Notifications from './Notifications';

jest.mock('../Toast', () => MockToast);

notifications.forEach((x) => store.dispatch(showNotification(x)));

describe('Notifications', () => {
  beforeEach(() => {
    render(
      <Provider store={store}>
        <Notifications />
      </Provider>
    );
  });

  test('should render notifications', () => {
    notifications
      .map(({ message }) => message)
      .forEach((s) => expect(screen.getByText(s)).toBeInTheDocument());
  });

  test('should hide notifications', () => {
    const notification = notifications[0];
    fireEvent.click(screen.getByText(notification.message));
    expect(screen.queryByText(notification.message)).not.toBeInTheDocument();
  });
});
