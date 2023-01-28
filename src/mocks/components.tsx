import React from 'react';
import { BookCardProps } from '../components/Cards/BookCard';
import { ToastProps } from '../components/Toast';

export const MockProfileCard = () => <div>MockProfileCard</div>;
export const MockAboutUs = () => <div>MockAboutUs</div>;
export const MockNotFound = () => <div>MockNotFound</div>;
export const MockBookCards = () => <div>MockBookCards</div>;
export const MockHome = () => <div>MockHome</div>;
export const MockNotifications = () => <div>MockNotifications</div>;
export const MockLoading = () => <div>MockLoading</div>;
export const MockPages = () => <div>MockPages</div>;
export const MockSearchParams = () => <div>MockSearchParams</div>;
export const MockSearchBar = () => <div>MockSearchBar</div>;
export const MockToast = ({ notification, handleClick }: ToastProps) => (
  <div onClick={handleClick}>{notification.message}</div>
);
export const MockBookCard = ({ bookPreview, handleClick }: BookCardProps) => (
  <div onClick={() => handleClick(bookPreview)}>MockBookCard</div>
);
