import axios from 'axios';
import { BASE_URL, API_KEY } from '../config';

export default {
  getConfig: () =>
    axios
      .get(`${BASE_URL}/3/configuration`, {
        params: { api_key: API_KEY },
      })
      .then((res) => res.data)
      .catch((error) => console.log(error)),
  getGenres: () =>
    axios
      .get(`${BASE_URL}/3/genre/movie/list`, {
        params: { api_key: API_KEY },
      })
      .then((res) => res.data.genres)
      .catch((error) => console.log(error)),
};

// TODO: Get popular movies, popular series, family, and documentary
