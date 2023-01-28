import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import {
  INITIAL_BOOK_PREVIEWS_SEARCH_PARAMS as mockSearchParams,
  SEARCH_BAR_TEXT_KEY,
} from '../../application.constants';
import mockLocalStorage from '../../mocks/localStorage';
import SearchBar from './SearchBar';

const mockSearchBookPreviews = jest.fn();
const mockDispatch = jest.fn();

Object.defineProperty(window, 'localStorage', { value: mockLocalStorage });
jest.mock('../../hooks/useBooks', () => () => ({ searchBookPreviews: mockSearchBookPreviews }));
jest.mock('../../state', () => ({
  useStateContext: () => ({ searchParams: mockSearchParams }),
  useStateDispatch: () => mockDispatch,
}));

describe('SearchBar', () => {
  beforeEach(() => {
    render(<SearchBar />);
  });

  test('should change search text', () => {
    const text = 'some text';
    const searchBar = screen.getByPlaceholderText('Search...');
    fireEvent.change(searchBar, { target: { value: text } });
    expect(mockDispatch).toHaveBeenCalledWith({ type: 'SET_SEARCH_PARAMS', payload: { text } });
  });

  test('should search book previews on pressing Enter button', () => {
    const searchBar = screen.getByPlaceholderText('Search...');
    fireEvent.keyUp(searchBar, { key: 'Enter' });
    expect(mockSearchBookPreviews).toHaveBeenCalledWith(mockSearchParams, 1);
  });

  test('should save search text to local storage', () => {
    expect(mockLocalStorage.getItem(SEARCH_BAR_TEXT_KEY)).toStrictEqual(mockSearchParams.text);
  });
});
