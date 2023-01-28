import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import SearchBar from './SearchBar';

describe('SearchBar', () => {
  test('should change SearchBar input', () => {
    const mockChangeSearchText = jest.fn();
    render(<SearchBar searchText="text" changeSearchText={mockChangeSearchText} />);
    const text = 'some text';
    fireEvent.change(screen.getByPlaceholderText('Search...'), { target: { value: text } });
    expect(mockChangeSearchText).toHaveBeenCalledWith(text);
  });
});
