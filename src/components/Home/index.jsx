/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/jsx-curly-newline */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable camelcase */
import React from 'react';
import { Redirect } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { mapDispachToProps } from '../../redux/Store';
import SearchBar from '../SearchBar/index';
import Slider from '../Slider/index';
import styles from './style.css';
import Footer from '../Footer/index';
import logo from '../../img/logo.svg';
import { POSTER_SIZE, FALLBACK_IMAGE_URL } from '../../config';
import {
  getCorrectPosterSize,
  getPosterPath,
  getTitle,
} from '../../utils/utils';

class Home extends React.Component {
  constructor() {
    super();
    this.state = { clicked: false };

    // Initializing reference to click handler
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    const {
      getConfig,
      getGenres,
      getPopularMovies,
      getPopularSeries,
    } = this.props;

    // Make the API calls and get the needed data
    getConfig();
    getGenres();
    getPopularMovies();
    getPopularSeries();
  }

  handleClick(item, posterToShow) {
    this.setState({
      clicked: true,
      clickedItem: item,
      posterToShow,
    });
  }

  render() {
    const { config } = this.props;
    const { base_url = FALLBACK_IMAGE_URL } = config.images;
    const { poster_sizes } = config.images;
    const { popularMovies } = this.props;
    const popularMoviesData = popularMovies.data;
    const { popularSeries } = this.props;
    const popularSeriesData = popularSeries.data;
    const { genres } = this.props;
    const familyGenre = genres.family;
    const familyGenreData = familyGenre.data;
    const documentaryGenre = genres.documentary;
    const documentaryGenreData = documentaryGenre.data;
    const { clickedItem } = this.state;
    const { clicked } = this.state;
    const { posterToShow } = this.state;

    const correctPosterSize = getCorrectPosterSize(poster_sizes);
    const posterSize = correctPosterSize
      ? correctPosterSize[0]
      : POSTER_SIZE;

    const moviesPosterPath = getPosterPath(
      popularMovies,
      base_url,
      posterSize,
    );
    const moviesTitle = getTitle(popularMovies);

    const seriesPosterPath = getPosterPath(
      popularSeries,
      base_url,
      posterSize,
    );
    const seriesTitle = getTitle(popularSeries);

    const familyPosterPath = getPosterPath(
      familyGenre,
      base_url,
      posterSize,
    );
    const familyTitle = getTitle(familyGenre);

    const documentaryPosterPath = getPosterPath(
      documentaryGenre,
      base_url,
      posterSize,
    );
    const documentaryTitle = getTitle(documentaryGenre);

    /* The following arrays are needed for the render(). 
    In the render() we loop through the different categories and we create the UI */
    const posterPaths = [];
    posterPaths.push(
      moviesPosterPath,
      seriesPosterPath,
      familyPosterPath,
      documentaryPosterPath,
    );

    const titles = [];
    titles.push(
      moviesTitle,
      seriesTitle,
      familyTitle,
      documentaryTitle,
    );

    const categoryTitles = [
      'Popular Movies',
      'Popular Series',
      'Family',
      'Documentary',
    ];

    const dataAreLoading = [];
    dataAreLoading.push(popularMovies, popularSeries, genres, genres);

    const data = [];
    data.push(
      popularMoviesData,
      popularSeriesData,
      familyGenreData,
      documentaryGenreData,
    );

    return (
      <div>
        <div className={styles.container}>
          <div>
            <img className={styles.logo} src={logo} />
          </div>
          <SearchBar base_url={base_url} posterSize={posterSize} />
          {categoryTitles.map((title, index) => (
            <div key={index}>
              <h1 className={styles.categoryTitle}>{title}</h1>
              <div className={styles.horizontalRow}>
                {posterPaths[index].map((posterPath, key) => (
                  <Slider
                    key={key}
                    posterToShow={posterPath}
                    title={titles[index][key]}
                    isLoading={dataAreLoading[index].isLoading}
                    onClick={() =>
                      this.handleClick(data[index][key], posterPath)
                    }
                  />
                ))}
              </div>
            </div>
          ))}
          {clicked ? (
            <Redirect
              push
              to={{
                pathname: '/detail',
                state: { clickedItem, posterToShow, clicked },
              }}
            />
          ) : null}
        </div>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    ...ownProps,
    config: state.config,
    genres: state.genres,
    popularMovies: state.popularMovies,
    popularSeries: state.popularSeries,
  };
};

Home.propTypes = {
  getConfig: PropTypes.func.isRequired,
  getGenres: PropTypes.func.isRequired,
  getPopularMovies: PropTypes.func.isRequired,
  getPopularSeries: PropTypes.func.isRequired,
  popularMovies: PropTypes.object.isRequired,
  popularSeries: PropTypes.object.isRequired,
  genres: PropTypes.object.isRequired,
  config: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispachToProps)(Home);
