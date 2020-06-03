/* eslint-disable camelcase */
import { POSTER_SIZE } from '../config';

export const getCorrectPosterSize = (poster_sizes) => {
  return poster_sizes
    ? poster_sizes.filter((item) => item === POSTER_SIZE)
    : POSTER_SIZE;
};

export const getPosterPath = (items, base_url, posterSize) => {
  const { data } = items;
  return (
    data &&
    data.map((item) => {
      return `${base_url}${posterSize}${item.poster_path}`;
    })
  );
};

export const getTitle = (items) => {
  const { data } = items;
  return (
    data &&
    data.map((item) => {
      return item.title;
    })
  );
};
