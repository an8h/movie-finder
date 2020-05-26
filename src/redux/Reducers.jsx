import DefaultState from './DefaultState';

export function config(state = DefaultState.config, action) {
  switch (action.type) {
    case 'GET_CONFIG_LOADING':
      return {
        ...state,
        isLoading: true,
      };
    case 'GET_CONFIG_FAIL':
      return {
        ...state,
        isLoading: false,
        errors: action.config,
      };
    case 'GET_CONFIG_SUCCESS':
      return {
        ...state,
        images: action.config.data.images,
        isLoading: false,
        errors: [],
      };
    default:
      return state;
  }
}

export function genres(state = DefaultState.genres, action) {
  switch (action.type) {
    case 'GET_GENRES_LOADING':
      return {
        ...state,
        isLoading: true,
      };
    case 'GET_GENRES_FAIL':
      return {
        ...state,
        isLoading: false,
        errors: action.genres,
      };
    case 'GET_GENRES_SUCCESS':
      return {
        ...state,
        family: {
          totalPages: action.genres[0].data.total_pages,
          data: action.genres[0].data.results,
        },
        documentary: {
          totalPages: action.genres[1].data.total_pages,
          data: action.genres[1].data.results,
        },
        isLoading: false,
        errors: [],
      };
    default:
      return state;
  }
}

export function popularMovies(
  state = DefaultState.popularMovies,
  action,
) {
  switch (action.type) {
    case 'GET_POPULAR_MOVIES_LOADING':
      return {
        ...state,
        isLoading: true,
      };
    case 'GET_POPULAR_MOVIES_FAIL':
      return {
        ...state,
        isLoading: false,
        errors: action.popularMovies,
      };
    case 'GET_POPULAR_MOVIES_SUCCESS':
      return {
        ...state,
        totalPages: action.popularMovies.data.total_pages,
        data: action.popularMovies.data.results,
        isLoading: false,
        errors: [],
      };
    default:
      return state;
  }
}

export function popularSeries(
  state = DefaultState.popularSeries,
  action,
) {
  switch (action.type) {
    case 'GET_POPULAR_SERIES_LOADING':
      return {
        ...state,
        isLoading: true,
      };
    case 'GET_POPULAR_SERIES_FAIL':
      return {
        ...state,
        isLoading: false,
        errors: action.popularSeries,
      };
    case 'GET_POPULAR_SERIES_SUCCESS':
      return {
        ...state,
        totalPages: action.popularSeries.data.total_pages,
        data: action.popularSeries.data.results,
        isLoading: false,
        errors: [],
      };
    default:
      return state;
  }
}
