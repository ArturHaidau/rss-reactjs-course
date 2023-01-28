import { render, screen } from '@testing-library/react';
import React from 'react';
import { MockBookCards, MockPages, MockSearchBar, MockSearchParams } from '../../mocks/components';
import Home from './Home';

jest.mock('../Cards/BookCards', () => MockBookCards);
jest.mock('../SearchBar', () => MockSearchBar);
jest.mock('../SearchParams', () => MockSearchParams);
jest.mock('../Pages', () => MockPages);

describe('Home', () => {
  test('should render SearchBar, SearchParams, Pages, BookCards', () => {
    render(<Home />);
    ['MockSearchBar', 'MockSearchParams', 'MockPages', 'MockBookCards'].forEach((s) =>
      expect(screen.getByText(s)).toBeInTheDocument()
    );
  });
});
