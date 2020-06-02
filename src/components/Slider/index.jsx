/* eslint-disable react/require-default-props */
import React from 'react';
import { Card, CardTitle, CardImg } from 'reactstrap';
import { PropTypes } from 'prop-types';
import styles from './style.css';
import fallbackPoster from '../../img/no-image-icon-23494.png';

const Slider = (props) => {
  const { postersToShow } = props;
  const { onClick } = props;
  const { title } = props;
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
          src={postersToShow}
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
  postersToShow: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

export default Slider;