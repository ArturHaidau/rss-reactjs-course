import { BookChaptersDto } from './types/dto/book-chapters.dto';
import { BookPreviewsDto } from './types/dto/book-previews.dto';

export async function fetchBooks<T>(url: string) {
  return (await (await fetch(`${process.env.REACT_APP_BOOKS_URL}/${url}`)).json()) as T;
}

export const range = (from: number, to: number) =>
  Array.from({ length: to - from + 1 }, (_, i) => i + from);

export const createChaptersFromResponse = (response: BookChaptersDto) =>
  response.docs.map(({ _id, chapterName }) => ({
    id: _id,
    name: chapterName,
  }));

export const createBookPreviewsFromResponse = (response: BookPreviewsDto) =>
  response.docs.map(({ _id, name }) => ({
    bookId: _id,
    bookName: name,
  }));
