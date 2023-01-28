import { act, fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { MockBookCard } from '../../../mocks/components';
import { bookChaptersResponse, bookPreviews as mockBookPreviews } from '../../../mocks/data';
import BookCards from './BookCards';

const mockDispatch = jest.fn();
const mockNavigate = jest.fn();
const mockFetchBookChapters = jest.fn();

jest.mock('react-router-dom', () => ({ useNavigate: () => mockNavigate }));
jest.mock('../BookCard', () => MockBookCard);
jest.mock('../../../hooks/useBooks', () => () => ({ fetchBookChapters: mockFetchBookChapters }));
jest.mock('../../../state', () => ({
  useStateContext: () => ({ bookPreviews: mockBookPreviews }),
  useStateDispatch: () => mockDispatch,
}));

describe('BookCards', () => {
  test('should render book previews', () => {
    render(<BookCards />);
    expect(screen.getAllByText('MockBookCard')).toHaveLength(mockBookPreviews.length);
  });

  test('should redirect to book page and dispatch book data successfully', async () => {
    mockFetchBookChapters.mockResolvedValueOnce(bookChaptersResponse);
    render(<BookCards />);
    await act(async () => {
      fireEvent.click(screen.getByText('MockBookCard'));
    });
    expect(mockNavigate).toHaveBeenCalledWith('/book');
    expect(mockDispatch).nthCalledWith(1, {
      type: 'SET_OPENED_BOOK',
      payload: {
        openedBook: {
          id: mockBookPreviews[0].bookId,
          name: mockBookPreviews[0].bookName,
          chapters: bookChaptersResponse,
        },
      },
    });
  });

  test('should not redirect to book page', async () => {
    mockFetchBookChapters.mockRejectedValueOnce(new Error('Fetching book chapters failed'));
    render(<BookCards />);
    await act(async () => {
      fireEvent.click(screen.getByText('MockBookCard'));
    });
    expect(mockNavigate).not.toHaveBeenCalled();
  });
});
