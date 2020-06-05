/* 
Actions for:
Configuration
Genres
Popular Movies
Popular Series
Results from Search

Each Action has three different dispatch states:
_LOADING
_SUCCESS
_FAIL
*/

import ApiConnect from '../services/ApiConnect';

export function getConfig() {
  return async (dispatch) => {
    dispatch({ type: 'GET_CONFIG_LOADING' });
    const response = await ApiConnect.getConfig();
    dispatch({
      type:
        response.status === 200
          ? 'GET_CONFIG_SUCCESS'
          : 'GET_CONFIG_FAIL',
      config: response,
    });
  };
}

export function getGenres() {
  return async (dispatch) => {
    dispatch({ type: 'GET_GENRES_LOADING' });
    const response = await ApiConnect.getGenres();
    dispatch({
      type:
        response[0].status && response[1].status === 200
          ? 'GET_GENRES_SUCCESS'
          : 'GET_GENRES_FAIL',
      genres: response,
    });
  };
}

export function getPopularMovies() {
  return async (dispatch) => {
    dispatch({ type: 'GET_POPULAR_MOVIES_LOADING' });
    const response = await ApiConnect.getPopularMovies();
    dispatch({
      type:
        response.status === 200
          ? 'GET_POPULAR_MOVIES_SUCCESS'
          : 'GET_POPULAR_MOVIES_FAIL',
      popularMovies: response,
    });
  };
}

export function getPopularSeries() {
  return async (dispatch) => {
    dispatch({ type: 'GET_POPULAR_SERIES_LOADING' });
    const response = await ApiConnect.getPopularSeries();
    dispatch({
      type:
        response.status === 200
          ? 'GET_POPULAR_SERIES_SUCCESS'
          : 'GET_POPULAR_SERIES_FAIL',
      popularSeries: response,
    });
  };
}

export function getResultsFromSearch(query) {
  return async (dispatch) => {
    dispatch({ type: 'GET_SEARCH_RESULTS_LOADING' });
    const response = await ApiConnect.getResultsFromSearch(query);
    dispatch({
      type:
        response.status === 200
          ? 'GET_SEARCH_RESULTS_SUCCESS'
          : 'GET_SEARCH_RESULTS_FAIL',
      search: response,
    });
  };
}
