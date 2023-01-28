import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import { MockAboutUs, MockCards, MockNotFound } from '../../../mock/components';
import App from './App';

jest.mock('../Cards', () => MockCards);
jest.mock('../AboutUs', () => MockAboutUs);
jest.mock('../NotFound', () => MockNotFound);

describe('App', () => {
  test('should render Header', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    ['Home', 'About', '404'].forEach((x) => expect(screen.getByText(x)).toBeInTheDocument());
  });

  test('should create route /', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    fireEvent.click(screen.getByText('Home'));
    expect(screen.getByText('MockCards')).toBeInTheDocument();
  });

  test('should create route /about', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    fireEvent.click(screen.getByText('About'));
    expect(screen.getByText('MockAboutUs')).toBeInTheDocument();
  });

  test('should create route /not-found', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    fireEvent.click(screen.getByText('404'));
    expect(screen.getByText('MockNotFound')).toBeInTheDocument();
  });

  test('should render NotFound component when wrong URL', () => {
    render(
      <MemoryRouter initialEntries={['/wrong-url']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText('MockNotFound')).toBeInTheDocument();
  });
});
