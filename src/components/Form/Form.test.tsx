import { act, fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { Provider } from 'react-redux';
import { MockProfileCard } from '../../mocks/components';
import store from '../../store';
import Form from './Form';

jest.mock('../Cards/ProfileCard', () => MockProfileCard);

describe('Form', () => {
  const renderComponent = () => {
    render(
      <Provider store={store}>
        <Form />
      </Provider>
    );
  };

  test('should add profile', async () => {
    window.URL.createObjectURL = jest.fn();
    window.confirm = jest.fn(() => true);
    renderComponent();
    await act(async () => {
      fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'test' } });
      fireEvent.change(screen.getByLabelText('Birthday'), {
        target: { value: '2022-10-06' },
      });
      fireEvent.select(screen.getByLabelText('Country'), { target: { value: 'USA' } });
      fireEvent.click(screen.getByLabelText('You are 18+'));
      userEvent.upload(
        screen.getByLabelText('Avatar'),
        new File(['avatar'], 'avatar.png', { type: 'image/png' })
      );
      fireEvent.click(screen.getByText('Submit'));
    });
    expect(screen.getByText('MockProfileCard')).toBeInTheDocument();
  });

  test('should display errors', async () => {
    renderComponent();
    const nameInput = screen.getByLabelText('Name');
    await act(async () => {
      fireEvent.change(nameInput, { target: { value: 'test' } });
      fireEvent.change(nameInput, { target: { value: '' } });
      fireEvent.click(screen.getByText('Submit'));
    });
    [
      'The name should not be empty',
      'The birthday should not be empty',
      'The avatar source should not be empty',
    ].forEach((errorMessage) => expect(screen.getByText(errorMessage)).toBeInTheDocument());
  });
});
