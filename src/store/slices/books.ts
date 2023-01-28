import type { PayloadAction } from '@reduxjs/toolkit';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { INITIAL_BOOK_PREVIEWS_SEARCH_PARAMS } from '../../application.constants';
import { BookPreview } from '../../types/book-preview';
import { BookChaptersDto } from '../../types/dto/book-chapters.dto';
import { BookPreviewsDto } from '../../types/dto/book-previews.dto';
import { OpenedBook } from '../../types/opened-book';
import { Paging } from '../../types/paging';
import { SearchParams } from '../../types/search-params';
import {
  createBookPreviewsFromResponse,
  createChaptersFromResponse,
  fetchBooks,
} from '../../utils';
import { setLoading } from './loading';
import { showNotification } from './notifications';

interface FetchBookPreviewsPayload {
  bookPreviews: BookPreview[];
  paging: Paging;
}

export const fetchBookPreviews = createAsyncThunk<FetchBookPreviewsPayload, string>(
  'books/fetchBookPreviews',
  async (url, { dispatch }) => {
    dispatch(setLoading(true));
    try {
      const response = await fetchBooks<BookPreviewsDto>(url);
      dispatch(showNotification({ type: 'success', message: 'Books fetched successfully' }));
      const bookPreviews = createBookPreviewsFromResponse(response);
      if (bookPreviews.length === 0)
        dispatch(
          showNotification({
            type: 'info',
            message: 'Unable to find books with such search parameters',
          })
        );
      return {
        bookPreviews,
        paging: { count: response.pages, current: response.page },
      };
    } catch (error) {
      console.error(`Unable to fetch book previews: ${error}`);
      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  }
);

export const fetchBook = createAsyncThunk<OpenedBook, BookPreview>(
  'books/fetchBook',
  async ({ bookId, bookName }, { dispatch }) => {
    dispatch(setLoading(true));
    try {
      return {
        id: bookId,
        name: bookName,
        chapters: createChaptersFromResponse(
          await fetchBooks<BookChaptersDto>(`${bookId}/chapter`)
        ),
      };
    } catch (error) {
      console.error(`Unable to fetch book chapters: ${error}`);
      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  }
);

interface State {
  bookPreviews: BookPreview[];
  openedBook: OpenedBook;
  searchParams: SearchParams;
  bookPreviewsPaging: Paging;
}

const initialState: State = {
  bookPreviews: [],
  openedBook: null,
  searchParams: INITIAL_BOOK_PREVIEWS_SEARCH_PARAMS,
  bookPreviewsPaging: { count: 0, current: 0 },
};

const slice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    closeBook(state) {
      state.openedBook = null;
    },
    setSearchParams(state, { payload }: PayloadAction<Partial<SearchParams>>) {
      state.searchParams = { ...state.searchParams, ...payload };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchBookPreviews.fulfilled, (state, { payload: { bookPreviews, paging } }) => {
      state.bookPreviews = bookPreviews;
      state.bookPreviewsPaging = paging;
    });
    builder.addCase(fetchBook.fulfilled, (state, { payload }) => {
      state.openedBook = payload;
    });
  },
});

export const { closeBook, setSearchParams } = slice.actions;
export default slice.reducer;
