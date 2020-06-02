/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable camelcase */
/* eslint-disable react/forbid-prop-types */
import React, { useState } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import { Button } from 'reactstrap';
import styles from './style.css';
import fallbackPoster from '../../img/no-image-icon-23494.png';

const DetailPage = (props) => {
  const { location } = props;
  const { state } = location;
  const { clickedItem } = state;
  const { title } = clickedItem;
  const { overview } = clickedItem;
  const { release_date } = clickedItem;
  const { posterToShow } = state;
  const history = useHistory();
  const [clicked, handleClick] = useState(false);

  return (
    <div className={styles.container}>
      <img
        className={styles.image}
        src={posterToShow}
        alt={title}
        onError={(e) => {
          e.target.src = fallbackPoster;
          e.target.style = 'object-fit: contain;';
        }}
      />
      <div className={styles.text}>
        <h2>{title}</h2>
        <p>{overview}</p>
        <h3>Release date: {release_date}</h3>
        <Button
          color="primary"
          size="lg"
          onClick={() => {
            handleClick(true);
          }}
        >
          Watch Video
        </Button>{' '}
        <Button
          color="secondary"
          size="lg"
          onClick={() => {
            history.goBack();
          }}
        >
          Close
        </Button>
      </div>
      {clicked ? (
        <Redirect
          push
          to={{
            pathname: '/watchVideo',
            state: { posterToShow },
          }}
        />
      ) : null}
    </div>
  );
};

export default DetailPage;

DetailPage.propTypes = {
  location: PropTypes.object.isRequired,
};
