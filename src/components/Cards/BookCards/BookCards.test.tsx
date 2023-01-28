import { act, fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { MockBookCard, MockBookModal } from '../../../mocks/components';
import { mockRejectedFetchWith, mockResolvedFetchWith } from '../../../mocks/fetch';
import BookCards from './BookCards';

jest.mock('../BookCard', () => MockBookCard);
jest.mock('../../Modals/BookModal', () => MockBookModal);

describe('BookCards', () => {
  const mockData = [{ bookId: 'bookId', bookName: 'bookName' }];
  const mockShowNotification = jest.fn();

  test('should render book previews', () => {
    render(<BookCards data={mockData} showNotification={mockShowNotification} />);
    expect(screen.getAllByTestId('mockBookCard')).toHaveLength(mockData.length);
  });

  test('should open/close book modal successfully', async () => {
    mockResolvedFetchWith({ docs: [{ _id: 'id', chapterName: 'name' }] });
    render(<BookCards data={mockData} showNotification={mockShowNotification} />);
    await act(async () => {
      fireEvent.click(screen.getByTestId('mockBookCard'));
    });
    expect(mockShowNotification).toHaveBeenCalledWith('success', 'Book opened successfully');
    const modal = screen.getByTestId('mockBookModal');
    expect(modal).toBeInTheDocument();
    fireEvent.click(modal);
    expect(modal).not.toBeInTheDocument();
  });

  test('should not open a book when fetching book chapters failed', async () => {
    mockRejectedFetchWith(new Error('Fetching book chapters failed'));
    render(<BookCards data={mockData} showNotification={mockShowNotification} />);
    await act(async () => {
      fireEvent.click(screen.getByTestId('mockBookCard'));
    });
    expect(mockShowNotification).toHaveBeenCalledWith('error', 'Unable to open the book');
    expect(screen.queryByTestId('mockBookModal')).not.toBeInTheDocument();
  });
});
