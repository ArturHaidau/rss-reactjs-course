import { render, screen } from '@testing-library/react';
import React from 'react';
import { MockProfileCard } from '../../../mocks/components';
import ProfileCards from './ProfileCards';
import profiles from '../../../mocks/profiles.json';

jest.mock('../ProfileCard', () => MockProfileCard);

describe('ProfileCards', () => {
  test('should display cards', async () => {
    render(<ProfileCards data={profiles.map((x) => ({ ...x, avatarImage: 'image' }))} />);
    expect(screen.getAllByText('MockProfileCard')).toHaveLength(profiles.length);
  });
});
