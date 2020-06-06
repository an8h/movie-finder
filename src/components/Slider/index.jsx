/* eslint-disable react/require-default-props */

/* 
Slider Component: 
It is shown when the data of each category are fetch at Home page.
Rendered UI:
button        : This is to make the whole area of the card clickable
title         : The title of each item
posterToShow  : The poster image of each item
*/

import React from 'react';
import { Card, CardTitle, CardImg } from 'reactstrap';
import { PropTypes } from 'prop-types';
import styles from './style.css';
import fallbackPoster from '../../../img/no-image-icon-23494.png';

const Slider = (props) => {
  const { posterToShow } = props;
  const { onClick } = props;
  const { title = 'Title' } = props;

  return (
    <button
      className={styles.buttonCard}
      style={{ cursor: 'pointer' }}
      type="button"
      onClick={onClick}
    >
      <Card className={styles.card}>
        <CardImg
          variant="top"
          top
          height="300"
          src={posterToShow}
          onError={(e) => {
            e.target.src = fallbackPoster;
            e.target.style = 'object-fit: contain;';
          }}
        />
        <CardTitle className={styles.cardTitle}>{title}</CardTitle>
      </Card>
    </button>
  );
};

Slider.propTypes = {
  posterToShow: PropTypes.string.isRequired,
  title: PropTypes.string,
  onClick: PropTypes.func,
};

export default Slider;
