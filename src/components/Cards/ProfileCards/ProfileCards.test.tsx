import { render, screen } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { MockProfileCard } from '../../../mocks/components';
import { profiles } from '../../../mocks/data';
import store from '../../../store';
import { addProfile } from '../../../store/slices/profiles';
import ProfileCards from './ProfileCards';

jest.mock('../ProfileCard', () => MockProfileCard);

describe('ProfileCards', () => {
  test('should display cards', () => {
    store.dispatch(addProfile({ ...profiles[0], avatarImage: 'image' }));
    render(
      <Provider store={store}>
        <ProfileCards />
      </Provider>
    );
    expect(screen.getByText('MockProfileCard')).toBeInTheDocument();
  });
});
