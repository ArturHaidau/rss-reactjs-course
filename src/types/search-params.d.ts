import { SortOrder } from './sort-order';

export interface SearchParams {
  text: string;
  sortBy: SortOrder;
  pageLimit: number;
}
