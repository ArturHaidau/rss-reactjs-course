import { act, fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { MockBookCards } from '../../mocks/components';
import { mockRejectedFetchWith, mockResolvedFetchWith } from '../../mocks/fetch';
import mockLocalStorage from '../../mocks/localStorage';
import { SEARCH_BAR_TEXT_KEY } from '../../application.constants';
import Home from './Home';

Object.defineProperty(window, 'localStorage', { value: mockLocalStorage });
jest.mock('../Cards/BookCards', () => MockBookCards);

describe('Home', () => {
  const props = {
    showNotification: jest.fn(),
  };
  const mockBookPreviews = {
    docs: [
      { _id: '1', name: 'name1' },
      { _id: '2', name: 'name2' },
    ],
  };

  beforeEach(() => {
    mockResolvedFetchWith(mockBookPreviews);
  });

  test('should render SearchBar', async () => {
    await act(() => {
      render(<Home {...props} />);
    });
    expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument();
  });

  test('should render book previews', async () => {
    await act(() => {
      render(<Home {...props} />);
    });
    expect(screen.getAllByTestId('mockBookCard')).toHaveLength(mockBookPreviews.docs.length);
  });

  test('should handle error when fetching book previews failed', async () => {
    mockRejectedFetchWith(new Error('Fetching book previews failed'));
    await act(() => {
      render(<Home {...props} />);
    });
    expect(screen.queryAllByTestId('mockBookCard')).toHaveLength(0);
  });

  test('should call componentWillUnmount', () => {
    const { unmount } = render(<Home {...props} />);
    const text = 'some value';
    fireEvent.change(screen.getByPlaceholderText('Search...'), { target: { value: text } });
    unmount();
    expect(mockLocalStorage.getItem(SEARCH_BAR_TEXT_KEY)).toStrictEqual(text);
  });
});
