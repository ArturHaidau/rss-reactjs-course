import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { MockCard } from '../../../mock/components';
import mockEmployees from '../../../mock/employees.json';
import mockLocalStorage from '../../../mock/localStorage';
import { SEARCH_BAR_TEXT_KEY } from '../../application.constants';
import Cards from './Cards';

Object.defineProperty(window, 'localStorage', { value: mockLocalStorage });
jest.mock('../Card', () => MockCard);
jest.mock('../../employees.json', () => mockEmployees);

describe('Cards', () => {
  test('should render SearchBar', () => {
    render(<Cards />);
    expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument();
  });

  test('should render employees', () => {
    render(<Cards />);
    expect(screen.getAllByText('MockCard')).toHaveLength(mockEmployees.length);
  });

  test('should render no employees', () => {
    mockLocalStorage.setItem(SEARCH_BAR_TEXT_KEY, 'some weird text');
    render(<Cards />);
    expect(screen.queryAllByText('MockCard')).toHaveLength(0);
  });

  test('should call componentWillUnmount', () => {
    const { unmount } = render(<Cards />);
    const text = 'some value';
    fireEvent.change(screen.getByPlaceholderText('Search...'), { target: { value: text } });
    unmount();
    expect(mockLocalStorage.getItem(SEARCH_BAR_TEXT_KEY)).toStrictEqual(text);
  });
});
