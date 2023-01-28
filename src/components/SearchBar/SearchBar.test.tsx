import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import SearchBar from './SearchBar';

describe('SearchBar', () => {
  const mockChangeSearchText = jest.fn();

  beforeEach(() => {
    render(<SearchBar searchText="text" changeSearchText={mockChangeSearchText} />);
  });

  test('should change search text on Enter button press', () => {
    const text = 'some text';
    const searchBar = screen.getByPlaceholderText('Search...');
    fireEvent.change(searchBar, { target: { value: text } });
    fireEvent.keyUp(searchBar, { key: 'Enter' });
    expect(mockChangeSearchText).toHaveBeenCalledWith(text);
  });
});
