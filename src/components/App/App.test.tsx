import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import { MockAboutUs, MockHome, MockNotFound, MockNotifications } from '../../mocks/components';
import App from './App';

jest.mock('../Home', () => MockHome);
jest.mock('../AboutUs', () => MockAboutUs);
jest.mock('../NotFound', () => MockNotFound);
jest.mock('../Notifications', () => MockNotifications);

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
    expect(screen.getByTestId('mockHome')).toBeInTheDocument();
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

  test('should show/hide notification', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    fireEvent.click(screen.getByText('Home'));
    fireEvent.click(screen.getByTestId('mockHome'));
    const notification = screen.getByText('Test notification message');
    expect(notification).toBeInTheDocument();
    fireEvent.click(notification);
    expect(notification).not.toBeInTheDocument();
  });
});
