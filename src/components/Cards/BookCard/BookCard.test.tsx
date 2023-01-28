import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import BookCard from './BookCard';

describe('BookCard', () => {
  const mockHandleClick = jest.fn();
  const mockBookPreview = { bookId: 'id', bookName: 'name' };

  test('should render book name', () => {
    render(<BookCard bookPreview={mockBookPreview} handleClick={mockHandleClick} />);
    expect(screen.getByText('name')).toBeInTheDocument();
  });

  test('should handle click event', () => {
    render(<BookCard bookPreview={mockBookPreview} handleClick={mockHandleClick} />);
    const card = screen.getByText('name').parentElement;
    if (!card) throw new Error('Unable to find card div');
    else {
      fireEvent.click(card);
      expect(mockHandleClick).toHaveBeenCalledWith(mockBookPreview);
    }
  });
});
