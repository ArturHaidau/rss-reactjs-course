import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import Modal from './Modal';

describe('Modal', () => {
  const mockHandleClick = jest.fn();

  beforeEach(() => {
    render(
      <Modal handleClick={mockHandleClick}>
        <div data-testid="modal-content" />
      </Modal>
    );
  });

  test('should render children', () => {
    expect(screen.getByTestId('modal-content')).toBeInTheDocument();
  });

  test('should handle clicking on the modal', () => {
    fireEvent.click(screen.getByText('×'));
    expect(mockHandleClick).toHaveBeenCalled();
  });
});
