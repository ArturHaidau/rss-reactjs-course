import { render } from '@testing-library/react';
import React from 'react';
import Loading from './Loading';

describe('Loading', () => {
  test('should render loading', async () => {
    const { container } = render(<Loading />);
    expect(container.getElementsByClassName('loading')).toHaveLength(1);
  });
});
