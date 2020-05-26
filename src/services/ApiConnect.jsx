import axios from 'axios';
import {
  BASE_URL,
  API_KEY,
  FAMILY_GENRE,
  DOCUMENTARY_GENRE,
} from '../config';

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
      .then((res) => {
        const { genres } = res.data;

        const familyGenre = genres.filter(
          (item) => item.name === FAMILY_GENRE,
        );
        const documentaryGenre = genres.filter(
          (item) => item.name === DOCUMENTARY_GENRE,
        );

        const familyGenreRequest = axios.get(
          `${BASE_URL}/3/discover/movie`,
          {
            params: {
              api_key: API_KEY,
              with_genres: familyGenre[0].id,
            },
          },
        );
        const documentaryGenreRequest = axios.get(
          `${BASE_URL}/3/discover/movie`,
          {
            params: {
              api_key: API_KEY,
              with_genres: documentaryGenre[0].id,
            },
          },
        );
        return axios
          .all([familyGenreRequest, documentaryGenreRequest])
          .then(
            axios.spread((...responses) => {
              const familyGenreResponse = responses[0];
              const documentaryGenreResponse = responses[1];
              return [familyGenreResponse, documentaryGenreResponse];
            }),
          )
          .catch((errors) => errors);
      })
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
