import { NotificationType } from '../types/notification';

export const bookPreviews = [{ bookId: 'id', bookName: 'name' }];
export const bookPreviewsResponse = {
  pages: 5,
  page: 3,
  docs: [
    { _id: '1', name: 'name1' },
    { _id: '2', name: 'name2' },
  ],
};
export const bookChaptersResponse = {
  docs: [
    { _id: 'id1', chapterName: 'name1' },
    { _id: 'id2', chapterName: 'name2' },
  ],
};
export const openedBook = {
  id: 'id',
  name: 'name',
  chapters: [
    { id: 'id1', name: 'name1' },
    { id: 'id2', name: 'name2' },
  ],
};
export const profiles = [
  {
    name: 'John Doe',
    birthday: '30.05.1999',
    country: 'Poland',
    isAdult: true,
    sex: 'Male',
  },
  {
    name: 'Artur Haidau',
    birthday: '30.11.1999',
    country: 'Belarus',
    isAdult: true,
    sex: 'Male',
  },
  {
    name: 'Dan Abramov',
    birthday: '11.03.1985',
    country: 'USA',
    isAdult: true,
    sex: 'Male',
  },
];
export const notifications = [
  { id: '1', type: 'success' as NotificationType, message: 'Message1' },
  { id: '2', type: 'error' as NotificationType, message: 'Message2' },
  { id: '3', type: 'info' as NotificationType, message: 'Message3' },
];
