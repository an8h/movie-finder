/* eslint-disable camelcase */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/forbid-prop-types */
import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import Slider from '../Slider/index';
import styles from '../Home/style.css';
import { getPosterPath } from '../../utils/utils';
import { POSTER_SIZE, FALLBACK_IMAGE_URL } from '../../config';

const SearchResults = (props) => {
  const { results } = props;
  const { query } = props;
  const { base_url } = props;
  const { posterSize } = props;
  const [clicked, handleClick] = useState(false);
  const [clickedItem, setClickedItem] = useState();
  const [posterToShow, setPosterToShow] = useState(false);

  const searchResultsPosterPath = getPosterPath(
    results,
    base_url,
    posterSize,
    true,
  );

  return (
    <div>
      {results.length > 0 ? (
        <div>
          <h1 className={styles.categoryTitle}>
            Search results for: {query}
          </h1>

          <div className={styles.horizontalRow}>
            {results.map((result, index) => (
              <Slider
                key={index}
                posterToShow={searchResultsPosterPath[index]}
                title={result.title}
                onClick={() => {
                  handleClick(true);
                  setClickedItem(result);
                  setPosterToShow(searchResultsPosterPath[index]);
                }}
              />
            ))}
          </div>
        </div>
      ) : null}

      {clicked ? (
        <Redirect
          push
          to={{
            pathname: '/detail',
            state: { clickedItem, posterToShow, clicked },
          }}
        />
      ) : null}
    </div>
  );
};

SearchResults.defaultProps = {
  results: [],
  query: '',
  base_url: FALLBACK_IMAGE_URL,
  posterSize: POSTER_SIZE,
};

SearchResults.propTypes = {
  results: PropTypes.array,
  query: PropTypes.string,
  base_url: PropTypes.string,
  posterSize: PropTypes.string,
};

export default SearchResults;
