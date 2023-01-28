import { render, screen } from '@testing-library/react';
import React from 'react';
import { MockProfileCard } from '../../../mocks/components';
import { profiles as mockProfiles } from '../../../mocks/data';
import ProfileCards from './ProfileCards';

jest.mock('../ProfileCard', () => MockProfileCard);
jest.mock('../../../state', () => ({
  useStateContext: () => ({ profiles: mockProfiles }),
}));

describe('ProfileCards', () => {
  test('should display cards', async () => {
    render(<ProfileCards />);
    expect(screen.getAllByText('MockProfileCard')).toHaveLength(mockProfiles.length);
  });
});
