export async function fetchBooks<T>(url: string) {
  return (await (await fetch(`${process.env.REACT_APP_BOOKS_URL}/${url}`)).json()) as T;
}
