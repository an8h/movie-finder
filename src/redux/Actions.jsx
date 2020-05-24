import ApiConnect from '../services/ApiConnect';

export function getConfig() {
  return async (dispatch) => {
    const response = await ApiConnect.getConfig();
    dispatch({
      type: 'GET_CONFIG',
      config: response,
    });
  };
}

export function getGenres() {
  return async (dispatch) => {
    const response = await ApiConnect.getGenres();
    dispatch({
      type: 'GET_GENRES',
      genres: response,
    });
  };
}

// TODO: Get popular movies, popular series, family, and documentary
