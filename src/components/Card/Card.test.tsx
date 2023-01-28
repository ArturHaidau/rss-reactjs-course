import { render, screen } from '@testing-library/react';
import React from 'react';
import Card from './Card';

describe('Card', () => {
  test('should render Card', () => {
    const profile = {
      name: 'name',
      birthday: '10/07/2022',
      country: 'USA',
      isAdult: false,
      sex: 'Male',
      avatarImage: 'image',
    };
    render(<Card {...profile} />);
    ['Name: name', 'Birthday: 10/07/2022', 'Country: USA', 'Age: Not adult', 'Sex: Male'].forEach(
      (value) => expect(screen.getByText(value)).toBeInTheDocument()
    );
  });
});
