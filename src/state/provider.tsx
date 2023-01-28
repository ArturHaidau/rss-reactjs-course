import React from 'react';
import { INITIAL_BOOK_PREVIEWS_SEARCH_PARAMS } from '../application.constants';
import { BookPreview } from '../types/book-preview';
import { Notification } from '../types/notification';
import { OpenedBook } from '../types/opened-book';
import { Paging } from '../types/paging';
import { Profile } from '../types/profile';
import { SearchParams } from '../types/search-params';
import {
  AddProfile,
  HideNotification,
  SetBookPreviews,
  SetBookPreviewsPaging,
  SetLoading,
  SetOpenedBook,
  SetSearchParams,
  ShowNotification,
} from './actions';
import reducer from './reducer';

export interface State {
  loading: boolean;
  notifications: Notification[];
  bookPreviews: BookPreview[];
  profiles: Profile[];
  openedBook: OpenedBook;
  searchParams: SearchParams;
  bookPreviewsPaging: Paging;
}

export const initialState = {
  loading: false,
  notifications: [],
  bookPreviews: [],
  profiles: [],
  openedBook: null,
  bookPreviewsPaging: { count: 0, current: 0 },
  searchParams: INITIAL_BOOK_PREVIEWS_SEARCH_PARAMS,
};

export type Action =
  | ShowNotification
  | HideNotification
  | SetBookPreviews
  | AddProfile
  | SetOpenedBook
  | SetSearchParams
  | SetBookPreviewsPaging
  | SetLoading;

const Context = React.createContext<State>(initialState);
const Dispatch = React.createContext<React.Dispatch<Action>>(() => {});

const Provider = ({ children }: React.PropsWithChildren) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  return (
    <Context.Provider value={state}>
      <Dispatch.Provider value={dispatch}>{children}</Dispatch.Provider>
    </Context.Provider>
  );
};

const useContext = () => React.useContext(Context);
const useDispatch = () => React.useContext(Dispatch);

export { Provider, useContext, useDispatch };
