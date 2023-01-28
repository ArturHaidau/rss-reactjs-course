import { render, screen } from '@testing-library/react';
import React from 'react';
import BookModal from './BookModal';

describe('BookModal', () => {
  test('should render book content', async () => {
    render(
      <BookModal
        handleClick={jest.fn}
        book={{
          id: 'id',
          name: 'name',
          chapters: [
            { id: 'id1', name: 'name1' },
            { id: 'id2', name: 'name2' },
          ],
        }}
      />
    );
    expect(screen.getByText('name')).toBeInTheDocument();
    expect(screen.getByText('name1, name2')).toBeInTheDocument();
  });
});
