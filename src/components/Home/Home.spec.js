import React from 'react';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import Home from './index';
import Footer from '../Footer/index';

const mockStore = configureStore([]);

describe('Home Component', () => {
  let store;
  let component;

  beforeEach(() => {
    store = mockStore({
      popularMovies: {
        totalPages: 1,
        data: [],
        isLoading: false,
        errors: [],
      },
      popularSeries: {
        totalPages: 1,
        data: [],
        isLoading: false,
        errors: [],
      },
      genres: {
        family: {
          totalPages: 1,
          data: [],
        },
        documentary: {
          totalPages: 1,
          data: [],
        },
        isLoading: false,
        errors: [],
      },
      config: {
        images: {},
        isLoading: false,
        errors: [],
      },
    });

    store.dispatch = jest.fn();

    component = renderer.create(
      <Provider store={store}>
        <Home
          popularMovies={store.popularMovies}
          popularSeries={store.popularSeries}
          genres={store.genres}
          config={store.config}
          familyGenreData={store.genres}
        />
      </Provider>,
    );
  });

  it('should render with given state from Redux store', () => {
    expect(component.toJSON()).toMatchSnapshot();
  });
});
