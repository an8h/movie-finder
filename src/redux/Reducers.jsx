import DefaultState from './DefaultState';

export function config(state = DefaultState.config, action) {
  switch (action.type) {
    case 'GET_CONFIG':
      return {
        ...state,
        images: action.config.images,
      };
    default:
      return state;
  }
}
export function genres(state = DefaultState.genres, action) {
  switch (action.type) {
    case 'GET_GENRES':
      return action.genres;
    default:
      return state;
  }
}
