import { render, screen } from '@testing-library/react';
import React from 'react';
import { MockCard } from '../../mocks/components';
import Cards from './Cards';
import profiles from '../../mocks/profiles.json';

jest.mock('../Card', () => MockCard);

describe('Cards', () => {
  test('should display cards', async () => {
    render(<Cards data={profiles.map((x) => ({ ...x, avatarImage: 'image' }))} />);
    expect(screen.getAllByText('MockCard')).toHaveLength(profiles.length);
  });
});
