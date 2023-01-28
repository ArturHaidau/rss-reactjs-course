import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { INITIAL_BOOK_PREVIEWS_SEARCH_PARAMS as mockSearchParams } from '../../application.constants';
import { Paging } from '../../types/paging';
import Pages from './Pages';

let mockBookPreviewsPaging: Paging;
const mockSearchBookPreviews = jest.fn();

jest.mock('../../hooks/useBooks', () => () => ({ searchBookPreviews: mockSearchBookPreviews }));
jest.mock('../../state', () => ({
  useStateContext: () => ({
    searchParams: mockSearchParams,
    bookPreviewsPaging: mockBookPreviewsPaging,
  }),
}));

describe('Pages', () => {
  const expectPages = (pages: number[]) =>
    pages.forEach((x) => expect(screen.getByText(x)).toBeInTheDocument());

  test('should render pages #1', () => {
    mockBookPreviewsPaging = { current: 1, count: 5 };
    render(<Pages />);
    expectPages([1, 2, 3]);
  });

  test('should render pages #2', () => {
    mockBookPreviewsPaging = { current: 3, count: 5 };
    render(<Pages />);
    expectPages([1, 2, 3, 4, 5]);
  });

  test('should render pages #3', () => {
    mockBookPreviewsPaging = { current: 5, count: 5 };
    render(<Pages />);
    expectPages([1, 4, 5]);
  });

  test('should search book previews with specific page', () => {
    mockBookPreviewsPaging = { current: 3, count: 5 };
    render(<Pages />);
    const pageNumber = 2;
    fireEvent.click(screen.getByText(pageNumber));
    expect(mockSearchBookPreviews).toHaveBeenCalledWith(mockSearchParams, pageNumber);
  });
});
