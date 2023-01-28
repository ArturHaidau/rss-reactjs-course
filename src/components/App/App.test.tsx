import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { INITIAL_BOOK_PREVIEWS_SEARCH_PARAMS } from '../../application.constants';
import {
  MockAboutUs,
  MockHome,
  MockLoading,
  MockNotFound,
  MockNotifications,
} from '../../mocks/components';
import store from '../../store';
import { setLoading } from '../../store/slices/loading';
import App from './App';

const mockSearchBookPreviews = jest.fn();

jest.mock('../Home', () => MockHome);
jest.mock('../AboutUs', () => MockAboutUs);
jest.mock('../NotFound', () => MockNotFound);
jest.mock('../notifications', () => MockNotifications);
jest.mock('../Loading', () => MockLoading);
jest.mock('../../hooks/useBooks', () => () => ({
  searchBookPreviews: mockSearchBookPreviews,
}));

describe('App', () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <App />
        </Provider>
      </BrowserRouter>
    );
  });

  test('should render Header', () => {
    ['Home', 'About', '404'].forEach((x) => expect(screen.getByText(x)).toBeInTheDocument());
  });

  test('should create route /', () => {
    fireEvent.click(screen.getByText('Home'));
    expect(screen.getByText('MockHome')).toBeInTheDocument();
  });

  test('should create route /about', () => {
    fireEvent.click(screen.getByText('About'));
    expect(screen.getByText('MockAboutUs')).toBeInTheDocument();
  });

  test('should create route /not-found', () => {
    fireEvent.click(screen.getByText('404'));
    expect(screen.getByText('MockNotFound')).toBeInTheDocument();
  });

  test('should render NotFound component when wrong URL', () => {
    expect(screen.getByText('MockNotFound')).toBeInTheDocument();
  });

  test('should render Notifications', () => {
    expect(screen.getByText('MockNotifications')).toBeInTheDocument();
  });

  test('should search book previews once when rendered', () => {
    expect(mockSearchBookPreviews).toHaveBeenCalledTimes(1);
    expect(mockSearchBookPreviews).toHaveBeenCalledWith(INITIAL_BOOK_PREVIEWS_SEARCH_PARAMS, 1);
  });

  test('should render Loading', () => {
    cleanup();
    store.dispatch(setLoading(true));
    render(
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    );
    expect(screen.getByText('MockLoading')).toBeInTheDocument();
  });
});
