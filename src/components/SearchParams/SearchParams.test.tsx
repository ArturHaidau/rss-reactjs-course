import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { INITIAL_BOOK_PREVIEWS_SEARCH_PARAMS as mockSearchParams } from '../../application.constants';
import SearchParams from './SearchParams';

const mockDispatch = jest.fn();

jest.mock('../../state', () => ({
  useStateContext: () => ({ searchParams: mockSearchParams, bookPreviewsPaging: { count: 0 } }),
  useStateDispatch: () => mockDispatch,
}));

describe('SearchParams', () => {
  test('should dispatch sort by changes', () => {
    render(<SearchParams />);
    fireEvent.click(screen.getByLabelText('Ascending'));
    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'SET_SEARCH_PARAMS',
      payload: { sortBy: 'asc' },
    });
  });

  test('should dispatch page limit changes', () => {
    const { container } = render(<SearchParams />);
    const value = 2;
    fireEvent.change(container.getElementsByClassName('pageLimitInput')[0], {
      target: { value: value },
    });
    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'SET_SEARCH_PARAMS',
      payload: { pageLimit: value },
    });
  });
});
