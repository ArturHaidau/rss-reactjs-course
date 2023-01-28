import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import SearchBar from './SearchBar';

describe('SearchBar', () => {
  const mockChangeSearchText = jest.fn();
  const mockSearchBooks = jest.fn();

  beforeEach(() => {
    render(
      <SearchBar
        searchText="text"
        changeSearchText={mockChangeSearchText}
        searchBooks={mockSearchBooks}
      />
    );
  });

  test('should change component input', () => {
    const text = 'some text';
    fireEvent.change(screen.getByPlaceholderText('Search...'), { target: { value: text } });
    expect(mockChangeSearchText).toHaveBeenCalledWith(text);
  });

  test('should search books on Enter button press', () => {
    fireEvent.keyUp(screen.getByPlaceholderText('Search...'), { key: 'Enter' });
    expect(mockSearchBooks).toHaveBeenCalled();
  });
});
