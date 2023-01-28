import { render, screen } from '@testing-library/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Header from './Header';

describe('Header', () => {
  test('should render Header', () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );
    ['Home', 'About', 'Form', '404', 'Book'].forEach((label) =>
      expect(screen.getByText(label)).toBeInTheDocument()
    );
  });
});
