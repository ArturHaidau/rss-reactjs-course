import React from 'react';
import employees from '../../employees.json';
import { SEARCH_BAR_TEXT_KEY } from '../../application.constants';
import Card from '../Card';
import SearchBar from '../SearchBar';
import styles from './Cards.module.css';

class Cards extends React.Component {
  state = {
    searchText: '',
  };

  componentDidMount() {
    this.setState({ searchText: localStorage.getItem(SEARCH_BAR_TEXT_KEY) ?? '' });
  }

  componentWillUnmount() {
    localStorage.setItem(SEARCH_BAR_TEXT_KEY, this.state.searchText);
  }

  changeSearchText(searchText: string) {
    this.setState({ searchText });
  }

  render() {
    const { searchText } = this.state;
    return (
      <>
        <SearchBar searchText={searchText} changeSearchText={this.changeSearchText.bind(this)} />
        <div className={styles.cards}>
          {employees
            .filter(
              ({ name, position, email }) =>
                name.includes(searchText) ||
                position.includes(searchText) ||
                email.includes(searchText)
            )
            .map((x, index) => (
              <div key={index} className={styles.card}>
                <Card {...x} />
              </div>
            ))}
        </div>
      </>
    );
  }
}

export default Cards;
