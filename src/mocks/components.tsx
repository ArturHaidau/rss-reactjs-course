import React from 'react';
import { BookCardProps } from '../components/Cards/BookCard';
import { BookCardsProps } from '../components/Cards/BookCards';
import { HomeProps } from '../components/Home';
import { BookModalProps } from '../components/Modals/BookModal';
import { NotificationsProps } from '../components/Notifications';

export const MockProfileCard = () => <div>MockProfileCard</div>;
export const MockAboutUs = () => <div>MockAboutUs</div>;
export const MockNotFound = () => <div>MockNotFound</div>;
export const MockToast = () => <div>MockToast</div>;
export const MockBookCard = ({ bookPreview, handleClick }: BookCardProps) => (
  <div data-testid="mockBookCard" onClick={() => handleClick(bookPreview)} />
);
export const MockBookModal = ({ handleClick }: BookModalProps) => (
  <div data-testid="mockBookModal" onClick={handleClick} />
);
export const MockBookCards = ({ data }: BookCardsProps) =>
  data.map((bookPreview, index) => (
    <MockBookCard key={index} bookPreview={bookPreview} handleClick={() => {}} />
  ));
export const MockHome = ({ showNotification }: HomeProps) => (
  <div
    data-testid="mockHome"
    onClick={() => showNotification('success', 'Test notification message')}
  />
);
export const MockNotifications = ({ notifications, handleClick }: NotificationsProps) =>
  notifications.map(({ id, message }, index) => (
    <div key={index} onClick={() => handleClick(id)}>
      {message}
    </div>
  ));
