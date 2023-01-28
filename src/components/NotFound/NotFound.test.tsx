import { render, screen } from '@testing-library/react';
import React from 'react';
import NotFound from './NotFound';

describe('NotFound', () => {
  test('should render NotFound', () => {
    render(<NotFound />);
    expect(screen.getByText('NotFound')).toBeInTheDocument();
  });
});
