import { render, screen } from '@testing-library/react';
import React from 'react';
import AboutUs from './AboutUs';

describe('AboutUs', () => {
  test('should render AboutUs component', () => {
    render(<AboutUs />);
    expect(screen.getByText('About us')).toBeInTheDocument();
  });
});
