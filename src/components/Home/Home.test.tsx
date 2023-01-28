import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { MockCard } from '../../mocks/components';
import mockProfiles from '../../mocks/profiles.json';
import mockLocalStorage from '../../mocks/localStorage';
import { SEARCH_BAR_TEXT_KEY } from '../../application.constants';
import Home from './Home';

Object.defineProperty(window, 'localStorage', { value: mockLocalStorage });
jest.mock('../Card', () => MockCard);

describe('Home', () => {
  test('should render SearchBar', () => {
    render(<Home />);
    expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument();
  });

  test('should render profiles', () => {
    render(<Home />);
    expect(screen.getAllByText('MockCard')).toHaveLength(mockProfiles.length);
  });

  test('should render no profiles', () => {
    mockLocalStorage.setItem(SEARCH_BAR_TEXT_KEY, 'some weird text');
    render(<Home />);
    expect(screen.queryAllByText('MockCard')).toHaveLength(0);
  });

  test('should call componentWillUnmount', () => {
    const { unmount } = render(<Home />);
    const text = 'some value';
    fireEvent.change(screen.getByPlaceholderText('Search...'), { target: { value: text } });
    unmount();
    expect(mockLocalStorage.getItem(SEARCH_BAR_TEXT_KEY)).toStrictEqual(text);
  });
});
