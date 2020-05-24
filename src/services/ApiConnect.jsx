import axios from 'axios';
import { BASE_URL, API_KEY } from '../config';

export default {
  getConfig: () =>
    axios
      .get(`${BASE_URL}/3/configuration`, {
        params: { api_key: API_KEY },
      })
      .then((res) => res)
      .catch((error) => error),
  getGenres: () =>
    axios
      .get(`${BASE_URL}/3/genre/movie/list`, {
        params: { api_key: API_KEY },
      })
      .then((res) => res)
      .catch((error) => error),
  getPopularMovies: () =>
    axios
      .get(`${BASE_URL}/3/movie/popular`, {
        params: { api_key: API_KEY },
      })
      .then((res) => res)
      .catch((error) => error),
  getPopularSeries: () =>
    axios
      .get(`${BASE_URL}/3/tv/popular`, {
        params: { api_key: API_KEY },
      })
      .then((res) => res)
      .catch((error) => error),
};
