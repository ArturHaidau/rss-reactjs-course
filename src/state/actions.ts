import { OpenedBook } from '../types/opened-book';
import { BookPreview } from '../types/book-preview';
import { NotificationType } from '../types/notification';
import { Profile } from '../types/profile';
import { SortOrder } from '../types/sort-order';

export interface ShowNotification {
  type: 'SHOW_NOTIFICATION';
  payload: {
    notificationType: NotificationType;
    message: string;
  };
}

export interface HideNotification {
  type: 'HIDE_NOTIFICATION';
  payload: {
    notificationId: string;
  };
}

export interface SetBookPreviews {
  type: 'SET_BOOK_PREVIEWS';
  payload: {
    bookPreviews: BookPreview[];
  };
}

export interface AddProfile {
  type: 'ADD_PROFILE';
  payload: {
    profile: Profile;
  };
}

export interface SetOpenedBook {
  type: 'SET_OPENED_BOOK';
  payload: {
    openedBook: OpenedBook;
  };
}

export interface SetSearchParams {
  type: 'SET_SEARCH_PARAMS';
  payload: {
    sortBy?: SortOrder;
    pageLimit?: number;
    text?: string;
  };
}

export interface SetBookPreviewsPaging {
  type: 'SET_BOOK_PREVIEWS_PAGING';
  payload: {
    count: number;
    current: number;
  };
}

export interface SetLoading {
  type: 'SET_LOADING';
  payload: {
    loading: boolean;
  };
}
