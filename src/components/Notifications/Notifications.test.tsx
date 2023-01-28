import { render, screen } from '@testing-library/react';
import React from 'react';
import { MockToast } from '../../mocks/components';
import Notifications from './Notifications';

jest.mock('../Toast', () => MockToast);

describe('Notifications', () => {
  test('should render toasts', () => {
    render(
      <Notifications
        handleClick={jest.fn}
        notifications={[{ id: 'id', type: 'success', message: 'message' }]}
      />
    );
    expect(screen.getAllByText('MockToast')).toHaveLength(1);
  });
});
