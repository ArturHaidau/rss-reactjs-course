import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { INITIAL_BOOK_PREVIEWS_SEARCH_PARAMS as mockSearchParams } from '../../application.constants';
import { bookPreviewsResponse } from '../../mocks/data';
import { mockResolvedFetchWith } from '../../mocks/fetch';
import store from '../../store';
import { fetchBookPreviews } from '../../store/slices/books';
import Pages from './Pages';

const mockSearchBookPreviews = jest.fn();

jest.mock('../../hooks/useBooks', () => () => ({ searchBookPreviews: mockSearchBookPreviews }));

describe('Pages', () => {
  const renderComponent = async (page: number, pages: number) => {
    mockResolvedFetchWith({ ...bookPreviewsResponse, page, pages });
    await store.dispatch(fetchBookPreviews('url'));
    render(
      <Provider store={store}>
        <Pages />
      </Provider>
    );
  };

  const expectPages = (pages: number[]) =>
    pages.forEach((x) => expect(screen.getByText(x)).toBeInTheDocument());

  test('should render pages #1', async () => {
    await renderComponent(1, 5);
    expectPages([1, 2, 5]);
  });

  test('should render pages #2', async () => {
    await renderComponent(3, 5);
    expectPages([1, 2, 3, 4, 5]);
  });

  test('should render pages #3', async () => {
    await renderComponent(5, 5);
    expectPages([1, 4, 5]);
  });

  test('should search book previews with specific page', async () => {
    await renderComponent(3, 5);
    const pageNumber = 2;
    fireEvent.click(screen.getByText(pageNumber));
    expect(mockSearchBookPreviews).toHaveBeenCalledWith(mockSearchParams, pageNumber);
  });
});
