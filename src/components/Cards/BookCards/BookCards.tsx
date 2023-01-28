import React from 'react';
import { Book } from '../../../types/book';
import { BookPreview } from '../../../types/book-preview';
import { BookChaptersDto } from '../../../types/dto/book-chapters.dto';
import { NotificationType } from '../../../types/notification';
import { fetchBooks } from '../../../utils';
import Loading from '../../Loading';
import BookModal from '../../Modals/BookModal';
import BookCard from '../BookCard';
import styles from './BookCards.module.css';

export interface Props {
  data: BookPreview[];
  showNotification: (type: NotificationType, message: string) => void;
}
interface State {
  loading: boolean;
  openedBook: Book | null;
}

class BookCards extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { loading: false, openedBook: null };
    this.handleModalOpen = this.handleModalOpen.bind(this);
    this.handleModalClose = this.handleModalClose.bind(this);
  }

  async fetchBookChapters(bookId: string) {
    this.setState({ loading: true });
    const chapters = (await fetchBooks<BookChaptersDto>(`${bookId}/chapter`)).docs.map(
      ({ _id, chapterName }) => ({
        id: _id,
        name: chapterName,
      })
    );
    this.setState({
      loading: false,
    });
    return chapters;
  }

  async handleModalOpen(bookPreview: BookPreview) {
    try {
      this.setState({
        openedBook: {
          id: bookPreview.bookId,
          name: bookPreview.bookName,
          chapters: await this.fetchBookChapters(bookPreview.bookId),
        },
      });
      this.props.showNotification('success', 'Book opened successfully');
    } catch (error) {
      console.error(error);
      this.props.showNotification('error', 'Unable to open the book');
    }
  }

  handleModalClose() {
    this.setState({ openedBook: null });
  }

  render() {
    const { data } = this.props;
    const { openedBook, loading } = this.state;
    return (
      <>
        {loading && <Loading />}
        {openedBook && <BookModal handleClick={this.handleModalClose} book={openedBook} />}
        <div className={styles.cards}>
          {data.map((bookPreview, index) => (
            <div key={index} className={styles.card}>
              <BookCard bookPreview={bookPreview} handleClick={this.handleModalOpen} />
            </div>
          ))}
        </div>
      </>
    );
  }
}

export default BookCards;
