import { act, cleanup, fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { bookChaptersResponse, bookPreviews } from '../../mocks/data';
import { mockResolvedFetchWith } from '../../mocks/fetch';
import store from '../../store';
import { closeBook, fetchBook } from '../../store/slices/books';
import Book from './Book';

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('Book', () => {
  const renderComponent = async () => {
    await act(() => {
      render(
        <BrowserRouter>
          <Provider store={store}>
            <Book />
          </Provider>
        </BrowserRouter>
      );
    });
  };

  beforeEach(async () => {
    mockResolvedFetchWith(bookChaptersResponse);
    await store.dispatch(fetchBook(bookPreviews[0]));
    await renderComponent();
  });

  test('should render book', () => {
    expect(screen.getByText('name')).toBeInTheDocument();
    expect(screen.getByText('name1, name2')).toBeInTheDocument();
  });

  test('should reset opened book', () => {
    fireEvent.click(screen.getByText('Back'));
    expect(store.getState().books.openedBook).toBeNull();
  });

  test('should redirect to home page when no opened book', async () => {
    cleanup();
    store.dispatch(closeBook());
    jest.useFakeTimers();
    await renderComponent();
    jest.runAllTimers();
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });
});
