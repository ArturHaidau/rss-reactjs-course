import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { openedBook } from '../../mocks/data';
import { OpenedBook } from '../../types/opened-book';
import Book from './Book';

let mockOpenedBook: OpenedBook;
const mockDispatch = jest.fn();
const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));
jest.mock('../../state', () => ({
  useStateDispatch: () => mockDispatch,
  useStateContext: () => ({ openedBook: mockOpenedBook }),
}));

describe('Book', () => {
  beforeEach(() => {
    mockOpenedBook = openedBook;
    render(
      <BrowserRouter>
        <Book />
      </BrowserRouter>
    );
  });

  test('should render book', () => {
    expect(screen.getByText('name')).toBeInTheDocument();
    expect(screen.getByText('name1, name2')).toBeInTheDocument();
  });

  test('should reset opened book', () => {
    fireEvent.click(screen.getByText('Back'));
    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'SET_OPENED_BOOK',
      payload: { openedBook: null },
    });
  });

  test('should redirect to home page when no opened book', () => {
    jest.useFakeTimers();
    mockOpenedBook = null;
    render(
      <BrowserRouter>
        <Book />
      </BrowserRouter>
    );
    jest.runAllTimers();
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });
});
