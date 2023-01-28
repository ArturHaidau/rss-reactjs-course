import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import {
  INITIAL_BOOK_PREVIEWS_SEARCH_PARAMS,
  SEARCH_BAR_TEXT_KEY,
} from '../../application.constants';
import mockLocalStorage from '../../mocks/localStorage';
import store from '../../store';
import { setSearchParams } from '../../store/slices/books';
import SearchBar from './SearchBar';

const mockSearchBookPreviews = jest.fn();

Object.defineProperty(window, 'localStorage', { value: mockLocalStorage });
jest.mock('../../hooks/useBooks', () => () => ({ searchBookPreviews: mockSearchBookPreviews }));

describe('SearchBar', () => {
  const renderComponent = () => {
    render(
      <Provider store={store}>
        <SearchBar />
      </Provider>
    );
  };

  test('should change search text', () => {
    renderComponent();
    const text = 'some text';
    const searchBar = screen.getByPlaceholderText('Search...');
    fireEvent.change(searchBar, { target: { value: text } });
    expect(store.getState().books.searchParams.text).toStrictEqual(text);
  });

  test('should search book previews on pressing Enter button', () => {
    store.dispatch(setSearchParams(INITIAL_BOOK_PREVIEWS_SEARCH_PARAMS));
    renderComponent();
    const searchBar = screen.getByPlaceholderText('Search...');
    fireEvent.keyUp(searchBar, { key: 'Enter' });
    expect(mockSearchBookPreviews).toHaveBeenCalledWith(INITIAL_BOOK_PREVIEWS_SEARCH_PARAMS, 1);
  });

  test('should save search text to local storage', () => {
    store.dispatch(setSearchParams(INITIAL_BOOK_PREVIEWS_SEARCH_PARAMS));
    renderComponent();
    expect(mockLocalStorage.getItem(SEARCH_BAR_TEXT_KEY)).toStrictEqual(
      INITIAL_BOOK_PREVIEWS_SEARCH_PARAMS.text
    );
  });
});
