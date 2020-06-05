/* eslint-disable no-return-assign */
/* eslint-disable camelcase */

/* 
SearchBar Component: 
It is shown in the Home page.
Rendered UI:
input field     : Here the user can type any keyword to search for movies/ series
button          : A search button. When it is clicked a query string is passed to the API call and the API call starts. 
SearchResults   : Once the API call is done and there are results a SearchResults component is shown
p               : If there are no results for the given query a user is informed that there are no results by this <p/>
*/

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

    // Initializing references
    this.fetchSearchResults = this.fetchSearchResults.bind(this);
    this.setQuery = this.setQuery.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  // Update the query value
  setQuery(newQuery) {
    this.setState({
      query: newQuery,
    });
  }

  // Call the corrensponding API with the updated query
  fetchSearchResults(value) {
    ApiConnect.getResultsFromSearch(value).then((response) =>
      this.setState({ searchResults: response.results }),
    );
  }

  // This flag is needed for controling whether or not there are no any results from the last search
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
            className={styles.inputCustom}
            type="text"
            value={query}
            ref={(input) => (this.inputField = input)}
            onFocus={() => (this.inputField.value = '')}
            onBlur={() => (this.inputField.value = 'Search for....')}
            onChange={(event) => this.setQuery(event.target.value)}
          />
          <button className={styles.buttonCustom} type="submit">
            Search
          </button>
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
