import { render, screen } from '@testing-library/react';
import React from 'react';
import Card from './Card';

describe('Card', () => {
  test('should render Card', () => {
    const card = { name: 'name', position: 'position', email: 'email' };
    render(<Card {...card} />);
    Object.values(card).forEach((value) => expect(screen.getByText(value)).toBeInTheDocument());
  });
});
