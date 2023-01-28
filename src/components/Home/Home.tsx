import React from 'react';
import { SEARCH_BAR_TEXT_KEY } from '../../application.constants';
import { NotificationType } from '../../types/notification';
import SearchBar from '../SearchBar';
import Loading from '../Loading';
import BookCards from '../Cards/BookCards';
import { BooksDto } from '../../types/dto/books.dto';
import { BookPreview } from '../../types/book-preview';
import { fetchBooks } from '../../utils';

export interface Props {
  showNotification: (type: NotificationType, message: string) => void;
}
interface State {
  searchText: string;
  bookPreviews: BookPreview[];
  loading: boolean;
}

class Home extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      searchText: '',
      bookPreviews: [],
      loading: false,
    };
    this.changeSearchText = this.changeSearchText.bind(this);
    this.searchBooks = this.searchBooks.bind(this);
  }

  componentDidMount() {
    this.setState({ searchText: localStorage.getItem(SEARCH_BAR_TEXT_KEY) ?? '' }, async () => {
      await this.searchBooks();
    });
  }

  componentWillUnmount() {
    localStorage.setItem(SEARCH_BAR_TEXT_KEY, this.state.searchText);
  }

  async changeSearchText(searchText: string) {
    this.setState({ searchText });
  }

  async fetchBookPreviews() {
    const { showNotification } = this.props;
    this.setState({ loading: true });
    let books: BookPreview[] = [];
    try {
      books = (await fetchBooks<BooksDto>(`?name=/${this.state.searchText}/i`)).docs.map(
        ({ _id, name }) => ({
          bookId: _id,
          bookName: name,
        })
      );
      showNotification('success', 'Books fetched successfully');
    } catch (error) {
      console.error(error);
      showNotification(
        'error',
        error instanceof Error ? error.message : 'Failed to fetch book previews'
      );
    }
    this.setState({ loading: false });
    return books;
  }

  async searchBooks() {
    const bookPreviews = await this.fetchBookPreviews();
    if (bookPreviews.length === 0)
      this.props.showNotification(
        'info',
        `Unable to find books with search text '${this.state.searchText}'`
      );
    this.setState({ bookPreviews });
  }

  render() {
    const { searchText, loading, bookPreviews } = this.state;
    return (
      <>
        {loading && <Loading />}
        <SearchBar
          searchText={searchText}
          changeSearchText={this.changeSearchText}
          searchBooks={this.searchBooks}
        />
        <BookCards data={bookPreviews} showNotification={this.props.showNotification} />
      </>
    );
  }
}

export default Home;
