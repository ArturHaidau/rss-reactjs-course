import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import store from '../../store';
import SearchParams from './SearchParams';

describe('SearchParams', () => {
  const renderComponent = () =>
    render(
      <Provider store={store}>
        <SearchParams />
      </Provider>
    );

  test('should dispatch sort by changes', () => {
    renderComponent();
    fireEvent.click(screen.getByLabelText('Ascending'));
    expect(store.getState().books.searchParams.sortBy).toStrictEqual('asc');
  });

  test('should dispatch page limit changes', () => {
    const { container } = renderComponent();
    const value = 2;
    fireEvent.change(container.getElementsByClassName('pageLimitInput')[0], {
      target: { value: value },
    });
    expect(store.getState().books.searchParams.pageLimit).toStrictEqual(value);
  });
});
