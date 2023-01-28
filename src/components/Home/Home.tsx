import React from 'react';
import { SEARCH_BAR_TEXT_KEY } from '../../application.constants';
import defaultAvatar from '../../assets/default-avatar.png';
import profiles from '../../mocks/profiles.json';
import Cards from '../Cards';
import SearchBar from '../SearchBar';

class Home extends React.Component {
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
        <Cards
          data={profiles
            .filter(
              ({ name, country }) => name.includes(searchText) || country.includes(searchText)
            )
            .map((x) => ({
              ...x,
              avatarImage: defaultAvatar,
            }))}
        />
      </>
    );
  }
}

export default Home;
