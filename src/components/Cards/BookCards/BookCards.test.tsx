import { act, fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { MockBookCard } from '../../../mocks/components';
import { bookChaptersResponse, bookPreviewsResponse } from '../../../mocks/data';
import { mockRejectedFetchWith, mockResolvedFetchWith } from '../../../mocks/fetch';
import store from '../../../store';
import { fetchBookPreviews } from '../../../store/slices/books';
import { createBookPreviewsFromResponse, createChaptersFromResponse } from '../../../utils';
import BookCards from './BookCards';

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({ useNavigate: () => mockNavigate }));
jest.mock('../BookCard', () => MockBookCard);

describe('BookCards', () => {
  const renderComponent = () => {
    render(
      <Provider store={store}>
        <BookCards />
      </Provider>
    );
  };

  beforeEach(async () => {
    mockResolvedFetchWith(bookPreviewsResponse);
    await store.dispatch(fetchBookPreviews('url'));
  });

  test('should render book previews', async () => {
    renderComponent();
    expect(screen.getAllByText('MockBookCard')).toHaveLength(bookPreviewsResponse.docs.length);
  });

  test('should redirect to book page and dispatch book data successfully', async () => {
    mockResolvedFetchWith(bookChaptersResponse);
    renderComponent();
    await act(async () => {
      fireEvent.click(screen.getAllByText('MockBookCard')[0]);
    });
    expect(mockNavigate).toHaveBeenCalledWith('/book');
    const bookPreviews = createBookPreviewsFromResponse(bookPreviewsResponse);
    expect(store.getState().books.openedBook).toStrictEqual({
      id: bookPreviews[0].bookId,
      name: bookPreviews[0].bookName,
      chapters: createChaptersFromResponse(bookChaptersResponse),
    });
  });

  test('should not redirect to book page when error occurred', async () => {
    mockRejectedFetchWith(new Error('Fetching book chapters failed'));
    renderComponent();
    await act(async () => {
      fireEvent.click(screen.getAllByText('MockBookCard')[0]);
    });
    expect(mockNavigate).not.toHaveBeenCalled();
  });
});
