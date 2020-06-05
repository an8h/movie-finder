/* eslint-disable no-return-assign */
/* eslint-disable camelcase */
import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import ApiConnect from '../../services/ApiConnect';
import SearchResults from '../SearchResults';
import { POSTER_SIZE, FALLBACK_IMAGE_URL } from '../../config';
import styles from './style.css';

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: 'Search for....',
      searchResults: [],
      searchButtonClicked: false,
    };

    this.fetchSearchResults = this.fetchSearchResults.bind(this);
    this.setQuery = this.setQuery.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  setQuery(newQuery) {
    this.setState({
      query: newQuery,
    });
  }

  fetchSearchResults(value) {
    ApiConnect.getResultsFromSearch(value).then((response) =>
      this.setState({ searchResults: response.results }),
    );
  }

  handleClick(value) {
    this.setState({
      searchButtonClicked: value,
    });
  }

  render() {
    const { searchResults } = this.state;
    const { query } = this.state;
    const { searchButtonClicked } = this.state;
    const { base_url } = this.props;
    const { posterSize } = this.props;

    return (
      <form
        onSubmit={(event) => {
          this.fetchSearchResults(query);

          event.preventDefault();
          this.handleClick(true);
        }}
      >
        <div className={styles.container}>
          <input
            type="text"
            value={query}
            ref={(input) => (this.inputField = input)}
            onFocus={() => (this.inputField.value = '')}
            onBlur={() => (this.inputField.value = 'Search for....')}
            onChange={(event) => this.setQuery(event.target.value)}
          />
          <button type="submit">Search</button>
        </div>
        {searchResults.length > 0 ? (
          <SearchResults
            results={searchResults}
            query={query}
            base_url={base_url}
            posterSize={posterSize}
          />
        ) : (
          searchButtonClicked && (
            <p className={styles.categoryTitle}>
              There are no results for this search. Try again!
            </p>
          )
        )}
      </form>
    );
  }
}
SearchBar.defaultProps = {
  base_url: FALLBACK_IMAGE_URL,
  posterSize: POSTER_SIZE,
};

SearchBar.propTypes = {
  base_url: PropTypes.string,
  posterSize: PropTypes.string,
};

export default SearchBar;
