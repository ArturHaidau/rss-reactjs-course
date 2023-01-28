import { SortOrder } from './types/sort-order';

export const SEARCH_BAR_TEXT_KEY = 'search-bar-text';
export const APP_ROOT_ID = 'root';
export const DEFAULT_BOOK_PREVIEWS_PAGE_LIMIT = 3;
export const PAGES_RADIUS = 2;
export const INITIAL_BOOK_PREVIEWS_SEARCH_PARAMS = {
  text: localStorage.getItem(SEARCH_BAR_TEXT_KEY) ?? '',
  sortBy: 'default' as SortOrder,
  pageLimit: DEFAULT_BOOK_PREVIEWS_PAGE_LIMIT,
};
